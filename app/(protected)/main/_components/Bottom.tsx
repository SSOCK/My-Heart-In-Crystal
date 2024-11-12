'use client';

import { Mesh, MeshStandardMaterial, CanvasTexture } from 'three';
import { useGLTF } from '@react-three/drei';

import { makeColorChangedMaterial } from '@/shared/components/3dModels/utils/model';
import { BOTTOM } from '@/shared/constants/3dModel';

const makeCanvasTexture = ({
  width,
  height,
  bgColor,
  fontColor,
  font,
  string,
  positionY,
}: {
  width: number;
  height: number;
  bgColor: string;
  fontColor: string;
  font: string;
  string: string;
  positionY: number;
}) => {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  if (!context) {
    throw 'context is not exist!!!';
  }

  [canvas.width, canvas.height] = [width, height];

  context.fillStyle = bgColor;
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.fillStyle = fontColor;
  context.font = font;
  context.textBaseline = 'middle';

  const textWidth = context.measureText(string).width;
  context.fillText(
    string,
    canvas.width / 2 - textWidth / 2,
    positionY,
    canvas.width
  );

  return new CanvasTexture(canvas);
};

const Bottom = ({
  id,
  color,
  title,
}: {
  id: number;
  color: string;
  title: string;
}) => {
  const path = Object.values(BOTTOM).find((bottom) => bottom.id === id)!.path;
  const bottomModel = useGLTF(path).scene.clone();

  const nameTag = bottomModel.getObjectByName('nameTag') as Mesh | undefined;

  if (nameTag && nameTag.material instanceof MeshStandardMaterial) {
    const newTexture = makeCanvasTexture({
      string: title,
      width: 1024,
      height: 1024,
      positionY: 1024 / 8,
      font: 'bold 100px Arial',
      fontColor: 'black',
      bgColor: 'white',
    });
    nameTag.material.map = newTexture;
    nameTag.material.bumpMap = newTexture;
  }

  bottomModel.scale.set(1, 1, 1);
  bottomModel.position.set(0, 0, 0);
  bottomModel.receiveShadow = true;
  bottomModel.castShadow = true;

  const colorPart = bottomModel.getObjectByName('mainColor') as
    | Mesh
    | undefined;
  if (!colorPart) {
    return null;
  }
  colorPart.material = makeColorChangedMaterial(colorPart, color);

  return <primitive object={bottomModel} />;
};

export default Bottom;