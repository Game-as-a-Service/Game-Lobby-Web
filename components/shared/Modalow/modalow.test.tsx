import { render, fireEvent, screen } from "@testing-library/react";
import { ModalProps, Modalow } from "./Modalow";
import React from "react";
import userEvent from "@testing-library/user-event";

const modalProps: ModalProps = {
  isOpen: true,
  title: "Test Modal",
  onClose: () => {},
  children: <div>Test Content</div>,
};

describe("Modal", () => {
  /**
   * Rendering test
   */
  it("should render Modal with default props", () => {
    render(<Modalow {...modalProps} />);
    const modal = screen.getByTestId("modal");
    expect(modal).toBeInTheDocument();
    expect(modal).toHaveClass("modal__container__dialog");
    expect(screen.getByText("Test Modal")).toBeInTheDocument();
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("should not render Modal when isOpen is false", () => {
    render(<Modalow {...modalProps} isOpen={false} />);
    const modal = screen.queryByTestId("modal"); // use queryByTestId instead of getByTestId
    expect(modal).toBeNull();
  });

  /**
   * onClost test
   */
  it("should call onClose when close icon is clicked", async () => {
    const modalProps: ModalProps = {
      isOpen: true,
      title: "Test Modal",
      onClose: jest.fn(),
      children: <div>Test Content</div>,
    };
    render(<Modalow {...modalProps} />);
    const closeIcon = screen.getByTestId("close-icon");
    await userEvent.click(closeIcon);
    expect(modalProps.onClose).toHaveBeenCalled();
  });
  /**
   * maskClosable test
   */
  it("should not call onClose when clicking outside of the modal mask", async () => {
    const modalProps: ModalProps = {
      isOpen: true,
      title: "Test Modal",
      onClose: jest.fn(),
      children: <div>Test Content</div>,
      maskClosable: false,
    };
    render(<Modalow {...modalProps} />);
    const mask = screen.getByTestId("modal-mask");
    await userEvent.click(mask);
    expect(modalProps.onClose).not.toHaveBeenCalled();
  });

  it("should call onClose when clicking outside of the modal mask", async () => {
    const modalProps: ModalProps = {
      isOpen: true,
      title: "Test Modal",
      onClose: jest.fn(),
      children: <div>Test Content</div>,
      maskClosable: true,
    };
    render(<Modalow {...modalProps} />);
    const mask = screen.getByTestId("modal-mask");
    await userEvent.click(mask);
    expect(modalProps.onClose).toHaveBeenCalled();
  });
  /**
   * hasTitle test
   */
  it("should render the modal title when hasTitle is true", () => {
    const modalProps = {
      isOpen: true,
      title: "Test Modal",
      hasTitle: true,
      onClose: jest.fn(),
      children: <div>Modal Content</div>,
    };
    render(<Modalow {...modalProps} />);
    const title = screen.getByText("Test Modal");
    expect(title).toBeInTheDocument();
  });

  it("should not render the modal title when hasTitle is false", () => {
    const modalProps = {
      isOpen: true,
      title: "Test Modal",
      hasTitle: false,
      onClose: jest.fn(),
      children: <div>Modal Content</div>,
    };
    render(<Modalow {...modalProps} />);
    const title = screen.queryByText("Test Modal");
    expect(title).not.toBeInTheDocument();
  });
  /**
   * hideCloseIcon test
   */
  it("should render the close icon when hideCloseIcon is false", () => {
    const modalProps = {
      isOpen: true,
      title: "Test Modal",
      hideCloseIcon: false,
      onClose: jest.fn(),
      children: <div>Modal Content</div>,
    };
    render(<Modalow {...modalProps} />);
    const closeIcon = screen.getByTestId("close-icon");
    expect(closeIcon).toBeInTheDocument();
  });

  it("should not render the close icon when hideCloseIcon is true", () => {
    const modalProps = {
      isOpen: true,
      title: "Test Modal",
      hideCloseIcon: true,
      onClose: jest.fn(),
      children: <div>Modal Content</div>,
    };
    render(<Modalow {...modalProps} />);
    const closeIcon = screen.queryByTestId("close-icon"); // use queryByTestId instead of getByTestId
    expect(closeIcon).not.toBeInTheDocument();
  });
  /**
   * fullScreen test
   */
  it("should add `w-screen h-screen` class and remove `transform -translate-x-1/2` class when fullScreen is true", () => {
    const modalProps = {
      isOpen: true,
      title: "Test Modal",
      onClose: jest.fn(),
      children: <div>Modal Content</div>,
      fullScreen: true,
    };
    render(<Modalow {...modalProps} />);
    const modalContainer = screen.getByTestId("modal-container");
    const modal = screen.getByTestId("modal");

    expect(modalContainer).not.toHaveClass("transform");
    expect(modalContainer).not.toHaveClass("-translate-x-1/2");

    expect(modal).toHaveClass("w-screen");
    expect(modal).toHaveClass("h-screen");
  });

  it("should add `transform -translate-x-1/2` class and remove `w-screen h-screen` class when fullScreen is false", () => {
    const modalProps = {
      isOpen: true,
      title: "Test Modal",
      onClose: jest.fn(),
      children: <div>Modal Content</div>,
      fullScreen: false,
    };
    render(<Modalow {...modalProps} />);
    const modalContainer = screen.getByTestId("modal-container");
    const modal = screen.getByTestId("modal");

    expect(modalContainer).toHaveClass("transform");
    expect(modalContainer).toHaveClass("-translate-x-1/2");

    expect(modal).not.toHaveClass("w-screen");
    expect(modal).not.toHaveClass("h-screen");
  });
  /**
   * footer test
   */
  it("should render the footer when footer prop is provided", () => {
    const modalProps = {
      isOpen: true,
      title: "Test Modal",
      onClose: jest.fn(),
      children: <div>Modal Content</div>,
      footer: <div>Modal Footer</div>,
    };
    render(<Modalow {...modalProps} />);
    const footer = screen.getByText("Modal Footer");
    expect(footer).toBeInTheDocument();
  });

  it("should not render the footer when footer prop is not provided", () => {
    const modalProps = {
      isOpen: true,
      title: "Test Modal",
      onClose: jest.fn(),
      children: <div>Modal Content</div>,
    };
    render(<Modalow {...modalProps} />);
    const footer = screen.queryByText("Modal Footer");
    expect(footer).not.toBeInTheDocument();
  });
  /**
   * hasMask test
   */
  it("should render the mask when hasMask is true", () => {
    const modalProps = {
      isOpen: true,
      title: "Test Modal",
      onClose: jest.fn(),
      children: <div>Modal Content</div>,
      hasMask: true,
    };
    render(<Modalow {...modalProps} />);
    const mask = screen.getByTestId("modal-mask");
    expect(mask).toHaveClass("bg-black");
  });

  it("should not render the mask when hasMask is false", () => {
    const modalProps = {
      isOpen: true,
      title: "Test Modal",
      onClose: jest.fn(),
      children: <div>Modal Content</div>,
      hasMask: false,
    };
    render(<Modalow {...modalProps} />);
    const mask = screen.getByTestId("modal-mask");
    expect(mask).not.toHaveClass("bg-black");
  });
});
