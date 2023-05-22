import * as React from "react"
import ModalManager, { useModal } from "./ModalManager"
import type { ModalHandler } from "./ModalManager/src/typings"

interface BaseModalProps {
  visible: boolean
  onDismiss: () => void
  onResolve: (payload: any) => void
  modalContent?: React.ReactNode | string
}

const BaseModal = ({
  visible,
  onDismiss,
  onResolve,
  modalContent,
}: BaseModalProps) => {
  return (
    <div
      style={{ visibility: visible ? "visible" : "hidden" }}
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center"
    >
      <div className="bg-white p-5 rounded shadow-lg relative w-full max-w-lg h-auto max-h-[80vh] overflow-y-auto">
        <button
          className="absolute top-2 right-2 bg-transparent border-none text-2xl cursor-pointer"
          onClick={onDismiss}
        >
          X
        </button>
        <div className="mt-5">{modalContent}</div>
        <button
          className="mt-5 bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => onResolve("onResolve")}
        >
          Confirm
        </button>
        <button
          className="mt-5 ml-2 bg-gray-500 text-white px-4 py-2 rounded"
          onClick={onDismiss}
        >
          Dismiss
        </button>
      </div>
    </div>
  )
}

export const MyModal = ModalManager.create(
  (modal: BaseModalProps & ModalHandler): JSX.Element => {
    return (
      <BaseModal
        {...modal}
        visible={modal.visible}
        onDismiss={modal.keepMounted ? modal.hide : modal.remove}
        onResolve={modal.resolve}
      />
    )
  }
)
