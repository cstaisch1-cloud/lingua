import type { Lesson } from "@/types/learning";

export const lessons: Lesson[] = [
  // --- Spanish: Basics 1 ---
  {
    id: "es-1-1",
    unitId: "es-unit-1",
    order: 1,
    title: "Say Hello",
    description: "Learn how to greet people in Spanish.",
    xpReward: 10,
    goals: ["Say hello and goodbye", "Recognize 'please' and 'thank you'"],
    vocabulary: [
      { id: "es-1-1-v1", term: "Hola", translation: "Hello", phonetic: "OH-lah" },
      { id: "es-1-1-v2", term: "Adiós", translation: "Goodbye", phonetic: "ah-dee-OHS" },
      { id: "es-1-1-v3", term: "Por favor", translation: "Please", phonetic: "por fah-VOR" },
      { id: "es-1-1-v4", term: "Gracias", translation: "Thank you", phonetic: "GRAH-see-ahs" },
    ],
    phrases: [
      { id: "es-1-1-p1", phrase: "Hola, ¿cómo estás?", translation: "Hello, how are you?" },
    ],
    activities: [
      {
        id: "es-1-1-a1",
        type: "multiple-choice",
        prompt: "Which word means 'Hello'?",
        options: ["Adiós", "Hola", "Gracias"],
        correctOption: "Hola",
      },
      {
        id: "es-1-1-a2",
        type: "translate",
        prompt: "Translate this word to English.",
        sourceText: "Gracias",
        correctTranslation: "Thank you",
      },
      {
        id: "es-1-1-a3",
        type: "listen",
        prompt: "Type what you hear.",
        audioText: "Hola",
        correctTranscription: "Hola",
      },
    ],
    aiTeacherPrompt: {
      systemPrompt:
        "You are a friendly, encouraging Spanish teacher helping a complete beginner learn basic greetings. Speak slowly, use simple English explanations, and praise effort.",
      openingLine: "¡Hola! Let's learn how to say hello in Spanish.",
      focusAreas: ["greetings", "politeness words", "pronunciation"],
    },
  },
  {
    id: "es-1-2",
    unitId: "es-unit-1",
    order: 2,
    title: "Everyday Words",
    description: "Learn a handful of common everyday words.",
    xpReward: 10,
    goals: ["Recognize yes and no", "Learn 'friend' and 'water'"],
    vocabulary: [
      { id: "es-1-2-v1", term: "Sí", translation: "Yes", phonetic: "see" },
      { id: "es-1-2-v2", term: "No", translation: "No", phonetic: "noh" },
      { id: "es-1-2-v3", term: "Amigo", translation: "Friend", phonetic: "ah-MEE-goh" },
      { id: "es-1-2-v4", term: "Agua", translation: "Water", phonetic: "AH-gwah" },
    ],
    phrases: [
      { id: "es-1-2-p1", phrase: "Sí, por favor.", translation: "Yes, please." },
    ],
    activities: [
      {
        id: "es-1-2-a1",
        type: "multiple-choice",
        prompt: "Which word means 'Water'?",
        options: ["Amigo", "Agua", "No"],
        correctOption: "Agua",
      },
      {
        id: "es-1-2-a2",
        type: "match",
        prompt: "Match each word to its meaning.",
        pairs: [
          { term: "Sí", translation: "Yes" },
          { term: "No", translation: "No" },
          { term: "Amigo", translation: "Friend" },
        ],
      },
    ],
    aiTeacherPrompt: {
      systemPrompt:
        "You are a friendly, encouraging Spanish teacher. Reinforce yesterday's greetings and introduce a few new everyday words with simple examples.",
      openingLine: "¡Bienvenido de nuevo! Ready to learn some new words?",
      focusAreas: ["everyday vocabulary", "pronunciation"],
    },
  },

  // --- Spanish: Basics 2 ---
  {
    id: "es-2-1",
    unitId: "es-unit-2",
    order: 1,
    title: "Introduce Yourself",
    description: "Learn how to say your name and ask for someone else's.",
    xpReward: 15,
    goals: ["Say your name", "Ask someone their name"],
    vocabulary: [
      { id: "es-2-1-v1", term: "Me llamo", translation: "My name is", phonetic: "meh YAH-moh" },
      { id: "es-2-1-v2", term: "¿Cómo te llamas?", translation: "What is your name?" },
      { id: "es-2-1-v3", term: "Mucho gusto", translation: "Nice to meet you", phonetic: "MOO-choh GOO-stoh" },
    ],
    phrases: [
      { id: "es-2-1-p1", phrase: "Me llamo Ana. Mucho gusto.", translation: "My name is Ana. Nice to meet you." },
    ],
    activities: [
      {
        id: "es-2-1-a1",
        type: "translate",
        prompt: "Translate this phrase to English.",
        sourceText: "¿Cómo te llamas?",
        correctTranslation: "What is your name?",
      },
      {
        id: "es-2-1-a2",
        type: "speak",
        prompt: "Say your name in Spanish.",
        targetPhrase: "Me llamo...",
        phonetic: "meh YAH-moh",
      },
    ],
    aiTeacherPrompt: {
      systemPrompt:
        "You are a friendly Spanish teacher helping a beginner introduce themselves. Ask their name, react warmly, and gently correct pronunciation.",
      openingLine: "¡Hola! ¿Cómo te llamas?",
      focusAreas: ["introductions", "conversational Spanish"],
    },
  },
  {
    id: "es-2-2",
    unitId: "es-unit-2",
    order: 2,
    title: "Count to Ten",
    description: "Learn to count from one to ten in Spanish.",
    xpReward: 15,
    goals: ["Count from 1 to 10", "Recognize numbers by ear"],
    vocabulary: [
      { id: "es-2-2-v1", term: "Uno", translation: "One", phonetic: "OO-noh" },
      { id: "es-2-2-v2", term: "Dos", translation: "Two", phonetic: "dohs" },
      { id: "es-2-2-v3", term: "Tres", translation: "Three", phonetic: "trehs" },
      { id: "es-2-2-v4", term: "Diez", translation: "Ten", phonetic: "dee-EHS" },
    ],
    phrases: [
      { id: "es-2-2-p1", phrase: "Uno, dos, tres...", translation: "One, two, three..." },
    ],
    activities: [
      {
        id: "es-2-2-a1",
        type: "multiple-choice",
        prompt: "Which word means 'Three'?",
        options: ["Dos", "Tres", "Diez"],
        correctOption: "Tres",
      },
      {
        id: "es-2-2-a2",
        type: "listen",
        prompt: "Type the number you hear.",
        audioText: "Diez",
        correctTranscription: "Diez",
      },
    ],
    aiTeacherPrompt: {
      systemPrompt:
        "You are a friendly Spanish teacher helping a beginner learn to count from one to ten. Use a playful counting rhythm and repeat numbers slowly.",
      openingLine: "¡Vamos a contar! Let's count together.",
      focusAreas: ["numbers", "pronunciation"],
    },
  },

  // --- French: Basics 1 ---
  {
    id: "fr-1-1",
    unitId: "fr-unit-1",
    order: 1,
    title: "Say Hello",
    description: "Learn how to greet people in French.",
    xpReward: 10,
    goals: ["Say hello and goodbye", "Recognize 'please' and 'thank you'"],
    vocabulary: [
      { id: "fr-1-1-v1", term: "Bonjour", translation: "Hello", phonetic: "bohn-ZHOOR" },
      { id: "fr-1-1-v2", term: "Au revoir", translation: "Goodbye", phonetic: "oh ruh-VWAHR" },
      { id: "fr-1-1-v3", term: "S'il vous plaît", translation: "Please", phonetic: "seel voo PLEH" },
      { id: "fr-1-1-v4", term: "Merci", translation: "Thank you", phonetic: "mehr-SEE" },
    ],
    phrases: [
      { id: "fr-1-1-p1", phrase: "Bonjour, comment ça va?", translation: "Hello, how are you?" },
    ],
    activities: [
      {
        id: "fr-1-1-a1",
        type: "multiple-choice",
        prompt: "Which word means 'Hello'?",
        options: ["Au revoir", "Bonjour", "Merci"],
        correctOption: "Bonjour",
      },
      {
        id: "fr-1-1-a2",
        type: "translate",
        prompt: "Translate this word to English.",
        sourceText: "Merci",
        correctTranslation: "Thank you",
      },
      {
        id: "fr-1-1-a3",
        type: "listen",
        prompt: "Type what you hear.",
        audioText: "Bonjour",
        correctTranscription: "Bonjour",
      },
    ],
    aiTeacherPrompt: {
      systemPrompt:
        "You are a friendly, encouraging French teacher helping a complete beginner learn basic greetings. Speak slowly, use simple English explanations, and praise effort.",
      openingLine: "Bonjour! Let's learn how to say hello in French.",
      focusAreas: ["greetings", "politeness words", "pronunciation"],
    },
  },

  // --- Japanese: Basics 1 ---
  {
    id: "ja-1-1",
    unitId: "ja-unit-1",
    order: 1,
    title: "Say Hello",
    description: "Learn how to greet people in Japanese.",
    xpReward: 10,
    goals: ["Say hello and goodbye", "Recognize 'please' and 'thank you'"],
    vocabulary: [
      { id: "ja-1-1-v1", term: "こんにちは", translation: "Hello", phonetic: "kon-nee-chee-wah" },
      { id: "ja-1-1-v2", term: "さようなら", translation: "Goodbye", phonetic: "sah-yoh-nah-rah" },
      { id: "ja-1-1-v3", term: "お願いします", translation: "Please", phonetic: "oh-neh-gai-shee-mahs" },
      { id: "ja-1-1-v4", term: "ありがとう", translation: "Thank you", phonetic: "ah-ree-gah-toh" },
    ],
    phrases: [
      { id: "ja-1-1-p1", phrase: "こんにちは、元気ですか？", translation: "Hello, how are you?" },
    ],
    activities: [
      {
        id: "ja-1-1-a1",
        type: "multiple-choice",
        prompt: "Which word means 'Hello'?",
        options: ["さようなら", "こんにちは", "ありがとう"],
        correctOption: "こんにちは",
      },
      {
        id: "ja-1-1-a2",
        type: "translate",
        prompt: "Translate this word to English.",
        sourceText: "ありがとう",
        correctTranslation: "Thank you",
      },
      {
        id: "ja-1-1-a3",
        type: "listen",
        prompt: "Type what you hear.",
        audioText: "こんにちは",
        correctTranscription: "こんにちは",
      },
    ],
    aiTeacherPrompt: {
      systemPrompt:
        "You are a friendly, encouraging Japanese teacher helping a complete beginner learn basic greetings. Speak slowly, use simple English explanations, romaji for pronunciation, and praise effort.",
      openingLine: "こんにちは! Let's learn how to say hello in Japanese.",
      focusAreas: ["greetings", "politeness words", "pronunciation"],
    },
  },

  // --- German: Basics 1 ---
  {
    id: "de-1-1",
    unitId: "de-unit-1",
    order: 1,
    title: "Say Hello",
    description: "Learn how to greet people in German.",
    xpReward: 10,
    goals: ["Say hello and goodbye", "Recognize 'please' and 'thank you'"],
    vocabulary: [
      { id: "de-1-1-v1", term: "Hallo", translation: "Hello", phonetic: "HAH-loh" },
      { id: "de-1-1-v2", term: "Auf Wiedersehen", translation: "Goodbye", phonetic: "owf VEE-der-zayn" },
      { id: "de-1-1-v3", term: "Bitte", translation: "Please", phonetic: "BIT-tuh" },
      { id: "de-1-1-v4", term: "Danke", translation: "Thank you", phonetic: "DAHN-kuh" },
    ],
    phrases: [
      { id: "de-1-1-p1", phrase: "Hallo, wie geht's?", translation: "Hello, how are you?" },
    ],
    activities: [
      {
        id: "de-1-1-a1",
        type: "multiple-choice",
        prompt: "Which word means 'Hello'?",
        options: ["Auf Wiedersehen", "Hallo", "Danke"],
        correctOption: "Hallo",
      },
      {
        id: "de-1-1-a2",
        type: "translate",
        prompt: "Translate this word to English.",
        sourceText: "Danke",
        correctTranslation: "Thank you",
      },
      {
        id: "de-1-1-a3",
        type: "listen",
        prompt: "Type what you hear.",
        audioText: "Hallo",
        correctTranscription: "Hallo",
      },
    ],
    aiTeacherPrompt: {
      systemPrompt:
        "You are a friendly, encouraging German teacher helping a complete beginner learn basic greetings. Speak slowly, use simple English explanations, and praise effort.",
      openingLine: "Hallo! Let's learn how to say hello in German.",
      focusAreas: ["greetings", "politeness words", "pronunciation"],
    },
  },
];

export function getLessonsByUnit(unitId: string): Lesson[] {
  return lessons
    .filter((lesson) => lesson.unitId === unitId)
    .sort((a, b) => a.order - b.order);
}

export function getLessonById(id: string): Lesson | undefined {
  return lessons.find((lesson) => lesson.id === id);
}
