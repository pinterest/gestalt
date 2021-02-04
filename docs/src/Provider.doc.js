// @flow strict
import React, { type Node } from 'react';
import Example from './components/Example.js';
import PropTable from './components/PropTable.js';
import PageHeader from './components/PageHeader.js';

const cards: Array<Node> = [];
const card = (c) => cards.push(c);

card(
  <PageHeader
    name="Provider"
    description="An app may optionally have a `Provider` to set up context for components further down the tree."
  />,
);

card(
  <PropTable
    props={[
      {
        name: 'colorScheme',
        type: `"light" | "dark" | "userPreference"`,
        defaultValue: 'light',
        description:
          'The color scheme for components inside the provider. Specify "userPreference" to use "prefers-color-scheme" media query.',
        href: 'colorScheme',
      },
      {
        name: 'id',
        type: 'string',
        description:
          'An optional id for your provider. If not passed in, settings will be applied as globally as possible (example: it sets color scheme variables at :root).',
      },
      {
        name: 'onNavigation',
        type:
          '{ href: string, onNavigationOptions:  ({ [string]: Node | ({| +event: SyntheticEvent<> |}) => void }) }',
        description: [
          `onNavigation is a high-order function. If passed in, consumer components (Link, Button, IconButton, and TapArea) call the onNavigation function with 2 named parameters (href and onNavigationOptions) that returns a function that gets called inside the onClick event handler.`,
          `"onNavigationOptions" is an object that acts as a flexible API for your onNavigation external logic.`,
        ],
        href: 'onNavigation',
      },
    ]}
  />,
);

card(
  <Example
    description="Specify a light or dark color scheme for components"
    name="Color scheme"
    id="colorScheme"
    defaultCode={`
function Example(props) {
  const [scheme, setScheme] = React.useState('light')
  const schemeOptions = [
    {
      value: "light",
      label: "Light"
    },
    {
      value: "dark",
      label: "Dark"
    },
    {
      value: "userPreference",
      label: "User Preference"
    }
  ];
  return (
    <Provider colorScheme={scheme} id="docsExample">
      <Box color="white" padding={2}>
        <SelectList
          id="scheme"
          name="scheme"
          onChange={({ value }) => setScheme(value)}
          options={schemeOptions}
          placeholder="Select color scheme"
          label="Color scheme"
          value={scheme}
        />
        <Box padding={2}>
          <Text>Some content</Text>
        </Box>
        <Button text="Example button" inline /> <Button color="red" text="Red Button" inline />
      </Box>
    </Provider>
  );
}`}
  />,
);

card(
  <Example
    id="OnNavigation"
    name="OnNavigation"
    defaultCode={`
function OnNavigation() {
  const [clientOnNavigationMode, setClientOnNavigationMode] = React.useState(true);

  const onNavigation = ({ href, onNavigationOptions }) => {

    const onNavigationClick = ({ event }) => {
        event.nativeEvent.preventDefault();
        // eslint-disable-next-line no-alert
        alert('Disabled link. Opening help.pinterest.com instead');
        window.open('https://help.pinterest.com', '_blank');
      }

    return onNavigationOptions && onNavigationOptions.navigationMode === 'client' ? onNavigationClick: null;
  }

  const linkProps = {
    href: "https://pinterest.com",
    onNavigationOptions: {
      navigationMode: clientOnNavigationMode ? 'client' : 'server'
    },
    target: "blank",
  }

  return (
    <Provider onNavigation={onNavigation}>
      <Flex direction="column" gap={2}>
        <Flex direction="row" gap={2}>
          <Switch
            onChange={() => setClientOnNavigationMode(!clientOnNavigationMode)}
            id="disable-buttons"
            switched={clientOnNavigationMode}
          />
          {clientOnNavigationMode ? (
            <Flex direction="row" gap={2}>
              <Text weight="bold">Client</Text>
              <Text>Server</Text>
              <Text>Navigation</Text>
            </Flex>
          ) : (
            <Flex direction="row" gap={2}>
              <Text>Client</Text>
              <Text weight="bold">Server</Text>
              <Text>Navigation</Text>
            </Flex>
          )}
        </Flex>
        <Link {...linkProps}>
          <Text>https://pinterest.com</Text>
        </Link>
        <Button
          {...linkProps}
          inline
          role="link"
          text="Visit pinterest.com"
        />
        <IconButton
          {...linkProps}
          accessibilityLabel="Link IconButton"
          icon="link"
          role="link"
        />
         <Box width={200}>
        <TapArea
          {...linkProps}
          role="link"
          rounding={2}
        >
          <Box color="darkGray" rounding={4} borderStyle="sm">
            <Mask rounding={2}>
              <Image
                alt="Antelope Canyon"
                naturalHeight={1}
                naturalWidth={1}
                src="https://i.ibb.co/DwYrGy6/stock14.jpg"
              />
            </Mask>
          </Box>
        </TapArea>
      </Box>
      </Flex>
    </Provider>
  );
}
`}
  />,
);

export default cards;
