// @flow strict
import { fireEvent, render, screen } from '@testing-library/react';
// $FlowFixMe[untyped-import]
import userEvent from '@testing-library/user-event';
import ComboBox from './ComboBox.js';
import Tag from './Tag.js';

describe('ComboBox', () => {
  global.document.createRange = () => ({
    setStart: () => {},
    setEnd: () => {},
    commonAncestorContainer: {
      nodeName: 'BODY',
      ownerDocument: document,
    },
  });

  const PRONOUNS = [
    'ey / em',
    'he / him',
    'ne / nem',
    'she / her',
    'they / them',
    've / ver',
    'xe / xem',
    'xie / xem',
    'zie / zem',
  ];

  const defaultOptions = PRONOUNS.map((pronoun, index) => ({
    label: pronoun,
    value: `value${index}`,
  }));

  const defaultOptionsLength = defaultOptions.length;

  const controlledOptions = defaultOptions.slice(0, 3);

  const controlledOptionsLength = controlledOptions.length;

  const NO_RESULTS = 'No results found';
  const CLEAR = 'Clear selection';
  const SHOW = 'Show popup';
  const REMOVE = 'Remove tag';
  const PLACEHOLDER = 'placeholder';

  const tagsInput = PRONOUNS.map((pronoun) => (
    <Tag key={pronoun} onRemove={() => {}} removeIconAccessibilityLabel={REMOVE} text={pronoun} />
  ));

  const renderComboBox = ({
    // Cmp Props
    accessibilityClearButtonLabel = CLEAR,
    accessibilityShowButtonLabel = SHOW,
    disabled = false,
    errorMessage = undefined,
    helperText = undefined,
    id = 'test',
    inputValue = undefined,
    label = undefined,
    noResultText = NO_RESULTS,
    onBlur = undefined,
    onChange = undefined,
    onClear = undefined,
    onFocus = undefined,
    onKeyDown = undefined,
    onSelect = undefined,
    options = defaultOptions,
    placeholder = PLACEHOLDER,
    selectedOption = undefined,
    size = undefined,
    tags = undefined,
  }) =>
    render(
      <ComboBox
        accessibilityClearButtonLabel={accessibilityClearButtonLabel}
        accessibilityShowButtonLabel={accessibilityShowButtonLabel}
        disabled={disabled}
        errorMessage={errorMessage}
        helperText={helperText}
        id={id}
        inputValue={inputValue}
        label={label}
        noResultText={noResultText}
        onBlur={onBlur}
        onChange={onChange}
        onClear={onClear}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        onSelect={onSelect}
        options={options}
        placeholder={placeholder}
        selectedOption={selectedOption}
        size={size}
        tags={tags}
      />,
    );
  describe('Uncontrolled ComboBox', () => {
    it('renders default', () => {
      const { baseElement } = renderComboBox({});

      expect(screen.getByRole('combobox')).toBeVisible();
      expect(baseElement).toMatchSnapshot();
    });

    it('renders disabled state', () => {
      const { baseElement } = renderComboBox({ disabled: true });
      expect(baseElement).toMatchSnapshot();

      expect(screen.queryByRole('button')).not.toBeInTheDocument();

      fireEvent.click(screen.getByPlaceholderText(PLACEHOLDER));

      expect(screen.queryByText(PRONOUNS[3])).not.toBeInTheDocument();
    });

    it('renders dropdown with options on click', () => {
      renderComboBox({});

      fireEvent.click(screen.getByPlaceholderText(PLACEHOLDER));

      expect(screen.getAllByRole('option').length).toBe(defaultOptionsLength);
      expect(screen.getByText(PRONOUNS[1])).toBeVisible();
      expect(screen.getByText(PRONOUNS[3])).toBeVisible();
    });

    it('selects an option on click', () => {
      renderComboBox({});

      fireEvent.click(screen.getByPlaceholderText(PLACEHOLDER));

      fireEvent.click(screen.getByText(PRONOUNS[1]));

      expect(screen.getByDisplayValue(PRONOUNS[1])).toBeVisible();
      expect(screen.queryByText(PRONOUNS[3])).not.toBeInTheDocument();

      fireEvent.click(screen.getByPlaceholderText(PLACEHOLDER));

      expect(screen.getByRole('option', { name: 'he / him Selected item' })).toBeVisible();
    });

    it('filters options on valid input resets options after selecting', () => {
      renderComboBox({});

      const input1 = 'he';
      const input2 = 'r';
      const input3 = '{backspace}';

      userEvent.type(screen.getByPlaceholderText(PLACEHOLDER), input1);

      expect(screen.getAllByRole('option').length).toBe(
        PRONOUNS.filter((x) => x.includes(input1)).length,
      );

      userEvent.type(screen.getByDisplayValue(input1), input2);

      expect(screen.getAllByRole('option').length).toBe(
        PRONOUNS.filter((x) => x.includes(input1 + input2)).length,
      );

      userEvent.type(screen.getByDisplayValue(input1 + input2), input3);

      expect(screen.getAllByRole('option').length).toBe(
        PRONOUNS.filter((x) => x.includes(input1)).length,
      );
    });

    it('resets options after selecting', () => {
      renderComboBox({});

      fireEvent.click(screen.getByPlaceholderText(PLACEHOLDER));

      fireEvent.click(screen.getByText(PRONOUNS[1]));

      fireEvent.click(screen.getByDisplayValue(PRONOUNS[1]));

      expect(screen.getAllByRole('option').length).toBe(defaultOptionsLength);
    });

    it('returns no results message if no options match input', () => {
      renderComboBox({});

      const input = 'xxxx';

      userEvent.type(screen.getByPlaceholderText(PLACEHOLDER), input);

      expect(screen.queryByText(NO_RESULTS)).toBeVisible();
    });

    it('shows correct icons', () => {
      renderComboBox({});

      expect(screen.getByRole('button', { name: SHOW })).toBeVisible();

      expect(screen.queryByRole('button', { name: CLEAR })).not.toBeInTheDocument();

      fireEvent.click(screen.getByPlaceholderText(PLACEHOLDER));
      fireEvent.click(screen.getByText(PRONOUNS[1]));

      expect(screen.getByRole('button', { name: CLEAR })).toBeVisible();

      expect(screen.queryByRole('button', { name: SHOW })).not.toBeInTheDocument();
    });

    it('clears selected options after clicking clear button', () => {
      renderComboBox({});

      fireEvent.click(screen.getByPlaceholderText(PLACEHOLDER));

      fireEvent.click(screen.getByText(PRONOUNS[1]));

      expect(screen.getByDisplayValue(PRONOUNS[1])).toBeVisible();

      fireEvent.click(screen.getByRole('button', { name: CLEAR }));

      expect(screen.getByPlaceholderText(PLACEHOLDER)).toBeVisible();
    });

    it('manages focus', () => {
      renderComboBox({});

      expect(document.body).toHaveFocus();

      userEvent.tab();

      expect(screen.getByPlaceholderText(PLACEHOLDER)).toHaveFocus();

      fireEvent.click(screen.getByPlaceholderText(PLACEHOLDER));

      fireEvent.click(screen.getByText(PRONOUNS[1]));

      userEvent.tab();

      expect(screen.getByRole('button', { name: CLEAR })).toHaveFocus();

      fireEvent.click(screen.getByRole('button', { name: CLEAR }));

      expect(screen.getByPlaceholderText(PLACEHOLDER)).toHaveFocus();

      userEvent.tab();

      expect(screen.queryByRole('button', { name: SHOW })).not.toHaveFocus();
    });

    it('clears input on blur or not options is selected', () => {
      renderComboBox({});

      userEvent.tab();

      const input1 = 'he';

      userEvent.type(screen.getByPlaceholderText(PLACEHOLDER), input1);

      userEvent.tab();

      expect(screen.queryByRole('button', { name: SHOW })).toBeVisible();

      fireEvent.click(screen.getByPlaceholderText(PLACEHOLDER));

      fireEvent.click(screen.getByText(PRONOUNS[1]));

      userEvent.tab();

      expect(screen.getByDisplayValue(PRONOUNS[1])).toBeVisible();
    });
  });

  describe('Controlled ComboBox', () => {
    it('renders basic controlled components', () => {
      const { baseElement } = renderComboBox({
        inputValue: '',
        options: controlledOptions,
      });

      expect(screen.getByRole('combobox')).toBeVisible();
      expect(baseElement).toMatchSnapshot();
    });

    it('shows dropdown with options on click', () => {
      renderComboBox({
        inputValue: '',
        options: controlledOptions,
      });

      fireEvent.click(screen.getByPlaceholderText(PLACEHOLDER));

      expect(screen.getByRole('button', { name: SHOW })).toBeVisible();
      expect(screen.getAllByRole('option').length).toBe(controlledOptionsLength);
      expect(screen.getByText(PRONOUNS[1])).toBeVisible();
    });

    it('shows controlled input value', () => {
      const input1 = 'he';

      renderComboBox({
        inputValue: input1,
        options: controlledOptions,
      });

      fireEvent.click(screen.getByDisplayValue(input1));

      expect(screen.getByRole('button', { name: CLEAR })).toBeVisible();
      expect(screen.getAllByRole('option').length).toBe(controlledOptionsLength);
      expect(screen.getByText(PRONOUNS[1])).toBeVisible();
    });

    it('shows selected option in textfield', () => {
      const input1 = controlledOptions[0].label;

      renderComboBox({
        inputValue: input1,
        selectedOption: controlledOptions[0],
        options: controlledOptions,
      });

      expect(screen.getByDisplayValue(input1)).toBeVisible();
      expect(screen.getByRole('button', { name: CLEAR })).toBeVisible();
    });

    it('shows selected option in dropdown', () => {
      const input1 = controlledOptions[0].label;

      renderComboBox({
        inputValue: input1,
        selectedOption: controlledOptions[0],
        options: controlledOptions,
      });

      expect(screen.getByDisplayValue(input1)).toBeVisible();
      expect(screen.getByRole('button', { name: CLEAR })).toBeVisible();

      fireEvent.click(screen.getByDisplayValue(input1));

      expect(screen.getByRole('option', { name: 'ey / em Selected item' })).toBeVisible();
      expect(screen.getByRole('img', { name: 'Selected item' })).toBeVisible();
    });
  });

  describe('Controlled ComboBox with Tags', () => {
    it('renders with tags', () => {
      const { baseElement } = renderComboBox({
        tags: tagsInput,
        inputValue: '',
        options: controlledOptions,
      });
      expect(baseElement).toMatchSnapshot();

      expect(screen.getByRole('combobox')).toBeVisible();
      expect(screen.getAllByRole('button', { name: REMOVE }).length).toBe(defaultOptionsLength);
      expect(screen.getByRole('button', { name: CLEAR })).toBeVisible();
      expect(screen.queryByText(PLACEHOLDER)).not.toBeInTheDocument();
    });

    it('shows controlled input value with tags', () => {
      const input1 = 'he';

      renderComboBox({
        tags: tagsInput,
        inputValue: input1,
        options: controlledOptions,
      });

      expect(screen.getByRole('button', { name: CLEAR })).toBeVisible();
      expect(screen.getByDisplayValue(input1)).toBeVisible();
    });
  });
});
