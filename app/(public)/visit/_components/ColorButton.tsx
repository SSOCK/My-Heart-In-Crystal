'use client';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { Chrome, ColorResult, Circle } from '@uiw/react-color';
import { use3DModel } from '@/app/(public)/visit/[userId]/store/modelStore';

import { STEP } from '@/app/(public)/visit/[userId]/_constants/step';

const ColorButton = ({ step }: { step: number }) => {
  const { setModelColor, modelColor, setMessageColor, messageColor } =
    use3DModel();

  const handleColorChange = (color: ColorResult) => {
    if (step === STEP.MESSAGE_DECORATION_COLOR) {
      setModelColor({ modelColor: color.hex });
    } else if (step === STEP.MESSAGE_NOTE_COLOR) {
      setMessageColor({ messageColor: color.hex });
    }
  };

  return (
    <Popover>
      <PopoverTrigger className="pointer-events-auto transform rounded-lg bg-white p-2 px-4 transition duration-200 hover:bg-gray-300">
        색상 변경
      </PopoverTrigger>
      <PopoverContent className="pointer-events-auto flex items-center justify-center">
        {step === STEP.MESSAGE_DECORATION_COLOR ? (
          <Chrome
            color={modelColor}
            onChange={(color) => handleColorChange(color)}
          />
        ) : (
          <Circle
            color={messageColor}
            onChange={(color) => handleColorChange(color)}
          />
        )}
      </PopoverContent>
    </Popover>
  );
};

export default ColorButton;
