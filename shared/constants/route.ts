const ROUTES = {
  LANDING: '/',
  MAIN: '/main',
  VISIT_USER: (id: string) => `/visit/${id}`,
} as const;

export default ROUTES;
