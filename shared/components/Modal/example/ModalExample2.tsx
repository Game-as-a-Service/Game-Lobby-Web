import React, { useEffect, useState } from "react"
import ModalManager from "@/shared/components/Modal/ModalManager"
import { MyModal } from "@/shared/components/Modal"

const ModalExample1 = () => {
  const [modalContent, setModalContent] = useState(
    "Lorem ipsum dolor sit amet consectetur adipisicing elit."
  )

  const showModal = () => {
    ModalManager.show(
      MyModal,
      {
        modalContent,
      },
      {
        keepMounted: true,
      }
    ).then((payload) => {})
  }

  return (
    <button
      className="mt-5 bg-blue-500 text-white px-4 py-2 rounded"
      onClick={showModal}
    >
      Modal Example 2 Open
    </button>
  )
}

export default ModalExample1
