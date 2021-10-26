import type { Node } from "react";
import Mask from "./Mask";

/*
  Much of the math and understanding about this component comes from @vjeaux's
  excellent blog post on image resizing.

  http://blog.vjeux.com/2013/image/css-container-and-cover.html

  I highly recommend you read that first before continuing on reading.
*/
const aspectRatio = (width, height) => width / height;

type Props = {
  children?: Node;
  contentAspectRatio: number;
  height: number;
  width: number;
};
/**
 * https://gestalt.pinterest.systems/Letterbox
 */

export default function Letterbox({
  children,
  contentAspectRatio,
  height,
  width,
}: Props): Node {
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
      <div
        style={{
          marginTop: offsetTop,
          marginLeft: offsetLeft,
        }}
      >
        <Mask width={contentWidth} height={contentHeight}>
          {children}
        </Mask>
      </div>
    </Mask>
  );
}