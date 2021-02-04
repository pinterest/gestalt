// @flow strict
import React, { type Node } from 'react';
import PropTable from './components/PropTable.js';
import PageHeader from './components/PageHeader.js';
import MainSection from './components/MainSection.js';

const cards: Array<Node> = [];
const card = (c) => cards.push(c);

card(
  <PageHeader
    name="Provider"
    description="An app may optionally have a `Provider` to set up context for components further down the tree. This provider implements high-level contexts meant to cover most of the apps tree rather than isolated branches."
  />,
);

card(
  <PropTable
    props={[
      {
        name: 'colorScheme',
        type: `'light' | 'dark' | 'userPreference'`,
        defaultValue: 'light',
        description: `The color scheme for components inside the provider. Specify 'userPreference' to use 'prefers-color-scheme' media query.`,
        href: 'Color-scheme',
      },
      {
        name: 'id',
        type: 'string',
        description:
          'An optional id for your color scheme provider. If not passed in, settings will be applied as globally as possible (example: it sets color scheme variables at :root).',
        href: 'Color-scheme',
      },
      {
        name: 'onNavigation',
        type:
          '{ href: string, onNavigationOptions:  ({ [string]: Node | ({| +event: SyntheticEvent<> |}) => void }) }',
        description: [
          'Components with link functionality use simple `<a>` tags. In order to replace the default link functionality with more complex ones (ex. withRouter or spam checking), onNavigation provides an interface to implement external logic into the onClick event handler in links.',
          ` 'onNavigation' is a high-order function. If passed into the provider, consumer components (ex. Link, Button, IconButton, and TapArea) call the 'onNavigation' function with 2 named parameters ('href' and 'onNavigationOptions') that returns a function that gets called inside the 'onClick' event handler. 'onNavigationOptions' is an object that acts as a flexible API for your onNavigation external logic.`,
        ],
        href: 'OnNavigation',
      },
    ]}
  />,
);

card(
  <MainSection name="Variants">
    <MainSection.Subsection
      title="Color scheme"
      description="Specify a light or dark color scheme for components"
    >
      <MainSection.Card
        cardSize="lg"
        defaultCode={`
function Example(props) {
  const [scheme, setScheme] = React.useState('light')
  const schemeOptions = [
    {
      value: 'light',
      label: 'Light'
    },
    {
      value: 'dark',
      label: 'Dark'
    },
    {
      value: 'userPreference',
      label: 'User Preference'
    }
  ];
  return (
    <Provider colorScheme={scheme} id='docsExample'>
      <Box color='white' padding={2}>
        <SelectList
          id='scheme'
          name='scheme'
          onChange={({ value }) => setScheme(value)}
          options={schemeOptions}
          placeholder='Select color scheme'
          label='Color scheme'
          value={scheme}
        />
        <Box padding={2}>
          <Text>Some content</Text>
        </Box>
        <Button text='Example button' inline /> <Button color='red' text='Red Button' inline />
      </Box>
    </Provider>
  );
}`}
      />
    </MainSection.Subsection>
    <MainSection.Subsection
      title="OnNavigation"
      description="This example illustrates the implemention of `onNavigation` context so that the link functionality of Gestalt components can be controlled externally. This example had 4 rellevant parts: a Provider, an `onNavigation` high-order function, consumer components (Link, Button, IconButton, TapArea), and `onNavigationOptions` props. The top Provider will pass to the consumer components the `onNavigation` function which will make accessible a final function that will be called during the `onClick` event handler. The `onNavigation` function can contain complex logic including React hooks to perform side effects. In this case, we are using `onNavigation` to disable the link, show an alert message, and open a different url in a new window. Finally, the `onNavigationOptions` props provides a flexible API. In this case, `navigationMode` allows to disable/enable the `onNavigation` logic. Other uses could be accessing `event.stopPropagation`."
    >
      <MainSection.Card
        cardSize="lg"
        defaultCode={`
function OnNavigation() {
  const [clientOnNavigationMode, setClientOnNavigationMode] = React.useState(true);

  const onNavigation = ({ href, onNavigationOptions }) => {

    const onNavigationClick = ({ event }) => {
      event.nativeEvent.preventDefault();
      // eslint-disable-next-line no-alert
      alert('Disabled link. Opening help.pinterest.com instead.');
      window.open('https://help.pinterest.com', '_blank');
    }

    return onNavigationOptions && onNavigationOptions.navigationMode === 'client'
      ? onNavigationClick
      : null;
  }

  const linkProps = {
    href: 'https://pinterest.com',
    onNavigationOptions: {
      navigationMode: clientOnNavigationMode ? 'client' : 'server'
    },
    target: 'blank',
  }

  return (
    <Provider onNavigation={onNavigation}>
      <Flex direction='column' gap={2}>
        <Flex direction='row' gap={2}>
          <Switch
            onChange={() => setClientOnNavigationMode(!clientOnNavigationMode)}
            id='disable-buttons'
            switched={clientOnNavigationMode}
          />
          {clientOnNavigationMode ? (
            <Flex direction='row' gap={2}>
              <Text weight='bold'>Client</Text>
              <Text>Server</Text>
              <Text>Navigation</Text>
            </Flex>
          ) : (
            <Flex direction='row' gap={2}>
              <Text>Client</Text>
              <Text weight='bold'>Server</Text>
              <Text>Navigation</Text>
            </Flex>
          )}
        </Flex>
        <Flex gap={4} alignItems='center'>
          <Text>
            <Link {...linkProps}> Visit pinterest.com</Link>
          </Text>
          <Box>
            <Button
              {...linkProps}
              inline
              role='link'
              text='Visit pinterest.com'
            />
          </Box>
          <IconButton
            {...linkProps}
            accessibilityLabel='Link IconButton'
            icon='link'
            role='link'
          />
          <Box width={100}>
            <TapArea
              {...linkProps}
              role='link'
              rounding={2}
            >
              <Box color='darkGray' rounding={4} borderStyle='sm'>
                <Mask rounding={2}>
                  <Image
                    alt='Antelope Canyon'
                    naturalHeight={1}
                    naturalWidth={1}
                    src='https://i.ibb.co/DwYrGy6/stock14.jpg'
                  />
                </Mask>
              </Box>
            </TapArea>
          </Box>
        </Flex>
      </Flex>
    </Provider>
  );
}
`}
      />
    </MainSection.Subsection>
  </MainSection>,
);

export default cards;
