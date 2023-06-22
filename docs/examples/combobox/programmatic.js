// @flow strict
import { type Node, useState } from 'react';
import { Box, Button, ComboBox, Flex } from 'gestalt';

export default function Example(): Node {
  const CATEGORIES = {
    'BEAUTY': [
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
    'DIY': [
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
  };

  const [currentCategory, setCurrentCategory] = useState('BEAUTY');

  const [suggestedOptions, setSuggestedOptions] = useState(CATEGORIES[currentCategory]);

  const [inputValue, setInputValue] = useState('');

  const [selectedOption, setSelectedOption] = useState<void | {|
    label: string,
    subtext?: string,
    value: string,
  |}>();

  const resetOptions = () => {
    setSuggestedOptions(CATEGORIES[currentCategory]);
  };

  const handleOnChange = ({
    value,
  }: {|
    event: SyntheticInputEvent<HTMLInputElement>,
    value: string,
  |}) => {
    setSelectedOption();
    if (value) {
      setInputValue(value);
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
  }: {|
    event: SyntheticInputEvent<HTMLElement> | SyntheticKeyboardEvent<HTMLElement>,
    item: {| label: string, subtext?: string, value: string |},
  |}) => {
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
    setSelectedOption();
    resetOptions();
  };

  return (
    <Box padding={2} width="100%" height="100%">
      <Flex width="100%" height="100%" justifyContent="center" alignItems="center">
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
              noResultText="No results for your selection"
              options={suggestedOptions}
              label="Pin category"
              size="lg"
              onBlur={handleOnBlur}
              onClear={handleOnClear}
              placeholder="Select a category"
              onChange={handleOnChange}
              onSelect={handleSelect}
              selectedOption={selectedOption}
            />
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
}
