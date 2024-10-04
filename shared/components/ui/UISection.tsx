import ModalProvider from '@/shared/components/providers/ModalProvider';

const UISection = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="ui-section">
      {children}
      <ModalProvider />
    </section>
  );
};

export default UISection;
