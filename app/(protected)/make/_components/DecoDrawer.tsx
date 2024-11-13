import { useState, useEffect } from 'react';
import { ArrowLeftRight } from 'lucide-react';

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

import DecorationSelect from '@/app/(protected)/make/_components/DecorationSelect';
import { BOTTOM, DECO_TYPE, MAIN_DECORATION } from '@/shared/constants/3dModel';

import dynamic from 'next/dynamic';
import TitleForm from '@/app/(protected)/make/_components/TitleForm';
import { STEP } from '@/app/(protected)/make/_constants/step';

const ColorButton = dynamic(
  () => import('@/app/(protected)/make/_components/ColorButton')
);

const DecoDrawer = ({ step }: { step: number }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  if (
    step === STEP.MAIN_DECORATION_COLOR ||
    step === STEP.BOTTOM_DECORATION_COLOR
  )
    return (
      <ColorButton
        type={
          step === STEP.MAIN_DECORATION_COLOR
            ? DECO_TYPE.MAIN
            : DECO_TYPE.BOTTOM
        }
      />
    );

  if (step === STEP.TITLE) return <TitleForm />;

  const mainDecorationArray = Object.values(MAIN_DECORATION);
  const bottomDecorationArray = Object.values(BOTTOM);

  return (
    <Drawer>
      <DrawerTrigger className="pointer-events-auto transform rounded-lg bg-white p-2 px-4 transition duration-200 hover:bg-gray-300">
        {step === STEP.MAIN_DECORATION ? '장식 선택하기' : '바닥 장식 선택하기'}
      </DrawerTrigger>
      <DrawerContent className="flex flex-col items-center justify-center">
        <DrawerHeader className="flex flex-col items-center">
          <DrawerTitle className="flex gap-2">
            좌우로 스크롤해 장식을 선택해 주세요. <ArrowLeftRight />
          </DrawerTitle>
          <DrawerDescription>
            선택한 장식은 수정구슬에 보관되어요.
          </DrawerDescription>
        </DrawerHeader>

        <div className="flex w-full overflow-auto">
          {step === STEP.MAIN_DECORATION &&
            mainDecorationArray.map((deco, index) => (
              <DecorationSelect
                key={index}
                path={deco.path}
                type={DECO_TYPE.MAIN}
              />
            ))}

          {step === STEP.BOTTOM_DECORATION &&
            bottomDecorationArray.map((deco, index) => (
              <DecorationSelect
                key={index}
                path={deco.path}
                type={DECO_TYPE.BOTTOM}
              />
            ))}
        </div>

        <DrawerFooter>
          <DrawerClose className="transform rounded-lg border-2 border-gray-400 p-2 px-4 transition duration-200 hover:bg-gray-300">
            Cancel
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default DecoDrawer;
