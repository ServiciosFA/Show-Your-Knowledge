import React, { ReactNode } from "react";

const Modal = ({
  children,
  close,
}: {
  children: ReactNode;
  close: () => void;
}) => {
  const pressESC = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      close();
    }
  };
  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      close();
    }
  };

  return (
    <div
      className="top-0 left-0 z-50 fixed flex justify-center items-center bg-color-bg-thirdy bg-opacity-80 p-3 w-screen h-screen"
      onKeyDown={pressESC}
      tabIndex={0}
      onClick={handleClose}
    >
      {children}
    </div>
  );
};

export default Modal;
