export const isProduction = process.env.NODE_ENV === 'production'

export const SITE_URL = isProduction ? 'https://fiqlab.vercel.app' : 'http://localhost:3000'

export const GITHUB_USERNAME = 'fiqgant'

export const SITE_NAME = 'fiq'
export const SITE_TITLE = 'fiq - A Lecturer'
export const SITE_DESCRIPTION = 'fiq • 27 y/o • Lecturer'
