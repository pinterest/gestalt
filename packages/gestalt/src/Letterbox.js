// @flow strict
import { type Node } from 'react';
import Mask from './Mask.js';

/*
  Much of the math and understanding about this component comes from @vjeaux's
  excellent blog post on image resizing.

  http://blog.vjeux.com/2013/image/css-container-and-cover.html

  I highly recommend you read that first before continuing on reading.
*/

const aspectRatio = (width: number, height: number) => width / height;

type Props = {|
  /**
   * The media to be displayed.
   */
  children?: Node,
  /**
   * Proportional relationship between width and height of element.
   */
  contentAspectRatio: number,
  /**
   * Desired final height of element in pixels.
   */
  height: number,
  /**
   * Desired final width of element in pixels.
   */
  width: number,
|};

/**
 * [Letterbox](https://gestalt.pinterest.systems/web/letterbox) is useful if you have some source media which is larger than the area you want to display it in. For instance, you might have a really tall image and want it to be displayed in a neatly cropped square. While the ideal solution to this problem is to update the source image, this might not always be possible for either cost or performance reasons.
 *
 * Letterbox should be used in situations where you would otherwise use the CSS property `background-size: cover`.
 *
 * ![Letterbox light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Letterbox.spec.mjs-snapshots/Letterbox-chromium-darwin.png)

 */
export default function Letterbox({ children, contentAspectRatio, height, width }: Props): Node {
  const viewportAspectRatio = aspectRatio(width, height);

  let contentHeight;
  let contentWidth;

  if (contentAspectRatio < viewportAspectRatio) {
    contentWidth = width;
    contentHeight = width / contentAspectRatio;
  } else {
    contentWidth = height * contentAspectRatio;
    contentHeight = height;
  }

  const offsetTop = (contentHeight - height) / -2;
  const offsetLeft = (contentWidth - width) / -2;

  return (
    <Mask width={width} height={height}>
      <div style={{ marginTop: offsetTop, marginLeft: offsetLeft }}>
        <Mask width={contentWidth} height={contentHeight}>
          {children}
        </Mask>
      </div>
    </Mask>
  );
}
