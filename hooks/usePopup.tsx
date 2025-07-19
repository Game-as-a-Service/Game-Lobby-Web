import Modal, { ModalProps } from "@/components/shared/Modal";
import { useState, useEffect, useCallback, useMemo } from "react";
import Button from "@/components/shared/Button";
interface PopupConfig extends Pick<ModalProps, "isOpen"> {
  title?: string;
  showCancelButton?: boolean;
  onConfirm?: () => boolean | void | Promise<boolean | void>;
  onCancel?: () => void | Promise<boolean | void>;
}

interface FirePopupParamsType {
  title: PopupConfig["title"];
  showCancelButton?: PopupConfig["showCancelButton"];
  /**
   * Handles the click event of the confirmation button.
   * If return value is true, the popup will remain open, if false or not returned, the popup will be closed.
   */
  onConfirm?: PopupConfig["onConfirm"];
  /**
   * The callback function before popup close.
   */
  onCancel?: PopupConfig["onCancel"];
}

const initPopupConfig: PopupConfig = {
  isOpen: false,
};

export default function usePopup() {
  const [popupConfig, setPopupConfig] = useState<PopupConfig>(initPopupConfig);

  const resetPopup = useCallback(
    () => setPopupConfig((prev) => ({ ...prev, ...initPopupConfig })),
    []
  );

  const handleConfirm = useCallback(async () => {
    if (popupConfig.onConfirm) {
      const isOpen = await popupConfig.onConfirm();
      if (!isOpen) {
        resetPopup();
      }
    } else {
      resetPopup();
    }
  }, [popupConfig, resetPopup]);

  const handleClose = useCallback(async () => {
    popupConfig.onCancel && (await popupConfig.onCancel());
    resetPopup();
  }, [popupConfig, resetPopup]);

  const firePopup = useCallback(
    ({
      title,
      showCancelButton = false,
      onConfirm,
      onCancel,
    }: FirePopupParamsType) => {
      setPopupConfig({
        isOpen: true,
        title,
        showCancelButton,
        onConfirm,
        onCancel,
      });
    },
    []
  );

  const Popup = useMemo(() => {
    function PopupComponent() {
      return (
        <Modal
          isOpen={popupConfig.isOpen}
          onClose={handleClose}
          maskClosable={false}
          title={popupConfig.title}
        >
          <div className="flex justify-center w-full gap-2 flex-nowrap">
            {popupConfig.showCancelButton && (
              <Button variant="secondary" onClick={handleClose}>
                取消
              </Button>
            )}
            <Button onClick={handleConfirm}>確定</Button>
          </div>
        </Modal>
      );
    }
    return PopupComponent;
  }, [popupConfig, handleClose, handleConfirm]);

  useEffect(() => {
    return resetPopup();
  }, [resetPopup]);

  return { Popup, firePopup };
}
