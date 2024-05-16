import { ReactNode, useState } from 'react';
import { Box, Button, ComboBox, Flex } from 'gestalt';

export default function Example() {
  const CATEGORIES = {
    BEAUTY: [
      'Beauty tips',
      'DIY beauty',
      'Wedding beauty',
      'Vegan beauty products',
      'Beauty photography',
      'Beauty quotes',
      'Beauty illustration',
      'Beauty salon',
      'Beauty blender',
    ].map((pronoun, index) => ({ label: pronoun, value: `value${index}` })),
    DIY: [
      'DIY Projects',
      'DIY Art',
      'DIY Home decor',
      'DIY Furniture',
      'DIY Gifts',
      'DIY Wall decor',
      'DIY Clothes',
      'DIY Christmas decorations',
      'DIY Christmas gifts',
      'DIY Wall art',
    ].map((pronoun, index) => ({ label: pronoun, value: `value${index}` })),
  } as const;

  const [currentCategory, setCurrentCategory] = useState('BEAUTY');

  // @ts-expect-error - TS7053 - Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ readonly BEAUTY: { label: string; value: string; }[]; readonly DIY: { label: string; value: string; }[]; }'.
  const [suggestedOptions, setSuggestedOptions] = useState(CATEGORIES[currentCategory]);

  const [inputValue, setInputValue] = useState('');

  const [selectedOption, setSelectedOption] = useState<
    | undefined
    | {
        label: string;
        subtext?: string;
        value: string;
      }
  >();

  const resetOptions = () => {
    // @ts-expect-error - TS7053 - Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ readonly BEAUTY: { label: string; value: string; }[]; readonly DIY: { label: string; value: string; }[]; }'.
    setSuggestedOptions(CATEGORIES[currentCategory]);
  };

  const handleOnChange = ({
    value,
  }: {
    event: React.ChangeEvent<HTMLInputElement>;
    value: string;
  }) => {
    // @ts-expect-error - TS2554 - Expected 1 arguments, but got 0.
    setSelectedOption();
    if (value) {
      setInputValue(value);
      // @ts-expect-error - TS7053 - Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ readonly BEAUTY: { label: string; value: string; }[]; readonly DIY: { label: string; value: string; }[]; }'. | TS7006 - Parameter 'item' implicitly has an 'any' type.
      const filteredOptions = CATEGORIES[currentCategory].filter((item) =>
        item.label.toLowerCase().includes(value.toLowerCase()),
      );
      setSuggestedOptions(filteredOptions);
    } else {
      setInputValue(value);
      resetOptions();
    }
  };

  const handleSelect = ({
    item,
  }: {
    event: React.ChangeEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>;
    item: {
      label: string;
      subtext?: string;
      value: string;
    };
  }) => {
    setInputValue(item.label);
    setSelectedOption(item);
    resetOptions();
  };

  const handleOnBlur = () => {
    if (!selectedOption) setInputValue('');
    resetOptions();
  };

  const handleOnClear = () => {
    setInputValue('');
    // @ts-expect-error - TS2554 - Expected 1 arguments, but got 0.
    setSelectedOption();
    resetOptions();
  };

  return (
    <Box height="100%" padding={2} width="100%">
      <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
        <Flex direction="column" gap={4}>
          <Button
            onClick={() => {
              const nextCategory = currentCategory === 'BEAUTY' ? 'DIY' : 'BEAUTY';
              setCurrentCategory(nextCategory);
              setSuggestedOptions(CATEGORIES[nextCategory]);
              setInputValue('');
            }}
            text={`Change options to ${currentCategory === 'BEAUTY' ? 'DIY' : 'BEAUTY'} category`}
          />
          <Box width={320}>
            <ComboBox
              accessibilityClearButtonLabel="Clear the current value"
              id="programaticallySet"
              inputValue={inputValue}
              label="Pin category"
              noResultText="No results for your selection"
              onBlur={handleOnBlur}
              // @ts-expect-error - TS2322 - Type '({ value, }: { event: React.ChangeEvent<HTMLInputElement>; value: string; }) => void' is not assignable to type 'AbstractEventHandler<SyntheticEvent<HTMLInputElement, Event>, { value: string; }>'.
              onChange={handleOnChange}
              onClear={handleOnClear}
              // @ts-expect-error - TS2322 - Type '({ item, }: { event: React.ChangeEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>; item: {    label: string;    subtext?: string;    value: string;}; }) => void' is not assignable to type 'AbstractEventHandler<SyntheticEvent<HTMLInputElement, Event> | KeyboardEvent<HTMLInputElement>, { item: ComboBoxItemType; }>'.
              onSelect={handleSelect}
              options={suggestedOptions}
              placeholder="Select a category"
              selectedOption={selectedOption}
              size="lg"
            />
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
}
