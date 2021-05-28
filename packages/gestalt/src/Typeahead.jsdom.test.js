// @flow strict
import { createRef } from 'react';
import { create } from 'react-test-renderer';
import { render, screen, fireEvent, act } from '@testing-library/react';
import Tag from './Tag.js';
import Typeahead from './Typeahead.js';

const TOTAL_OPTIONS = 10;
const FAKE_OPTIONS = new Array(TOTAL_OPTIONS).fill(0).map((item, index) => ({
  value: `value-${index + 1}`,
  label: `label-${index + 1}`,
}));

describe('Typeahead', () => {
  const onBlurMock = jest.fn();
  const onChangeMock = jest.fn();
  const onSelectMock = jest.fn();
  const Component = (
    <Typeahead
      clearOptionsLabel="Clear options"
      showOptionsLabel="Show popup"
      id="test"
      noResultText="No Result"
      options={FAKE_OPTIONS}
      placeholder="Select a Label"
      onChange={onChangeMock}
      onBlur={onBlurMock}
      onSelect={onSelectMock}
      label="Typeahead Example"
    />
  );

  it('renders Typeahead normal', () => {
    const tree = create(Component).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('shows menu with data on focus', () => {
    render(Component);
    const textField = screen.getByRole('combobox', { id: 'typeahead-test' });
    fireEvent.click(textField);
    const resultsContainer = screen.getAllByText(/label/i);
    expect(resultsContainer.length).toBe(TOTAL_OPTIONS);
  });

  it('clears menu on blur', () => {
    render(Component);
    const textField = screen.getByRole('combobox', { id: 'typeahead-test' });
    textField.click();
    textField.focus();
    const resultsContainer = screen.getAllByText(/label/i);
    expect(resultsContainer.length).toBe(TOTAL_OPTIONS);
    act(() => {
      textField.blur();
    });
    expect(onBlurMock).toHaveBeenCalled();
    expect(onBlurMock.mock.calls.length).toBe(1);
  });

  it('filters menu on search', () => {
    render(Component);
    const textField = screen.getByRole('combobox', { id: 'typeahead-test' });
    textField.click();
    fireEvent.change(textField, { target: { value: 'label-1' } });
    const resultsContainer = screen.getAllByText(/label/i);
    expect(resultsContainer.length).toBe(2);
  });

  it('shows no results when no options', () => {
    render(Component);
    const textField = screen.getByRole('combobox', { id: 'typeahead-test' });
    textField.focus();
    fireEvent.change(textField, { target: { value: 'label-20' } });
    const resultsContainer = screen.getByText(/no result/i);
    expect(resultsContainer).toBeInTheDocument();
  });

  it('calls onChange when typing', () => {
    render(Component);
    const textField = screen.getByRole('combobox', { id: 'typeahead-test' });
    textField.focus();
    fireEvent.change(textField, { target: { value: 'label' } });
    expect(onChangeMock).toHaveBeenCalled();
  });

  it('calls onSelect when option is selected', () => {
    render(Component);
    const textField = screen.getByRole('combobox', { id: 'typeahead-test' });
    textField.focus();
    fireEvent.change(textField, { target: { value: 'label-6' } });
    const selectOption = screen.getByText(/label-6/i);
    act(() => {
      selectOption.click();
    });
    const selectedOption = FAKE_OPTIONS.find((option) => option.label.includes('6'));
    expect(onSelectMock).toHaveBeenCalledWith(expect.objectContaining({ item: selectedOption }));
    expect(onSelectMock.mock.calls.length).toBe(1);
  });

  it('forwards a ref to the innermost input element', () => {
    const ref = createRef();
    render(
      <Typeahead
        clearOptionsLabel="Clear options"
        showOptionsLabel="Show popup"
        noResultText="No Result"
        label="Ref Example"
        value={FAKE_OPTIONS[0].value}
        id="test"
        options={FAKE_OPTIONS}
        ref={ref}
      />,
    );
    expect(ref.current instanceof HTMLInputElement).toEqual(true);
    expect(ref.current instanceof HTMLInputElement && ref.current.value).toEqual(
      FAKE_OPTIONS[0].label,
    );
  });

  it('renders tags when supplied', () => {
    const tree = create(
      <Typeahead
        clearOptionsLabel="Clear options"
        showOptionsLabel="Show popup"
        noResultText="No Result"
        label="Tag Example"
        value="test"
        id="test"
        options={[{ value: 'test', label: 'test' }]}
        tags={[
          <Tag key="a" text="a" onRemove={() => {}} removeIconAccessibilityLabel="Remove a tag" />,
          <Tag key="b" text="b" onRemove={() => {}} removeIconAccessibilityLabel="Remove b tag" />,
          <Tag key="c" text="c" onRemove={() => {}} removeIconAccessibilityLabel="Remove c tag" />,
        ]}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
