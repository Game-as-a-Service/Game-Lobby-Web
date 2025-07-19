import type { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "@storybook/preview-api";

import Modal, { ModalProps } from "./index";
import Button from "../Button";

const meta: Meta<typeof Modal> = {
  title: "General/Modal",
  component: Modal,
  tags: ["autodocs"],
  decorators: [
    (Story, ctx) => {
      const [, setArgs] = useArgs<typeof ctx.args>();

      const onClose = () => {
        ctx.args.onClose?.();
        setArgs({ isOpen: false });
      };

      return (
        <div className="flex justify-center">
          <div className="w-3/4">
            <Button onClick={() => setArgs({ isOpen: true })}>open</Button>
            <Story args={{ ...ctx.args, onClose }} />
          </div>
        </div>
      );
    },
  ],
  args: {
    isOpen: true,
    size: "medium",
    title: "Modal Title",
    hideCloseIcon: false,
    maskClosable: true,
    children: <div>Modal Body</div>,
    onClose: () => undefined,
  },
};

export default meta;

type Story = StoryObj<ModalProps>;

export const Primary: Story = {
  render: (args) => <Modal {...args} />,
};
