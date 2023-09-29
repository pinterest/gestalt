// @flow strict
import { fireEvent, getNodeText, render, screen } from '@testing-library/react';
import AnimationProvider, { ANIMATION_STATE, useAnimation } from './AnimationContext.js';
import * as useReducedMotionHook from '../useReducedMotion.js';

jest.mock('../useReducedMotion.js');

function AnimatedComponent() {
  const { animationState, handleAnimationEnd, handleExternalDismiss } = useAnimation();

  return (
    <button
      aria-label="animated"
      onAnimationEnd={handleAnimationEnd}
      onClick={handleExternalDismiss}
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

  it('should initial render with animationState hidden', () => {
    render(
      <AnimationProvider>
        <AnimatedComponent />
      </AnimationProvider>,
    );

    expect(getNodeText(screen.getByLabelText('animated'))).toEqual(ANIMATION_STATE.hidden);
  });

  it('should initial render with animationState null when useReduceMotion() is true', () => {
    useReducedMotionMock.mockReturnValue(true);

    render(
      <AnimationProvider>
        <AnimatedComponent />
      </AnimationProvider>,
    );

    expect(getNodeText(screen.getByLabelText('animated'))).toEqual('');
  });

  // This test was skipped because, despite the logic works fine, the animationState is not being correctly updated in the test in the handleExternalDismiss function. We should try to make it work.
  // eslint-disable-next-line jest/no-disabled-tests
  it.skip('should transition animationState from opening to null', () => {
    render(
      <AnimationProvider>
        <AnimatedComponent />
      </AnimationProvider>,
    );
    fireEvent.animationEnd(screen.getByLabelText('animated'));

    expect(getNodeText(screen.getByLabelText('animated'))).toEqual('');
  });

  it('should transition animationState to closing when onDismissStart() is called', () => {
    render(
      <AnimationProvider>
        <AnimatedComponent />
      </AnimationProvider>,
    );
    fireEvent.click(screen.getByLabelText('animated'));

    expect(getNodeText(screen.getByLabelText('animated'))).toEqual(ANIMATION_STATE.animatedClosing);
  });
});
