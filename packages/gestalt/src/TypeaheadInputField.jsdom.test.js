// @flow strict
import React from 'react';
import { render } from '@testing-library/react';
import InputField from './TypeaheadInputField.js';

describe('<InputField />', () => {
  const onClearMock = jest.fn();
  const onChangeMock = jest.fn();
  const onClickMock = jest.fn();
  const onFocusMock = jest.fn();
  it('adds a "medium" classname by default', () => {
    const { container } = render(
      <InputField
        label="Demo Search Field"
        id="InputField"
        onChange={onChangeMock}
        onClear={onClearMock}
        onClick={onClickMock}
        onFocus={onFocusMock}
        placeholder="Search and explore"
        value="Search"
      />
    );
    expect(container.querySelector('.medium')).toBeVisible();
  });

  it('adds a "large" classname when size is set to "lg"', () => {
    const { container } = render(
      <InputField
        label="Demo Search Field"
        id="InputField"
        onChange={onChangeMock}
        onClear={onClearMock}
        onClick={onClickMock}
        onFocus={onFocusMock}
        placeholder="Search and explore"
        size="lg"
        value="Search"
      />
    );
    expect(container.querySelector('.large')).toBeVisible();
  });
});
