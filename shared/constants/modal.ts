// enum
const MODAL_TYPE = {
  GUEST: 'Guest',
  INTRODUCE: 'Intro',
  MESSAGE: 'Message',
} as const;

export type ModalType = (typeof MODAL_TYPE)[keyof typeof MODAL_TYPE];

export default MODAL_TYPE;
