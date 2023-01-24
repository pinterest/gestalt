// @flow strict
import { fireEvent, getNodeText, render } from '@testing-library/react';
import AnimationProvider, { useAnimation } from './AnimationContext.js';
import * as useReducedMotionHook from './useReducedMotion.js'; // eslint-disable-line import/no-namespace

jest.mock('./useReducedMotion.js');

function AnimatedComponent() {
  const { animationState, handleAnimation, onAnimatedDismiss } = useAnimation();

  return (
    <button
      aria-label="animated"
      onAnimationEnd={handleAnimation}
      onClick={onAnimatedDismiss}
      type="submit"
    >
      {animationState}
    </button>
  );
}

describe('AnimationProvider', () => {
  const useReducedMotionMock = jest.spyOn(useReducedMotionHook, 'default');

  beforeEach(() => {
    useReducedMotionMock.mockReturnValue(false);
  });

  it('should initial render with animationState opening', () => {
    const { getByLabelText } = render(
      <AnimationProvider onDismiss={jest.fn()}>
        <AnimatedComponent />
      </AnimationProvider>,
    );

    // eslint-disable-next-line testing-library/prefer-screen-queries -- Please fix the next time this file is touched!
    expect(getNodeText(getByLabelText('animated'))).toEqual('opening');
  });

  it('should initial render with animationState noMotionMount when useReduceMotion() is true', () => {
    useReducedMotionMock.mockReturnValue(true);

    const { getByLabelText } = render(
      <AnimationProvider onDismiss={jest.fn()}>
        <AnimatedComponent />
      </AnimationProvider>,
    );

    // eslint-disable-next-line testing-library/prefer-screen-queries -- Please fix the next time this file is touched!
    expect(getNodeText(getByLabelText('animated'))).toEqual('noMotionMount');
  });

  it('should transition animationState from opening to motionMount', () => {
    const { getByLabelText } = render(
      <AnimationProvider onDismiss={jest.fn()}>
        <AnimatedComponent />
      </AnimationProvider>,
    );
    // eslint-disable-next-line testing-library/prefer-screen-queries -- Please fix the next time this file is touched!
    fireEvent.animationEnd(getByLabelText('animated'));

    // eslint-disable-next-line testing-library/prefer-screen-queries -- Please fix the next time this file is touched!
    expect(getNodeText(getByLabelText('animated'))).toEqual('motionMount');
  });

  it('should transition animationState to closing when onDismissStart() is called', () => {
    const { getByLabelText } = render(
      <AnimationProvider onDismiss={jest.fn()}>
        <AnimatedComponent />
      </AnimationProvider>,
    );
    // eslint-disable-next-line testing-library/prefer-screen-queries -- Please fix the next time this file is touched!
    fireEvent.click(getByLabelText('animated'));

    // eslint-disable-next-line testing-library/prefer-screen-queries -- Please fix the next time this file is touched!
    expect(getNodeText(getByLabelText('animated'))).toEqual('closing');
  });

  it('should not render children when animationState is postOut', () => {
    const { getByLabelText, queryByLabelText } = render(
      <AnimationProvider onDismiss={jest.fn()}>
        <AnimatedComponent />
      </AnimationProvider>,
    );
    // eslint-disable-next-line testing-library/prefer-screen-queries -- Please fix the next time this file is touched!
    fireEvent.click(getByLabelText('animated'));
    // eslint-disable-next-line testing-library/prefer-screen-queries -- Please fix the next time this file is touched!
    fireEvent.animationEnd(getByLabelText('animated'));

    // eslint-disable-next-line testing-library/prefer-screen-queries -- Please fix the next time this file is touched!
    expect(queryByLabelText('animated')).toEqual(null);
  });

  it('should not render children when onDismissStart() is called and useReducedMotion() is true', () => {
    useReducedMotionMock.mockReturnValue(true);

    const { getByLabelText, queryByLabelText } = render(
      <AnimationProvider onDismiss={jest.fn()}>
        <AnimatedComponent />
      </AnimationProvider>,
    );
    // eslint-disable-next-line testing-library/prefer-screen-queries -- Please fix the next time this file is touched!
    fireEvent.click(getByLabelText('animated'));

    // eslint-disable-next-line testing-library/prefer-screen-queries -- Please fix the next time this file is touched!
    expect(queryByLabelText('animated')).toEqual(null);
  });
});
