export const LANGUAGE_CODE: any = {
  ENGLISH: 'en', // English
  CHINESE: 'zh', // Chinese
  JAPANESE: 'ja', // Japanese
  KOREAN: 'ko', // Korean
  ARABIC: 'ar', // Arabic
  CZECH: 'cs', // Czech
  DANISH: 'da_DK', // Danish
  DUTCH: 'nl_NL', // Dutch
  ESTONIAN: 'et_EE', // Estonian
  FRENCH: 'fr', // French
  GERMAN: 'de', // German
  GREEK: 'el', // Greek
  HEBREW: 'he_IL', // Hebrew
  INDONESIAN: 'id_ID', // Indonesian
  ITALIAN: 'it', // Italian
  PERSIAN: 'fa', // Persian (Farsi)
  PORTUGUESE: 'pt', // Portuguese
  ROMANIAN: 'ro', // Romanian
  RUSSIAN: 'ru', // Russian
  SLOVAK: 'sk_SK', // Slovak
  SPANISH: 'es', // Spanish
  SWEDISH: 'sv', // Swedish
  THAI: 'th', // Thai
  TURKISH: 'tr', // Turkish
  VIETNAMESE: 'vi', // Vietnamese
};

export const languages = {
  [LANGUAGE_CODE.ENGLISH]: {
    className: 'pb-0 option-text-bold',
    label: 'English',
  },
  [LANGUAGE_CODE.CHINESE]: {
    className: 'pb-0 option-text-bold',
    label: '中文（简体）',
  },
  [LANGUAGE_CODE.JAPANESE]: {
    className: 'pb-0 option-text-bold',
    label: '日本語',
  },
  [LANGUAGE_CODE.VIETNAMESE]: {
    className: 'pb-0 option-text-bold',
    label: 'Tiếng Việt',
  },
};

export function generateLanguage(language: string) {
  switch (language) {
    case 'en':
      return LANGUAGE_CODE.ENGLISH;
    case 'cn':
      return LANGUAGE_CODE.CHINESE;
    case 'zh':
      return LANGUAGE_CODE.CHINESE;
    case 'ja':
      return LANGUAGE_CODE.JAPANESE;
    case 'jp':
      return LANGUAGE_CODE.JAPANESE;
    case 'vi':
      return LANGUAGE_CODE.VIETNAMESE;
    default:
      break;
  }
}
