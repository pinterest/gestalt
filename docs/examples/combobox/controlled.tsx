import { useState } from 'react';
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
] as const;

export default function Example() {
  const usStatesOptions = US_STATES.map((pronoun, index) => ({
    label: pronoun,
    value: `value${index}`,
  }));

  const [suggestedOptions, setSuggestedOptions] = useState(usStatesOptions);
  const [inputValue, setInputValue] = useState<string>(usStatesOptions[5]?.label ?? '');
  const [selected, setSelected] = useState<
    | undefined
    | {
        label: string;
        subtext?: string;
        value: string;
      }
  >(usStatesOptions[5]);

  const handleOnChange = ({
    value,
  }: {
    event: React.ChangeEvent<HTMLInputElement>;
    value: string;
  }) => {
    // @ts-expect-error - TS2554 - Expected 1 arguments, but got 0.
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
    event: React.ChangeEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>;
    item: {
      label: string;
      subtext?: string;
      value: string;
    };
  }) => {
    setInputValue(item.label);
    setSuggestedOptions(usStatesOptions);
    setSelected(item);
  };

  return (
    <Box padding={8} width="100%">
      <Flex direction="column" gap={4}>
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
            // @ts-expect-error - TS2554 - Expected 1 arguments, but got 0.
            setSelected();
            setSuggestedOptions(usStatesOptions);
          }}
          onSelect={handleSelect}
          options={suggestedOptions}
          placeholder="Select a US state"
          selectedOption={selected}
        />
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
