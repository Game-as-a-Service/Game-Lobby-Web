import React from "react";
import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Avatar from ".";

// bypass the optimization on images
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    const { src, ...rest } = props;
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img src={src} {...rest} />;
  },
}));

describe("Avatar", () => {
  const src = "non-existent-image.jpg";

  it("renders the image with the correct source", () => {
    const { getByRole } = render(
      <Avatar src={src} type="image" isOnline={false} size="default" />
    );
    const image = getByRole("img");
    expect(image).toHaveAttribute("src", src);
  });

  it("renders the image fallback if the image src is empty", () => {
    const { getByTestId } = render(
      <Avatar src="" type="image" isOnline={false} size="default" />
    );
    const imageFallback = getByTestId("image-fallback");
    expect(imageFallback).toBeInTheDocument();
  });

  it("calls the onError handler when the image fails to load and renders the image fallback", () => {
    const onError = jest.fn();
    const { getByRole, getByTestId } = render(
      <Avatar src={src} type="image" size="default" isOnline />
    );
    const image = getByRole("img");
    expect(image).toHaveAttribute("src", src);
    expect(onError).not.toHaveBeenCalled();

    image.onerror = onError;
    fireEvent.error(image);
    expect(onError).toHaveBeenCalled();

    // The image should be replaced with the fallback image
    expect(image).not.toBeInTheDocument();
    const imageFallback = getByTestId("image-fallback");
    expect(imageFallback).toBeInTheDocument();
  });

  it("renders an online badge if the user is online", () => {
    const { getByTestId } = render(
      <Avatar src={src} type="image" isOnline size="default" />
    );
    const onlineBadge = getByTestId("online-badge");
    expect(onlineBadge).toBeInTheDocument();
  });

  it('navigate to the correct route when the avatar with "link" type is clicked', () => {
    const href = "/login";
    const { getByRole } = render(
      <Avatar src={src} type="link" href={href} size="default" isOnline />
    );
    const avatar = getByRole("link");
    expect(avatar).toHaveAttribute("href", href);
  });

  it("calls the correct function when the avatar with 'button' type is clicked", () => {
    const onClick = jest.fn();
    const { getByRole } = render(
      <Avatar
        src={src}
        type="button"
        onClick={onClick}
        size="default"
        isOnline
      />
    );
    const avatar = getByRole("button");
    avatar.click();
    expect(onClick).toHaveBeenCalled();
  });
});
