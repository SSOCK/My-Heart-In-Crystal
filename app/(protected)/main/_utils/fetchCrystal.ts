import { BACKEND_ROUTES } from '@/shared/constants/routes';
import clientComponentFetch from '@/shared/utils/fetch/clientComponentFetch';

const fetchCrystal = async (user_id: string) => {
  try {
    const response = await clientComponentFetch(BACKEND_ROUTES.CRYSTAL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-User-Id': user_id,
      },
    });
    if (!response.ok)
      throw new Error('Failed to fetch crystal' + response.error);

    return response;
  } catch (error) {
    throw new Error('Failed to fetch crystal' + error);
  }
};

export default fetchCrystal;
