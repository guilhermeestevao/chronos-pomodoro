import { Bounce, ToastContainer } from 'react-toastify';

type MensagesContainerProps = {
  children: React.ReactNode;
};

export function MensagesContainer({ children }: MensagesContainerProps) {
  return (
    <>
      {children}
      <ToastContainer
        position='top-center'
        autoClose={10000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
        transition={Bounce}
      />
    </>
  );
}
