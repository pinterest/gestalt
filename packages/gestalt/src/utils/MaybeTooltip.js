// @flow strict
import { type Node } from 'react';
import Tooltip from '../Tooltip.js';
import { type Indexable } from '../zIndex.js';

type TooltipProps = {|
  accessibilityLabel?: string,
  inline?: boolean,
  idealDirection?: 'up' | 'right' | 'down' | 'left',
  text: string,
  zIndex?: Indexable,
|};

export default function MaybeTooltip({
  children,
  disabled,
  tooltip,
}: {|
  children: Node,
  disabled?: boolean,
  tooltip?: TooltipProps,
|}): Node {
  if (!tooltip || disabled) return children;
  return (
    <Tooltip
      accessibilityLabel={tooltip.accessibilityLabel}
      inline={tooltip.inline}
      idealDirection={tooltip.idealDirection || 'up'}
      text={tooltip.text}
      zIndex={tooltip.zIndex}
    >
      {children}
    </Tooltip>
  );
}
