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
  { id: 'filler_fighter', data: { name: 'Filler Fighter', description: 'Reduce filler words by 50%', icon: 'assets/badges/Filler-Fighter.svg', category: 'progress', rarity: 'epic', maxProgress: 1, criteria: { type: 'rating_achievement', value: 1 } } },
  { id: 'speed_demon', data: { name: 'Speed Demon', description: 'Complete 10 speech analyses', icon: 'assets/badges/Speed-demon.svg', category: 'performance', rarity: 'common', maxProgress: 10, criteria: { type: 'speech_count', value: 10 } } },
  { id: 'marathon_speaker', data: { name: 'Marathon Speaker', description: 'Complete 50 speech analyses', icon: 'assets/badges/Marathon-Speaker.svg', category: 'performance', rarity: 'epic', maxProgress: 50, criteria: { type: 'speech_count', value: 50 } } },
  { id: 'centurion', data: { name: 'Centurion', description: 'Complete 100 speech analyses', icon: 'assets/badges/Centurion.svg', category: 'performance', rarity: 'legendary', maxProgress: 100, criteria: { type: 'speech_count', value: 100 } } },
  { id: 'perfectionist', data: { name: 'Perfectionist', description: 'Get all excellent ratings in one session', icon: 'assets/badges/Perfectionist.svg', category: 'performance', rarity: 'legendary', maxProgress: 1, criteria: { type: 'rating_achievement', value: 1 } } },
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
  criteriaTypeOptions: CriteriaType[] = ['speech_count', 'consecutive_days', 'total_days', 'rating_achievement', 'profile_completion', 'time_based'];
  ratingTypeOptions: Array<NonNullable<BadgeDefinition['criteria']['ratingType']>> = ['clarity', 'pace', 'tone', 'overall', 'profile', 'interests', 'bio'];
  ratingValueOptions: Array<NonNullable<BadgeDefinition['criteria']['ratingValue']>> = ['excellent', 'good', 'fair', 'poor'];
  conditionOptions: Array<NonNullable<BadgeDefinition['criteria']['condition']>> = ['greater_than', 'equal_to', 'less_than'];

  // Create / Edit form
  showForm = false;
  formMode: 'create' | 'edit' = 'create';
  editingId: string | null = null;
  formModel: Partial<BadgeDefinition> = this.emptyFormModel();
  formError = '';
  saving = false;
  saveMessage = '';
  iconPreviewBroken = false;

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

  onCriteriaTypeChange() {
    if (!this.formModel.criteria) return;
    const type = this.formModel.criteria.type;
    const value = this.formModel.criteria.value;
    this.formModel.criteria = { type, value };
  }

  private validateForm(): string | null {
    const m = this.formModel;
    if (!m.name || !m.name.trim()) return 'Name is required.';
    if (!m.description || !m.description.trim()) return 'Description is required.';
    if (!m.icon || !m.icon.trim()) return 'Icon URL is required.';
    if (!m.maxProgress || m.maxProgress < 1) return 'Max progress must be at least 1.';
    if (!m.criteria || !m.criteria.value || m.criteria.value < 1) return 'Criteria value must be at least 1.';
    if (m.criteria.type === 'rating_achievement' && (!m.criteria.ratingType || !m.criteria.ratingValue)) {
      return 'Rating type and rating value are required for this criteria type.';
    }
    if (m.criteria.type === 'profile_completion' && !m.criteria.ratingType) {
      return 'Rating type is required for profile completion criteria.';
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
      const payload = {
        name: m.name!.trim(),
        description: m.description!.trim(),
        icon: m.icon!.trim(),
        category: m.category!,
        rarity: m.rarity!,
        maxProgress: m.maxProgress!,
        criteria: m.criteria!,
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

  formatCriteria(criteria: BadgeDefinition['criteria']): string {
    const op = criteria.condition === 'greater_than' ? '>' : criteria.condition === 'equal_to' ? '=' : criteria.condition === 'less_than' ? '<' : '>=';
    switch (criteria.type) {
      case 'speech_count': return `Speeches ${op} ${criteria.value}`;
      case 'consecutive_days': return `Consecutive days ${op} ${criteria.value}`;
      case 'total_days': return `Total days ${op} ${criteria.value}`;
      case 'rating_achievement': return `${criteria.ratingType || '?'} = ${criteria.ratingValue || '?'}`;
      case 'profile_completion': return `Profile: ${criteria.ratingType || '?'} ${op} ${criteria.value}`;
      case 'time_based': return 'Time-based (after 10 PM)';
      default: return '-';
    }
  }

  formatLabel(value: string): string {
    return value.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  }
}
