// @flow strict
import React from 'react';
import { create } from 'react-test-renderer';
import { render, screen, fireEvent, act } from '@testing-library/react';
import Tag from './Tag.js';
import Typeahead from './Typeahead.js';

const TOTAL_OPTIONS = 10;

const FAKE_OPTIONS = Array.from(Array(TOTAL_OPTIONS).keys()).map((item) => ({
  value: `value-${item}`,
  label: `label-${item}`,
}));

describe('Typeahead', () => {
  const onBlurMock = jest.fn();
  const onChangeMock = jest.fn();
  const onSelectMock = jest.fn();

  const Component = (
    <Typeahead
      id="Typeahead"
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
    const textField = screen.getByRole('textbox', { id: 'Typeahead' });
    fireEvent.click(textField);
    const resultsContainer = screen.getAllByText(/label/i);
    expect(resultsContainer.length).toBe(TOTAL_OPTIONS);
  });

  it('clears menu on blur', () => {
    render(Component);
    const textField = screen.getByRole('textbox', { id: 'Typeahead' });
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
    const textField = screen.getByRole('textbox', { id: 'Typeahead' });
    textField.click();

    fireEvent.change(textField, { target: { value: 'label-3' } });

    const resultsContainer = screen.getAllByText(/label/i);
    expect(resultsContainer.length).toBe(1);
  });

  it('shows no results when no options', () => {
    render(Component);
    const textField = screen.getByRole('textbox', { id: 'Typeahead' });
    textField.focus();

    fireEvent.change(textField, { target: { value: 'No Result' } });

    const resultsContainer = screen.getByText(/no result/i);
    expect(resultsContainer).toBeInTheDocument();
  });

  it('calls onChange when typing', () => {
    render(Component);
    const textField = screen.getByRole('textbox', { id: 'Typeahead' });
    textField.focus();

    fireEvent.change(textField, { target: { value: 'label' } });

    expect(onChangeMock).toHaveBeenCalled();
  });

  it('calls onSelect when option is selected', () => {
    render(Component);
    const textField = screen.getByRole('textbox', { id: 'Typeahead' });
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
    const ref = React.createRef();
    render(
      <Typeahead
        noResultText="No Result"
        label="Ref Example"
        value="test"
        id="test"
        options={[{ value: 'test', label: 'test' }]}
        ref={ref}
      />,
    );
    expect(ref.current instanceof HTMLInputElement).toEqual(true);
    expect(ref.current?.value).toEqual('test');
  });

  it('renders tags when supplied', () => {
    const tree = create(
      <Typeahead
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

  it('Renders a FormErrorMessage if an error message is passed in', () => {
    const component = create(
      <Typeahead
        noResultText="No Result"
        label="Ref Example"
        value="test"
        id="test"
        options={[{ value: 'test', label: 'test' }]}
        errorMessage="Error message"
      />,
    );
    expect(JSON.stringify(component.toJSON())).toContain('Error message');
  });

  it('Does not render a FormErrorMessage when errorMessage is null', () => {
    const component = create(
      <Typeahead
        noResultText="No Result"
        label="Ref Example"
        value="test"
        id="test"
        options={[{ value: 'test', label: 'test' }]}
      />,
    );
    expect(JSON.stringify(component.toJSON())).not.toContain('Error message');
  });
});
