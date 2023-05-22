import React, { useEffect, useCallback, useContext } from "react"
import {
  dispatch,
  showModal,
  hideModal,
  removeModal,
  setModalFlags,
  ModalIdContext,
  ModalContext,
  ALREADY_MOUNTED,
  MODAL_REGISTRY,
  modalCallbacks,
  hideModalCallbacks,
} from "./ModalStore"
import { getModalId } from "./utils"

import type {
  ModalArgs,
  ModalDefProps,
  ModalHandler,
  ModalHocProps,
} from "./typings"

/*  All registered modals will be rendered in modal container */
export const register = <T extends React.FC<any>>(
  id: string,
  comp: T,
  props?: Partial<ModalArgs<T>>
) => {
  if (!MODAL_REGISTRY[id]) {
    MODAL_REGISTRY[id] = { comp, props }
  } else {
    MODAL_REGISTRY[id].props = props
  }
}

/**
 * Unregister a modal.
 * @param id - The id of the modal.
 */
export const unregister = (id: string): void => {
  delete MODAL_REGISTRY[id]
}

export function show<T extends any, C extends any>(
  modal: React.FC<C>,
  args?: Partial<ModalArgs<React.FC<C>>>,
  props?: Partial<ModalArgs<C>>
): Promise<T>

export function show<T extends any>(
  modal: string,
  args?: Record<string, unknown>
): Promise<T>
export function show<T extends any, P extends any>(
  modal: string,
  args: P
): Promise<T>

export function show(
  modal: React.FC<any> | string,
  args?: ModalArgs<React.FC<any>> | Record<string, unknown>,
  props?: Record<string, unknown>
) {
  const modalId = getModalId(modal)
  if (typeof modal !== "string" && !MODAL_REGISTRY[modalId]) {
    register(modalId, modal, props)
  }

  dispatch(showModal(modalId, args))
  if (!modalCallbacks[modalId]) {
    let theResolve!: (args?: unknown) => void
    let theReject!: (args?: unknown) => void

    const promise = new Promise((resolve, reject) => {
      theResolve = resolve
      theReject = reject
    })
    modalCallbacks[modalId] = {
      resolve: theResolve,
      reject: theReject,
      promise,
    }
  }
  return modalCallbacks[modalId].promise
}

export const hide = (modal: string | React.FC<any>) => {
  const modalId = getModalId(modal)
  dispatch(hideModal(modalId))
  delete modalCallbacks[modalId]

  if (!hideModalCallbacks[modalId]) {
    let theResolve!: (args?: unknown) => void
    let theReject!: (args?: unknown) => void

    const promise = new Promise((resolve, reject) => {
      theResolve = resolve
      theReject = reject
    })
    hideModalCallbacks[modalId] = {
      resolve: theResolve,
      reject: theReject,
      promise,
    }
  }
  return hideModalCallbacks[modalId].promise
}

export const remove = (modalId: string): void => {
  dispatch(removeModal(modalId))
  delete modalCallbacks[modalId]
  delete hideModalCallbacks[modalId]
}

export const setFlags = (modalId: string, flags: Record<string, unknown>) => {
  dispatch(setModalFlags(modalId, flags))
}

export function useModal(): ModalHandler
export function useModal(
  modal: string,
  args?: Record<string, unknown>
): ModalHandler
export function useModal<
  T extends React.FC<any>,
  ComponentProps extends ModalArgs<T>,
  PreparedProps extends Partial<ComponentProps> = {} | ComponentProps,
  RemainingProps = Omit<ComponentProps, keyof PreparedProps> &
    Partial<ComponentProps>,
  ResolveType = unknown
>(
  modal: T,
  args?: PreparedProps
): Omit<ModalHandler, "show"> & {
  show: Partial<RemainingProps> extends RemainingProps
    ? (args?: RemainingProps) => Promise<ResolveType>
    : (args: RemainingProps) => Promise<ResolveType>
}

export function useModal(modal?: any, args?: any): any {
  const modals = useContext(ModalContext)
  const contextModalId = useContext(ModalIdContext)
  let modalId: string | null = null
  const isUseComponent = modal && typeof modal !== "string"

  modalId = !!modal ? getModalId(modal) : contextModalId
  const mid = modalId as string

  if (!modalId) throw new Error("No modal id found in ModalManager.useModal.")

  // If use a component directly, register it.
  useEffect(() => {
    if (isUseComponent && !MODAL_REGISTRY[mid]) {
      register(mid, modal as React.FC, args)
    }
  }, [isUseComponent, mid, modal, args])

  const modalInfo = modals[mid]

  const showCallback = useCallback(
    (args?: Record<string, unknown>) => show(mid, args),
    [mid]
  )
  const hideCallback = useCallback(() => hide(mid), [mid])
  const removeCallback = useCallback(() => remove(mid), [mid])
  const resolveCallback = useCallback(
    (args?: unknown) => {
      modalCallbacks[mid]?.resolve(args)
      delete modalCallbacks[mid]
    },
    [mid]
  )
  const rejectCallback = useCallback(
    (args?: unknown) => {
      modalCallbacks[mid]?.reject(args)
      delete modalCallbacks[mid]
    },
    [mid]
  )
  const resolveHide = useCallback(
    (args?: unknown) => {
      hideModalCallbacks[mid]?.resolve(args)
      delete hideModalCallbacks[mid]
    },
    [mid]
  )

  return {
    id: mid,
    args: modalInfo?.args,
    visible: !!modalInfo?.visible,
    keepMounted: !!modalInfo?.keepMounted,
    show: showCallback,
    hide: hideCallback,
    remove: removeCallback,
    resolve: resolveCallback,
    reject: rejectCallback,
    resolveHide,
  }
}

export const create = <P extends {}>(
  Comp: React.ComponentType<P>
): React.FC<P & ModalHocProps> => {
  return function ModalHOC(modalProps) {
    const { keepMounted, id } = modalProps
    const modal = useModal(id)

    const { args, show, ...restModalargs } = modal

    const modals = useContext(ModalContext)

    const shouldMount = !!modals[id]

    useEffect(() => {
      ALREADY_MOUNTED[id] = true

      return () => {
        delete ALREADY_MOUNTED[id]
      }
    }, [id, show])

    useEffect(() => {
      if (keepMounted) setFlags(id, { keepMounted: true })
    }, [id, keepMounted])

    const delayVisible = modals[id]?.delayVisible

    useEffect(() => {
      if (delayVisible) {
        show(args)
      }
    }, [delayVisible, args, show])

    if (!shouldMount) return null

    return (
      <ModalIdContext.Provider value={id}>
        <Comp {...modalProps} {...args} {...restModalargs} />
      </ModalIdContext.Provider>
    )
  }
}

/**
 * Declarative way to register a modal.
 * @param id - The id of the modal.
 * @param component - The modal Component.
 * @returns
 */
export const ModalDef: React.FC<ModalDefProps> = ({
  id,
  component,
}: {
  id: string
  component: React.FC<any>
}) => {
  useEffect(() => {
    register(id, component)
    return () => {
      unregister(id)
    }
  }, [id, component])
  return null
}
