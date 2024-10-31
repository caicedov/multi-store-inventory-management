/**
 * An array of all the routes that are public and do not require authentication
 * @type {string[]}
 */
export const publicRoutes = [
  '/'
]

/**
 * An array of all the routes that are used fo authentication
 * @type {string[]}
 */
export const authRoutes = [
  '/auth/login',
  '/auth/error',
]

/**
 * The prefix for all the API routes that are used for authentication
 * @type {string}
 */
export const apiAuthPrefix = '/api/auth'

export const DEFAULT_LOGIN_REDIRECT = '/dashboard'
