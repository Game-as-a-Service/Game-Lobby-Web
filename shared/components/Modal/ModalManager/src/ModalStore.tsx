import React, { useContext, useReducer } from "react"

import type { ModalStore, ModalAction, ModalCallbacks } from "./typings"

const initialState: ModalStore = {}

export const ALREADY_MOUNTED: {
  [id: string]: boolean
} = {}
export const MODAL_REGISTRY: {
  [id: string]: {
    comp: React.FC<any>
    props?: Record<string, unknown>
  }
} = {}

export const modalCallbacks: ModalCallbacks = {}
export const hideModalCallbacks: ModalCallbacks = {}

export const ModalIdContext = React.createContext<string | null>(null)
export const ModalContext = React.createContext<ModalStore>(initialState)

const reducer = (
  state: ModalStore = initialState,
  action: ModalAction
): ModalStore => {
  switch (action.type) {
    case "modal/show": {
      const { modalId, args } = action.payload
      return {
        ...state,
        [modalId]: {
          ...state[modalId],
          id: modalId,
          args,
          visible: !!ALREADY_MOUNTED[modalId],
          delayVisible: !ALREADY_MOUNTED[modalId],
        },
      }
    }
    case "modal/hide": {
      const { modalId } = action.payload
      if (!state[modalId]) return state
      return {
        ...state,
        [modalId]: {
          ...state[modalId],
          visible: false,
        },
      }
    }
    case "modal/remove": {
      const { modalId } = action.payload
      const newState = { ...state }
      delete newState[modalId]
      return newState
    }
    case "modal/set-flags": {
      const { modalId, flags } = action.payload
      return {
        ...state,
        [modalId]: {
          ...state[modalId],
          ...flags,
        },
      }
    }
    default:
      return state
  }
}

export let dispatch: React.Dispatch<ModalAction> = () => {
  throw new Error(
    "No dispatch method detected, did you embed your app with ModalManager.Provider?"
  )
}

export function showModal(
  modalId: string,
  args?: Record<string, unknown>
): ModalAction {
  return {
    type: "modal/show",
    payload: {
      modalId,
      args,
    },
  }
}

export function hideModal(modalId: string): ModalAction {
  return {
    type: "modal/hide",
    payload: {
      modalId,
    },
  }
}

export function removeModal(modalId: string): ModalAction {
  return {
    type: "modal/remove",
    payload: {
      modalId,
    },
  }
}

export function setModalFlags(
  modalId: string,
  flags: Record<string, unknown>
): ModalAction {
  return {
    type: "modal/set-flags",
    payload: {
      modalId,
      flags,
    },
  }
}

// The container component is used to auto render modals when call modal.show()
// When modal.show() is called, it means there've been modal info
const ModalContainer: React.FC = () => {
  const modals = useContext(ModalContext)
  const visibleModalIds = Object.keys(modals).filter((id) => !!modals[id])

  visibleModalIds.forEach((id) => {
    if (!MODAL_REGISTRY[id] && !ALREADY_MOUNTED[id]) {
      // eslint-disable-next-line no-console
      console.warn(
        `No modal found for id: ${id}. Please check the id or if it is registered or declared via JSX.`
      )
      return
    }
  })

  const toRender = visibleModalIds
    .filter((id) => MODAL_REGISTRY[id])
    .map((id) => ({
      id,
      ...MODAL_REGISTRY[id],
    }))
  return (
    <React.Fragment>
      {toRender.map((modal) => {
        return <modal.comp key={modal.id} id={modal.id} {...modal.props} />
      })}
    </React.Fragment>
  )
}

export const Provider = ({
  children,
}: React.PropsWithChildren): React.ReactElement => {
  const [modals, ModalDispatch] = useReducer(reducer, initialState)
  dispatch = ModalDispatch
  return (
    <ModalContext.Provider value={modals}>
      {children}
      <ModalContainer />
    </ModalContext.Provider>
  )
}
