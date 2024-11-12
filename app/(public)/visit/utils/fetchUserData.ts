'use server';

import { BACKEND_ROUTES } from '@/shared/constants/routes';
import { serverComponentFetchFromServer } from '@/shared/utils/fetch/serverComponentFetch';

const fetchUserData = async (userId: string) => {
  try {
    const data = await serverComponentFetchFromServer(
      BACKEND_ROUTES.VISIT_USER(userId)
    );
    return data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
};

export default fetchUserData;
