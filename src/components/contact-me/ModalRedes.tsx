import { useRef, forwardRef, ReactNode } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  children: ReactNode;
  open: () => void;
  close: () => void;
}
const ModalRedes = forwardRef<HTMLDialogElement, ModalProps>(
  function ModalRedes({ children } /*ref*/) {
    const dialog = useRef<HTMLDialogElement>(null);

    /* useImperativeHandle(ref, () => ({
      open() {
        if (dialog.current) {
          dialog.current.showModal();
        }
      },
      close() {
        if (dialog.current) {
          dialog.current.close();
        }
        
      },
    }));*/

    return createPortal(
      <dialog
        ref={dialog}
        className="backdrop:bg-stone-900/90 border rounded-md"
      >
        {children}
      </dialog>,
      document.getElementById("modal") as HTMLElement
    );
  }
);

export { ModalRedes };
