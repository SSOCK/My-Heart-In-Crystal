'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import MakeCanvas from '@/app/(protected)/make/_components/MakeCanvas';
import UISection from '@/shared/components/ui/UISection';

import { Button } from '@/components/ui/button';
import PreviousButton from '@/shared/components/ui/PreviousButton';

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

const MakePage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const stepParam = searchParams.get('step');
  const [step, setStep] = useState(stepParam ? parseInt(stepParam) : 1);

  const isDecorated = sessionStorage.getItem('isDecorated');
  if (isDecorated) {
    router.replace('/main');
  }

  useEffect(() => {
    const stepParam = searchParams.get('step');
    const step = stepParam ? parseInt(stepParam) : 1;

    if (step === 4) {
      router.replace('/main');
      sessionStorage.setItem('isDecorated', 'true');
      return;
    }

    if (isNaN(step) || step < 1 || step > 4) {
      router.replace('/make?step=1');
      return;
    }

    setStep(step);
  }, [searchParams, router]);

  const handleNext = () => {
    const nextStep = step + 1;
    router.push(`/make?step=${nextStep}`);
    setStep(nextStep);
  };

  return (
    <>
      <PreviousButton />
      <UISection>
        <div className="bg-gray-300">
          <h1>나만의 장식 만들기</h1>
          <p>우측 사이드바를 통해 장식을 변경해보세요. {step}</p>
        </div>
        <div className="flex w-full flex-col items-center justify-center gap-12">
          <Drawer>
            <DrawerTrigger className="pointer-events-auto">
              장식 바꾸기
            </DrawerTrigger>
            <DrawerContent className="flex flex-col items-center justify-center">
              <DrawerHeader className="flex flex-col items-center">
                <DrawerTitle>장식을 선택해 주세요.</DrawerTitle>
                <DrawerDescription>
                  선택한 장식은 수정구슬에 선물되어요.
                </DrawerDescription>
              </DrawerHeader>

              <DrawerFooter>
                {/* <Button>Submit</Button> */}
                <DrawerClose>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>

          <div className="flex w-full justify-between md:w-1/2">
            <Button
              onClick={() => router.back()}
              className="pointer-events-auto bg-gray-700"
            >
              이전
            </Button>
            <Button
              onClick={() => handleNext()}
              className="pointer-events-auto bg-gray-700"
            >
              다음
            </Button>
          </div>
        </div>
      </UISection>
      <MakeCanvas />
    </>
  );
};

export default MakePage;
