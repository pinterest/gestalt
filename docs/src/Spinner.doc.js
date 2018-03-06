// @flow
import * as React from 'react';
import { Box, Button, Text, Spinner } from 'gestalt';
import PropTable from './components/PropTable';
import StateRecorder from './components/StateRecorder';
import PageHeader from './components/PageHeader';
import CardPage from './components/CardPage';

const cards = [];
const card = c => cards.push(c);

card(<PageHeader name="Spinner" />);

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
        name: 'show',
        type: 'boolean',
        required: true,
        defaultValue: false,
      },
    ]}
    heading={false}
  />
);

card(
  <StateRecorder
    description={`
    Spinners indicate when a user has to wait for something else to occur. They delay showing for 300ms to improve perceived performance.

    The label on a spinner is for accessibility. You should pick labels that relate to the specific part of the product it's being used in ("Loading homefeed" for instance).
  `}
    name="Spinner"
    fn={atom => (
      <Box>
        <Box paddingY={2}>
          <Button
            inline
            text={!atom.deref().show ? 'Show spinner' : 'Hide spinner'}
            onClick={() => {
              atom.reset({ show: !atom.deref().show });
            }}
            size="md"
          />
        </Box>
        <Spinner
          show={!!atom.deref().show}
          accessibilityLabel="Example spinner"
        />
        <Text>Data</Text>
      </Box>
    )}
    initialState={{ show: true }}
    heading={false}
  />
);

export default () => <CardPage cards={cards} />;
