import { Injectable } from '@angular/core';
import { initializeApp, FirebaseApp } from 'firebase/app';
import {
  getAuth, Auth, signInWithEmailAndPassword, signOut,
  onAuthStateChanged, User, createUserWithEmailAndPassword
} from 'firebase/auth';
import {
  getFirestore, Firestore, collection, getDocs, doc, getDoc, setDoc,
  query, orderBy, limit, Timestamp, deleteDoc, updateDoc, writeBatch
} from 'firebase/firestore';
import { getStorage, FirebaseStorage, ref, deleteObject, listAll } from 'firebase/storage';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

export interface AdminUser {
  uid: string;
  email: string;
  firstName?: string;
  lastName?: string;
  age?: number;
  gender?: string;
  phoneNumber?: string;
  interests?: string[];
  bio?: string;
  role?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface SpeechEntry {
  id: string;
  userId: string;
  userName?: string;
  transcript: string;
  speechType: string;
  scores: {
    speech_pace: number;
    pausing_fluency: number;
    loudness_control: number;
    pitch_variation: number;
    articulation_clarity: number;
    expressive_emphasis: number;
    filler_words: number;
    overall: number;
  };
  duration: number;
  wordCount: number;
  averagePace: number;
  createdAt: Date;
}

export interface UserGamification {
  userId: string;
  level: number;
  currentXP: number;
  totalXP: number;
  currentStreak: number;
  longestStreak: number;
  lastActivityDate?: Date;
}

export interface UserBadgeProgress {
  userId: string;
  totalBadges: number;
  unlockedBadges: number;
  badges: any[];
}

export interface BadgeDefinition {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'practice' | 'progress' | 'performance' | 'special' | 'learning';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  maxProgress: number;
  active: boolean;
  criteria: {
    type: 'speech_count' | 'consecutive_days' | 'total_days' | 'rating_achievement' | 'profile_completion' | 'time_based';
    value: number;
    condition?: 'greater_than' | 'equal_to' | 'less_than';
    ratingType?: 'clarity' | 'pace' | 'tone' | 'overall' | 'profile' | 'interests' | 'bio';
    ratingValue?: 'excellent' | 'good' | 'fair' | 'poor';
  };
  createdAt?: Date;
  updatedAt?: Date;
}

export type DimensionKey =
  'speech_pace' | 'pausing_fluency' | 'loud_control' |
  'pitch_variation' | 'articulation_clarity' |
  'expressive_emph' | 'filler_words_score';

export type ScriptTargetLevel = 'low' | 'medium' | 'high';

export interface PracticeScript {
  id: string;
  title: string;
  category: 'informative' | 'persuasive' | 'motivational';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  rawText: string;
  /** Seconds at target WPM */
  estimatedDuration: number;
  /** Which of the 7 dimensions this script specifically trains */
  targetDimensions: DimensionKey[];
  targetWpmRange: { min: number; max: number };
  /** Demand level per dimension — used for the supervised recommendation model */
  scriptTargetPausing: ScriptTargetLevel;
  scriptTargetPitch: ScriptTargetLevel;
  scriptTargetFiller: ScriptTargetLevel;
  scriptTargetArticulation: ScriptTargetLevel;
  /** Display order — document ids sort lexicographically, which scrambles info-1..info-15 */
  sortOrder: number;
  active: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export type PracticeScriptInput = Omit<PracticeScript, 'id' | 'active' | 'createdAt' | 'updatedAt'>;

export interface DashboardStats {
  totalUsers: number;
  totalSpeeches: number;
  activeUsersLast7Days: number;
  averageOverallScore: number;
  totalPracticeMinutes: number;
  speechesThisWeek: number;
  totalAdmins: number;
}

@Injectable({ providedIn: 'root' })
export class AdminFirebaseService {
  private firebaseApp: FirebaseApp;
  public auth: Auth;
  public firestore: Firestore;
  public storage: FirebaseStorage;

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();
  private authReady = false;

  constructor() {
    this.firebaseApp = initializeApp(environment.firebaseConfig);
    this.auth = getAuth(this.firebaseApp);
    this.firestore = getFirestore(this.firebaseApp);
    this.storage = getStorage(this.firebaseApp);

    onAuthStateChanged(this.auth, (user) => {
      this.currentUserSubject.next(user);
      this.authReady = true;
    });
  }

  waitForAuth(): Promise<User | null> {
    if (this.authReady) {
      return Promise.resolve(this.currentUserSubject.value);
    }
    return new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(this.auth, (user) => {
        unsubscribe();
        resolve(user);
      });
    });
  }

  // ── Auth & Admin Role ──────────────────────────────────

  async login(email: string, password: string): Promise<User> {
    const credential = await signInWithEmailAndPassword(this.auth, email, password);
    return credential.user;
  }

  async logout(): Promise<void> {
    await signOut(this.auth);
  }

  async isAdmin(uid: string): Promise<boolean> {
    const docRef = doc(this.firestore, `users/${uid}`);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) return false;
    return docSnap.data()['role'] === 'admin';
  }

  async hasAnyAdmin(): Promise<boolean> {
    const usersRef = collection(this.firestore, 'users');
    const snapshot = await getDocs(usersRef);
    return snapshot.docs.some(d => d.data()['role'] === 'admin');
  }

  async createAdminAccount(email: string, password: string, firstName: string, lastName: string): Promise<void> {
    const credential = await createUserWithEmailAndPassword(this.auth, email, password);
    const uid = credential.user.uid;
    await setDoc(doc(this.firestore, `users/${uid}`), {
      email,
      firstName,
      lastName,
      role: 'admin',
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
  }

  async setUserRole(uid: string, role: string): Promise<void> {
    const userRef = doc(this.firestore, `users/${uid}`);
    await updateDoc(userRef, { role, updatedAt: Timestamp.now() });
  }

  // ── Users CRUD ─────────────────────────────────────────

  async getAllUsers(): Promise<AdminUser[]> {
    const usersRef = collection(this.firestore, 'users');
    const snapshot = await getDocs(usersRef);
    return snapshot.docs.map(d => this.mapUserDoc(d));
  }

  async getUser(uid: string): Promise<AdminUser | null> {
    const docRef = doc(this.firestore, `users/${uid}`);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) return null;
    return this.mapUserDoc(docSnap);
  }

  private mapUserDoc(d: any): AdminUser {
    const data = d.data();
    return {
      uid: d.id,
      email: data['email'] || '',
      firstName: data['firstName'] || '',
      lastName: data['lastName'] || '',
      age: data['age'],
      gender: data['gender'],
      phoneNumber: data['phoneNumber'],
      interests: data['interests'],
      bio: data['bio'],
      role: data['role'] || 'user',
      createdAt: data['createdAt'] instanceof Timestamp ? data['createdAt'].toDate() : data['createdAt'],
      updatedAt: data['updatedAt'] instanceof Timestamp ? data['updatedAt'].toDate() : data['updatedAt'],
    };
  }

  async updateUser(uid: string, data: Partial<AdminUser>): Promise<void> {
    const userRef = doc(this.firestore, `users/${uid}`);
    const updateData: any = { updatedAt: Timestamp.now() };
    if (data.firstName !== undefined) updateData.firstName = data.firstName;
    if (data.lastName !== undefined) updateData.lastName = data.lastName;
    if (data.age !== undefined) updateData.age = data.age;
    if (data.gender !== undefined) updateData.gender = data.gender;
    if (data.phoneNumber !== undefined) updateData.phoneNumber = data.phoneNumber;
    if (data.bio !== undefined) updateData.bio = data.bio;
    if (data.interests !== undefined) updateData.interests = data.interests;
    if (data.role !== undefined) updateData.role = data.role;
    await updateDoc(userRef, updateData);
  }

  async deleteUser(uid: string): Promise<void> {
    // Delete speech history subcollection
    const speechHistoryRef = collection(this.firestore, `users/${uid}/speechHistory`);
    const speechHistorySnap = await getDocs(speechHistoryRef);
    for (const d of speechHistorySnap.docs) {
      await deleteDoc(d.ref);
    }

    // Delete speeches subcollection
    const speechesRef = collection(this.firestore, `users/${uid}/speeches`);
    const speechesSnap = await getDocs(speechesRef);
    for (const d of speechesSnap.docs) {
      await deleteDoc(d.ref);
    }

    // Delete gamification doc
    const gamificationRef = doc(this.firestore, `userGamification/${uid}`);
    const gamSnap = await getDoc(gamificationRef);
    if (gamSnap.exists()) await deleteDoc(gamificationRef);

    // Delete badges doc
    const badgesRef = doc(this.firestore, `userBadges/${uid}`);
    const badgeSnap = await getDoc(badgesRef);
    if (badgeSnap.exists()) await deleteDoc(badgesRef);

    // Delete storage files
    try {
      const speechStorageRef = ref(this.storage, `users/${uid}/speeches`);
      const speechFiles = await listAll(speechStorageRef);
      for (const item of speechFiles.items) {
        await deleteObject(item);
      }
    } catch (_) { /* may not exist */ }

    try {
      const historyStorageRef = ref(this.storage, `users/${uid}/speechHistory`);
      const historyFiles = await listAll(historyStorageRef);
      for (const item of historyFiles.items) {
        await deleteObject(item);
      }
    } catch (_) { /* may not exist */ }

    // Delete user profile document
    await deleteDoc(doc(this.firestore, `users/${uid}`));
  }

  async deleteSpeech(uid: string, speechId: string): Promise<void> {
    await deleteDoc(doc(this.firestore, `users/${uid}/speechHistory/${speechId}`));
  }

  // ── Speeches ───────────────────────────────────────────

  async getUserSpeeches(uid: string): Promise<SpeechEntry[]> {
    const historyRef = collection(this.firestore, `users/${uid}/speechHistory`);
    const q = query(historyRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(d => this.mapSpeechDoc(d, uid));
  }

  async getAllSpeeches(users?: AdminUser[]): Promise<SpeechEntry[]> {
    const allUsers = users || await this.getAllUsers();
    const allSpeeches: SpeechEntry[] = [];

    for (const user of allUsers) {
      const speeches = await this.getUserSpeeches(user.uid);
      speeches.forEach(s => {
        s.userName = `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.email;
      });
      allSpeeches.push(...speeches);
    }

    allSpeeches.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    return allSpeeches;
  }

  private mapSpeechDoc(d: any, userId: string): SpeechEntry {
    const data = d.data();
    return {
      id: d.id,
      userId,
      transcript: data['transcript'] || '',
      speechType: data['speechType'] || 'general',
      scores: {
        speech_pace: data['scores']?.speech_pace || 0,
        pausing_fluency: data['scores']?.pausing_fluency || 0,
        loudness_control: data['scores']?.loudness_control || 0,
        pitch_variation: data['scores']?.pitch_variation || 0,
        articulation_clarity: data['scores']?.articulation_clarity || 0,
        expressive_emphasis: data['scores']?.expressive_emphasis || 0,
        filler_words: data['scores']?.filler_words || 0,
        overall: data['scores']?.overall || 0,
      },
      duration: data['duration'] || 0,
      wordCount: data['wordCount'] || 0,
      averagePace: data['averagePace'] || 0,
      createdAt: data['createdAt'] instanceof Timestamp ? data['createdAt'].toDate() : new Date(data['createdAt']),
    };
  }

  // ── Gamification ───────────────────────────────────────

  async getUserGamification(uid: string): Promise<UserGamification | null> {
    const docRef = doc(this.firestore, `userGamification/${uid}`);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) return null;
    const data = docSnap.data();
    return {
      userId: data['userId'],
      level: data['level'] || 1,
      currentXP: data['currentXP'] || 0,
      totalXP: data['totalXP'] || 0,
      currentStreak: data['currentStreak'] || 0,
      longestStreak: data['longestStreak'] || 0,
      lastActivityDate: data['lastActivityDate'] instanceof Timestamp
        ? data['lastActivityDate'].toDate() : data['lastActivityDate'],
    };
  }

  async updateUserGamification(uid: string, data: Partial<UserGamification>): Promise<void> {
    const gamRef = doc(this.firestore, `userGamification/${uid}`);
    const gamSnap = await getDoc(gamRef);
    const updateData: any = {};
    if (data.level !== undefined) updateData.level = data.level;
    if (data.currentXP !== undefined) updateData.currentXP = data.currentXP;
    if (data.totalXP !== undefined) updateData.totalXP = data.totalXP;
    if (data.currentStreak !== undefined) updateData.currentStreak = data.currentStreak;
    if (data.longestStreak !== undefined) updateData.longestStreak = data.longestStreak;

    if (gamSnap.exists()) {
      await updateDoc(gamRef, updateData);
    } else {
      await setDoc(gamRef, { userId: uid, ...updateData });
    }
  }

  // ── Badges ─────────────────────────────────────────────

  async getUserBadges(uid: string): Promise<UserBadgeProgress | null> {
    const docRef = doc(this.firestore, `userBadges/${uid}`);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) return null;
    const data = docSnap.data();
    return {
      userId: data['userId'],
      totalBadges: data['totalBadges'] || 0,
      unlockedBadges: data['unlockedBadges'] || 0,
      badges: data['badges'] || [],
    };
  }

  async updateUserBadges(uid: string, badges: any[]): Promise<void> {
    const badgeRef = doc(this.firestore, `userBadges/${uid}`);
    const unlockedCount = badges.filter((b: any) => b.isUnlocked).length;
    await updateDoc(badgeRef, {
      badges,
      unlockedBadges: unlockedCount,
      totalBadges: badges.length,
    });
  }

  // ── Badge Definitions ──────────────────────────────────

  private mapBadgeDefinitionDoc(d: any): BadgeDefinition {
    const data = d.data();
    return {
      id: d.id,
      name: data['name'] || '',
      description: data['description'] || '',
      icon: data['icon'] || '',
      category: data['category'] || 'practice',
      rarity: data['rarity'] || 'common',
      maxProgress: data['maxProgress'] || 1,
      active: data['active'] !== false,
      criteria: data['criteria'] || { type: 'speech_count', value: 1 },
      createdAt: data['createdAt'] instanceof Timestamp ? data['createdAt'].toDate() : data['createdAt'],
      updatedAt: data['updatedAt'] instanceof Timestamp ? data['updatedAt'].toDate() : data['updatedAt'],
    };
  }

  async getAllBadgeDefinitions(): Promise<BadgeDefinition[]> {
    const badgesRef = collection(this.firestore, 'badgeDefinitions');
    const snapshot = await getDocs(badgesRef);
    return snapshot.docs.map(d => this.mapBadgeDefinitionDoc(d));
  }

  async getBadgeDefinition(id: string): Promise<BadgeDefinition | null> {
    const docRef = doc(this.firestore, `badgeDefinitions/${id}`);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) return null;
    return this.mapBadgeDefinitionDoc(docSnap);
  }

  private async generateBadgeId(name: string): Promise<string> {
    const base = name
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '_')
      .replace(/^_+|_+$/g, '') || 'badge';

    let candidate = base;
    let suffix = 2;
    while ((await getDoc(doc(this.firestore, `badgeDefinitions/${candidate}`))).exists()) {
      candidate = `${base}_${suffix}`;
      suffix++;
    }
    return candidate;
  }

  async createBadgeDefinition(data: Omit<BadgeDefinition, 'id' | 'active' | 'createdAt' | 'updatedAt'>): Promise<string> {
    const id = await this.generateBadgeId(data.name);
    await setDoc(doc(this.firestore, `badgeDefinitions/${id}`), {
      ...data,
      id,
      active: true,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    return id;
  }

  async createBadgeDefinitionWithId(id: string, data: Omit<BadgeDefinition, 'id' | 'active' | 'createdAt' | 'updatedAt'>): Promise<void> {
    await setDoc(doc(this.firestore, `badgeDefinitions/${id}`), {
      ...data,
      id,
      active: true,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
  }

  async updateBadgeDefinition(id: string, data: Partial<Omit<BadgeDefinition, 'id' | 'createdAt'>>): Promise<void> {
    const badgeRef = doc(this.firestore, `badgeDefinitions/${id}`);
    const updateData: any = { updatedAt: Timestamp.now() };
    if (data.name !== undefined) updateData.name = data.name;
    if (data.description !== undefined) updateData.description = data.description;
    if (data.icon !== undefined) updateData.icon = data.icon;
    if (data.category !== undefined) updateData.category = data.category;
    if (data.rarity !== undefined) updateData.rarity = data.rarity;
    if (data.maxProgress !== undefined) updateData.maxProgress = data.maxProgress;
    if (data.criteria !== undefined) updateData.criteria = data.criteria;
    if (data.active !== undefined) updateData.active = data.active;
    await updateDoc(badgeRef, updateData);
  }

  async setBadgeDefinitionActive(id: string, active: boolean): Promise<void> {
    const badgeRef = doc(this.firestore, `badgeDefinitions/${id}`);
    await updateDoc(badgeRef, { active, updatedAt: Timestamp.now() });
  }

  // ── Practice Scripts ───────────────────────────────────

  private mapPracticeScriptDoc(d: any): PracticeScript {
    const data = d.data();
    return {
      id: d.id,
      title: data['title'] || '',
      category: data['category'] || 'informative',
      difficulty: data['difficulty'] || 'beginner',
      rawText: data['rawText'] || '',
      estimatedDuration: data['estimatedDuration'] || 0,
      targetDimensions: Array.isArray(data['targetDimensions']) ? data['targetDimensions'] : [],
      targetWpmRange: data['targetWpmRange'] || { min: 110, max: 130 },
      scriptTargetPausing: data['scriptTargetPausing'] || 'medium',
      scriptTargetPitch: data['scriptTargetPitch'] || 'medium',
      scriptTargetFiller: data['scriptTargetFiller'] || 'medium',
      scriptTargetArticulation: data['scriptTargetArticulation'] || 'medium',
      sortOrder: typeof data['sortOrder'] === 'number' ? data['sortOrder'] : 0,
      active: data['active'] !== false,
      createdAt: data['createdAt'] instanceof Timestamp ? data['createdAt'].toDate() : data['createdAt'],
      updatedAt: data['updatedAt'] instanceof Timestamp ? data['updatedAt'].toDate() : data['updatedAt'],
    };
  }

  async getAllPracticeScripts(): Promise<PracticeScript[]> {
    const scriptsRef = collection(this.firestore, 'practiceScripts');
    const snapshot = await getDocs(scriptsRef);
    return snapshot.docs.map(d => this.mapPracticeScriptDoc(d));
  }

  async getPracticeScript(id: string): Promise<PracticeScript | null> {
    const docRef = doc(this.firestore, `practiceScripts/${id}`);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) return null;
    return this.mapPracticeScriptDoc(docSnap);
  }

  private async generatePracticeScriptId(title: string): Promise<string> {
    const base = title
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '_')
      .replace(/^_+|_+$/g, '') || 'script';

    let candidate = base;
    let suffix = 2;
    while ((await getDoc(doc(this.firestore, `practiceScripts/${candidate}`))).exists()) {
      candidate = `${base}_${suffix}`;
      suffix++;
    }
    return candidate;
  }

  /**
   * sortOrder is assigned here rather than supplied by the caller — a script
   * without one would sink to the end of the list in both apps.
   */
  async createPracticeScript(data: Omit<PracticeScriptInput, 'sortOrder'>): Promise<string> {
    const id = await this.generatePracticeScriptId(data.title);
    const sortOrder = (await this.getMaxPracticeScriptSortOrder()) + 1;
    await setDoc(doc(this.firestore, `practiceScripts/${id}`), {
      ...data, id, sortOrder, active: true,
      createdAt: Timestamp.now(), updatedAt: Timestamp.now(),
    });
    return id;
  }

  async createPracticeScriptWithId(id: string, data: PracticeScriptInput): Promise<void> {
    await setDoc(doc(this.firestore, `practiceScripts/${id}`), {
      ...data, id, active: true,
      createdAt: Timestamp.now(), updatedAt: Timestamp.now(),
    });
  }

  /**
   * Writes many scripts in a single atomic batch. Used by seeding: a partial seed
   * would leave scripts stranded under their original ids, so all-or-nothing is
   * the safe failure mode. Firestore caps a batch at 500 ops; the seed is 45.
   */
  async createPracticeScriptsBatch(
    entries: Array<{ id: string; data: PracticeScriptInput }>
  ): Promise<void> {
    if (entries.length === 0) return;
    const batch = writeBatch(this.firestore);
    const now = Timestamp.now();
    for (const entry of entries) {
      batch.set(doc(this.firestore, `practiceScripts/${entry.id}`), {
        ...entry.data, id: entry.id, active: true,
        createdAt: now, updatedAt: now,
      });
    }
    await batch.commit();
  }

  /** Highest sortOrder currently in use, so new scripts append to the end. */
  async getMaxPracticeScriptSortOrder(): Promise<number> {
    const scriptsRef = collection(this.firestore, 'practiceScripts');
    const snapshot = await getDocs(query(scriptsRef, orderBy('sortOrder', 'desc'), limit(1)));
    if (snapshot.empty) return 0;
    const value = snapshot.docs[0].data()['sortOrder'];
    return typeof value === 'number' ? value : 0;
  }

  async updatePracticeScript(id: string, data: Partial<Omit<PracticeScript, 'id' | 'createdAt'>>): Promise<void> {
    const scriptRef = doc(this.firestore, `practiceScripts/${id}`);
    const updateData: any = { updatedAt: Timestamp.now() };
    if (data.title !== undefined) updateData.title = data.title;
    if (data.category !== undefined) updateData.category = data.category;
    if (data.difficulty !== undefined) updateData.difficulty = data.difficulty;
    if (data.rawText !== undefined) updateData.rawText = data.rawText;
    if (data.estimatedDuration !== undefined) updateData.estimatedDuration = data.estimatedDuration;
    if (data.targetDimensions !== undefined) updateData.targetDimensions = data.targetDimensions;
    if (data.targetWpmRange !== undefined) updateData.targetWpmRange = data.targetWpmRange;
    if (data.scriptTargetPausing !== undefined) updateData.scriptTargetPausing = data.scriptTargetPausing;
    if (data.scriptTargetPitch !== undefined) updateData.scriptTargetPitch = data.scriptTargetPitch;
    if (data.scriptTargetFiller !== undefined) updateData.scriptTargetFiller = data.scriptTargetFiller;
    if (data.scriptTargetArticulation !== undefined) updateData.scriptTargetArticulation = data.scriptTargetArticulation;
    if (data.sortOrder !== undefined) updateData.sortOrder = data.sortOrder;
    if (data.active !== undefined) updateData.active = data.active;
    await updateDoc(scriptRef, updateData);
  }

  async setPracticeScriptActive(id: string, active: boolean): Promise<void> {
    const scriptRef = doc(this.firestore, `practiceScripts/${id}`);
    await updateDoc(scriptRef, { active, updatedAt: Timestamp.now() });
  }

  async deletePracticeScript(id: string): Promise<void> {
    await deleteDoc(doc(this.firestore, `practiceScripts/${id}`));
  }

  // ── Dashboard Stats ────────────────────────────────────

  async getDashboardStats(): Promise<DashboardStats> {
    const users = await this.getAllUsers();
    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    let totalSpeeches = 0;
    let totalDuration = 0;
    let totalOverallScore = 0;
    let scoredSpeeches = 0;
    let speechesThisWeek = 0;
    let totalAdmins = 0;
    const activeUserIds = new Set<string>();

    for (const user of users) {
      if (user.role === 'admin') totalAdmins++;

      const speeches = await this.getUserSpeeches(user.uid);
      totalSpeeches += speeches.length;

      for (const speech of speeches) {
        totalDuration += speech.duration || 0;
        if (speech.scores.overall > 0) {
          totalOverallScore += speech.scores.overall;
          scoredSpeeches++;
        }
        if (speech.createdAt >= sevenDaysAgo) {
          speechesThisWeek++;
          activeUserIds.add(user.uid);
        }
      }
    }

    return {
      totalUsers: users.length,
      totalSpeeches,
      activeUsersLast7Days: activeUserIds.size,
      averageOverallScore: scoredSpeeches > 0 ? totalOverallScore / scoredSpeeches : 0,
      totalPracticeMinutes: Math.round(totalDuration / 60),
      speechesThisWeek,
      totalAdmins,
    };
  }
}
