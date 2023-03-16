// @flow strict

import { type Node } from 'react';
import { useAnimation } from './AnimationContext.js';

const DismissingElement = ({
  children,
}: {|
  children: ({| onDismissStart: () => void |}) => Node,
|}): Node => {
  const { onExternalDismiss } = useAnimation();

  return children({ onDismissStart: onExternalDismiss });
};

export default DismissingElement;
