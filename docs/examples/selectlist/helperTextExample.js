// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, SelectList } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <SelectList
        helperText="Product prices in your data source without an ISO currency code will default to this currency"
        id="selectlistexample12"
        label="Default currency"
        onChange={() => {}}
        size="lg"
      >
        {[
          { label: 'ARS - Argentine peso', value: 'ars' },
          { label: 'AUD - Australian dollar', value: 'aud' },
          { label: 'ERN - Eritrean nakfa', value: 'ern' },
          { label: 'EUR - Euro', value: 'eur' },
          { label: 'GBP - British pound', value: 'gbp' },
          { label: 'JPY - Japanese yen', value: 'jpy' },
          { label: 'USD - United States Dollar', value: 'usd' },
        ].map(({ label, value }) => (
          <SelectList.Option key={label} label={label} value={value} />
        ))}
      </SelectList>
    </Box>
  );
}
