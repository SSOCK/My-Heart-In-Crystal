import { DECO } from '@/shared/constants/3dModel';
import { create } from 'zustand';

export type setModelType = {
  model: string;
  modelColor: string;
  message: string;
  messageColor: string;
};

interface ModelStore {
  model: string;
  modelColor: string;
  message: string;
  messageColor: string;
  setModel: (newModel: Pick<setModelType, 'model'>) => void;
  setModelColor: (newModelColor: Pick<setModelType, 'modelColor'>) => void;
  setMessage: (newMessage: Pick<setModelType, 'message'>) => void;
  setMessageColor: (
    newMessageColor: Pick<setModelType, 'messageColor'>
  ) => void;
  resetModel: () => void;
}

export const use3DModel = create<ModelStore>((set) => ({
  model: DECO.GINGERBREAD.fileName,
  modelColor: '#ff0000',
  message: '',
  messageColor: '#ff0000',
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

  setMessageColor: (newMessage) =>
    set((prev: ModelStore) => ({
      ...prev,
      message: newMessage.messageColor,
    })),

  resetModel: () =>
    set({
      model: DECO.GINGERBREAD.fileName,
      modelColor: '#ff0000',
      message: '',
      messageColor: '#ff0000',
    }),
}));
