import { useRef, useState } from 'react';
import { Box, ComboBox, Flex, Tag } from 'gestalt';

export default function Example() {
  const ref = useRef<null | HTMLInputElement>(null);
  const [selected, setSelected] = useState<ReadonlyArray<string>>(['he / him']);
  const [searchTerm, setSearchTerm] = useState('');

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

  const options = PRONOUNS.map((pronoun, index) => ({
    label: pronoun,
    value: `value${index}`,
  }));

  const [suggestedOptions, setSuggestedOptions] = useState(
    options.filter((pronoun) => !selected.includes(pronoun.value)),
  );

  const handleOnSelect = ({
    item: { label },
  }: {
    event: React.ChangeEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>;
    item: {
      label: string;
      subtext?: string;
      value: string;
    };
  }) => {
    if (!selected.includes(label) && selected.length < 2) {
      const newSelected = [...selected, label];
      setSelected(newSelected);
      setSuggestedOptions(options.filter((pronoun) => !newSelected.includes(pronoun.label)));
      setSearchTerm('');
    }
  };

  const handleOnChange = ({
    value,
  }: {
    event: React.ChangeEvent<HTMLInputElement>;
    value: string;
  }) => {
    setSearchTerm(value);

    const suggested = value
      ? suggestedOptions.filter((item) => item.label.toLowerCase().includes(value.toLowerCase()))
      : options.filter((option) => !selected.includes(option.value));

    setSuggestedOptions(suggested);
  };

  const handleOnBlur = () => setSearchTerm('');

  const handleClear = () => {
    setSelected([]);
    setSuggestedOptions(options);
  };

  const handleOnKeyDown = ({
    event: { keyCode, currentTarget },
  }: {
    event: React.KeyboardEvent<HTMLInputElement>;
    value: string;
  }) => {
    // Remove tag on backspace if the cursor is at the beginning of the field

    if (keyCode === 8 /* Backspace */ && currentTarget.selectionEnd === 0) {
      const newSelected = [...selected.slice(0, -1)];
      setSelected(newSelected);
      setSuggestedOptions(options.filter((pronoun) => !newSelected.includes(pronoun.label)));
    }
  };

  const handleRemoveTag = (removedValue: string) => {
    const newSelected = selected.filter((tagValue) => tagValue !== removedValue);
    setSelected(newSelected);
    setSuggestedOptions(options.filter((pronoun) => !newSelected.includes(pronoun.label)));
  };

  const renderedTags = selected.map((pronoun) => (
    <Tag
      key={pronoun}
      accessibilityRemoveIconLabel={`Remove ${pronoun} tag`}
      onRemove={() => handleRemoveTag(pronoun)}
      text={pronoun}
    />
  ));

  return (
    <Box padding={8} width="100%">
      <Flex direction="column" gap={4}>
        <ComboBox
          ref={ref}
          accessibilityClearButtonLabel="Clear the current value"
          helperText="Choose up to 2 sets of pronouns to appear on your profile so others know how to refer to you. You can edit or remove these any time."
          id="tags"
          inputValue={searchTerm}
          label="Pronouns"
          noResultText="No results for your selection"
          onBlur={handleOnBlur}
          onChange={handleOnChange}
          onClear={handleClear}
          onKeyDown={handleOnKeyDown}
          onSelect={handleOnSelect}
          options={suggestedOptions}
          placeholder={selected.length > 0 ? '' : 'Add your pronouns'}
          size="sm"
          tags={renderedTags}
        />
        <ComboBox
          ref={ref}
          accessibilityClearButtonLabel="Clear the current value"
          helperText="Choose up to 2 sets of pronouns to appear on your profile so others know how to refer to you. You can edit or remove these any time."
          id="tags"
          inputValue={searchTerm}
          label="Pronouns"
          noResultText="No results for your selection"
          onBlur={handleOnBlur}
          onChange={handleOnChange}
          onClear={handleClear}
          onKeyDown={handleOnKeyDown}
          onSelect={handleOnSelect}
          options={suggestedOptions}
          placeholder={selected.length > 0 ? '' : 'Add your pronouns'}
          size="md"
          tags={renderedTags}
        />
        <ComboBox
          ref={ref}
          accessibilityClearButtonLabel="Clear the current value"
          helperText="Choose up to 2 sets of pronouns to appear on your profile so others know how to refer to you. You can edit or remove these any time."
          id="tags"
          inputValue={searchTerm}
          label="Pronouns"
          noResultText="No results for your selection"
          onBlur={handleOnBlur}
          onChange={handleOnChange}
          onClear={handleClear}
          onKeyDown={handleOnKeyDown}
          onSelect={handleOnSelect}
          options={suggestedOptions}
          placeholder={selected.length > 0 ? '' : 'Add your pronouns'}
          size="lg"
          tags={renderedTags}
        />
        <ComboBox
          ref={ref}
          accessibilityClearButtonLabel="Clear the current value"
          errorMessage="Select more than one option"
          helperText="Choose up to 2 sets of pronouns to appear on your profile so others know how to refer to you. You can edit or remove these any time."
          id="tags-error"
          inputValue={searchTerm}
          label="Pronouns"
          noResultText="No results for your selection"
          onBlur={handleOnBlur}
          onChange={handleOnChange}
          onClear={handleClear}
          onKeyDown={handleOnKeyDown}
          onSelect={handleOnSelect}
          options={suggestedOptions}
          placeholder={selected.length > 0 ? '' : 'Add your pronouns'}
          size="sm"
          tags={renderedTags}
        />
        <ComboBox
          ref={ref}
          accessibilityClearButtonLabel="Clear the current value"
          helperText="Choose up to 2 sets of pronouns to appear on your profile so others know how to refer to you. You can edit or remove these any time."
          id="tags-readonly"
          inputValue={searchTerm}
          label="Pronouns"
          noResultText="No results for your selection"
          onBlur={handleOnBlur}
          onChange={handleOnChange}
          onClear={handleClear}
          onKeyDown={handleOnKeyDown}
          onSelect={handleOnSelect}
          options={suggestedOptions}
          placeholder={selected.length > 0 ? '' : 'Add your pronouns'}
          readOnly
          size="sm"
          tags={renderedTags}
        />
        <ComboBox
          ref={ref}
          accessibilityClearButtonLabel="Clear the current value"
          disabled
          helperText="Choose up to 2 sets of pronouns to appear on your profile so others know how to refer to you. You can edit or remove these any time."
          id="tags-disabled"
          inputValue={searchTerm}
          label="Pronouns"
          noResultText="No results for your selection"
          onBlur={handleOnBlur}
          onChange={handleOnChange}
          onClear={handleClear}
          onKeyDown={handleOnKeyDown}
          onSelect={handleOnSelect}
          options={suggestedOptions}
          placeholder={selected.length > 0 ? '' : 'Add your pronouns'}
          size="sm" tags={renderedTags}
        />
      </Flex>
    </Box>
  );
}
