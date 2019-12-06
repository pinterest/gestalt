// @flow
import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import TextArea from './TextArea.js';

describe('TextArea', () => {
  it('TextArea with errorMessage prop change', () => {
    const { getByText, rerender } = render(
      <TextArea
        id="test"
        onChange={jest.fn()}
        onFocus={jest.fn()}
        onBlur={jest.fn()}
      />
    );
    expect(() => {
      getByText('Error message');
    }).toThrow('Unable to find an element with the text: Error message');

    rerender(
      <TextArea
        errorMessage="Error message"
        id="test"
        onChange={jest.fn()}
        onFocus={jest.fn()}
        onBlur={jest.fn()}
      />
    );
    expect(getByText('Error message')).toBeVisible();
  });

  it('handles blur events', () => {
    const mockBlur = jest.fn();
    const { getByDisplayValue } = render(
      <TextArea
        id="test"
        onBlur={mockBlur}
        onChange={jest.fn()}
        value="TextArea Text"
      />
    );

    fireEvent.blur(getByDisplayValue('TextArea Text'));
    expect(mockBlur).toHaveBeenCalled();
  });
  it('handles change events', () => {
    const mockChange = jest.fn();
    const { container } = render(
      <TextArea id="test" onChange={mockChange} value="TextArea Text" />
    );

    fireEvent.change(container.querySelector('textarea'), {
      target: { value: 'panda' },
    });
    expect(mockChange).toHaveBeenCalled();
  });
  it('handles focus events', () => {
    const mockFocus = jest.fn();
    const { getByDisplayValue } = render(
      <TextArea
        id="test"
        onChange={jest.fn()}
        onFocus={mockFocus}
        value="TextArea Text"
      />
    );

    fireEvent.focus(getByDisplayValue('TextArea Text'));
    expect(mockFocus).toHaveBeenCalled();
  });
  it('handles key down events', () => {
    const mockKeyDown = jest.fn();
    const { container } = render(
      <TextArea
        id="test"
        onChange={() => {}}
        onKeyDown={mockKeyDown}
        value="TextArea Text"
      />
    );

    fireEvent.keyDown(container.querySelector('textarea'), {
      target: { value: 'panda' },
    });
    expect(mockKeyDown).toHaveBeenCalled();
  });
});
