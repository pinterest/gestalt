// @flow

import * as React from 'react';
import SearchField from './SearchField';
import { ns, card, PropTable, StateRecorder } from '../../.corkboard/cards';
import Box from '../Box/Box';
import Icon from '../Icon/Icon';
import IconButton from '../IconButton/IconButton';

ns('SearchField');

card(
  <PropTable
    props={[
      {
        name: 'accessibilityLabel',
        type: 'string',
        required: true,
        description:
          'String that clients such as VoiceOver will read to describe the element. Always localize the label.',
      },
      {
        name: 'id',
        type: 'string',
        required: true,
      },
      {
        name: 'onChange',
        type: '({ value: string }) => void',
        required: true,
      },
      {
        name: 'onFocus',
        type: '({ value: string }) => void',
      },
      {
        name: 'placeholder',
        type: 'string',
      },
      {
        name: 'value',
        type: 'string',
      },
    ]}
  />,
  { heading: false }
);

card(
  'Demo',
  <StateRecorder
    fn={atom => (
      <div className="border">
        <Box padding={3} display="flex" direction="row" alignItems="center">
          <Box padding={3}>
            <Icon
              icon="pinterest"
              color="red"
              size={20}
              accessibilityLabel="Pinterest"
            />
          </Box>
          <Box flex="grow" paddingX={2}>
            <SearchField
              accessibilityLabel="Demo Search Field"
              id="searchField"
              onChange={({ value }) => atom.reset({ value })}
              placeholder="Search and explore"
              value={atom.deref().value}
            />
          </Box>
          <Box paddingX={2}>
            <IconButton
              accessibilityLabel="Notifications"
              icon="speech-ellipsis"
              size="md"
            />
          </Box>
          <Box paddingX={2}>
            <IconButton accessibilityLabel="Profile" icon="person" size="md" />
          </Box>
        </Box>
      </div>
    )}
    initialState={{ value: '' }}
  />
);
