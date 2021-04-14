// @flow strict
import { render } from '@testing-library/react';
import TypeaheadInputField from './TypeaheadInputField.js';

describe('<TypeaheadInputField />', () => {
  const onClearMock = jest.fn();
  const onBlurMock = jest.fn();
  const onChangeMock = jest.fn();
  const setContainerMock = jest.fn();
  const onFocusMock = jest.fn();
  const onKeyNavigationMock = jest.fn();
  it('adds a "medium" classname by default', () => {
    const { container } = render(
      <TypeaheadInputField
        label="Demo Search Field"
        id="InputField"
        onChange={onChangeMock}
        onClear={onClearMock}
        onBlur={onBlurMock}
        setContainer={setContainerMock}
        onFocus={onFocusMock}
        onKeyNavigation={onKeyNavigationMock}
        placeholder="Search and explore"
        value="Search"
      />,
    );
    expect(container.querySelector('.medium')).toBeVisible();
  });

  it('adds a "large" classname when size is set to "lg"', () => {
    const { container } = render(
      <TypeaheadInputField
        label="Demo Search Field"
        id="InputField"
        onChange={onChangeMock}
        onClear={onClearMock}
        onBlur={onBlurMock}
        setContainer={setContainerMock}
        onFocus={onFocusMock}
        onKeyNavigation={onKeyNavigationMock}
        placeholder="Search and explore"
        size="lg"
        value="Search"
      />,
    );
    expect(container.querySelector('.large')).toBeVisible();
  });
});
