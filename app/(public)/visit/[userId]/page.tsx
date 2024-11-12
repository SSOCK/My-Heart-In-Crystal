import Visit from '@/app/(public)/visit/_components';

import fetchUserData from '@/app/(public)/visit/utils/fetchUserData';
import { ROUTES } from '@/shared/constants/routes';
import { UserData } from '@/shared/types/userData';
import { redirect } from 'next/navigation';

const VisitPage = async ({ params }: { params: { userId: string } }) => {
  const data = (await fetchUserData(params.userId)) as UserData;
  if (!data) redirect(ROUTES.LANDING);

  return (
    <>
      <Visit userData={data} />
    </>
  );
};

export default VisitPage;
