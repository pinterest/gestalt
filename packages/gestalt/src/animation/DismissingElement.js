// @flow strict
import { Fragment, type Node } from 'react';
import { useRequestAnimationFrame } from './RequestAnimationFrameContext.js';

type Props = {
  /**
   * `onDismissStart` is passed as render props to any children.
   */
  children: ({ onDismissStart: () => void }) => Node,
};

/**
 * DismissingElement is a render props component that provides access to the callback function `onDismissStart`. `onDismissStart` triggers the exit-animation from external trigger points in a component. Internal trigger points are pressing `ESC` key, built-in dismiss buttons, and clicking outside the component. Use DismissingElement when external elements to the component, such as header, footer or any content element require dismissing the animated component.
 */
function DismissingElement({ children }: Props): Node {
  const { onExternalDismiss } = useRequestAnimationFrame();

  return <Fragment>{children({ onDismissStart: onExternalDismiss })}</Fragment>;
}

DismissingElement.displayName = 'DismissingElement';

export default DismissingElement;
