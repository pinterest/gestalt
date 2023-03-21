import type { Node } from 'react';
import 'react';
type Column = 2 | 3 | 4;
type Props = {
  /**
   * Number of columns (2 - 4). Note that Collage assumes at least 2 * `columns` images will be provided. If fewer images are provided, care will be needed to avoid TypeErrors. See [Columns example](https://gestalt.pinterest.systems#columns) for more details.
   */
  columns: Column;
  /**
   * Whether or not the first image is a cover image. See [Cover Image example](https://gestalt.pinterest.systems#coverImage) for more details.
   */
  cover?: boolean;
  /**
   * The amount of vertical and horizontal space between images. See [Gutter example](https://gestalt.pinterest.systems#gutter) for more details.
   */
  gutter?: number;
  /**
   * Height of the collage.
   */
  height: number;
  /**
   * Depending on the number of columns of the collage, there may be multiple layouts available. If there are N layouts available, (layoutKey % N) will determine which layout is used. See [Layout Key example](https://gestalt.pinterest.systems#layoutKey) for more details.
   */
  layoutKey?: number;
  /**
   * Callback to render the collage images.
   */
  renderImage: (arg0: { width: number; height: number; index: number }) => Node;
  /**
   * Width of the collage.
   */
  width: number;
};
/**
 *  [Collage](https://gestalt.pinterest.systems/web/collage), similarly to [Masonry](https://gestalt.pinterest.systems/web/masonry), creates a deterministic grid layout that can absolutely position and virtualize images.
 *
 * ![Collage light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Collage.spec.mjs-snapshots/Collage-chromium-darwin.png)
 * ![Collage dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Collage-dark.spec.mjs-snapshots/Collage-dark-chromium-darwin.png)
 *
 */
export default function Collage(props: Props): Node;
export {};
