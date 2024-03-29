// @flow strict
import { type Node as ReactNode, useState } from 'react';
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

export default function Example(): ReactNode {
  const usStatesOptions = US_STATES.map((pronoun, index) => ({
    label: pronoun,
    value: `value${index}`,
  }));

  const [suggestedOptions, setSuggestedOptions] = useState(usStatesOptions);
  const [inputValue, setInputValue] = useState(usStatesOptions[5].label);
  const [selected, setSelected] = useState<void | {
    label: string,
    subtext?: string,
    value: string,
  }>(usStatesOptions[5]);

  const handleOnChange = ({
    value,
  }: {
    event: SyntheticInputEvent<HTMLInputElement>,
    value: string,
  }) => {
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
  }: {
    event: SyntheticInputEvent<HTMLElement> | SyntheticKeyboardEvent<HTMLElement>,
    item: { label: string, subtext?: string, value: string },
  }) => {
    setInputValue(item.label);
    setSuggestedOptions(usStatesOptions);
    setSelected(item);
  };

  return (
    <Box height="100%" padding={2} width="100%">
      <Flex
        alignItems="center"
        direction="column"
        gap={2}
        height="100%"
        justifyContent="center"
        width="100%"
      >
        <Box width={320}>
          <ComboBox
            accessibilityClearButtonLabel="Clear the current value"
            id="controlled"
            inputValue={inputValue}
            label="State"
            noResultText="No results for your selection"
            onBlur={() => {
              if (!selected) setInputValue('');
              setSuggestedOptions(usStatesOptions);
            }}
            onChange={handleOnChange}
            onClear={() => {
              setInputValue('');
              setSelected();
              setSuggestedOptions(usStatesOptions);
            }}
            onSelect={handleSelect}
            options={suggestedOptions}
            placeholder="Select a US state"
            selectedOption={selected}
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
