import Visit from '@/app/(public)/visit/_components';

import fetchUserData from '@/app/(public)/visit/utils/fetchUserData';

const VisitPage = async ({ params }: { params: { userId: string } }) => {
  const data = await fetchUserData(params.userId);
  console.log(data);

  return (
    <>
      <Visit userId={params.userId} />
    </>
  );
};

export default VisitPage;
