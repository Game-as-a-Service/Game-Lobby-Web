import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Card, { CardProps } from "./Card";
import CardActions from "./CardActions";

jest.mock("path/to/image.svg", () => "svg");

const props: CardProps = {
  game: {
    id: "1",
    imgUrl: "http://localhost:3030/images/game-avatar.jpg",
    name: "矮人礦坑(Mystic Elven Mines)",
    price: 100,
    rating: 4.5,
    category: ["益智", "多人"],
  },
  actions: <CardActions />,
};

describe("Card", () => {
  it("Render <Card />", () => {
    const { getByTestId } = render(<Card {...props} />);
    const card = getByTestId("card");
    expect(card).toBeInTheDocument();
  });

  it("Should find cover", () => {
    const { getByTestId, getByRole } = render(<Card {...props} />);
    const cover = getByTestId("card__cover");
    expect(cover).toBeInTheDocument();
    const img = getByRole("img", { name: props.game.name });
    expect(img).toBeInTheDocument();
    expect(img.getAttribute("src")).toMatch(/game-avatar\.jpg/);
    expect(img.getAttribute("alt")).toBe("矮人礦坑(Mystic Elven Mines)");
  });

  it("Should find category", () => {
    const { getByTestId } = render(<Card {...props} />);
    const category = getByTestId("card__category");
    expect(category).toBeInTheDocument();
    expect(category?.childElementCount).toBe(2);
    expect(category).toHaveTextContent("益智");
    expect(category).toHaveTextContent("多人");
  });

  it("Should find title", () => {
    const { getByTestId } = render(<Card {...props} />);
    const title = getByTestId("card__title");
    expect(title).toBeInTheDocument();
    expect(title.textContent).toBe("矮人礦坑(Mystic Elven Mines)");
  });

  it("Should find price", () => {
    const { getByTestId } = render(<Card {...props} />);
    const price = getByTestId("card__price");
    expect(price).toBeInTheDocument();
    expect(price).toHaveTextContent("價格: 100");
  });

  it("Should find rating", () => {
    const { getByTestId } = render(<Card {...props} />);
    const rating = getByTestId("card__rating");
    expect(rating).toBeInTheDocument();
    expect(rating.textContent).toBe("4.5");
  });

  it("Render <CardActions /> and has 3 buttons", () => {
    const { getByTestId } = render(<Card {...props} />);
    const card_actions = getByTestId("card__actions");
    expect(card_actions).toBeInTheDocument();
    expect(card_actions?.childElementCount).toBe(3);
  });

  it("Should find create room button", () => {
    const { getByTestId, getByText } = render(<Card {...props} />);
    const create_button = getByTestId("create");
    expect(create_button).toBeInTheDocument();
    expect(create_button).toHaveTextContent("開設新房間");
  });

  it("Should find join room button", () => {
    const { getByTestId } = render(<Card {...props} />);
    const join_button = getByTestId("join");
    expect(join_button).toBeInTheDocument();
    expect(join_button).toHaveTextContent("加入現有房間");
  });

  it("Should find info room button", () => {
    const { getByTestId } = render(<Card {...props} />);
    const info_button = getByTestId("info");
    expect(info_button).toBeInTheDocument();
    expect(info_button).toHaveTextContent("遊戲詳情");
  });
});
