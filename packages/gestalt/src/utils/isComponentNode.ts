import { Children, type ReactElement } from 'react';

// If `text` is a Text / Link component, we need to override any text colors within to ensure they all match
const isComponentNode = ({
  text,
  components,
}: {
  text: string | ReactElement;
  components: ReadonlyArray<string>;
}): boolean =>
  typeof text !== 'string' &&
  // @ts-expect-error - TS2339
  components.includes(Children.only<ReactElement>(text).type.displayName);

export default isComponentNode;
