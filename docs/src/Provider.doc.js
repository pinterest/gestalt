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
    description="An app may optionally have a `Provider` to set up context for components further down the tree. This provider implements high-level contexts meant to cover most of the app tree rather than isolated branches."
  />,
);

card(
  <PropTable
    props={[
      {
        name: 'colorScheme',
        type: `'light' | 'dark' | 'userPreference'`,
        defaultValue: 'light',
        description: `The color scheme for components inside the provider. Use 'userPreference' to allow the end user to specify the color scheme via their browser settings, using the 'prefers-color-scheme' media query.`,
        href: 'Color-scheme',
      },
      {
        name: 'id',
        type: 'string',
        description:
          'An optional id for your color scheme provider. If not passed in, settings will be applied as globally as possible (example: setting color scheme variables at :root).',
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
  const [scheme, setScheme] = React.useState("light")
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
      />
    </MainSection.Subsection>
    <MainSection.Subsection
      title="On Navigation"
      description="This example illustrates the implementation of `onNavigation` context to control the link functionality of Gestalt components externally. This example has 4 relevant parts: a Provider, an `onNavigation` high-order function, consumer components (Link, Button, IconButton, TapArea), and `onNavigationOptions` props. The top Provider passes the `onNavigation` function to consumer components. Then, `onNavigation` returns a function that gets called during the `onClick` event handler. The `onNavigation` function can contain complex logic including React hooks to perform side effects. In this case, `onNavigation` is used to disable the link, show an alert message, and open a different URL in a new window. Finally, the `onNavigationOptions` prop provides a flexible API. In this case, `navigationMode` allows to disable/enable the `onNavigation` logic. Other uses could be accessing `event.stopPropagation`."
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
      alert("Disabled link. Opening help.pinterest.com instead.");
      window.open("https://help.pinterest.com", "_blank");
    }

    return onNavigationOptions && onNavigationOptions.navigationMode === "client"
      ? onNavigationClick
      : null;
  }

  const linkProps = {
    href: "https://pinterest.com",
    onNavigationOptions: {
      navigationMode: clientOnNavigationMode ? "client" : "server"
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
        <Flex gap={4} alignItems="center">
          <Text>
            <Link {...linkProps}>Visit pinterest.com</Link>
          </Text>
          <Box>
            <Button
              {...linkProps}
              inline
              role="link"
              text="Visit pinterest.com"
            />
          </Box>
          <IconButton
            {...linkProps}
            accessibilityLabel="Link IconButton"
            icon="link"
            role="link"
          />
          <Box width={100}>
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
      </Flex>
    </Provider>
  );
}
`}
      />
      <MainSection.Card
        cardSize="lg"
        defaultCode={`
function OnNavigation() {
  const [clientOnNavigationMode, setClientOnNavigationMode] = React.useState(true);

  const onNavigation = ({ href, onNavigationOptions }) => {

    const onNavigationClick = ({ event }) => {
      event.nativeEvent.preventDefault();
      // eslint-disable-next-line no-alert
      alert("Disabled link. Opening help.pinterest.com instead.");
      window.open("https://help.pinterest.com", "_blank");
    }

    return onNavigationOptions && onNavigationOptions.navigationMode === "client"
      ? onNavigationClick
      : null;
  }

  const linkProps = {
    href: "https://pinterest.com",
    onNavigationOptions: {
      navigationMode: clientOnNavigationMode ? "client" : "server"
    },
  }

  return (
    <Provider onNavigation={onNavigation}>
      <Flex direction="column" gap={2}>
        <Flex direction="row" gap={2}>
          <Switch
            onChange={() => setClientOnNavigationMode(!clientOnNavigationMode)}
            id="disable-buttons-2"
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
        <Flex direction="column" gap={4} alignItems="center">
          <Callout
            type="info"
            iconAccessibilityLabel="Info icon"
            title="Your business account was created!"
            message="Apply to the Verified Merchant Program!"
            primaryAction={
              { ...linkProps,
                label:"Get started",
              }}
            secondaryAction={
              { ...linkProps,
                label:"Learn more",
              }}
            dismissButton={{
              accessibilityLabel: "Dismiss banner",
              onDismiss: ()=>{},
            }}
          />
          <Upsell
            title="Give $30, get $60 in ads credit"
            message="Earn $60 of ads credit, and give $30 of ads credit to a friend"
            primaryAction={
              { ...linkProps,
                label:"Send invite"
              }}
            dismissButton={{
              accessibilityLabel: "Dismiss banner",
              onDismiss: ()=>{},
            }}
            imageData={{
              component: <Icon icon="pinterest" accessibilityLabel="Pin" color="darkGray" size={32}/>
            }}
          />
          <ActivationCard
            status="notStarted"
            statusMessage="Not started"
            title="Claim your website"
            message="Grow distribution and track Pins linked to your website"
            link={{
              ...linkProps,
              label:"Claim your website now"
            }}
            dismissButton={{
              accessibilityLabel: "Dismiss card",
              onDismiss: ()=>{},
            }}
          />
        </Flex>
      </Flex>
    </Provider>
  );
}
`}
      />
      <MainSection.Card
        cardSize="lg"
        defaultCode={`
function OnNavigation() {
  const [clientOnNavigationMode, setClientOnNavigationMode] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(null);
  const anchorRef = React.useRef(null);
  const handleSelect = ({item}) => {
    setSelected(item);
  };

  const onNavigation = ({ href, onNavigationOptions }) => {

    const onNavigationClick = ({ event }) => {
      event.nativeEvent.preventDefault();
      // eslint-disable-next-line no-alert
      alert("Disabled link. Opening help.pinterest.com instead.");
      window.open("https://help.pinterest.com", "_blank");
    }

    return onNavigationOptions && onNavigationOptions.navigationMode === "client"
      ? onNavigationClick
      : null;
  }

  const linkProps = {
    href: "https://pinterest.com",
    onNavigationOptions: {
      navigationMode: clientOnNavigationMode ? "client" : "server"
    },
  }

  return (
    <Provider onNavigation={onNavigation}>
      <Flex direction="column" gap={2}>
        <Flex direction="row" gap={2}>
          <Switch
            onChange={() => setClientOnNavigationMode(!clientOnNavigationMode)}
            id="disable-buttons-3"
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
        <Box display="flex" justifyContent="center">
          <Button
            accessibilityControls="basic-dropdown-example"
            accessibilityHaspopup
            accessibilityExpanded={open}
            iconEnd="arrow-down"
            text="Menu"
            inline
            ref={anchorRef}
            selected={open}
            onClick={ () => setOpen((prevVal) => !prevVal) }
          />
          {open && (
            <Dropdown id="basic-dropdown-example" anchor={anchorRef.current} onDismiss={() => {setOpen(false)}}>
              <Dropdown.Item
                { ...linkProps }
                isExternal
                option={{ value: "item 3", label: "Item 3 with a really long, detailed, complex name" }}
              />
            </Dropdown>
          )}
        </Box>
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
