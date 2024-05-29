const ButtonPanel = ({
  cancel,
  success,
  onCancel,
  onSuccess,
  disabled,
}: {
  cancel: string;
  success: string;
  onCancel: () => void;
  onSuccess: () => void;
  disabled: boolean;
}) => {
  return (
    <div className="flex justify-end gap-4">
      <button
        onClick={onCancel}
        className="border-2 border-color-text hover:bg-color-secondary px-3 p-1 rounded-lg"
      >
        {cancel}
      </button>
      <button
        type="submit"
        onClick={onSuccess}
        className="border-2 border-color-secondary hover:border-color-text bg-color-secondary px-3 py-1 rounded-lg text-color-text"
        disabled={disabled}
      >
        {success}
      </button>
    </div>
  );
};

export default ButtonPanel;
