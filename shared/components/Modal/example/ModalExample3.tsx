import React, { useEffect, useState } from "react"
import ModalManager from "@/shared/components/Modal/ModalManager"
import { MyModal } from "@/shared/components/Modal"

const ModalExample1 = () => {
  const [modalContent, setModalContent] = useState(
    "Lorem ipsum dolor sit amet consectetur adipisicing elit."
  )

  const showModal = () => {
    ModalManager.show("modal-3", { modalContent, setModalContent }).then(
      (payload) => {}
    )
  }

  return (
    <>
      <button
        className="mt-5 bg-blue-500 text-white px-4 py-2 rounded"
        onClick={showModal}
      >
        Modal Example 3 Open
      </button>
      <div className="modal-3-wrapper">
        <MyModal id="modal-3" keepMounted={true} />
      </div>
    </>
  )
}

export default ModalExample1
