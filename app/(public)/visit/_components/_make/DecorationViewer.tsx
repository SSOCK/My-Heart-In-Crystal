'use client';

import { useLayoutEffect, useCallback, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Scroll, ScrollControls } from '@react-three/drei';
import { Suspense } from 'react';

import InitializeDecoration from '@/app/(public)/visit/_components/_make/InitializeDecoration';
import { use3DModel } from '@/app/(public)/visit/[userId]/store/modelStore';
import Loading from '@/app/loading';

const DecorationsViewer = ({
  onClose,
  decorations,
}: {
  onClose: () => void;
  decorations: Array<{ id: number; fileName: string; name: string }>;
}) => {
  const { setModel } = use3DModel();
  const [pages, setPages] = useState(1);

  const ITEM_WIDTH = 200;
  const ITEM_GAP = 100;

  const handleModel = useCallback(
    (path: string) => {
      setModel({ model: path });
      onClose();
    },
    [onClose, setModel]
  );

  useLayoutEffect(() => {
    const handleScrollSize = () => {
      const screenWidth = window.innerWidth;
      const minWidth =
        decorations.length * ITEM_WIDTH + ITEM_GAP + screenWidth / 2;
      const newPages = Math.ceil(minWidth / screenWidth);
      setPages(newPages);
    };

    handleScrollSize();
    window.addEventListener('resize', handleScrollSize);

    return () => {
      window.removeEventListener('resize', handleScrollSize);
    };
  }, [decorations]);

  return (
    <div style={{ width: '100%', height: '400px' }}>
      <Suspense fallback={Loading()}>
        <Canvas style={{ width: '100%', height: '100%' }}>
          <ambientLight intensity={1} color={'#ffffff'} />
          <directionalLight
            position={[10, 20, 10]}
            intensity={0.7}
            color={'#ffffff'}
          />
          <ScrollControls horizontal damping={0.3} pages={pages}>
            <Scroll>
              {/* 장식들을 렌더링 */}
              {decorations.map((deco, index) => (
                <group
                  key={index}
                  onClick={() => handleModel(deco.fileName)}
                  position={[index * 4.5, 0, 0]} // 장식 간격 조정
                >
                  <InitializeDecoration path={deco.fileName} />
                </group>
              ))}
            </Scroll>
          </ScrollControls>
        </Canvas>
      </Suspense>
    </div>
  );
};

export default DecorationsViewer;