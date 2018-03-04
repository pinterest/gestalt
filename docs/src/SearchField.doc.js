// @flow

import * as React from 'react';
import { SearchField, Icon, IconButton } from 'gestalt';
import { md, card, PropTable, Example } from './cards';
import PageHeader from './components/PageHeader';

card(<PageHeader name="SearchField" />);

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
        name: 'onBlur',
        type: '({ event: SyntheticEvent<HTMLInputElement> }) => void',
      },
      {
        name: 'onChange',
        type: `({
          value: string,
          syntheticEvent: SyntheticEvent<HTMLInputElement>
        }) => void`,
        required: true,
      },
      {
        name: 'onFocus',
        type: `({
          value: string,
          syntheticEvent: SyntheticEvent<HTMLInputElement>
        }) => void`,
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
  'Example: Accessibility',
  md`
    We want to make sure every button on the page is unique when being read by screenreader.
    \`accessibilityExpanded\` allows us to specify that the associated content (i.e. Flyout) is open
    \`accessibilityHaspopup\` allows us to specify that the button has associated content (i.e. Flyout)
    \`accessibilityLabel\` allows us to update the spoken text.

    Be sure to internationalize your \`accessibilityLabel\`.
  `,
  <Example
    defaultCode={`
    class SearchFieldExample extends React.Component {
      constructor(props) {
        super(props);
        this.state = { value: '' };
      }

      render() {
        return (
          <Box color="white" shape="rounded" padding={3} display="flex" direction="row" alignItems="center">
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
                onChange={({ value }) => this.setState({ value })}
                placeholder="Search and explore"
                value={this.state.value}
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
        );
      }
    }
`}
    scope={{ Icon, IconButton, SearchField }}
  />,
  { stacked: true }
);
