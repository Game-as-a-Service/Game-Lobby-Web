export interface ModalState {
  id: string
  args?: Record<string, unknown>
  visible?: boolean
  delayVisible?: boolean
  keepMounted?: boolean
}

export interface ModalStore {
  [key: string]: ModalState
}

export interface ModalHocProps {
  id: string
  defaultVisible?: boolean
  keepMounted?: boolean
}

export interface ModalAction {
  type: string
  payload: {
    modalId: string
    args?: Record<string, unknown>
    flags?: Record<string, unknown>
  }
}

export interface ModalCallbacks {
  [modalId: string]: {
    resolve: (args: unknown) => void
    reject: (args: unknown) => void
    promise: Promise<unknown>
  }
}

export interface ModalDefProps {
  id: string
  component: React.FC<any>
}

/**
 * The handler to manage a modal returned by {@link useModal | useModal} hook.
 */
export interface ModalHandler<Props = Record<string, unknown>>
  extends ModalState {
  /**
   * Whether a modal is visible, it's controlled by {@link ModalHandler.show | show}/{@link ModalHandler.hide | hide} method.
   */
  visible: boolean
  /**
   * If you don't want to remove the modal from the tree after hide when using helpers, set it to true.
   */
  keepMounted: boolean
  /**
   * Show the modal, it will change {@link ModalHandler.visible | visible} state to true.
   * @param args - an object passed to modal component as props.
   */
  show: (args?: Props) => Promise<unknown>
  /**
   * Hide the modal, it will change {@link ModalHandler.visible | visible} state to false.
   */
  hide: () => Promise<unknown>
  /**
   * Resolve the promise returned by {@link ModalHandler.show | show} method.
   */
  resolve: (args?: unknown) => void
  /**
   * Reject the promise returned by {@link ModalHandler.show | show} method.
   */
  reject: (args?: unknown) => void
  /**
   * Remove the modal component from React component tree. It improves performance compared to just making a modal invisible.
   */
  remove: () => void

  /**
   * Resolve the promise returned by {@link ModalHandler.hide | hide} method.
   */
  resolveHide: (args?: unknown) => void
}

export type ModalArgs<T> = T extends
  | keyof JSX.IntrinsicElements
  | React.JSXElementConstructor<any>
  ? Omit<React.ComponentProps<T>, "id">
  : Record<string, unknown>
