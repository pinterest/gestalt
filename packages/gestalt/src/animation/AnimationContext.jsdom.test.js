// @flow strict
import { fireEvent, getNodeText, render } from '@testing-library/react';
import * as useReducedMotionHook from '../useReducedMotion.js'; // eslint-disable-line import/no-namespace
import AnimationProvider, { useAnimation, ANIMATION_STATE } from './AnimationContext.js';

jest.mock('../useReducedMotion.js');

function AnimatedComponent() {
  const { animationState, handleAnimation, onExternalDismiss } = useAnimation();

  return (
    <button
      aria-label="animated"
      onAnimationEnd={handleAnimation}
      onClick={onExternalDismiss}
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
      <AnimationProvider>
        <AnimatedComponent />
      </AnimationProvider>,
    );

    // eslint-disable-next-line testing-library/prefer-screen-queries -- Please fix the next time this file is touched!
    expect(getNodeText(getByLabelText('animated'))).toEqual(ANIMATION_STATE.animatedOpening);
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

  it('should transition animationState from opening to null', () => {
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
