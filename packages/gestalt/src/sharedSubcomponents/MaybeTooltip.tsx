import { type ReactElement } from 'react';
import InternalTooltip from '../Tooltip/InternalTooltip';
import { type Indexable } from '../zIndex';

type TooltipProps = {
  accessibilityLabel?: string;
  inline?: boolean;
  idealDirection?: 'up' | 'right' | 'down' | 'left';
  text: string | ReadonlyArray<string>;
  zIndex?: Indexable;
};

export default function MaybeTooltip({
  children,
  disabled,
  tooltip,
}: {
  children: ReactElement;
  disabled?: boolean;
  tooltip?: TooltipProps;
}) {
  if (!tooltip) return children;

  return (
    <InternalTooltip
      accessibilityLabel={tooltip.accessibilityLabel}
      disabled={disabled}
      idealDirection={tooltip?.idealDirection || 'up'}
      inline={tooltip.inline}
      text={tooltip.text}
      zIndex={tooltip?.zIndex}
    >
      {children}
    </InternalTooltip>
  );
}
