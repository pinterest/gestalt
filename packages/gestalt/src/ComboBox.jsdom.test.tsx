import { ComponentProps } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ComboBox from './ComboBox';
import Tag from './Tag';

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
  ] as const;

  const defaultOptions = PRONOUNS.map((pronoun: any, index: any) => ({
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

  const tagsInput = PRONOUNS.map((pronoun: any) => (
    <Tag
      key={pronoun}
      accessibilityRemoveIconLabel={REMOVE_TAG}
      onRemove={() => {}}
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
    accessibilityClearButtonLabel?: ComponentProps<
      typeof ComboBox
    >['accessibilityClearButtonLabel'];
    disabled?: ComponentProps<typeof ComboBox>['disabled'];
    errorMessage?: ComponentProps<typeof ComboBox>['errorMessage'];
    helperText?: ComponentProps<typeof ComboBox>['helperText'];
    id?: ComponentProps<typeof ComboBox>['id'];
    inputValue?: ComponentProps<typeof ComboBox>['inputValue'];
    label?: ComponentProps<typeof ComboBox>['label'];
    noResultText?: ComponentProps<typeof ComboBox>['noResultText'];
    onBlur?: ComponentProps<typeof ComboBox>['onBlur'];
    onChange?: ComponentProps<typeof ComboBox>['onChange'];
    onClear?: ComponentProps<typeof ComboBox>['onClear'];
    onFocus?: ComponentProps<typeof ComboBox>['onFocus'];
    onKeyDown?: ComponentProps<typeof ComboBox>['onKeyDown'];
    onSelect?: ComponentProps<typeof ComboBox>['onSelect'];
    options?: ComponentProps<typeof ComboBox>['options'];
    placeholder?: ComponentProps<typeof ComboBox>['placeholder'];
    selectedOption?: ComponentProps<typeof ComboBox>['selectedOption'];
    size?: ComponentProps<typeof ComboBox>['size'];
    tags?: ComponentProps<typeof ComboBox>['tags'];
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

    it('renders disabled state', async () => {
      const { baseElement } = renderComboBox({ disabled: true });
      expect(baseElement).toMatchSnapshot();

      expect(screen.queryByRole('button')).not.toBeInTheDocument();

      await userEvent.click(screen.getByLabelText(LABEL));

      expect(screen.queryByText(PRONOUNS[3])).not.toBeInTheDocument();
    });

    it('renders dropdown with options on click', async () => {
      renderComboBox(Object.freeze({}));

      await userEvent.click(screen.getByLabelText(LABEL));

      expect(screen.getAllByRole('option').length).toBe(defaultOptionsLength);
      expect(screen.getByText(PRONOUNS[1])).toBeVisible();
      expect(screen.getByText(PRONOUNS[3])).toBeVisible();
    });

    it('selects an option on click', async () => {
      renderComboBox(Object.freeze({}));

      await userEvent.click(screen.getByLabelText(LABEL));
      await userEvent.click(screen.getByRole('option', { name: PRONOUNS[1] }));

      expect(screen.getByDisplayValue(PRONOUNS[1])).toBeVisible();
      expect(screen.queryByText(PRONOUNS[3])).not.toBeInTheDocument();

      await userEvent.click(screen.getByLabelText(LABEL));

      expect(screen.getByRole('option', { name: 'he / him Selected item' })).toBeVisible();
    });

    it('filters options on valid input resets options after selecting', async () => {
      renderComboBox(Object.freeze({}));

      const input1 = 'he';
      const input2 = 'r';
      const input3 = '{backspace}';

      await userEvent.type(screen.getByLabelText(LABEL), input1);

      // The element is hidden as Popover uses IntersectionObserver which is not supported by testing-library
      expect(screen.getAllByRole('option', { hidden: true }).length).toBe(
        PRONOUNS.filter((x: any) => x.includes(input1)).length,
      );

      await userEvent.type(screen.getByDisplayValue(input1), input2);

      expect(screen.getAllByRole('option', { hidden: true }).length).toBe(
        PRONOUNS.filter((x: any) => x.includes(input1 + input2)).length,
      );

      await userEvent.type(screen.getByDisplayValue(input1 + input2), input3);

      expect(screen.getAllByRole('option', { hidden: true }).length).toBe(
        PRONOUNS.filter((x: any) => x.includes(input1)).length,
      );
    });

    it('resets options after selecting', async () => {
      renderComboBox(Object.freeze({}));

      await userEvent.click(screen.getByLabelText(LABEL));

      await userEvent.click(screen.getByText(PRONOUNS[1]));

      await userEvent.click(screen.getByDisplayValue(PRONOUNS[1]));

      expect(screen.getAllByRole('option').length).toBe(defaultOptionsLength);
    });

    it('returns no results message if no options match input', async () => {
      renderComboBox(Object.freeze({}));

      const input = 'xxxx';

      expect(screen.queryByText(NO_RESULTS)).not.toBeInTheDocument();

      await userEvent.type(screen.getByLabelText(LABEL), input);

      expect(screen.getByText(NO_RESULTS)).toBeInTheDocument();
    });

    it('shows correct icons', async () => {
      renderComboBox(Object.freeze({}));

      expect(screen.queryByRole('button')).not.toBeInTheDocument();

      await userEvent.click(screen.getByLabelText(LABEL));
      await userEvent.click(screen.getByText(PRONOUNS[1]));

      expect(await screen.findByRole('button', { name: CLEAR })).toBeVisible();
    });

    it('clears selected options with clear button', async () => {
      renderComboBox(Object.freeze({}));
      const SPACE = '{space}';
      const ENTER = '{enter}';

      await userEvent.click(screen.getByLabelText(LABEL));

      await userEvent.click(screen.getByText(PRONOUNS[1]));

      expect(screen.getByDisplayValue(PRONOUNS[1])).toBeVisible();

      await userEvent.click(screen.getByRole('button', { name: CLEAR }));

      await userEvent.click(screen.getByLabelText(LABEL));

      await userEvent.click(screen.getByText(PRONOUNS[1]));

      await userEvent.tab();

      // The element is hidden as Popover uses IntersectionObserver which is not supported by testing-library
      await userEvent.type(screen.getByRole('button', { name: CLEAR, hidden: true }), ENTER);

      expect(screen.getByDisplayValue(EMPTY_STRING)).toBeVisible();

      await userEvent.click(screen.getByLabelText(LABEL));

      await userEvent.click(screen.getByText(PRONOUNS[1]));

      await userEvent.tab();

      await userEvent.type(screen.getByRole('button', { name: CLEAR, hidden: true }), SPACE);

      expect(screen.getByDisplayValue(EMPTY_STRING)).toBeVisible();
    });

    it('manages focus', async () => {
      renderComboBox(Object.freeze({}));

      expect(document.body).toHaveFocus();

      await userEvent.tab();

      expect(screen.getByLabelText(LABEL)).toHaveFocus();

      await userEvent.click(screen.getByLabelText(LABEL));

      await userEvent.click(screen.getByText(PRONOUNS[1]));

      await userEvent.tab();

      // The element is hidden as Popover uses IntersectionObserver which is not supported by testing-library
      expect(screen.getByRole('button', { name: CLEAR, hidden: true })).toHaveFocus();

      await userEvent.click(screen.getByRole('button', { name: CLEAR, hidden: true }));

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

      // The element is hidden as Popover uses IntersectionObserver which is not supported by testing-library
      expect(screen.getByRole('button', { name: CLEAR, hidden: true })).toBeVisible();
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

    it('shows dropdown with options on click', async () => {
      renderComboBox({
        inputValue: '',
        options: controlledOptions,
      });

      await userEvent.click(screen.getByLabelText(LABEL));

      expect(screen.queryByRole('button')).not.toBeInTheDocument();
      expect(screen.getAllByRole('option').length).toBe(controlledOptionsLength);
      expect(screen.getByText(PRONOUNS[1])).toBeVisible();
    });

    it('shows controlled input value', async () => {
      const input1 = 'he';

      renderComboBox({
        inputValue: input1,
        options: controlledOptions,
      });

      await userEvent.click(screen.getByDisplayValue(input1));

      // The element is hidden as Popover uses IntersectionObserver which is not supported by testing-library
      expect(screen.getByRole('button', { name: CLEAR, hidden: true })).toBeVisible();
      expect(screen.getAllByRole('option').length).toBe(controlledOptionsLength);
      expect(screen.getByText(PRONOUNS[1])).toBeVisible();
    });

    it('shows selected option in textfield', () => {
      const input1 = controlledOptions[0]?.label;

      renderComboBox({
        inputValue: input1,
        selectedOption: controlledOptions[0],
        options: controlledOptions,
      });

      expect(screen.getByDisplayValue(input1)).toBeVisible();
      expect(screen.getByRole('button', { name: CLEAR })).toBeVisible();
    });

    it('shows selected option in dropdown', async () => {
      const input1 = controlledOptions[0]?.label;

      renderComboBox({
        inputValue: input1,
        selectedOption: controlledOptions[0],
        options: controlledOptions,
      });

      expect(screen.getByDisplayValue(input1)).toBeVisible();
      expect(screen.getByRole('button', { name: CLEAR })).toBeVisible();

      await userEvent.click(screen.getByDisplayValue(input1));

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

  describe('ComboBox accessibility', () => {
    it('renders combobox visible and without focus trap', async () => {
      renderComboBox({});
      await userEvent.click(screen.getByLabelText(LABEL));

      expect(screen.getByRole('listbox')).toBeVisible();
      expect(screen.getByText(PRONOUNS[1])).toBeVisible();

      // Select an option
      await userEvent.click(screen.getByText(PRONOUNS[1]));

      expect(screen.getByLabelText(LABEL)).toBeVisible();
      expect(screen.getByLabelText(CLEAR)).toBeVisible();

      // Open popover again to check if everything stays accessible
      await userEvent.click(screen.getByLabelText(LABEL));

      expect(screen.getByRole('listbox')).toBeVisible();
      expect(screen.getByText(PRONOUNS[1])).toBeVisible();
      expect(screen.getByLabelText(LABEL)).toBeVisible();
      expect(screen.getByLabelText(CLEAR)).toBeVisible();
    });
  });
});
