/**
 * Core types for the hardcoded learning content system.
 * See AGENTS.md "Lesson Content Rules" — content lives in `data/` as typed
 * TS objects, no database.
 */

// Add a new code here to support a new language.
export type LanguageCode = "es" | "fr" | "ja" | "de" | "ko" | "zh";

export interface Language {
  id: LanguageCode;
  name: string; // English name, e.g. "Spanish"
  nativeName: string; // e.g. "Español"
  flagEmoji: string;
  color: string; // theme accent color for this language
  description: string;
}

export interface Unit {
  id: string;
  languageId: LanguageCode;
  order: number;
  title: string;
  description: string;
  icon: string; // emoji shown on the unit card
  color: string; // accent color for the unit card
}

export interface VocabularyItem {
  id: string;
  term: string; // word/phrase in the target language
  translation: string; // meaning in English
  phonetic?: string; // simple pronunciation guide
}

export interface Phrase {
  id: string;
  phrase: string; // phrase in the target language
  translation: string;
  phonetic?: string;
}

export type ActivityType =
  | "multiple-choice"
  | "translate"
  | "listen"
  | "speak"
  | "match";

interface BaseActivity {
  id: string;
  type: ActivityType;
  prompt: string;
}

export interface MultipleChoiceActivity extends BaseActivity {
  type: "multiple-choice";
  options: string[];
  correctOption: string;
}

export interface TranslateActivity extends BaseActivity {
  type: "translate";
  sourceText: string;
  correctTranslation: string;
}

export interface ListenActivity extends BaseActivity {
  type: "listen";
  audioText: string; // text an AI teacher/TTS voice speaks aloud
  correctTranscription: string;
}

export interface SpeakActivity extends BaseActivity {
  type: "speak";
  targetPhrase: string;
  phonetic?: string;
}

export interface MatchActivity extends BaseActivity {
  type: "match";
  pairs: { term: string; translation: string }[];
}

export type Activity =
  | MultipleChoiceActivity
  | TranslateActivity
  | ListenActivity
  | SpeakActivity
  | MatchActivity;

/**
 * Drives future audio-based Vision Agent lessons (Stream Vision Agents).
 * Kept small and text-only for now — the backend will pass this to the
 * AI teacher session once video/audio lessons are wired up.
 */
export interface AITeacherPrompt {
  systemPrompt: string;
  openingLine: string;
  focusAreas: string[];
}

export interface Lesson {
  id: string;
  unitId: string;
  order: number;
  title: string;
  description: string;
  xpReward: number;
  goals: string[];
  vocabulary: VocabularyItem[];
  phrases: Phrase[];
  activities: Activity[];
  aiTeacherPrompt: AITeacherPrompt;
}
