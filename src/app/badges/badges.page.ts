import { Component, OnInit } from '@angular/core';
import { AdminFirebaseService, BadgeDefinition } from '../services/admin-firebase.service';

type CriteriaType = BadgeDefinition['criteria']['type'];

const DEFAULT_BADGES_SEED: Array<{ id: string; data: Omit<BadgeDefinition, 'id' | 'active' | 'createdAt' | 'updatedAt'> }> = [
  { id: 'first_steps', data: { name: 'First Steps', description: 'Complete your first speech analysis', icon: 'assets/badges/first-step.svg', category: 'practice', rarity: 'common', maxProgress: 1, criteria: { type: 'speech_count', value: 1 } } },
  { id: 'daily_practice', data: { name: 'Daily Practice', description: 'Practice for 7 consecutive days', icon: 'assets/badges/daily-practice.svg', category: 'practice', rarity: 'rare', maxProgress: 7, criteria: { type: 'consecutive_days', value: 7 } } },
  { id: 'week_warrior', data: { name: 'Week Warrior', description: 'Practice for 30 days total', icon: 'assets/badges/Week-Warrior.svg', category: 'practice', rarity: 'epic', maxProgress: 30, criteria: { type: 'total_days', value: 30 } } },
  { id: 'consistency_champion', data: { name: 'Consistency Champion', description: 'Practice for 100 days total', icon: 'assets/badges/Consistency-champion.svg', category: 'practice', rarity: 'legendary', maxProgress: 100, criteria: { type: 'total_days', value: 100 } } },
  { id: 'clarity_master', data: { name: 'Clarity Master', description: 'Achieve excellent clarity rating', icon: 'assets/badges/Clarity-master.svg', category: 'progress', rarity: 'rare', maxProgress: 1, criteria: { type: 'rating_achievement', value: 1, ratingType: 'clarity', ratingValue: 'excellent' } } },
  { id: 'pace_perfect', data: { name: 'Pace Perfect', description: 'Achieve excellent pace rating', icon: 'assets/badges/Pace-perfect.svg', category: 'progress', rarity: 'rare', maxProgress: 1, criteria: { type: 'rating_achievement', value: 1, ratingType: 'pace', ratingValue: 'excellent' } } },
  { id: 'tone_expert', data: { name: 'Tone Expert', description: 'Achieve excellent tone rating', icon: 'assets/badges/Tone-Expert.svg', category: 'progress', rarity: 'rare', maxProgress: 1, criteria: { type: 'rating_achievement', value: 1, ratingType: 'tone', ratingValue: 'excellent' } } },
  { id: 'filler_fighter', data: { name: 'Filler Fighter', description: 'Achieve an excellent filler-word rating', icon: 'assets/badges/Filler-Fighter.svg', category: 'progress', rarity: 'epic', maxProgress: 1, criteria: { type: 'rating_achievement', value: 1, ratingType: 'filler', ratingValue: 'excellent' } } },
  { id: 'speed_demon', data: { name: 'Speed Demon', description: 'Complete 10 speech analyses', icon: 'assets/badges/Speed-demon.svg', category: 'performance', rarity: 'common', maxProgress: 10, criteria: { type: 'speech_count', value: 10 } } },
  { id: 'marathon_speaker', data: { name: 'Marathon Speaker', description: 'Complete 50 speech analyses', icon: 'assets/badges/Marathon-Speaker.svg', category: 'performance', rarity: 'epic', maxProgress: 50, criteria: { type: 'speech_count', value: 50 } } },
  { id: 'centurion', data: { name: 'Centurion', description: 'Complete 100 speech analyses', icon: 'assets/badges/Centurion.svg', category: 'performance', rarity: 'legendary', maxProgress: 100, criteria: { type: 'speech_count', value: 100 } } },
  { id: 'perfectionist', data: { name: 'Perfectionist', description: 'Get all excellent ratings in one session', icon: 'assets/badges/Perfectionist.svg', category: 'performance', rarity: 'legendary', maxProgress: 1, criteria: { type: 'rating_achievement', value: 1, ratingType: 'all', ratingValue: 'excellent' } } },
  { id: 'profile_pioneer', data: { name: 'Profile Pioneer', description: 'Complete your profile setup', icon: 'assets/badges/Profile-Pioneer.svg', category: 'special', rarity: 'common', maxProgress: 1, criteria: { type: 'profile_completion', value: 1, ratingType: 'profile' } } },
  { id: 'early_bird', data: { name: 'Early Bird', description: 'Use the app for the first time', icon: 'assets/badges/Early-Bird.svg', category: 'special', rarity: 'common', maxProgress: 1, criteria: { type: 'speech_count', value: 1 } } },
  { id: 'comeback_kid', data: { name: 'Comeback Kid', description: 'Return after 7+ days away', icon: 'assets/badges/Comeback-kid.svg', category: 'special', rarity: 'rare', maxProgress: 1, criteria: { type: 'time_based', value: 1 } } },
  { id: 'night_owl', data: { name: 'Night Owl', description: 'Practice after 10 PM', icon: 'assets/badges/Night-Owl.svg', category: 'special', rarity: 'rare', maxProgress: 1, criteria: { type: 'time_based', value: 1 } } },
  { id: 'interests_explorer', data: { name: 'Interests Explorer', description: 'Add 5+ interests to your profile', icon: 'assets/badges/Interest-Explorer.svg', category: 'learning', rarity: 'common', maxProgress: 5, criteria: { type: 'profile_completion', value: 5, ratingType: 'interests' } } },
  { id: 'bio_writer', data: { name: 'Bio Writer', description: 'Write a personal bio', icon: 'assets/badges/Bio-Writer.svg', category: 'learning', rarity: 'common', maxProgress: 1, criteria: { type: 'profile_completion', value: 1, ratingType: 'bio' } } },
];

@Component({
  selector: 'app-badges',
  templateUrl: 'badges.page.html',
  styleUrls: ['badges.page.scss'],
  standalone: false,
})
export class BadgesPage implements OnInit {
  badges: BadgeDefinition[] = [];
  filteredBadges: BadgeDefinition[] = [];
  loading = true;
  error = '';

  searchQuery = '';
  filterCategory = 'all';
  filterActive: 'all' | 'active' | 'inactive' = 'all';

  categoryOptions: BadgeDefinition['category'][] = ['practice', 'progress', 'performance', 'special', 'learning'];
  rarityOptions: BadgeDefinition['rarity'][] = ['common', 'rare', 'epic', 'legendary'];
  ratingValueOptions: Array<NonNullable<BadgeDefinition['criteria']['ratingValue']>> = ['excellent', 'good', 'fair', 'poor'];
  // Labels mirror how the user app's BadgeService actually evaluates each rule.
  ruleOptions: Array<{ value: CriteriaType; label: string }> = [
    { value: 'speech_count', label: 'Complete a number of speech analyses' },
    { value: 'consecutive_days', label: 'Practice several days in a row (streak)' },
    { value: 'total_days', label: 'Practice on a number of different days' },
    { value: 'rating_achievement', label: 'Get a specific rating in one speech' },
    { value: 'profile_completion', label: 'Fill in part of their profile' },
    { value: 'time_based', label: 'Practice late at night (10 PM or later)' },
  ];
  skillOptions: Array<{ value: NonNullable<BadgeDefinition['criteria']['ratingType']>; label: string }> = [
    { value: 'clarity', label: 'Clarity' },
    { value: 'pace', label: 'Pace' },
    { value: 'tone', label: 'Tone' },
    { value: 'filler', label: 'Filler words' },
    { value: 'overall', label: 'Overall score' },
    { value: 'all', label: 'Every skill in the same speech' },
  ];
  profileOptions: Array<{ value: NonNullable<BadgeDefinition['criteria']['ratingType']>; label: string }> = [
    { value: 'profile', label: 'Finish profile setup' },
    { value: 'interests', label: 'Add interests' },
    { value: 'bio', label: 'Write a bio' },
  ];
  iconOptions = [...new Set(DEFAULT_BADGES_SEED.map(b => b.data.icon))];

  // Create / Edit form
  showForm = false;
  formMode: 'create' | 'edit' = 'create';
  editingId: string | null = null;
  formModel: Partial<BadgeDefinition> = this.emptyFormModel();
  formError = '';
  saving = false;
  saveMessage = '';
  iconPreviewBroken = false;
  uploadingIcon = false;

  // Generic confirmation modal
  showConfirmModal = false;
  confirmTitle = '';
  confirmMessage = '';
  confirmButtonText = '';
  confirmButtonClass = 'btn-danger';
  confirmAction: (() => void) | null = null;
  confirming = false;

  seedingInProgress = false;

  constructor(private adminFirebase: AdminFirebaseService) {}

  async ngOnInit() {
    await this.loadBadges();
  }

  async loadBadges() {
    this.loading = true;
    this.error = '';
    try {
      this.badges = await this.adminFirebase.getAllBadgeDefinitions();
      this.applyFilters();
    } catch (err: any) {
      this.error = 'Failed to load badges.';
      console.error(err);
    } finally {
      this.loading = false;
    }
  }

  applyFilters() {
    let result = [...this.badges];

    const q = this.searchQuery.toLowerCase().trim();
    if (q) {
      result = result.filter(b =>
        b.name.toLowerCase().includes(q) ||
        b.description.toLowerCase().includes(q)
      );
    }

    if (this.filterCategory !== 'all') {
      result = result.filter(b => b.category === this.filterCategory);
    }

    if (this.filterActive !== 'all') {
      result = result.filter(b => (this.filterActive === 'active') === (b.active !== false));
    }

    result.sort((a, b) => a.category.localeCompare(b.category) || a.name.localeCompare(b.name));
    this.filteredBadges = result;
  }

  onFilterChange() {
    this.applyFilters();
  }

  get canSeed(): boolean {
    return !this.loading && this.badges.length === 0;
  }

  // ── Create / Edit ──────────────────────────────────────

  private emptyFormModel(): Partial<BadgeDefinition> {
    return {
      name: '',
      description: '',
      icon: '',
      category: 'practice',
      rarity: 'common',
      maxProgress: 1,
      active: true,
      criteria: { type: 'speech_count', value: 1 },
    };
  }

  startCreate() {
    this.formMode = 'create';
    this.editingId = null;
    this.formModel = this.emptyFormModel();
    this.formError = '';
    this.iconPreviewBroken = false;
    this.showForm = true;
  }

  startEdit(badge: BadgeDefinition) {
    this.formMode = 'edit';
    this.editingId = badge.id;
    this.formModel = { ...badge, criteria: { ...badge.criteria } };
    this.formError = '';
    this.iconPreviewBroken = false;
    this.showForm = true;
  }

  cancelForm() {
    this.showForm = false;
    this.formModel = this.emptyFormModel();
    this.formError = '';
  }

  onIconChange() {
    this.iconPreviewBroken = false;
  }

  onIconPreviewError() {
    this.iconPreviewBroken = true;
  }

  onThumbError(event: Event) {
    (event.target as HTMLImageElement).style.display = 'none';
  }

  async onIconFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    input.value = ''; // allow re-picking the same file
    if (!file) return;
    if (!['image/svg+xml', 'image/png', 'image/jpeg', 'image/webp'].includes(file.type)) {
      this.formError = 'Icon must be an SVG, PNG, JPG or WebP image.';
      return;
    }
    if (file.size > 500 * 1024) {
      this.formError = 'Icon must be smaller than 500 KB.';
      return;
    }
    this.uploadingIcon = true;
    this.formError = '';
    try {
      this.pickIcon(await this.adminFirebase.uploadBadgeIcon(file));
    } catch (err) {
      this.formError = 'Upload failed. Check that Firebase Storage rules allow admins to write to badgeIcons/.';
      console.error(err);
    } finally {
      this.uploadingIcon = false;
    }
  }

  pickIcon(icon: string) {
    this.formModel.icon = icon;
    this.onIconChange();
  }

  onCriteriaTypeChange() {
    if (!this.formModel.criteria) return;
    const { type, value } = this.formModel.criteria;
    this.formModel.criteria =
      type === 'rating_achievement' ? { type, value: 1, ratingType: 'clarity', ratingValue: 'excellent' } :
      type === 'profile_completion' ? { type, value: 1, ratingType: 'profile' } :
      { type, value: value || 1 };
  }

  /** Rules where the admin types a number (and progress is tracked toward it). */
  needsCount(c: BadgeDefinition['criteria']): boolean {
    return ['speech_count', 'consecutive_days', 'total_days'].includes(c.type)
      || (c.type === 'profile_completion' && c.ratingType === 'interests');
  }

  countLabel(c: BadgeDefinition['criteria']): string {
    switch (c.type) {
      case 'speech_count': return 'How many speeches?';
      case 'consecutive_days': return 'How many days in a row?';
      case 'total_days': return 'How many different days?';
      default: return 'How many interests?';
    }
  }

  /** Clean criteria for Firestore: only the fields this rule uses, never undefined. */
  private buildCriteria(): BadgeDefinition['criteria'] {
    const c = this.formModel.criteria!;
    const criteria: BadgeDefinition['criteria'] = { type: c.type, value: this.needsCount(c) ? Number(c.value) : 1 };
    if (c.type === 'rating_achievement') {
      criteria.ratingType = c.ratingType;
      criteria.ratingValue = c.ratingValue;
    }
    if (c.type === 'profile_completion') criteria.ratingType = c.ratingType;
    return criteria;
  }

  private validateForm(): string | null {
    const m = this.formModel;
    if (!m.name || !m.name.trim()) return 'Give the badge a name.';
    if (!m.description || !m.description.trim()) return 'Add a description so users know how to earn it.';
    if (!m.icon || !m.icon.trim()) return 'Pick an icon or paste an image URL.';
    if (!m.criteria) return 'Choose what the user has to do.';
    if (this.needsCount(m.criteria) && !(Number(m.criteria.value) >= 1)) return 'Enter a number of at least 1.';
    if (m.criteria.type === 'rating_achievement' && (!m.criteria.ratingType || !m.criteria.ratingValue)) {
      return 'Choose the skill and the rating needed.';
    }
    if (m.criteria.type === 'profile_completion' && !m.criteria.ratingType) {
      return 'Choose which part of the profile.';
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
      const criteria = this.buildCriteria();
      const payload = {
        name: m.name!.trim(),
        description: m.description!.trim(),
        icon: m.icon!.trim(),
        category: m.category!,
        rarity: m.rarity!,
        // Progress bar target always equals the rule's number (1 for yes/no rules).
        maxProgress: criteria.value,
        criteria,
      };

      if (this.formMode === 'create') {
        await this.adminFirebase.createBadgeDefinition(payload);
        this.saveMessage = `Badge "${payload.name}" created successfully.`;
      } else if (this.editingId) {
        await this.adminFirebase.updateBadgeDefinition(this.editingId, { ...payload, active: m.active });
        this.saveMessage = `Badge "${payload.name}" updated successfully.`;
      }

      this.showForm = false;
      await this.loadBadges();
      setTimeout(() => this.saveMessage = '', 3000);
    } catch (err: any) {
      this.formError = 'Failed to save badge.';
      console.error(err);
    } finally {
      this.saving = false;
    }
  }

  // ── Activate / Deactivate ──────────────────────────────

  confirmToggleActive(badge: BadgeDefinition) {
    const willActivate = badge.active === false;
    this.showConfirm(
      willActivate ? 'Reactivate Badge' : 'Deactivate Badge',
      willActivate
        ? `Reactivate <strong>"${badge.name}"</strong>? It will become available for users to earn again.`
        : `Deactivate <strong>"${badge.name}"</strong>? Users who already unlocked it keep it, but no new users will receive it.`,
      willActivate ? 'Reactivate' : 'Deactivate',
      willActivate ? 'btn-primary' : 'btn-warning',
      async () => {
        await this.adminFirebase.setBadgeDefinitionActive(badge.id, willActivate);
        this.saveMessage = `Badge "${badge.name}" ${willActivate ? 'reactivated' : 'deactivated'}.`;
        await this.loadBadges();
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

  confirmSeedDefaults() {
    this.showConfirm(
      'Seed Default Badges',
      `This will create the ${DEFAULT_BADGES_SEED.length} default badges. This action is only available while the badge list is empty.`,
      'Seed Badges',
      'btn-primary',
      () => this.seedDefaultBadges()
    );
  }

  async seedDefaultBadges() {
    this.seedingInProgress = true;
    try {
      for (const badge of DEFAULT_BADGES_SEED) {
        await this.adminFirebase.createBadgeDefinitionWithId(badge.id, badge.data);
      }
      this.saveMessage = `${DEFAULT_BADGES_SEED.length} badges seeded successfully.`;
      await this.loadBadges();
      setTimeout(() => this.saveMessage = '', 3000);
    } catch (err: any) {
      this.error = 'Failed to seed default badges.';
      console.error(err);
    } finally {
      this.seedingInProgress = false;
    }
  }

  // ── Helpers ────────────────────────────────────────────

  /** Plain-English unlock rule, shown in the table and the form preview. */
  describeCriteria(c: BadgeDefinition['criteria'], badgeId?: string | null): string {
    const plural = (n: number, one: string, many = one + 's') => `${n} ${n === 1 ? one : many}`;
    const skill = this.skillOptions.find(s => s.value === c.ratingType)?.label.toLowerCase() ?? '?';
    switch (c.type) {
      case 'speech_count': return `Unlocks after completing ${plural(c.value, 'speech analysis', 'speech analyses')}.`;
      case 'consecutive_days': return `Unlocks after practicing ${plural(c.value, 'day')} in a row.`;
      case 'total_days': return `Unlocks after practicing on ${plural(c.value, 'different day')}.`;
      case 'rating_achievement':
        return c.ratingType === 'all'
          ? `Unlocks when every skill is rated "${c.ratingValue}" in the same speech.`
          : `Unlocks when a speech gets a "${c.ratingValue}" ${skill} rating.`;
      case 'profile_completion':
        if (c.ratingType === 'interests') return `Unlocks after adding ${plural(c.value, 'interest')} to their profile.`;
        if (c.ratingType === 'bio') return 'Unlocks after writing a profile bio.';
        return 'Unlocks after finishing profile setup.';
      case 'time_based':
        // The user app special-cases this id; every other time-based badge is the 10 PM rule.
        return badgeId === 'comeback_kid'
          ? 'Unlocks when returning to practice after 7+ days away.'
          : 'Unlocks when practicing at 10 PM or later.';
      default: return '-';
    }
  }

  formatLabel(value: string): string {
    return value.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  }
}
