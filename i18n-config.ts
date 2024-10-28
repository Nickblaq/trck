export const i18n = {
  defaultLocale: 'en',
  locales: ['en', 'ir'],
} as const

export type Locale = (typeof i18n)['locales'][number]
