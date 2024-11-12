export const ROUTES = {
  LANDING: '/',
  MAIN: '/main',
  NICKNAME: '/nickname',
  MAKE: '/make',
  VISIT_USER: (id: string) => `/visit/${id}`,
  MESSAGE: (id: string) => `/visit/${id}/message`,
  ERROR: '/404',
} as const;

export const BACKEND_ROUTES = {
  NICKNAME: '/api/user/nickname',
  CRYSTAL: '/api/crystal',
  MESSAGE: '/api/crystal/messages',
  ALL_MESSAGES: '/api/user/messages',
  SIGNOUT: '/api/auth/logout',
  VISIT_USER: (id: string) => `/api/user/${id}`,
} as const;
