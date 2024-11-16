'use client';

import { signIn } from 'next-auth/react';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import useModal from '@/shared/hooks/useModal';
import { ROUTES } from '@/shared/constants/routes';
import MODAL_TYPE from '@/shared/constants/modal';
import { checkBrowser } from '@/shared/utils/browser/checkBrowser';
import Image from 'next/image';

const IntroButtonSection = () => {
  const { onOpen } = useModal();
  const check = checkBrowser();

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <Button
        className="pointer-events-auto"
        onClick={() => onOpen(MODAL_TYPE.INTRODUCE)}
      >
        소개
      </Button>
      <Drawer>
        <DrawerTrigger className="pointer-events-auto rounded bg-primary p-2 px-4 text-sm text-white">
          시작하기
        </DrawerTrigger>
        <DrawerContent className="border-none bg-primary p-4">
          <DrawerHeader>
            <DrawerTitle></DrawerTitle>
            <DrawerDescription></DrawerDescription>
          </DrawerHeader>
          <div className="flex w-full flex-col items-center justify-center gap-4">
            <Button
              onClick={() => signIn('naver', { callbackUrl: ROUTES.MAIN })}
              className="w-1/2 border-none md:w-1/3"
              variant="outline"
              style={{ backgroundColor: '#03C75A' }}
            >
              <Image
                src="/images/oauth/btn_naver.svg"
                width={30}
                height={30}
                alt="naver_login"
              />
              네이버로 로그인
            </Button>
            <Button
              onClick={() => signIn('kakao', { callbackUrl: ROUTES.MAIN })}
              className="w-1/2 border-none md:w-1/3"
              variant="outline"
              style={{ backgroundColor: '#FEE500' }}
            >
              <Image
                src="/images/oauth/btn_kakao.svg"
                width={30}
                height={30}
                alt="kakao_login"
              />
              카카오 로그인
            </Button>
            {check ? (
              <Button
                onClick={() => signIn('google', { callbackUrl: ROUTES.MAIN })}
                className="w-1/2 border-none hover:bg-white md:w-1/3"
                variant="outline"
              >
                <Image
                  src="/images/oauth/btn_google.svg"
                  width={20}
                  height={20}
                  alt="google_login"
                />
                구글 로그인
              </Button>
            ) : (
              <p className="text-gray-400">
                구글 로그인은 크롬 및 모바일 브라우저에서만 가능합니다.
              </p>
            )}
            {/* <Button
              onClick={() => onOpen(MODAL_TYPE.GUEST)}
              className="w-1/2 border-none md:w-1/3"
              variant="outline"
            >
              게스트로 로그인
            </Button> */}
          </div>
          <DrawerFooter className="flex items-center justify-center ">
            <DrawerClose className="w-1/3 rounded-md bg-gray-50 py-2 text-primary">
              닫기
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default IntroButtonSection;
