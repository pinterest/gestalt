// @flow strict
import { useState, type Node } from 'react';
import { Box, ComboBox, Flex, Text } from 'gestalt';

const US_STATES = [
  'AK - Alaska',
  'AL - Alabama',
  'AR - Arkansas',
  'AS - American Samoa',
  'AZ - Arizona',
  'CA - California',
  'CO - Colorado',
  'CT - Connecticut',
  'DC - District of Columbia',
  'DE - Delaware',
  'FL - Florida',
  'GA - Georgia',
  'GU - Guam',
  'HI - Hawaii',
  'IA - Iowa',
  'ID - Idaho',
  'IL - Illinois',
  'IN - Indiana',
  'KS - Kansas',
  'KY - Kentucky',
  'LA - Louisiana',
  'MA - Massachusetts',
  'MD - Maryland',
  'ME - Maine',
  'MI - Michigan',
  'MN - Minnesota',
  'MO - Missouri',
  'MS - Mississippi',
  'MT - Montana',
  'NC - North Carolina',
  'ND - North Dakota',
  'NE - Nebraska',
  'NH - New Hampshire',
  'NJ - New Jersey',
  'NM - New Mexico',
  'NV - Nevada',
  'NY - New York',
  'OH - Ohio',
  'OK - Oklahoma',
  'OR - Oregon',
  'PA - Pennsylvania',
  'PR - Puerto Rico',
  'RI - Rhode Island',
  'SC - South Carolina',
  'SD - South Dakota',
  'TN - Tennessee',
  'TX - Texas',
  'UT - Utah',
  'VA - Virginia',
  'VI - Virgin Islands',
  'VT - Vermont',
  'WA - Washington',
  'WI - Wisconsin',
  'WV - West Virginia',
  'WY - Wyoming',
];

export default function Example(): Node {
  const usStatesOptions = US_STATES.map((pronoun, index) => ({
    label: pronoun,
    value: `value${index}`,
  }));

  const [suggestedOptions, setSuggestedOptions] = useState(usStatesOptions);
  const [inputValue, setInputValue] = useState(usStatesOptions[5].label);
  const [selected, setSelected] = useState<void | {|
    label: string,
    subtext?: string,
    value: string,
  |}>(usStatesOptions[5]);

  const handleOnChange = ({
    value,
  }: {|
    event: SyntheticInputEvent<HTMLInputElement>,
    value: string,
  |}) => {
    setSelected();
    if (value) {
      setInputValue(value);
      const filteredOptions = usStatesOptions.filter((item) =>
        item.label.toLowerCase().includes(value.toLowerCase()),
      );
      setSuggestedOptions(filteredOptions);
    } else {
      setInputValue(value);
      setSuggestedOptions(usStatesOptions);
    }
  };

  const handleSelect = ({
    item,
  }: {|
    event: SyntheticInputEvent<HTMLElement> | SyntheticKeyboardEvent<HTMLElement>,
    item: {| label: string, subtext?: string, value: string |},
  |}) => {
    setInputValue(item.label);
    setSuggestedOptions(usStatesOptions);
    setSelected(item);
  };

  return (
    <Box padding={2} width="100%" height="100%">
      <Flex
        width="100%"
        height="100%"
        justifyContent="center"
        direction="column"
        alignItems="center"
        gap={2}
      >
        <Box width={320}>
          <ComboBox
            accessibilityClearButtonLabel="Clear the current value"
            label="State"
            id="controlled"
            inputValue={inputValue}
            noResultText="No results for your selection"
            options={suggestedOptions}
            onBlur={() => {
              if (!selected) setInputValue('');
              setSuggestedOptions(usStatesOptions);
            }}
            onClear={() => {
              setInputValue('');
              setSelected();
              setSuggestedOptions(usStatesOptions);
            }}
            selectedOption={selected}
            placeholder="Select a US state"
            onChange={handleOnChange}
            onSelect={handleSelect}
          />
        </Box>
        {selected && selected.label ? (
          <Box width={320}>
            <Text>
              Estimated tax to be collected in {selected && selected.label} will be calculated at
              checkout
            </Text>
          </Box>
        ) : null}
      </Flex>
    </Box>
  );
}
