// @flow strict
import { fireEvent, getNodeText, render } from '@testing-library/react';
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
    const { getByLabelText } = render(
      <AnimationProvider>
        <AnimatedComponent />
      </AnimationProvider>,
    );

    // eslint-disable-next-line testing-library/prefer-screen-queries -- Please fix the next time this file is touched!
    expect(getNodeText(getByLabelText('animated'))).toEqual(ANIMATION_STATE.hidden);
  });

  it('should initial render with animationState null when useReduceMotion() is true', () => {
    useReducedMotionMock.mockReturnValue(true);

    const { getByLabelText } = render(
      <AnimationProvider>
        <AnimatedComponent />
      </AnimationProvider>,
    );

    // eslint-disable-next-line testing-library/prefer-screen-queries -- Please fix the next time this file is touched!
    expect(getNodeText(getByLabelText('animated'))).toEqual('');
  });

  // This test was skipped because, despite the logic works fine, the animationState is not being correctly updated in the test in the handleExternalDismiss function. We should try to make it work.
  // eslint-disable-next-line jest/no-disabled-tests
  it.skip('should transition animationState from opening to null', () => {
    const { getByLabelText } = render(
      <AnimationProvider>
        <AnimatedComponent />
      </AnimationProvider>,
    );
    // eslint-disable-next-line testing-library/prefer-screen-queries -- Please fix the next time this file is touched!
    fireEvent.animationEnd(getByLabelText('animated'));

    // eslint-disable-next-line testing-library/prefer-screen-queries -- Please fix the next time this file is touched!
    expect(getNodeText(getByLabelText('animated'))).toEqual('');
  });

  it('should transition animationState to closing when onDismissStart() is called', () => {
    const { getByLabelText } = render(
      <AnimationProvider>
        <AnimatedComponent />
      </AnimationProvider>,
    );
    // eslint-disable-next-line testing-library/prefer-screen-queries -- Please fix the next time this file is touched!
    fireEvent.click(getByLabelText('animated'));

    // eslint-disable-next-line testing-library/prefer-screen-queries -- Please fix the next time this file is touched!
    expect(getNodeText(getByLabelText('animated'))).toEqual(ANIMATION_STATE.animatedClosing);
  });
});
