import 'server-only'

import ru from '@/dictionaries/ru.json'
import en from '@/dictionaries/en.json'
import ka from '@/dictionaries/ka.json'
import uk from '@/dictionaries/uk.json'

export interface Dictionary {
  header: Record<string, string>;
  ui: Record<string, any>;
  privacy?: {
    title: string;
    updated: string;
    intro: string;
    blocks: { h: string; p: string }[];
  };
  seo?: {
    title: string;
    description: string;
  };
}

const dictionaries: Record<string, Dictionary> = {
  ru,
  en,
  ka,
  uk,
}

export const getDictionary = async (locale: 'ru' | 'en' | 'ka' | 'uk'): Promise<Dictionary> => {
  return dictionaries[locale] || dictionaries.ru
}