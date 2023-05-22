import { useState, useEffect } from "react"

const useNicknameValidation = () => {
  const [showModal, setShowModal] = useState(true)
  const [hasNickname, setHasNickname] = useState(false)

  useEffect(() => {
    //   get the nickname from Model here
    const nickname = localStorage.getItem("nickname")
    if (nickname) {
      setHasNickname(true)
    } else {
      setShowModal(true)
    }
  }, [])

  const handleDismissModal = () => {
    setShowModal(false)
  }

  const handleNicknameSubmit = (nickname: string) => {
    // localStorage.setItem("nickname", nickname)
    // post request to post nickname here
    setHasNickname(true)
    setShowModal(false)
  }

  return {
    showModal,
    hasNickname,
    handleDismissModal,
    handleNicknameSubmit,
  }
}

export default useNicknameValidation
