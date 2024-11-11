export const ROUTES = {
  LANDING: '/',
  MAIN: '/main',
  NICKNAME: '/nickname',
  MAKE: '/make',
  VISIT_USER: (id: string) => `/visit/${id}`,
  MESSAGE: (id: string) => `/visit/${id}/message`,
} as const;

export const BACKEND_ROUTES = {
  NICKNAME: '/api/user/nickname',
} as const;
