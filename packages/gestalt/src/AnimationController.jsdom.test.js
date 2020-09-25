// @flow strict
import React from 'react';
import { fireEvent, getNodeText, render } from '@testing-library/react';
import { AnimationController, useAnimation } from './AnimationController.js';
import * as useReducedMotionHook from './useReducedMotion.js'; // eslint-disable-line import/no-namespace

jest.mock('./useReducedMotion.js');

const AnimatedComponent = ({
  onDismissStart,
}: {|
  onDismissStart: () => void,
|}) => {
  const { animationState, onAnimationEnd } = useAnimation();

  return (
    <button
      aria-label="animated"
      onAnimationEnd={onAnimationEnd}
      onClick={onDismissStart}
      type="submit"
    >
      {animationState}
    </button>
  );
};

describe('AnimationController', () => {
  const useReducedMotionMock = jest.spyOn(useReducedMotionHook, 'default');

  beforeEach(() => {
    useReducedMotionMock.mockReturnValue(false);
  });

  it('should initial render with animationState in', () => {
    const { getByLabelText } = render(
      <AnimationController onDismissEnd={jest.fn()}>
        {({ onDismissStart }) => (
          <AnimatedComponent onDismissStart={onDismissStart} />
        )}
      </AnimationController>
    );

    expect(getNodeText(getByLabelText('animated'))).toEqual('in');
  });

  it('should initial render with animationState null when useReduceMotion() is true', () => {
    useReducedMotionMock.mockReturnValue(true);

    const { getByLabelText } = render(
      <AnimationController onDismissEnd={jest.fn()}>
        {({ onDismissStart }) => (
          <AnimatedComponent onDismissStart={onDismissStart} />
        )}
      </AnimationController>
    );

    expect(getNodeText(getByLabelText('animated'))).toEqual('');
  });

  it('should transition animationState from in to post-in', () => {
    const { getByLabelText } = render(
      <AnimationController onDismissEnd={jest.fn()}>
        {({ onDismissStart }) => (
          <AnimatedComponent onDismissStart={onDismissStart} />
        )}
      </AnimationController>
    );
    fireEvent.animationEnd(getByLabelText('animated'));

    expect(getNodeText(getByLabelText('animated'))).toEqual('post-in');
  });

  it('should transition animationState to out when onDismissStart() is called', () => {
    const { getByLabelText } = render(
      <AnimationController onDismissEnd={jest.fn()}>
        {({ onDismissStart }) => (
          <AnimatedComponent onDismissStart={onDismissStart} />
        )}
      </AnimationController>
    );
    fireEvent.click(getByLabelText('animated'));

    expect(getNodeText(getByLabelText('animated'))).toEqual('out');
  });

  it('should not render children when animationState is post-out', () => {
    const { getByLabelText, queryByLabelText } = render(
      <AnimationController onDismissEnd={jest.fn()}>
        {({ onDismissStart }) => (
          <AnimatedComponent onDismissStart={onDismissStart} />
        )}
      </AnimationController>
    );
    fireEvent.click(getByLabelText('animated'));
    fireEvent.animationEnd(getByLabelText('animated'));

    expect(queryByLabelText('animated')).toEqual(null);
  });

  it('should not render children when onDismissStart() is called and useReducedMotion() is true', () => {
    useReducedMotionMock.mockReturnValue(true);

    const { getByLabelText, queryByLabelText } = render(
      <AnimationController onDismissEnd={jest.fn()}>
        {({ onDismissStart }) => (
          <AnimatedComponent onDismissStart={onDismissStart} />
        )}
      </AnimationController>
    );
    fireEvent.click(getByLabelText('animated'));

    expect(queryByLabelText('animated')).toEqual(null);
  });
});
