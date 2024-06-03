import { PureComponent } from 'react';
import Box from '../Box';
import styles from '../Video.css';

type Props = {
  accessibilityProgressBarLabel: string;
  currentTime: number;
  duration: number;
  onPlayheadDown: (
    event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
  ) => void;
  onPlayheadUp: (
    event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
  ) => void;
  seek: (time: number) => void;
};

type State = {
  seeking: boolean;
};

export default class VideoPlayhead extends PureComponent<Props, State> {
  playhead: HTMLDivElement | null | undefined;

  state: State = {
    seeking: false,
  };

  setPlayheadRef: (ref?: HTMLDivElement | null | undefined) => void = (ref) => {
    this.playhead = ref;
  };

  seek: (clientX: number) => void = (clientX) => {
    if (this.playhead) {
      const { duration, seek } = this.props;
      const { left, right, width } = this.playhead.getBoundingClientRect();

      // As a convention, text direction is defined in `dir` attribute of `html` tag of the document.
      // The following check is done under the assuption of that convention.
      const isRTL = document.querySelector('html')?.getAttribute('dir') === 'rtl';
      const difference = isRTL ? right - clientX : clientX - left;

      const percent = Math.max(0, Math.min(difference / width, 1));
      const newTime = percent * duration;

      seek(newTime);
    }
  };

  // eslint-disable-next-line class-methods-use-this
  stopClick: (event: React.SyntheticEvent<HTMLDivElement>) => void = (event) =>
    event.stopPropagation();

  handleMouseDown: (
    event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
  ) => void = (event) => {
    // https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md#feature-detection
    // Test via a getter in the options object to see if the passive property is accessed
    let supportsPassive = false;
    try {
      const opts = Object.defineProperty({}, 'passive', {
        get() {
          supportsPassive = true;
        },
      });
      // skip this for mouse events, keep supportsPassive as false
      // @ts-expect-error - TS2339 - Property 'clientX' does not exist on type 'MouseEvent<HTMLDivElement, MouseEvent> | TouchEvent<HTMLDivElement>'.
      if (!event?.clientX) {
        // @ts-expect-error - TS2769 - No overload matches this call.
        window.addEventListener('testPassive', null, opts);
        // @ts-expect-error - TS2769 - No overload matches this call.
        window.removeEventListener('testPassive', null, opts);
      }
    } catch (e: any) {
      // do nothing
    }

    // Chrome, starting with version 56 (desktop, Chrome for Android, and Android webview), where the default value for the passive option for touchstart and touchmove is true and calls to preventDefault() will have no effect.
    // supportsPassive is false for mouse events as well as touch events when passive is not supported
    if (!supportsPassive) {
      event.preventDefault();
    }

    const { onPlayheadDown } = this.props;
    onPlayheadDown(event);
    this.setState({ seeking: true });

    // @ts-expect-error - TS2339 - Property 'clientX' does not exist on type 'MouseEvent<HTMLDivElement, MouseEvent> | TouchEvent<HTMLDivElement>'. | TS2339 - Property 'clientX' does not exist on type 'MouseEvent<HTMLDivElement, MouseEvent> | TouchEvent<HTMLDivElement>'.
    if (!!event?.clientX && typeof event?.clientX === 'number') {
      // @ts-expect-error - TS2339 - Property 'clientX' does not exist on type 'MouseEvent<HTMLDivElement, MouseEvent> | TouchEvent<HTMLDivElement>'.
      this.seek(event.clientX);
    }
    // @ts-expect-error - TS2339 - Property 'touches' does not exist on type 'MouseEvent<HTMLDivElement, MouseEvent> | TouchEvent<HTMLDivElement>'.
    if (event?.touches) {
      // @ts-expect-error - TS2339 - Property 'touches' does not exist on type 'MouseEvent<HTMLDivElement, MouseEvent> | TouchEvent<HTMLDivElement>'.
      this.seek(event.touches[0].clientX);
    }
  };

  handleMouseLeave: (event: React.MouseEvent<HTMLDivElement>) => void = (event) => {
    const { onPlayheadUp } = this.props;
    const { seeking } = this.state;
    // If the user is seeking and mouse leaves playhead then end the seek
    if (seeking) {
      this.setState({ seeking: false });
      onPlayheadUp(event);
    }
  };

  handleMouseMove: (
    event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
  ) => void = (event) => {
    // https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md#feature-detection
    // Test via a getter in the options object to see if the passive property is accessed
    let supportsPassive = false;
    try {
      const opts = Object.defineProperty({}, 'passive', {
        get() {
          supportsPassive = true;
        },
      });
      // skip this for mouse events, keep supportsPassive as false
      // @ts-expect-error - TS2339 - Property 'clientX' does not exist on type 'MouseEvent<HTMLDivElement, MouseEvent> | TouchEvent<HTMLDivElement>'.
      if (!event?.clientX) {
        // @ts-expect-error - TS2769 - No overload matches this call.
        window.addEventListener('testPassive', null, opts);
        // @ts-expect-error - TS2769 - No overload matches this call.
        window.removeEventListener('testPassive', null, opts);
      }
    } catch (e: any) {
      // do nothing
    }

    // Chrome, starting with version 56 (desktop, Chrome for Android, and Android webview), where the default value for the passive option for touchstart and touchmove is true and calls to preventDefault() will have no effect.
    // supportsPassive is false for mouse events and touch events when passive is not supported
    if (!supportsPassive) {
      event.preventDefault();
    }

    const { seeking } = this.state;
    // @ts-expect-error - TS2339 - Property 'clientX' does not exist on type 'MouseEvent<HTMLDivElement, MouseEvent> | TouchEvent<HTMLDivElement>'. | TS2339 - Property 'clientX' does not exist on type 'MouseEvent<HTMLDivElement, MouseEvent> | TouchEvent<HTMLDivElement>'.
    if (seeking && !!event?.clientX && typeof event?.clientX === 'number') {
      // @ts-expect-error - TS2339 - Property 'clientX' does not exist on type 'MouseEvent<HTMLDivElement, MouseEvent> | TouchEvent<HTMLDivElement>'.
      this.seek(event.clientX);
    }
    // @ts-expect-error - TS2339 - Property 'touches' does not exist on type 'MouseEvent<HTMLDivElement, MouseEvent> | TouchEvent<HTMLDivElement>'.
    if (seeking && event?.touches) {
      // @ts-expect-error - TS2339 - Property 'touches' does not exist on type 'MouseEvent<HTMLDivElement, MouseEvent> | TouchEvent<HTMLDivElement>'.
      this.seek(event.touches[0].clientX);
    }
  };

  handleMouseUp: (
    event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
  ) => void = (event) => {
    const { onPlayheadUp } = this.props;
    this.setState({ seeking: false });
    onPlayheadUp(event);
  };

  render() {
    const { accessibilityProgressBarLabel, currentTime, duration } = this.props;
    const width = `${Math.floor((currentTime * 10000) / duration) / 100}%`;

    return (
      <Box height={16} position="relative">
        <div
          ref={this.setPlayheadRef}
          aria-label={accessibilityProgressBarLabel}
          aria-valuemax={duration}
          aria-valuemin="0"
          aria-valuenow={currentTime}
          className={styles.playhead}
          onClick={this.stopClick}
          // onmouse events don't get correctly triggered on mobile
          onKeyPress={this.stopClick}
          onMouseDown={this.handleMouseDown}
          onMouseLeave={this.handleMouseLeave}
          onMouseMove={this.handleMouseMove}
          // ontouch events handle scrubber on mobile
          onMouseUp={this.handleMouseUp}
          onTouchEnd={this.handleMouseUp}
          onTouchMove={this.handleMouseMove}
          onTouchStart={this.handleMouseDown}
          role="progressbar"
          // @ts-expect-error - TS2322 - Type 'string' is not assignable to type 'number | undefined'.
          tabIndex="-1"
        >
          <Box
            color="secondary"
            display="flex"
            height={4}
            left
            position="absolute"
            right
            rounding={2}
          >
            <Box color="light" height="100%" rounding={2} width={width} />
            <Box
              color="light"
              dangerouslySetInlineStyle={{ __style: { marginTop: -6 } }}
              height={16}
              marginStart={-2}
              rounding="circle"
              width={16}
            />
          </Box>
        </div>
      </Box>
    );
  }
}
