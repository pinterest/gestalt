import {Component, ReactNode} from 'react';
import OutsideEventBehavior from './behaviors/OutsideEventBehavior';
import { Overflow } from './boxTypes';
import { useScrollBoundaryContainer } from './contexts/ScrollBoundaryContainerProvider';
import { ESCAPE } from './keyCodes';
import LegacyContents, { Role } from './LegacyContents';
import { ClientRect, Coordinates } from './utils/positioningTypes';
import { getTriggerRect } from './utils/positioningUtils';
import { Indexable } from './zIndex';

const SIZE_WIDTH_MAP = {
  xs: 180,
  sm: 230,
  md: 284,
  lg: 320,
  xl: 360,
} as const;
type OwnProps = {
  accessibilityLabel?: string,
  anchor: HTMLElement,
  bgColor: "blue" | "darkGray" | "white",
  border?: boolean,
  caret?: boolean,
  children?: ReactNode,
  onKeyDown?: (
    arg1: {
      event: React.KeyboardEvent<HTMLElement>
    },
  ) => void,
  id?: string | null | undefined,
  idealDirection?: "up" | "right" | "down" | "left" | "forceDown",
  onDismiss: () => void,
  positionRelativeToAnchor: boolean,
  role?: Role | null | undefined,
  rounding?: 2 | 4,
  shouldFocus?: boolean,
  size?: "xs" | "sm" | "md" | "lg" | "xl" | number | null,
  __dangerouslyIgnoreScrollBoundaryContainerSize?: boolean,
  zIndex?: Indexable,
  overflow?: Extract<Overflow, "auto" | "hidden" | "visible">
};

type HookProps = {
  scrollBoundaryContainerRef: HTMLElement | null | undefined
};

type Props = ((OwnProps) & (HookProps));

type State = {
  relativeOffset: Coordinates | null | undefined,
  triggerBoundingRect: ClientRect | null | undefined
};

class LegacyController extends Component<Props, State> {
  static defaultProps: {
    size: "xs" | "sm" | "md" | "lg" | "xl" | number | null
  } = {
    // Default size only applies when size is omitted,
    // if passed as null it will remain null
    size: 'sm',
  };

  state: State = {
    relativeOffset: {
      x: 0,
      y: 0,
    },
    triggerBoundingRect: {
      bottom: 0,
      height: 0,
      left: 0,
      right: 0,
      top: 0,
      width: 0,
    },
  };

  static getDerivedStateFromProps(
    {
      anchor,
      positionRelativeToAnchor,
      scrollBoundaryContainerRef,
    }: Props,
  ): {
    relativeOffset: Coordinates | null | undefined,
    triggerBoundingRect: ClientRect | null | undefined
  } {
    return getTriggerRect({
      anchor,
      positionRelativeToAnchor,
      scrollBoundaryContainerRef,
    });
  }

  componentDidMount() {
    this.updateTriggerRect(this.props);
  }

  handleKeyDown: (event: React.KeyboardEvent<HTMLElement>) => void = (event) => {
    const { onKeyDown, onDismiss } = this.props;
    if (event.keyCode === ESCAPE) {
      onDismiss();
    }
    if (onKeyDown) onKeyDown?.({ event });
  };

  handlePageClick: (event: Event) => void = (event) => {
    const { anchor, onDismiss } = this.props;
    if (event.target instanceof Node && !anchor.contains(event.target)) {
      onDismiss();
    }
  };

  handleResize: () => void = () => {
    this.updateTriggerRect(this.props);
  };

  updateTriggerRect: (arg1: Props) => void = ({
    anchor,
    positionRelativeToAnchor,
    scrollBoundaryContainerRef,
  }: Props) => {
    const { relativeOffset, triggerBoundingRect } = getTriggerRect({
      anchor,
      positionRelativeToAnchor,
      scrollBoundaryContainerRef,
    });
    this.setState({ relativeOffset, triggerBoundingRect });
  };

  render(): ReactNode {
    const {
      accessibilityLabel,
      anchor,
      bgColor,
      border,
      caret,
      children,
      id,
      idealDirection,
      positionRelativeToAnchor,
      role,
      rounding,
      shouldFocus,
      size,
      __dangerouslyIgnoreScrollBoundaryContainerSize,
      zIndex,
      overflow,
    } = this.props;
    const { relativeOffset, triggerBoundingRect } = this.state;

    const width = typeof size === 'string' ? SIZE_WIDTH_MAP[size] : size;

    return (
      <OutsideEventBehavior onClick={this.handlePageClick}>
        <LegacyContents
          __dangerouslyIgnoreScrollBoundaryContainerSize={
            __dangerouslyIgnoreScrollBoundaryContainerSize
          }
          accessibilityLabel={accessibilityLabel}
          anchor={anchor}
          bgColor={bgColor}
          border={border}
          caret={caret}
          id={id}
          idealDirection={idealDirection}
          onKeyDown={this.handleKeyDown}
          onResize={this.handleResize}
          overflow={overflow}
          positionRelativeToAnchor={positionRelativeToAnchor}
          relativeOffset={relativeOffset}
          role={role}
          rounding={rounding}
          shouldFocus={shouldFocus}
          triggerRect={triggerBoundingRect}
          width={width}
          zIndex={zIndex}
        >
          {children}
        </LegacyContents>
      </OutsideEventBehavior>
    );
  }
}

function WrappedLegacyController(props: OwnProps) {
  const { scrollBoundaryContainerRef = null } = useScrollBoundaryContainer();
  return <LegacyController {...props} scrollBoundaryContainerRef={scrollBoundaryContainerRef} />;
}

export default WrappedLegacyController;
