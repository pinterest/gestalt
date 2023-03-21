import type { Node } from 'react';
type Props = {
  /**
   * `onDismissStart` is passed as render props to any children.
   */
  children: (arg0: { onDismissStart: () => void }) => Node;
};
/**
 * DismissingElement is a render props component that provides access to the callback function `onDismissStart`. `onDismissStart` triggers the exit-animation from external trigger points in a component. Internal trigger points are pressing `ESC` key, built-in dismiss buttons, and clicking outside the component. Use DismissingElement when external elements to the component, such as header, footer or any content element require dismissing the animated component.
 */
declare function DismissingElement({ children }: Props): Node;
declare namespace DismissingElement {
  var displayName: string;
}
export default DismissingElement;
