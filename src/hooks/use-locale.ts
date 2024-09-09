import { useLocalStorage } from "usehooks-ts";

const DEFAULT_STORAGE_KEY = "ui-locale";
const LOCALES = ["en", "es"] as const;

export type Locale = (typeof LOCALES)[number] | (string & {});

interface UseLocaleOptions {
  defaultValue?: Locale;
  localStorageKey?: string;
  initializeWithValue?: boolean;
}

export function useLocale(options: UseLocaleOptions = {}) {
  const {
    defaultValue,
    localStorageKey = DEFAULT_STORAGE_KEY,
    initializeWithValue = true,
  } = options;

  const [locale, setLocale] = useLocalStorage<Locale>(
    localStorageKey,
    defaultValue ?? "en",
    { initializeWithValue },
  );

  return {
    locale,
    set: (theme: Locale) => setLocale(theme),
  };
}
