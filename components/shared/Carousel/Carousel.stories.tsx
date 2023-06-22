import type { Meta, StoryObj } from "@storybook/react";
import Carousel, { mockCarouselItems } from ".";

const meta: Meta<typeof Carousel> = {
  title: "Data Display/Carousel",
  component: Carousel,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-full">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Carousel>;

export const Playground: Story = {
  render: (args) => <Carousel {...args} />,
};

Playground.args = {
  items: mockCarouselItems,
  itemWidth: 300,
  itemHeight: 200,
  itemsToSlide: 2,
  autoplay: true,
};

export const ImageError: Story = {
  render: (args) => <Carousel {...args} />,
};

ImageError.args = {
  items: mockCarouselItems.map((item, i) =>
    i === 1 ? { ...item, imgUrl: "" } : item
  ),
  itemWidth: 300,
  itemHeight: 200,
  itemsToSlide: 1,
};
