import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Modal from ".";

describe("Modal", () => {
  it("should render Modal when isOpen is true", () => {
    render(
      <Modal isOpen title="Test Title">
        Test Content
      </Modal>
    );
    const modal = screen.getByRole("dialog");
    expect(modal).toBeInTheDocument();
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("should not render Modal when isOpen is not setting", () => {
    render(<Modal title="Test Title">Test Content</Modal>);
    const modal = screen.queryByRole("dialog");
    expect(modal).toBeNull();
  });

  it("should call onClose when close button is clicked", async () => {
    const onClose = jest.fn();
    render(
      <Modal isOpen title="Test Title" onClose={onClose}>
        Test Content
      </Modal>
    );
    const closeIcon = screen.getByLabelText("close Test Title modal");
    await userEvent.click(closeIcon);
    expect(onClose).toHaveBeenCalled();
  });

  it("should not call onClose when clicking outside of the modal mask and maskClosable is false", async () => {
    const onClose = jest.fn();
    render(
      <Modal isOpen title="Test Title" onClose={onClose} maskClosable={false}>
        Test Content
      </Modal>
    );
    const mask = screen.getByTestId("modal-mask");
    await userEvent.click(mask);
    expect(onClose).not.toHaveBeenCalled();
  });

  it("should call onClose when clicking outside of the modal mask and maskClosable is default", async () => {
    const onClose = jest.fn();
    render(
      <Modal isOpen title="Test Title" onClose={onClose}>
        Test Content
      </Modal>
    );
    const mask = screen.getByTestId("modal-mask");
    await userEvent.click(mask);
    expect(onClose).toHaveBeenCalled();
  });

  it("should render the close icon when hideCloseIcon is setting", () => {
    render(<Modal isOpen title="Test Title" hideCloseIcon />);
    const closeIcon = screen.queryByLabelText("close Test Title modal");
    expect(closeIcon).toBeNull();
  });
});
