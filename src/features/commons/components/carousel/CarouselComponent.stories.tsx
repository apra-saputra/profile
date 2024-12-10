import type { Meta, StoryObj } from "@storybook/react";
// import { fn } from "@storybook/test";

import { CarouselComponent } from "./CarouselComponent";

// export const CarouselItemComponentMeta: Meta<typeof CarouselItemComponent> = {
//   title: "Carousel Item Component",
//   component: CarouselItemComponent,
//   tags: ["autodocs"],
//   parameters: {
//     layout: "centered",
//   },
//   args: {},
// };

const CarouselComponentMeta: Meta<typeof CarouselComponent> = {
  title: "Carousel Component",
  component: CarouselComponent,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {},
};

export default CarouselComponentMeta;

type StoryCarouselComponent = StoryObj<typeof CarouselComponentMeta>;

export const firstChildren: StoryCarouselComponent = {};
