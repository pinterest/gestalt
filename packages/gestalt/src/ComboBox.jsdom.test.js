// @flow strict
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ComboBox from './ComboBox.js';
import Tag from './Tag.js';

describe('ComboBox', () => {
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
  const EMPTY_STRING = '';
  const REMOVE_TAG = 'Remove tag';
  const PLACEHOLDER = 'placeholder';
  const LABEL = 'label';

  const tagsInput = PRONOUNS.map((pronoun) => (
    <Tag
      key={pronoun}
      onRemove={() => {}}
      accessibilityRemoveIconLabel={REMOVE_TAG}
      text={pronoun}
    />
  ));

  const renderComboBox = ({
    // Cmp Props
    accessibilityClearButtonLabel = CLEAR,
    disabled = false,
    errorMessage,
    helperText,
    id = 'test',
    inputValue,
    label = LABEL,
    noResultText = NO_RESULTS,
    onBlur,
    onChange,
    onClear,
    onFocus,
    onKeyDown,
    onSelect,
    options = defaultOptions,
    placeholder = PLACEHOLDER,
    selectedOption,
    size,
    tags,
  }: {
    accessibilityClearButtonLabel?: $ElementType<
      React$ElementConfig<typeof ComboBox>,
      'accessibilityClearButtonLabel',
    >,
    disabled?: $ElementType<React$ElementConfig<typeof ComboBox>, 'disabled'>,
    errorMessage?: $ElementType<React$ElementConfig<typeof ComboBox>, 'errorMessage'>,
    helperText?: $ElementType<React$ElementConfig<typeof ComboBox>, 'helperText'>,
    id?: $ElementType<React$ElementConfig<typeof ComboBox>, 'id'>,
    inputValue?: $ElementType<React$ElementConfig<typeof ComboBox>, 'inputValue'>,
    label?: $ElementType<React$ElementConfig<typeof ComboBox>, 'label'>,
    noResultText?: $ElementType<React$ElementConfig<typeof ComboBox>, 'noResultText'>,
    onBlur?: $ElementType<React$ElementConfig<typeof ComboBox>, 'onBlur'>,
    onChange?: $ElementType<React$ElementConfig<typeof ComboBox>, 'onChange'>,
    onClear?: $ElementType<React$ElementConfig<typeof ComboBox>, 'onClear'>,
    onFocus?: $ElementType<React$ElementConfig<typeof ComboBox>, 'onFocus'>,
    onKeyDown?: $ElementType<React$ElementConfig<typeof ComboBox>, 'onKeyDown'>,
    onSelect?: $ElementType<React$ElementConfig<typeof ComboBox>, 'onSelect'>,
    options?: $ElementType<React$ElementConfig<typeof ComboBox>, 'options'>,
    placeholder?: $ElementType<React$ElementConfig<typeof ComboBox>, 'placeholder'>,
    selectedOption?: $ElementType<React$ElementConfig<typeof ComboBox>, 'selectedOption'>,
    size?: $ElementType<React$ElementConfig<typeof ComboBox>, 'size'>,
    tags?: $ElementType<React$ElementConfig<typeof ComboBox>, 'tags'>,
  }) =>
    render(
      <ComboBox
        accessibilityClearButtonLabel={accessibilityClearButtonLabel}
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
      const { baseElement } = renderComboBox(Object.freeze({}));

      expect(screen.getByRole('combobox')).toBeVisible();
      expect(baseElement).toMatchSnapshot();
    });

    it('renders disabled state', () => {
      const { baseElement } = renderComboBox({ disabled: true });
      expect(baseElement).toMatchSnapshot();

      expect(screen.queryByRole('button')).not.toBeInTheDocument();

      fireEvent.click(screen.getByLabelText(LABEL));

      expect(screen.queryByText(PRONOUNS[3])).not.toBeInTheDocument();
    });

    it('renders dropdown with options on click', () => {
      renderComboBox(Object.freeze({}));

      fireEvent.click(screen.getByLabelText(LABEL));

      expect(screen.getAllByRole('option').length).toBe(defaultOptionsLength);
      expect(screen.getByText(PRONOUNS[1])).toBeVisible();
      expect(screen.getByText(PRONOUNS[3])).toBeVisible();
    });

    it('selects an option on click', () => {
      renderComboBox(Object.freeze({}));

      fireEvent.click(screen.getByLabelText(LABEL));

      fireEvent.click(screen.getByText(PRONOUNS[1]));

      expect(screen.getByDisplayValue(PRONOUNS[1])).toBeVisible();
      expect(screen.queryByText(PRONOUNS[3])).not.toBeInTheDocument();

      fireEvent.click(screen.getByLabelText(LABEL));

      expect(screen.getByRole('option', { name: 'he / him Selected item' })).toBeVisible();
    });

    it('filters options on valid input resets options after selecting', async () => {
      renderComboBox(Object.freeze({}));

      const input1 = 'he';
      const input2 = 'r';
      const input3 = '{backspace}';

      await userEvent.type(screen.getByLabelText(LABEL), input1);

      expect(screen.getAllByRole('option').length).toBe(
        PRONOUNS.filter((x) => x.includes(input1)).length,
      );

      await userEvent.type(screen.getByDisplayValue(input1), input2);

      expect(screen.getAllByRole('option').length).toBe(
        PRONOUNS.filter((x) => x.includes(input1 + input2)).length,
      );

      await userEvent.type(screen.getByDisplayValue(input1 + input2), input3);

      expect(screen.getAllByRole('option').length).toBe(
        PRONOUNS.filter((x) => x.includes(input1)).length,
      );
    });

    it('resets options after selecting', () => {
      renderComboBox(Object.freeze({}));

      fireEvent.click(screen.getByLabelText(LABEL));

      fireEvent.click(screen.getByText(PRONOUNS[1]));

      fireEvent.click(screen.getByDisplayValue(PRONOUNS[1]));

      expect(screen.getAllByRole('option').length).toBe(defaultOptionsLength);
    });

    it('returns no results message if no options match input', async () => {
      renderComboBox(Object.freeze({}));

      const input = 'xxxx';

      await userEvent.type(screen.getByLabelText(LABEL), input);

      expect(screen.getByText(NO_RESULTS)).toBeVisible();
    });

    it('shows correct icons', async () => {
      renderComboBox(Object.freeze({}));

      expect(screen.queryByRole('button')).not.toBeInTheDocument();

      fireEvent.click(screen.getByLabelText(LABEL));
      fireEvent.click(screen.getByText(PRONOUNS[1]));

      expect(await screen.findByRole('button', { name: CLEAR })).toBeVisible();
    });

    it('clears selected options with clear button', async () => {
      renderComboBox(Object.freeze({}));
      const SPACE = '{space}';
      const ENTER = '{enter}';

      fireEvent.click(screen.getByLabelText(LABEL));

      fireEvent.click(screen.getByText(PRONOUNS[1]));

      expect(screen.getByDisplayValue(PRONOUNS[1])).toBeVisible();

      fireEvent.click(screen.getByRole('button', { name: CLEAR }));

      fireEvent.click(screen.getByLabelText(LABEL));

      fireEvent.click(screen.getByText(PRONOUNS[1]));

      await userEvent.tab();

      await userEvent.type(screen.getByRole('button', { name: CLEAR }), ENTER);

      expect(screen.getByDisplayValue(EMPTY_STRING)).toBeVisible();

      fireEvent.click(screen.getByLabelText(LABEL));

      fireEvent.click(screen.getByText(PRONOUNS[1]));

      await userEvent.tab();

      await userEvent.type(screen.getByRole('button', { name: CLEAR }), SPACE);

      expect(screen.getByDisplayValue(EMPTY_STRING)).toBeVisible();
    });

    it('manages focus', async () => {
      renderComboBox(Object.freeze({}));

      expect(document.body).toHaveFocus();

      await userEvent.tab();

      expect(screen.getByLabelText(LABEL)).toHaveFocus();

      fireEvent.click(screen.getByLabelText(LABEL));

      fireEvent.click(screen.getByText(PRONOUNS[1]));

      await userEvent.tab();

      expect(screen.getByRole('button', { name: CLEAR })).toHaveFocus();

      fireEvent.click(screen.getByRole('button', { name: CLEAR }));

      expect(screen.getByLabelText(LABEL)).toHaveFocus();

      await userEvent.tab();

      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it("doesn't clear input on blur when no option is selected", async () => {
      renderComboBox(Object.freeze({}));

      await userEvent.tab();

      const input1 = 'he';

      await userEvent.type(screen.getByLabelText(LABEL), input1);

      await userEvent.tab();

      expect(screen.getByRole('button', { name: CLEAR })).toBeVisible();
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

      fireEvent.click(screen.getByLabelText(LABEL));

      expect(screen.queryByRole('button')).not.toBeInTheDocument();
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
        inputValue: EMPTY_STRING,
        options: controlledOptions,
      });
      expect(baseElement).toMatchSnapshot();

      expect(screen.getByRole('combobox')).toBeVisible();
      expect(screen.getAllByRole('button', { name: REMOVE_TAG }).length).toBe(defaultOptionsLength);
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
