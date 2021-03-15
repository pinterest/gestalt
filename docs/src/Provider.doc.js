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
        description: `The color scheme for components inside the provider. Use 'userPreference' to allow the end user to specify the color scheme via their browser settings, using the 'prefers-color-scheme' media query. See [color scheme](#Custom-navigation-context) variant for examples.`,
      },
      {
        name: 'id',
        type: 'string',
        description:
          'An optional id for your color scheme provider. If not passed in, settings will be applied as globally as possible (ex. setting color scheme variables at :root).',
      },
      {
        name: 'onNavigation',
        type: '({| href: string, target?: null | "self" | "blank" }) => void |}',
        description:
          'If passed, it replaces the default link behavior with custom on navigation behavior. See [custom navigation contex](#Custom-navigation-context) variant for examples.',
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
      title="Custom navigation context"
      description={`
Components with links use simple \`<a>\` tags. In order to replace the default link behavior with custom ones (e.g. [react-router](https://www.google.com/search?q=react-router&oq=react-router&aqs=chrome..69i57j0l9.2115j0j7&sourceid=chrome&ie=UTF-8)), \`onNavigation\` provides an interface to pass external logic into the 'onClick' event handler in children links.

This example illustrates a custom navigation implementations to externally control the link functionality of Link: setting a default navigation logic with [Provider](/Provider).

If \`onNavigation\` prop is passed to Provider, it's passed down to all children Links and sets a customized default link navigation behavior. \`onNavigation\` is a higher-order function: it takes named arguments: \`href\` and \`target\` and returns a function that gets called last on the \`onClick\` event handler.

If \`onNavigation\` is a hook function, it can contain complex logic, including [React hooks](https://reactjs.org/docs/hooks-reference.html), to perform side effects.

In this example, the \`useOnNavigation\` hook function is passed to Provider and executes the following actions:
- Disable the default link behavior
- Show an alert message
- Open a different URL in a new window

The returned \`onNavigationClick\` function inside the hook function uses the event access to [preventDefault()](https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault). It could also be used to [stopPropagation()](https://developer.mozilla.org/en-US/docs/Web/API/Event/stopPropagation).
      `}
    >
      <MainSection.Card
        title="Examples from start to end: Link, Button, IconButton, TapArea"
        cardSize="lg"
        defaultCode={`
function OnNavigation() {
  const [ onNavigationMode, setOnNavigationMode ] = React.useState('default');

  const useOnNavigation = ({ href, target }) => {

    const onNavigationClick = ({ event }) => {
      event.preventDefault();
      // eslint-disable-next-line no-alert
      alert('Disabled link: '+href+'. Opening help.pinterest.com instead.');
      window.open('https://help.pinterest.com', target === 'blank' ? '_blank' : '_self');
    }

    return onNavigationClick;
  }

  const linkProps = {
    href: 'https://pinterest.com',
    target: 'blank',
  }

  return (
    <Provider onNavigation={onNavigationMode === 'custom' ? useOnNavigation : undefined}>
      <Flex direction="column" gap={2}>
        <Flex direction="column" gap={2}>
          <Text>Navigation type:</Text>
          <RadioButton
            checked={onNavigationMode === 'default'}
            id="default1"
            label="Default Link Navigation"
            name="default"
            onChange={() => setOnNavigationMode('default')}
            value="default"
          />
          <RadioButton
            checked={onNavigationMode === 'custom'}
            id="custom1"
            label="Custom Provider Navigation"
            name="custom"
            onChange={() => setOnNavigationMode('custom')}
            value="custom"
          />
          <Divider/>
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
            icon="visit"
            iconColor="darkGray"
            role="link"
            size="lg"
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
        title="Examples from top to bottom: Callout, Upsell, ActivationCard"
        cardSize="lg"
        defaultCode={`
function OnNavigation() {
  const [ onNavigationMode, setOnNavigationMode ] = React.useState('default');

  const useOnNavigation = ({ href, target }) => {

    const onNavigationClick = ({ event }) => {
      event.preventDefault();
      // eslint-disable-next-line no-alert
      alert('Disabled link: '+href+'. Opening help.pinterest.com instead.');
      window.open('https://help.pinterest.com', target === 'blank' ? '_blank' : '_self');
    }

    return onNavigationClick;
  }

  const linkProps = {
    href: 'https://pinterest.com',
    target: 'blank',
  }

  return (
    <Provider onNavigation={onNavigationMode === 'custom' ? useOnNavigation : undefined}>
      <Flex direction="column" gap={2}>
        <Flex direction="column" gap={2}>
          <Text>Navigation type:</Text>
          <RadioButton
            checked={onNavigationMode === 'default'}
            id="default2"
            label="Default Link Navigation"
            name="default"
            onChange={() => setOnNavigationMode('default')}
            value="default"
          />
          <RadioButton
            checked={onNavigationMode === 'custom'}
            id="custom"
            label="Custom Provider Navigation"
            name="custom2"
            onChange={() => setOnNavigationMode('custom')}
            value="custom"
          />
          <Divider/>
        </Flex>
        <Flex direction="column" gap={4} alignItems="center">
          <Callout
            type="info"
            iconAccessibilityLabel="Info icon"
            title="Your business account was created!"
            message="Apply to the Verified Merchant Program!"
            primaryAction={
              { ...linkProps,
                label:'Get started',
              }}
            secondaryAction={
              { ...linkProps,
                label: 'Learn more',
              }}
            dismissButton={{
              accessibilityLabel: 'Dismiss banner',
              onDismiss: () => {},
            }}
          />
          <Upsell
            title="Give $30, get $60 in ads credit"
            message="Earn $60 of ads credit, and give $30 of ads credit to a friend"
            primaryAction={
              { ...linkProps,
                label: 'Send invite'
              }}
            dismissButton={{
              accessibilityLabel: 'Dismiss banner',
              onDismiss: () => {},
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
              label: 'Claim your website now'
            }}
            dismissButton={{
              accessibilityLabel: 'Dismiss card',
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
        title="With a Dropdown"
        cardSize="lg"
        defaultCode={`
function OnNavigation() {
  const [ onNavigationMode, setOnNavigationMode ] = React.useState('default');
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(null);
  const anchorRef = React.useRef(null);
  const handleSelect = ({item}) => {
    setSelected(item);
  };

  const useOnNavigation = ({ href, target }) => {

    const onNavigationClick = ({ event }) => {
      event.preventDefault();
      // eslint-disable-next-line no-alert
      alert('Disabled link: '+href+'. Opening help.pinterest.com instead.');
      window.open('https://help.pinterest.com', target === 'blank' ? '_blank' : '_self');
    }

    return onNavigationClick;
  }

  const linkProps = {
    href: 'https://pinterest.com',
    target: 'blank',
  }

  return (
    <Provider onNavigation={onNavigationMode === 'custom' ? useOnNavigation : undefined}>
      <Flex direction="column" gap={2}>
        <Flex direction="column" gap={2}>
          <Text>Navigation type:</Text>
          <RadioButton
            checked={onNavigationMode === 'default'}
            id="default3"
            label="Default Link Navigation"
            name="default"
            onChange={() => setOnNavigationMode('default')}
            value="default"
          />
          <RadioButton
            checked={onNavigationMode === 'custom'}
            id="custom3"
            label="Custom Provider Navigation"
            name="custom"
            onChange={() => setOnNavigationMode('custom')}
            value="custom"
          />
          <Divider/>
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
                option={{ value: 'item 3', label: 'Item 3 with a really long, detailed, complex name' }}
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

card(
  <MainSection name="Related">
    <MainSection.Subsection
      description={`
      **[Link](/Link)** / **[Button](/Button)** / **[IconButton](/IconButton)** / **[TapArea](/TapArea)**  / **[DropDown](/DropDown)** / **[Callout](/Callout)** / **[Upsell](/Upsell)** / **[ActivationCard](/ActivationCard)**
      If these components are under a Provider, their link behavior defaults to the logic defined in Provider. In order to disable the onNavigation logic, we can return "disableOnNavigation" in the \`onClick\` callback. See each component page for more information.
    `}
    />
  </MainSection>,
);

export default cards;
