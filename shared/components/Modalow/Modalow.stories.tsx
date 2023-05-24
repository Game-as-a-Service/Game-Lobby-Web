import type { Meta, StoryObj } from "@storybook/react";
import Modalow, { ModalProps } from ".";
import Button from "../Button";
import Input from "../Input";
import { useCallback, useState } from "react";

const meta: Meta<typeof Modalow> = {
  title: "General/Modalow",
  component: Modalow,
};

export default meta;
type Story = StoryObj<ModalProps>;

export const Primary: Story = {
  args: {
    // isOpen: true,
    size: "medium",
    fullScreen: false,
    title: "Title",
    hideCloseIcon: false,
    hasTitle: true,
    hasMask: true,
    maskClosable: true,
    children: (
      <Input className="w-full" value="" placeholder="我說第二誰敢第一?" />
    ),
    footer: <Button>確認新增房間</Button>,
  },
  render: (args) => {
    const {
      // isOpen,
      size,
      fullScreen,
      title,
      hideCloseIcon,
      hasTitle,
      hasMask,
      maskClosable,
      children,
      footer,
    } = args;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open, setOpen] = useState(false);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const onClose = useCallback(() => setOpen(false), []);

    return (
      <>
        <Button onClick={() => setOpen(true)}>open</Button>
        <Modalow
          hasTitle={hasTitle}
          footer={footer}
          fullScreen={fullScreen}
          maskClosable={maskClosable}
          hideCloseIcon={hideCloseIcon}
          hasMask={hasMask}
          isOpen={open}
          title={title}
          onClose={onClose}
          size={size}
        >
          {children}
        </Modalow>
      </>
    );
  },
};
