// @flow
import * as React from 'react';
import Box from '../Box/Box';
import Switch from '../Switch/Switch';
import Text from '../Text/Text';
import Label from './Label';
import { ns, card, md, PropTable } from '../../.corkboard/cards';

ns(
  'Label',
  'Use the Label component to connect a label with a form component in an accessible way.'
);

card(
  <PropTable
    props={[
      {
        name: 'children',
        type: 'any',
      },
      {
        name: 'htmlFor',
        type: 'string',
        required: true,
        description: 'Id of the element this label is describing',
      },
    ]}
  />,
  { heading: false }
);

card(
  'Example',
  md`
    Whenever you are using a [SelectList](#/SelectList), [Switch](#/Switch), [TextField](#/TextField) or [TextArea](#/TextArea) component, you should use a \`Label\`.

    ~~~html
    <Box>
      <Box paddingY={1}>
        <Label htmlFor="switchExample">
          <Text>Live example</Text>
        </Label>
      </Box>
      <Switch
        onChange={() => {}}
        id="switchExample"
        switched={true}
      />
    </Box>
    ~~~
  `,
  atom => (
    <Box>
      <Box paddingY={1}>
        <Label htmlFor="switchExample">
          <Text>Live example</Text>
        </Label>
      </Box>
      <Switch
        onChange={() => atom.reset({ switched: !atom.deref().switched })}
        id="switchExample"
        switched={atom.deref().switched}
      />
    </Box>
  )
);
