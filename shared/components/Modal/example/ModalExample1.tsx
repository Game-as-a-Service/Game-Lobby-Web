import React, { useEffect, useState } from "react"
import ModalManager from "@/shared/components/Modal/ModalManager"
import { MyModal } from "@/shared/components/Modal"

const ModalExample1 = () => {
  const [modalContent, setModalContent] = useState(
    "Lorem ipsum dolor sit amet consectetur adipisicing elit."
  )

  useEffect(() => {
    ModalManager.register("modal-1", MyModal, {
      keepMounted: true,
    })
    return () => {
      ModalManager.unregister("modal-1")
    }
  }, [])

  const showModal = () => {
    ModalManager.show("modal-1", {
      modalContent,
    }).then((payload) => {})
  }

  return (
    <button
      className="mt-5 bg-blue-500 text-white px-4 py-2 rounded"
      onClick={showModal}
    >
      Modal Example 1 Open
    </button>
  )
}

export default ModalExample1
