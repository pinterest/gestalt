import type { Node as ReactNode } from "react";
import { Component } from "react";
import { ESCAPE } from "./keyCodes";
import type { Role } from "./Contents";
import Contents from "./Contents";
import OutsideEventBehavior from "./behaviors/OutsideEventBehavior";
import { useScrollBoundaryContainer } from "./contexts/ScrollBoundaryContainer";
import type { ClientRect, Coordinates } from "./utils/positioningTypes";
import { getTriggerRect } from "./utils/positioningUtils";
const SIZE_WIDTH_MAP = {
  xs: 180,
  sm: 230,
  md: 284,
  lg: 320,
  xl: 360,
};
type OwnProps = {
  anchor: HTMLElement;
  bgColor: "blue" | "darkGray" | "orange" | "red" | "white";
  border?: boolean;
  caret?: boolean;
  children?: ReactNode;
  handleKeyDown?: (event: React.KeyboardEvent<HTMLElement>) => void;
  id?: string | null | undefined;
  idealDirection?: "up" | "right" | "down" | "left";
  onDismiss: () => void;
  positionRelativeToAnchor: boolean;
  role?: Role | null | undefined;
  rounding?: 2 | 4;
  shouldFocus?: boolean;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | number | null;
};
type HookProps = {
  scrollBoundaryContainerRef: HTMLElement | null | undefined;
};
type Props = OwnProps & HookProps;
type State = {
  relativeOffset: Coordinates;
  triggerBoundingRect: ClientRect;
};

class Controller extends Component<Props, State> {
  static defaultProps: {
    size: "xs" | "sm" | "md" | "lg" | "xl" | number | null;
  } = {
    // Default size only applies when size is omitted,
    // if passed as null it will remain null
    size: "sm",
  };
  state = {
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

  static getDerivedStateFromProps({
    anchor,
    positionRelativeToAnchor,
    scrollBoundaryContainerRef,
  }: Props) {
    return getTriggerRect({
      anchor,
      positionRelativeToAnchor,
      scrollBoundaryContainerRef,
    });
  }

  componentDidMount() {
    this.updateTriggerRect(this.props);
  }

  handleKeyDown: (event: React.KeyboardEvent<HTMLElement>) => void = (
    event
  ) => {
    const { handleKeyDown, onDismiss } = this.props;

    if (event.keyCode === ESCAPE) {
      onDismiss();
    }

    if (handleKeyDown) handleKeyDown(event);
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
  updateTriggerRect: (arg0: Props) => void = ({
    anchor,
    positionRelativeToAnchor,
    scrollBoundaryContainerRef,
  }: Props) => {
    const { relativeOffset, triggerBoundingRect } = getTriggerRect({
      anchor,
      positionRelativeToAnchor,
      scrollBoundaryContainerRef,
    });
    this.setState({
      relativeOffset,
      triggerBoundingRect,
    });
  };

  render(): ReactNode {
    const {
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
    } = this.props;
    const { relativeOffset, triggerBoundingRect } = this.state;
    const width = typeof size === "string" ? SIZE_WIDTH_MAP[size] : size;
    return (
      <OutsideEventBehavior onClick={this.handlePageClick}>
        <Contents
          anchor={anchor}
          bgColor={bgColor}
          border={border}
          caret={caret}
          id={id}
          idealDirection={idealDirection}
          onKeyDown={this.handleKeyDown}
          onResize={this.handleResize}
          positionRelativeToAnchor={positionRelativeToAnchor}
          relativeOffset={relativeOffset}
          role={role}
          rounding={rounding}
          shouldFocus={shouldFocus}
          triggerRect={triggerBoundingRect}
          width={width}
        >
          {children}
        </Contents>
      </OutsideEventBehavior>
    );
  }
}

const WrappedController = (props: OwnProps): ReactNode => {
  const { scrollBoundaryContainerRef = null } = useScrollBoundaryContainer();
  return (
    <Controller
      {...props}
      scrollBoundaryContainerRef={scrollBoundaryContainerRef}
    />
  );
};

export default WrappedController;