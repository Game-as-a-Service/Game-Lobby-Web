let uidSeed = 0;

const symModalId = Symbol("ModalId");

const getUid = () => `_modal_${uidSeed++}`;

export const getModalId = (
  modal: string | React.FC<{ [symModalId]?: string }>
): string => {
  if (typeof modal === "string") return modal as string;

  const modalWithId = modal as React.FC<any> & { [symModalId]?: string };

  if (!modalWithId[symModalId]) {
    modalWithId[symModalId] = getUid();
  }

  return modalWithId[symModalId];
};
