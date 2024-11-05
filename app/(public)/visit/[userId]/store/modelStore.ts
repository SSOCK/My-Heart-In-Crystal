import { DECO } from '@/shared/constants/3dModel';
import { create } from 'zustand';

export type setModelType = {
  model: string;
  modelColor: string;
  message: string;
};

interface ModelStore {
  model: string;
  modelColor: string;
  message: string;
  setModel: (newModel: Pick<setModelType, 'model'>) => void;
  setModelColor: (newModelColor: Pick<setModelType, 'modelColor'>) => void;
  setMessage: (newMessage: Pick<setModelType, 'message'>) => void;
  resetModel: () => void;
}

export const use3DModel = create<ModelStore>((set) => ({
  model: DECO.GINGERBREAD.fileName,
  modelColor: '#ff0000',
  message: '',
  setModel: (newModel) =>
    set((prev: ModelStore) => ({ ...prev, model: newModel.model })),
  setModelColor: (newModelColor) =>
    set((prev: ModelStore) => ({
      ...prev,
      modelColor: newModelColor.modelColor,
    })),
  setMessage: (newMessage) =>
    set((prev: ModelStore) => ({
      ...prev,
      message: newMessage.message,
    })),

  resetModel: () =>
    set({
      model: DECO.GINGERBREAD,
      modelColor: '#ff0000',
      message: '',
    }),
}));
