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

const stepDetails = [
  '장식 선택하기',
  '장식 색상 바꾸기',
  '받침대 선택하기',
  '받침대 색상 바꾸기',
  '수정구슬 이름 등록하기',
];

const DecoDrawer = ({ step }: { step: number }) => {
  if (step !== 1 && step !== 3) return null;

  return (
    <Drawer>
      <DrawerTrigger className="pointer-events-auto rounded-lg bg-gray-300 p-2 px-4">
        {stepDetails[step - 1]}
      </DrawerTrigger>
      <DrawerContent className="flex flex-col items-center justify-center">
        <DrawerHeader className="flex flex-col items-center">
          <DrawerTitle>장식을 선택해 주세요.</DrawerTitle>
          <DrawerDescription>
            선택한 장식은 수정구슬에 보관되어요.
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
  );
};

export default DecoDrawer;
