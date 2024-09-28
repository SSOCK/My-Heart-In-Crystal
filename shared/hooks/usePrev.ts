import { create } from 'zustand';

interface PrevStore {
  view: boolean;
  isZoom: boolean;
  onIn: (isView: boolean) => void;
  onOut: (isView: boolean) => void;
  onZoom: (isZoom: boolean) => void;
  onZoomOut: (isZoom: boolean) => void;
}

const usePrev = create<PrevStore>((set) => ({
  view: false,
  isZoom: false,
  onIn: (isView) => {
    if (isView) return;
    set({ view: true });
  },
  onOut: (isView) => {
    if (!isView) return;
    set({ view: false });
  },
  onZoom: (isZoom) => {
    if (isZoom) return;
    set({ isZoom: true });
  },
  onZoomOut: (isZoom) => {
    if (!isZoom) return;
    set({ isZoom: false });
  },
}));

export default usePrev;
