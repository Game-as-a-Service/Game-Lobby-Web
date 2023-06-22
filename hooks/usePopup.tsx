import Modalow, { ModalProps } from "@/components/shared/Modalow";
import Button from "@/components/shared/Button";
import { useState, useEffect } from "react";

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

  const resetPopup = () =>
    setPopupConfig((prev) => ({ ...prev, ...initPopupConfig }));

  async function handleConfirm() {
    if (popupConfig.onConfirm) {
      const isOpen = await popupConfig.onConfirm();
      if (!isOpen) {
        resetPopup();
      }
    } else {
      resetPopup();
    }
  }

  async function handleClose() {
    popupConfig.onCancel && (await popupConfig.onCancel());
    resetPopup();
  }

  function firePopup({
    title,
    showCancelButton = false,
    onConfirm,
    onCancel,
  }: FirePopupParamsType) {
    setPopupConfig({
      isOpen: true,
      title,
      showCancelButton,
      onConfirm,
      onCancel,
    });
  }

  const popupFooter = (
    <div className="flex gap-4">
      {popupConfig.showCancelButton && (
        <Button onClick={handleClose}>取消</Button>
      )}
      <Button onClick={handleConfirm}>確定</Button>
    </div>
  );

  const Popup = () => (
    <Modalow
      hasTitle={false}
      isOpen={popupConfig.isOpen}
      onClose={handleClose}
      footer={popupFooter}
      maskClosable={false}
    >
      <p className="text-center text-lg pt-3">{popupConfig.title}</p>
    </Modalow>
  );

  useEffect(() => {
    return resetPopup();
  }, []);
  return { Popup, firePopup };
}
