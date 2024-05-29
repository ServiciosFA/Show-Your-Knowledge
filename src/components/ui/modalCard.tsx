import React from "react";
import { GrClose } from "react-icons/gr";

type propTypes = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const ModalCard: React.FC<propTypes> = ({ open, onClose, children }) => {
  return (
    <div
      className={`fixed inset-0 flex justify-center items-center transition-colors ${
        open ? "visible bg-black/50 z-50" : "invisible"
      }`}
    >
      <div className="relative z-50 bg-color-bg-seconday p-6 rounded-lg text-color-text">
        <GrClose
          onClick={() => {
            onClose();
          }}
          className="top-0 right-0 absolute hover:border-2 m-2 hover:rounded text-xl cursor-pointer hover:scale-[1.1]"
        />
        {children}
      </div>
    </div>
  );
};

export default ModalCard;
