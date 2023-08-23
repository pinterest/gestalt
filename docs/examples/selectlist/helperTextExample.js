// @flow strict
import { type Node } from 'react';
import { Box, SelectList } from 'gestalt';

export default function Example(): Node {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
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
