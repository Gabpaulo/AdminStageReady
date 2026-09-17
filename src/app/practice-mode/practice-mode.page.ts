import { Component, OnInit } from '@angular/core';
import {
  AdminFirebaseService, PracticeScript, PracticeScriptInput,
  DimensionKey, ScriptTargetLevel
} from '../services/admin-firebase.service';

/** Total scripts in the seed file. Kept here so the button copy doesn't need the 75KB module. */
const SEED_SCRIPT_COUNT = 45;

@Component({
  selector: 'app-practice-mode',
  templateUrl: 'practice-mode.page.html',
  styleUrls: ['practice-mode.page.scss'],
  standalone: false,
})
export class PracticeModePage implements OnInit {
  scripts: PracticeScript[] = [];
  filteredScripts: PracticeScript[] = [];
  loading = true;
  error = '';

  searchQuery = '';
  filterCategory = 'all';
  filterDifficulty = 'all';
  filterActive: 'all' | 'active' | 'inactive' = 'all';

  categoryOptions: PracticeScript['category'][] = ['informative', 'persuasive', 'motivational'];
  difficultyOptions: PracticeScript['difficulty'][] = ['beginner', 'intermediate', 'advanced'];
  levelOptions: ScriptTargetLevel[] = ['low', 'medium', 'high'];
  dimensionOptions: DimensionKey[] = [
    'speech_pace', 'pausing_fluency', 'loud_control', 'pitch_variation',
    'articulation_clarity', 'expressive_emph', 'filler_words_score',
  ];

  // Create / Edit form
  showForm = false;
  formMode: 'create' | 'edit' = 'create';
  editingId: string | null = null;
  formModel: Partial<PracticeScript> = this.emptyFormModel();
  formError = '';
  saving = false;
  saveMessage = '';

  // Generic confirmation modal
  showConfirmModal = false;
  confirmTitle = '';
  confirmMessage = '';
  confirmButtonText = '';
  confirmButtonClass = 'btn-danger';
  confirmAction: (() => void) | null = null;
  confirming = false;

  seedingInProgress = false;
  readonly seedScriptCount = SEED_SCRIPT_COUNT;

  constructor(private adminFirebase: AdminFirebaseService) {}

  async ngOnInit() {
    await this.loadScripts();
  }

  async loadScripts() {
    this.loading = true;
    this.error = '';
    try {
      this.scripts = await this.adminFirebase.getAllPracticeScripts();
      this.applyFilters();
    } catch (err: any) {
      this.error = 'Failed to load practice scripts.';
      console.error(err);
    } finally {
      this.loading = false;
    }
  }

  applyFilters() {
    let result = [...this.scripts];

    const q = this.searchQuery.toLowerCase().trim();
    if (q) {
      result = result.filter(s =>
        s.title.toLowerCase().includes(q) ||
        s.id.toLowerCase().includes(q) ||
        s.rawText.toLowerCase().includes(q)
      );
    }

    if (this.filterCategory !== 'all') {
      result = result.filter(s => s.category === this.filterCategory);
    }

    if (this.filterDifficulty !== 'all') {
      result = result.filter(s => s.difficulty === this.filterDifficulty);
    }

    if (this.filterActive !== 'all') {
      result = result.filter(s => (this.filterActive === 'active') === (s.active !== false));
    }

    // Sort by sortOrder so this table matches the order users see in the app.
    result.sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0) || a.title.localeCompare(b.title));
    this.filteredScripts = result;
  }

  onFilterChange() {
    this.applyFilters();
  }

  // ── Create / Edit ──────────────────────────────────────

  private emptyFormModel(): Partial<PracticeScript> {
    return {
      title: '',
      category: 'informative',
      difficulty: 'beginner',
      rawText: '',
      estimatedDuration: 75,
      targetDimensions: [],
      targetWpmRange: { min: 110, max: 130 },
      scriptTargetPausing: 'medium',
      scriptTargetPitch: 'medium',
      scriptTargetFiller: 'medium',
      scriptTargetArticulation: 'medium',
      active: true,
    };
  }

  startCreate() {
    this.formMode = 'create';
    this.editingId = null;
    this.formModel = this.emptyFormModel();
    this.formError = '';
    this.showForm = true;
  }

  startEdit(script: PracticeScript) {
    this.formMode = 'edit';
    this.editingId = script.id;
    // Deep-copy the nested members, or cancelling the modal still mutates the table row.
    this.formModel = {
      ...script,
      targetWpmRange: { ...script.targetWpmRange },
      targetDimensions: [...script.targetDimensions],
    };
    this.formError = '';
    this.showForm = true;
  }

  cancelForm() {
    this.showForm = false;
    this.formModel = this.emptyFormModel();
    this.formError = '';
  }

  // ── Target dimensions (multi-select) ───────────────────

  isDimensionSelected(dim: DimensionKey): boolean {
    return (this.formModel.targetDimensions ?? []).includes(dim);
  }

  /**
   * Order is preserved deliberately: the app's recommendation reason text uses the
   * FIRST matching dimension, so editing a script must not silently reshuffle it.
   */
  toggleDimension(dim: DimensionKey) {
    const current = this.formModel.targetDimensions ?? [];
    this.formModel.targetDimensions = current.includes(dim)
      ? current.filter(d => d !== dim)
      : [...current, dim];
  }

  // ── Duration helper ────────────────────────────────────

  wordCount(text: string | undefined): number {
    if (!text) return 0;
    return text.trim().split(/\s+/).filter(Boolean).length;
  }

  get formWordCount(): number {
    return this.wordCount(this.formModel.rawText);
  }

  /** Suggests a duration from word count at the midpoint of the target WPM range. */
  recomputeDuration() {
    const words = this.formWordCount;
    const range = this.formModel.targetWpmRange;
    if (!words || !range) return;
    const midWpm = (Number(range.min) + Number(range.max)) / 2;
    if (!Number.isFinite(midWpm) || midWpm <= 0) return;
    this.formModel.estimatedDuration = Math.round((words / midWpm) * 60);
  }

  private validateForm(): string | null {
    const m = this.formModel;
    if (!m.title || !m.title.trim()) return 'Title is required.';
    if (!m.rawText || !m.rawText.trim()) return 'Script text is required.';

    const words = this.wordCount(m.rawText);
    if (words < 20) return `Script text must be at least 20 words (currently ${words}). Shorter scripts cannot be scored reliably.`;
    if (m.rawText.length > 20000) return 'Script text is too long (max 20,000 characters).';

    if (!m.targetDimensions || m.targetDimensions.length === 0) {
      return 'Select at least one target dimension — the overall score is averaged across them.';
    }

    const min = Number(m.targetWpmRange?.min);
    const max = Number(m.targetWpmRange?.max);
    if (!Number.isFinite(min) || !Number.isFinite(max)) return 'Target WPM min and max are required.';
    if (min < 60 || max > 250) return 'Target WPM must be between 60 and 250.';
    if (min >= max) return 'Target WPM min must be less than max.';

    const duration = Number(m.estimatedDuration);
    if (!Number.isFinite(duration) || duration < 10 || duration > 600) {
      return 'Estimated duration must be between 10 and 600 seconds.';
    }

    return null;
  }

  async saveForm() {
    const validationError = this.validateForm();
    if (validationError) {
      this.formError = validationError;
      return;
    }

    this.saving = true;
    this.formError = '';
    try {
      const m = this.formModel;
      // Built explicitly rather than spreading formModel, which would carry
      // id / sortOrder / createdAt into the write.
      const payload: Omit<PracticeScriptInput, 'sortOrder'> = {
        title: m.title!.trim(),
        category: m.category!,
        difficulty: m.difficulty!,
        rawText: m.rawText!.trim(),
        estimatedDuration: Number(m.estimatedDuration),
        targetDimensions: [...m.targetDimensions!],
        targetWpmRange: { min: Number(m.targetWpmRange!.min), max: Number(m.targetWpmRange!.max) },
        scriptTargetPausing: m.scriptTargetPausing!,
        scriptTargetPitch: m.scriptTargetPitch!,
        scriptTargetFiller: m.scriptTargetFiller!,
        scriptTargetArticulation: m.scriptTargetArticulation!,
      };

      if (this.formMode === 'create') {
        await this.adminFirebase.createPracticeScript(payload);
        this.saveMessage = `Script "${payload.title}" created successfully.`;
      } else if (this.editingId) {
        await this.adminFirebase.updatePracticeScript(this.editingId, { ...payload, active: m.active });
        this.saveMessage = `Script "${payload.title}" updated successfully.`;
      }

      this.showForm = false;
      await this.loadScripts();
      setTimeout(() => this.saveMessage = '', 3000);
    } catch (err: any) {
      this.formError = 'Failed to save practice script.';
      console.error(err);
    } finally {
      this.saving = false;
    }
  }

  // ── Activate / Deactivate / Delete ─────────────────────

  confirmToggleActive(script: PracticeScript) {
    const willActivate = script.active === false;
    this.showConfirm(
      willActivate ? 'Reactivate Script' : 'Deactivate Script',
      willActivate
        ? `Reactivate <strong>"${script.title}"</strong>? It will appear in Practice Mode again and can be recommended.`
        : `Deactivate <strong>"${script.title}"</strong>? It will stop appearing in Practice Mode and stop being recommended. Saved practice sessions are unaffected.`,
      willActivate ? 'Reactivate' : 'Deactivate',
      willActivate ? 'btn-primary' : 'btn-warning',
      async () => {
        await this.adminFirebase.setPracticeScriptActive(script.id, willActivate);
        this.saveMessage = `Script "${script.title}" ${willActivate ? 'reactivated' : 'deactivated'}.`;
        await this.loadScripts();
        setTimeout(() => this.saveMessage = '', 3000);
      }
    );
  }

  confirmDelete(script: PracticeScript) {
    this.showConfirm(
      'Delete Script',
      `Permanently delete <strong>"${script.title}"</strong> (<code>${script.id}</code>)? This cannot be undone. ` +
      `Past practice sessions keep their own copy of the script details, so history stays intact. ` +
      `To simply hide a script from users, deactivate it instead.`,
      'Delete Permanently',
      'btn-danger',
      async () => {
        await this.adminFirebase.deletePracticeScript(script.id);
        this.saveMessage = `Script "${script.title}" deleted.`;
        await this.loadScripts();
        setTimeout(() => this.saveMessage = '', 3000);
      }
    );
  }

  // ── Confirmation Modal ─────────────────────────────────

  showConfirm(title: string, message: string, buttonText: string, buttonClass: string, action: () => void) {
    this.confirmTitle = title;
    this.confirmMessage = message;
    this.confirmButtonText = buttonText;
    this.confirmButtonClass = buttonClass;
    this.confirmAction = action;
    this.confirming = false;
    this.showConfirmModal = true;
  }

  cancelConfirm() {
    this.showConfirmModal = false;
    this.confirmAction = null;
  }

  async executeConfirm() {
    if (!this.confirmAction) return;
    this.confirming = true;
    try {
      await this.confirmAction();
    } finally {
      this.confirming = false;
      this.showConfirmModal = false;
      this.confirmAction = null;
    }
  }

  // ── Seeding ─────────────────────────────────────────────

  /**
   * Fills in only the scripts that are missing, so this stays usable after a
   * partial failure and can restore an individually deleted script. Existing
   * documents are never touched, so admin edits survive a re-run.
   */
  async confirmSeedDefaults() {
    if (this.seedingInProgress) return;
    this.seedingInProgress = true;
    try {
      // ~75KB — lazy chunk, fetched only when an admin actually seeds.
      const { PRACTICE_SCRIPTS_SEED } = await import('./practice-scripts.seed');

      const existing = new Set(this.scripts.map(s => s.id));
      const missing = PRACTICE_SCRIPTS_SEED
        .map((entry, index) => ({ entry, sortOrder: index + 1 }))
        .filter(({ entry }) => !existing.has(entry.id));

      if (missing.length === 0) {
        this.saveMessage = 'All default scripts are already present — nothing to seed.';
        setTimeout(() => this.saveMessage = '', 3000);
        return;
      }

      this.showConfirm(
        'Seed Default Scripts',
        `This will add <strong>${missing.length}</strong> missing script${missing.length === 1 ? '' : 's'} ` +
        `out of the ${SEED_SCRIPT_COUNT} defaults. Existing scripts will not be modified.`,
        `Seed ${missing.length} Script${missing.length === 1 ? '' : 's'}`,
        'btn-primary',
        () => this.seedDefaultScripts(missing)
      );
    } catch (err: any) {
      this.error = 'Failed to load the default script data.';
      console.error(err);
    } finally {
      this.seedingInProgress = false;
    }
  }

  private async seedDefaultScripts(
    missing: Array<{ entry: { id: string } & Omit<PracticeScriptInput, 'sortOrder'>; sortOrder: number }>
  ) {
    this.seedingInProgress = true;
    try {
      const entries = missing.map(({ entry, sortOrder }) => {
        const { id, ...data } = entry;
        return { id, data: { ...data, sortOrder } };
      });
      await this.adminFirebase.createPracticeScriptsBatch(entries);
      this.saveMessage = `${entries.length} practice script${entries.length === 1 ? '' : 's'} seeded successfully.`;
      await this.loadScripts();
      setTimeout(() => this.saveMessage = '', 3000);
    } catch (err: any) {
      this.error = 'Failed to seed practice scripts.';
      console.error(err);
    } finally {
      this.seedingInProgress = false;
    }
  }

  // ── Helpers ────────────────────────────────────────────

  preview(text: string, max = 90): string {
    if (!text) return '';
    const clean = text.trim();
    return clean.length > max ? clean.slice(0, max) + '…' : clean;
  }

  formatDimensions(script: PracticeScript): string {
    return (script.targetDimensions ?? []).map(d => this.formatLabel(d)).join(', ');
  }

  formatLabel(value: string): string {
    return value.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  }
}
