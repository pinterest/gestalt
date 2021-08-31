// @flow strict
import type { Node } from 'react';
import { Button } from 'gestalt';
import PropTable from '../components/PropTable.js';
import CombinationNew from '../components/CombinationNew.js';
import PageHeader from '../components/PageHeader.js';
import MainSection from '../components/MainSection.js';
import CardPage from '../components/CardPage.js';
import { customNavigationDescription } from '../components/docsUtils.js';

const cards: Array<Node> = [];
const card = (c) => cards.push(c);

card(
  <PageHeader
    name="Button"
    description={`
Buttons allow users to perform actions within a surface. They can be used alone for immediate action, or as a trigger for another component, like a Dropdown or Popover.`}
    defaultCode={`
      <Flex>
        <Button color='red' size='lg' text='Save' />
      </Flex>
    `}
  />,
);

card(
  <PropTable
    props={[
      {
        name: 'accessibilityLabel',
        type: 'string',
        required: false,
        defaultValue: null,
        description: [
          'Supply a short, descriptive label for screen-readers to replace button texts that do not provide sufficient context about the button component behavior. Texts like `Click Here,` `Follow,` or `Read More` can be confusing when a screen reader reads them out of context. In those cases, we must pass an alternative text to replace the button text.',
          'Use IconButton if you only need a button with an icon and no text.',
          'Accessibility: It populates aria-label. Screen readers read the `accessibilityLabel` prop, if present, instead of `text`.',
        ],
        href: 'accessibilityLabel',
      },
      {
        name: 'accessibilityControls',
        type: 'string',
        required: false,
        defaultValue: null,
        description: [
          'Specify the `id` of an associated element (or elements) whose contents or visibility are controlled by a button component so that screen reader users can identify the relationship between elements.',
          'Optional with button-role + button-type buttons.',
          'Accessibility: It populates aria-controls.',
        ],
        href: 'accessibility',
      },
      {
        name: 'accessibilityExpanded',
        type: 'boolean',
        required: false,
        defaultValue: null,
        description: [
          'Indicate that a button component hides or exposes collapsible components and expose whether they are currently expanded or collapsed.',
          'Optional with button-role + button-type buttons.',
          'Accessibility: It populates aria-expanded.',
        ],
        href: 'accessibility',
      },
      {
        name: 'accessibilityHaspopup',
        type: 'boolean',
        required: false,
        defaultValue: null,
        description: [
          'Indicate that a button component controls the appearance of interactive popup elements, such as menu or dialog.',
          'Optional with button-role + button-type buttons.',
          'Accessibility: It populates aria-haspopup.',
        ],
        href: 'accessibility',
      },
      {
        name: 'color',
        type: `'gray' | 'red' | 'blue' | 'transparent' |  'semiTransparentWhite' | 'transparentWhiteText' | 'white'`,
        required: false,
        defaultValue: 'gray',
        description: [
          'Primary colors to apply to the button background.',
          'Accessibility: Use `transparentWhiteText` to increase the contrast between a dark background and a transparent-Button text.',
        ],
        href: 'color',
      },
      {
        name: 'disabled',
        type: 'boolean',
        required: false,
        defaultValue: null,
        description:
          'Set disabled state so buttons look inactive, cannot be interacted with, and actions are not available.',
        href: 'type-roles',
      },
      {
        name: 'iconEnd',
        type: '$Keys<typeof icons>',
        required: false,
        defaultValue: false,
        description: [
          'Add a Gestalt icon to be displayed after the button text. Sometimes an icon can help clarify the usage of a button. Menus are a common use case.',
          'Accessibility: Icons on buttons are not accessible for screen readers.',
          'Use IconButton if you only need buttons with icons and no text.',
        ],
        href: 'iconEnd',
      },
      {
        name: 'fullWidth',
        type: 'boolean',
        required: false,
        defaultValue: false,
        description:
          'Default buttons are sized by the text within the button whereas full-width buttons expand to the full width of their container.',
        href: 'width',
      },
      {
        name: 'onClick',
        type:
          '({ event: SyntheticMouseEvent<HTMLButtonElement> | SyntheticKeyboardEvent<HTMLButtonElement> | SyntheticMouseEvent<HTMLAnchorElement> | SyntheticKeyboardEvent<HTMLAnchorElement>, {| disableOnNavigation: () => void |}> }) => void',
        required: false,
        defaultValue: null,
        description: [
          'Callback fired when a button component is clicked (pressed and released) with a mouse or keyboard. ',
          'See [custom navigation](#Custom-navigation) variant for examples.',
        ],
        href: 'selected',
      },
      {
        name: 'size',
        type: `'sm' | 'md' | 'lg'`,
        required: false,
        defaultValue: 'md',
        description:
          'Display a button in different sizes. Size changes the component padding modifying its fixed height: sm (32px), md (40px), lg (48px).',
        href: 'size',
      },
      {
        name: 'text',
        type: 'string',
        required: true,
        defaultValue: null,
        description: [
          'Text to render inside the button to convey the function and purpose of the button. The button text has a fixed size.',
          'Accessibility: Screen readers read the `accessibilityLabel` prop, if present, instead of the `text` prop. See `accessibilityLabel` for more info.',
        ],
        href: 'basic-button',
      },
      {
        name: 'type',
        type: `'submit' | 'button'`,
        required: false,
        defaultValue: 'button',
        description: [
          'Select a type of button-role button:',
          '-`button`: Use to render simple push buttons with no default behavior and control custom functionality inside the `onClick` callback.',
          '-`submit`: Use to submit forms. The button is inside/associated with a form.',
        ],
        href: 'type-roles',
      },
      {
        name: 'selected',
        type: 'boolean',
        required: false,
        defaultValue: false,
        description: [
          'Control the "selected" state of a button component to toggle binary states.',
          'Optional with button-role + button-type buttons.',
        ],
        href: 'selected',
      },
      {
        name: 'href',
        type: 'string',
        required: false,
        defaultValue: null,
        description: ['Specify a link URL.', 'Required with link-role buttons.'],
        href: 'type-roles',
      },
      {
        name: 'ref',
        type: `React.Ref<'button'> | React.Ref<'a'>`,
        required: false,
        defaultValue: null,
        description: 'Forward the ref to the underlying button or anchor element.',
        href: 'ref',
      },
      {
        name: 'tabIndex',
        type: `-1 | 0`,
        required: false,
        defaultValue: 0,
        description: [
          'Remove the component from sequential keyboard navigation to improve accessibility. The component is not focusable with keyboard navigation but it can be focused with Javascript or visually by clicking with the mouse.',
          `The default behaviour for the component is to be focusable in sequential keyboard navigation in the order defined by the document's source order.`,
          `If component is disabled, the component is also unreachable from keyboard navigation.`,
        ],
        href: 'type-roles',
      },
      {
        name: 'role',
        type: `'button' | 'link'`,
        required: false,
        defaultValue: 'button',
        description: [
          `Select a button variant:`,
          `- 'button': Use to render 'submit' or 'button'-type buttons. The button is rendered as a \`<button>\`.`,
          `- 'link': Use for buttons to act like links. The button is rendered as an \`<a>\`.`,
          `Required with link-role buttons.`,
        ],
        href: 'type-roles',
      },
      {
        name: 'rel',
        type: `'none' | 'nofollow'`,
        required: false,
        defaultValue: 'none',
        description: 'Optional with link-role buttons.',
        href: 'type-roles',
      },
      {
        name: 'target',
        type: `null | 'self' | 'blank'`,
        required: false,
        defaultValue: 'null',
        description: [
          'Define the frame or window to open the anchor defined on `href`:',
          '- `null` opens the anchor in the same window.',
          '- `blank` opens the anchor in a new window.',
          '- `self` opens an anchor in the same frame.',
          'Optional with link-role buttons.',
        ],
        href: 'type-roles',
      },
    ]}
  />,
);

card(
  <MainSection name="Usage guidelines">
    <MainSection.Subsection columns={2}>
      <MainSection.Card
        cardSize="md"
        type="do"
        title="When to Use"
        description={`
          - Communicating an action that will occur.
          - Triggering or enabling an action, such as submitting requested information.
          - Progressing or regressing a user through a step in a flow.
        `}
      />
      <MainSection.Card
        cardSize="md"
        type="don't"
        title="When Not to Use"
        description={`
          - Directing users to a new page or different part within the same page. Instead, use [Link](/Link).
          - Limited space available. Consider using an [IconButton](/IconButton) instead.
        `}
      />
    </MainSection.Subsection>
  </MainSection>,
);

card(
  <MainSection name="Best practices">
    <MainSection.Subsection columns={2}>
      <MainSection.Card
        cardSize="md"
        type="do"
        description="Place primary Buttons to the right or top of other Button styles."
        defaultCode={`
<Flex gap={8} direction="column" alignItems="stretch" alignContent="stretch" flex="grow" width="100%">
  <Flex direction="column" alignItems="center" alignContent="center" width="100%">
    <ButtonGroup>
      <Button text="Visit" size="lg" color="gray" />
      <Button text="Save" size="lg" color="red" />
    </ButtonGroup>
  </Flex>
  <Divider />
  <Flex gap={2} direction="column" flex="grow" width="100%">
    <Button text="Learn more" size="lg" color="red" fullWidth />
    <Button text="Install now" size="lg" color="gray" fullWidth />
  </Flex>
</Flex>
`}
      />
      <MainSection.Card
        cardSize="md"
        type="don't"
        description="Place more than one primary Button per container/area."
        defaultCode={`
<Flex alignContent="center">
  <ButtonGroup>
    <Button text="Visit" size="lg" color="red" />
    <Button text="Save" size="lg" color="red" />
  </ButtonGroup>
</Flex>
`}
      />

      <MainSection.Card
        cardSize="md"
        type="do"
        description="Show the full text on buttons. Buttons should be stacked when they cannot be displayed side by side."
        defaultCode={`
<Flex gap={2} direction="column" alignContent="stretch">
  <Button text="Create account" size="lg" color="red" fullWidth />
  <Button text="View settings" size="lg" color="gray" fullWidth />
</Flex>
`}
      />
      <MainSection.Card
        cardSize="md"
        type="don't"
        description="Truncate the button text. In rare instances where buttons must remain on one line, truncate the text on the secondary button before truncating on the primary button."
        defaultCode={`
<Flex gap={2}>
  <Button text="Kontoeinst..." size="lg" color="gray" />
  <Button text="Neues We..." size="lg" color="red" />
</Flex>
`}
      />
      <MainSection.Card
        cardSize="md"
        type="do"
        description="Keep the button text as simple and actionable as possible. Refer to the [Button writing guidelines](#Writing) for more detail."
        defaultCode={`
  <Button text="Create account" size="lg" color="red" />
`}
      />
      <MainSection.Card
        cardSize="md"
        type="don't"
        description={`Do not add icons to a button to refinforce the text. Icons should be used to denote specific function or interaction (\`arrow-up-right\` for linking to an external URL or \`arrow-down\` for displaying a [Popover](/popover) on click).`}
        defaultCode={`
          <Button text="Create new Pinterest account" size="lg" color="red" iconEnd='person-add' />
`}
      />
    </MainSection.Subsection>
  </MainSection>,
);

card(
  <MainSection name="Accessibility">
    <MainSection.Subsection
      title="ARIA attributes"
      description={`
When Button text does not provide sufficient context about the Button’s behavior, supply a short, descriptive label for screen-readers using accessibilityLabel. Texts like "Click Here", “Follow,” or “Shop” can be confusing when a screen reader reads them out of context. In those cases, we must pass an alternative text with deeper context to replace the Button text, like “Follow Ryan” or “Shop Wedding Invitations”.
If Button is used as a control button to show/hide a Popover-based component, we recommend passing the following ARIA attributes to assist screen readers:
- \`accessibilityControls\`: informs the screen reader that Button controls the display of an anchored Popover-based component. It populates [aria-controls](https://www.w3.org/TR/wai-aria-practices/examples/menu-button/menu-button-links.html).
- \`accessibilityHaspopup\`: informs the screen reader that there’s a Popover-based component attached to Button. It populates [aria-haspopup](https://www.w3.org/TR/wai-aria-practices/examples/menu-button/menu-button-links.html).
- \`accessibilityExpanded\`: informs the screen reader whether the button-anchored Popover-based component is currently open or closed. It populates [aria-expanded](https://www.w3.org/TR/wai-aria-practices/examples/menu-button/menu-button-links.html).
`}
    />
  </MainSection>,
);

card(
  <MainSection
    name="Localization"
    description="Be sure to localize `text` and `accessibilityLabel`. Note that localization can lengthen text by 20 to 30 percent. Avoid truncating Button text whenever possible."
  />,
);

card(
  <MainSection name="Variants">
    <MainSection.Subsection
      title="Size"
      description={`Button is available in 3 fixed sizes:
1. \`lg\` (48px)
    Large is the only size that should be used on Pinner surfaces.
2. \`md\` (40px)
    Medium is the size used on more dense UI such as business surfaces or internal tools.
3. \`sm\` (32px)
    Small buttons should be used sparingly and only in places where the UI is very dense.`}
    >
      <CombinationNew size={['sm', 'md', 'lg']}>
        {({ size }) => (
          <Button accessibilityLabel={`Example size ${size}`} color="red" text="Save" size={size} />
        )}
      </CombinationNew>
    </MainSection.Subsection>
    <MainSection.Subsection
      title="Width"
      description={`
1. Inline (default)
    Inline is our default Button width.  The width of an inline Buttons is based on the length of its text. Use in most cases where you need a Button.
2. Full-width (\`fullWidth\`)
    Full-width Buttons can be used in narrower content areas (less than 320px) when the text in the button is close to full width in the content area. This is especially common to see in components such as Callout and Upsell at their smaller breakpoints.
Use padding sparingly. The padding options are 1-5, which represents the padding in increments of 4 pixels (2 = 8px padding). Combine the \`padding\` with \`size\` options for custom icon/button size ratios. If omitted, padding is derived from the default padding for each \`size\` prop.`}
    >
      <CombinationNew fullwidth={[false, true]}>
        {({ fullwidth }) => (
          <Button
            accessibilityLabel={`Example width ${fullwidth}`}
            color="red"
            text="Save"
            fullWidth={fullwidth}
            size="lg"
          />
        )}
      </CombinationNew>
    </MainSection.Subsection>
    <MainSection.Subsection
      title="Color on white backgrounds"
      description={`
1. Red (Primary)
    High emphasis, used for primary actions.
2. Blue (Primary in shopping context)
    The blue Button is only intended for the shopping experience and is used for primary shopping actions.
3. Gray (Secondary)
    Medium emphasis, used for secondary actions.
4. Transparent (Tertiary)
    Low emphasis when placed on dark/image backgrounds, used for tertiary actions in that context. *Note, this treatment should be used with caution as it opens up the potential for color contrast issues.*
`}
    >
      <CombinationNew color={['red', 'blue', 'gray', 'transparent']}>
        {({ color }) => (
          <Button
            accessibilityLabel={`Example width ${color}`}
            color={color}
            text="Button"
            size="lg"
          />
        )}
      </CombinationNew>
    </MainSection.Subsection>
    <MainSection.Subsection
      columns={2}
      title="Color on color/image backgrounds"
      description={`
  1. White (Primary)
      High emphasis when placed on color/image backgrounds, used for primary actions in that context.
  2. Semi-transparent white (Secondary)
      Medium emphasis when placed on color/image backgrounds, used for secondary actions in that context.
`}
    >
      <MainSection.Card
        cardSize="md"
        defaultCode={`
function WhiteButtonExample() {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef();
  const viewRef = React.useRef();

  const isInViewport = () => {
    const rect = viewRef && viewRef.current && viewRef.current.getBoundingClientRect();
    const isVisible = rect
      ? rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      : undefined;

    if (isVisible) {
      setOpen(true)
    }
  }

  React.useEffect(() => {
    isInViewport()
    document.addEventListener('scroll', isInViewport), [document, isInViewport]
  });

  return (
    <ScrollBoundaryContainer>
      <Box ref={viewRef} width={300} height={220}>
        <Box display="flex" justifyContent="center" ref={anchorRef}>
          <Tabs
            activeTabIndex={1}
            onChange={() => {}}
            tabs={[{ href: '#Anchor', text: 'Created'}]}
          />
        </Box>
      </Box>
      {open &&
        <Layer>
          <Popover
            anchor={anchorRef.current}
            color="blue"
            idealDirection="down"
            showCaret
            onDismiss={() => {}}
            positionRelativeToAnchor={false}
            size={240}
          >
            <Box padding={3}>
              <Flex alignItems="center" direction="column" gap={4}>
                <Text color="white" align="center">
                  New look! Click Created to see Pins you've published. Click Saved to see your saved Pins and boards.
                </Text>
                <Button
                  color="white"
                  onClick={() => setOpen(false)}
                  size="lg"
                  text="Got it"
                />
              </Flex>
            </Box>
          </Popover>
        </Layer>}
    </ScrollBoundaryContainer>
  )
}
`}
      />
      <MainSection.Card
        cardSize="md"
        defaultCode={`
function SemiTransparentWhiteButtonExample() {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef();
  const viewRef = React.useRef();

  const isInViewport = () => {
    const rect = viewRef && viewRef.current && viewRef.current.getBoundingClientRect();
    const isVisible = rect
      ? rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      : undefined;

    if (isVisible) {
      setOpen(true)
    }
  }

  React.useEffect(() => {
    isInViewport()
    document.addEventListener('scroll', isInViewport), [document, isInViewport]
  });

  return (
    <ScrollBoundaryContainer>
      <Box ref={viewRef} width={300} height={220}>
        <Box display="flex" justifyContent="center" ref={anchorRef}>
          <Tabs
            activeTabIndex={1}
            onChange={() => {}}
            tabs={[{ href: '#Anchor', text: 'Created'}]}
          />
        </Box>
      </Box>
      {open &&
        <Layer>
          <Popover
            anchor={anchorRef.current}
            color="blue"
            idealDirection="down"
            showCaret
            onDismiss={() => {}}
            positionRelativeToAnchor={false}
            size={240}
          >
            <Box padding={3}>
              <Flex alignItems="center" direction="column" gap={4}>
                <Text color="white" align="center">
                  New look! Click Created to see Pins you've published. Click Saved to see your saved Pins and boards.
                </Text>
                <Flex alignItems="stretch" direction="column" gap={2}>
                  <Button
                    color="white"
                    onClick={() => setOpen(false)}
                    size="lg"
                    text="Got it"
                    fullWidth
                  />
                  <Button
                    color="semiTransparentWhite"
                    onClick={() => setOpen(false)}
                    size="lg"
                    text="Learn more"
                    fullWidth
                  />
                </Flex>
              </Flex>
            </Box>
          </Popover>
        </Layer>}
    </ScrollBoundaryContainer>
  )
}
`}
      />
    </MainSection.Subsection>
    <MainSection.Subsection
      title="Icons"
      description={`
1. Icon end
    Icons at the end of the Button can be used to help visually clarify the Button’s purpose. Note that Icons on Buttons are not accessible for screen readers.
`}
    >
      <MainSection.Card
        cardSize="lg"
        defaultCode={`
<Button
  accessibilityLabel='Menu'
  iconEnd="arrow-down"
  size="lg"
  text="Menu"
/>
`}
      />
    </MainSection.Subsection>
    <MainSection.Subsection
      columns={2}
      title="Role"
      description={`
1. Button (default)
    The “button” \`role\` is used for actions. This is the default and should be used for most Buttons.
2. Link
    The “link” \`role\` is used for navigating by URL. These Buttons should not use a \`selected\` state.
`}
    >
      <MainSection.Card
        cardSize="md"
        defaultCode={`
<Button
  accessibilityLabel='Button'
  size="lg"
  text="Button"
  role="button"
/>
`}
      />
      <MainSection.Card
        cardSize="md"
        defaultCode={`
<Button
  accessibilityLabel='Link'
  iconEnd="arrow-up-right"
  size="lg"
  text="Link"
  role="link"
  href="https://pinterest.com"
/>
`}
      />
    </MainSection.Subsection>
    <MainSection.Subsection
      title="rel and target"
      description={`
These optional props control the behavior of \`role="link"\` Buttons. External links commonly use \`target="_blank"\` to open the link in a new tab or window, and \`rel="nofollow"\` to provide hints for SEO.
`}
    >
      <MainSection.Card
        cardSize="lg"
        defaultCode={`
<Button
  accessibilityLabel='Link'
  iconEnd="arrow-up-right"
  size="lg"
  text="Link"
  role="link"
  rel="nofollow"
  target="_blank"
  href="https://pinterest.com"
/>
`}
      />
    </MainSection.Subsection>
    <MainSection.Subsection
      columns={2}
      title="States"
      description={`
1. Default
    The typical state of a button that represents it can be interacted with and is not in a selected state.
2. Disabled
Used to block user interaction such as hover, focus and click. Disabled buttons are completely unreachable by a keyboard and screenreader, so do not attach Tooltips to disabled Buttons. If you need to explain why a Button is disabled, use an IconButton + Tooltip next to the disabled Button.
3. Selected
  When Button is used to toggle a boolean state or control the visibility of other elements (e.g. Dropdown), use the \`selected\` prop to indicate the current state. Do not use this prop with \`role="link"\` Buttons.
`}
    >
      <MainSection.Card
        cardSize="md"
        defaultCode={`
<Button
  accessibilityLabel='Save'
  color="red"
  text="Save"
  size="lg"
/>
`}
      />
      <MainSection.Card
        cardSize="md"
        defaultCode={`
<Button
  accessibilityLabel='Submit'
  disabled
  text="Submit"
  size="lg"
/>
`}
      />
      <MainSection.Card
        cardSize="md"
        defaultCode={`
<Button
  accessibilityLabel='Following'
  text="Following"
  selected
  size="lg"
/>
`}
      />
    </MainSection.Subsection>
    <MainSection.Subsection
      title="Accessibility props: controls, expanded, & popup"
      description={`
[TO FILL OUT]
`}
    >
      <MainSection.Card
        cardSize="md"
        defaultCode={`
function ActionDropdownExample() {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(null);
  const anchorRef = React.useRef(null);
  const onSelect = ({ item }) => setSelected(item);
  return (
    <Flex justifyContent="center">
      <Button
        accessibilityControls="action-variant-dropdown-example"
        accessibilityExpanded={open}
        accessibilityHaspopup
        iconEnd="arrow-down"
        onClick={() => setOpen((prevVal) => !prevVal)}
        ref={anchorRef}
        selected={open}
        size="lg"
        text={selected ? selected.label : 'Display'}
      />
      {open && (
        <Dropdown anchor={anchorRef.current} id="action-variant-dropdown-example" onDismiss={() => setOpen(false)}>
          <Dropdown.Item
            onSelect={onSelect}
            option={{ value: 'Cozy', label: 'Cozy' }}
            selected={selected}
          />
          <Dropdown.Item
            onSelect={onSelect}
            option={{ value: 'Comfy', label: 'Comfy' }}
            selected={selected}
          />
        </Dropdown>
      )}
    </Flex>
  );
}
`}
      />
    </MainSection.Subsection>
    <MainSection.Subsection
      title="Ref"
      description={`
To control focus, or position any anchor components to IconButton, use ref, as shown in the example below.
`}
    >
      <MainSection.Card
        cardSize="md"
        defaultCode={`
function ButtonPopoverExample() {
  const [selected, setSelected] = React.useState(false);
  const anchorRef = React.useRef(null);
  return (
    <React.Fragment>
      <Button
        onClick={() => setSelected(!selected)}
        ref={anchorRef}
        selected={selected}
        text={selected ? "Hide Popover" : "Show Popover"}
        iconEnd="arrow-down"
      />
      {selected && (
        <Popover
          anchor={anchorRef.current}
          idealDirection="right"
          onDismiss={() => setSelected(false)}
          shouldFocus={false}
        >
          <Box padding={3}>
            <Text weight="bold">This is a Button with an anchor ref to a Popover component</Text>
          </Box>
        </Popover>
      )}
    </React.Fragment>
  );
}
`}
      />
    </MainSection.Subsection>
    <MainSection.Subsection
      title="Custom navigation"
      description={customNavigationDescription('Button')}
    >
      <MainSection.Card
        cardSize="lg"
        defaultCode={`
function OnNavigation() {
  const [onNavigationMode, setOnNavigationMode] = React.useState('provider_disabled');
  const onNavigation = ({ href,target }) => {
    const onNavigationClick = ({ event }) => {
      event.preventDefault();
      // eslint-disable-next-line no-alert
      alert('CUSTOM NAVIGATION set on <OnLinkNavigationProvider onNavigation/>. Disabled link: '+href+'. Opening business.pinterest.com instead.');
      window.open('https://business.pinterest.com', target === 'blank' ? '_blank' : '_self');
    }
    return onNavigationClick;
  }
  const customOnNavigation = () => {
    // eslint-disable-next-line no-alert
    alert('CUSTOM NAVIGATION set on <Button onClick/>. Disabled link: https://pinterest.com. Opening help.pinterest.com instead.');
    window.open('https://help.pinterest.com', '_blank');
  }
  const onClickHandler = ({ event, disableOnNavigation }) => {
    if (onNavigationMode === 'provider_disabled') {
      disableOnNavigation()
    } else if (onNavigationMode === 'link_custom') {
      event.preventDefault();
      disableOnNavigation();
      customOnNavigation();
    }
  }
  const linkProps = {
    href:"https://pinterest.com",
    onClick: onClickHandler,
    target:"blank",
  }
  return (
    <OnLinkNavigationProvider onNavigation={onNavigation}>
      <Flex direction="column" gap={2}>
        <Flex direction="column" gap={2}>
          <Text>Navigation controller:</Text>
            <RadioButton
              checked={onNavigationMode === 'provider_disabled'}
              id="provider_disabled"
              label="Default navigation (disabled custom navigation set on OnLinkNavigationProvider)"
              name="navigation"
              onChange={() => setOnNavigationMode('provider_disabled')}
              value="provider_disabled"
            />
            <RadioButton
              checked={onNavigationMode === 'provider_custom'}
              id="provider_custom"
              label="Custom navigation set on OnLinkNavigationProvider"
              name="navigation"
              onChange={() => setOnNavigationMode('provider_custom')}
              value="provider_custom"
            />
            <RadioButton
              checked={onNavigationMode === 'link_custom'}
              id="link_custom"
              label="Custom navigation set on Button"
              name="navigation"
              onChange={() => setOnNavigationMode('link_custom')}
              value="link_custom"
            />
          <Divider/>
        </Flex>
        <Button fullWidth {...linkProps} role="link" text="Visit pinterest.com"/>
      </Flex>
    </OnLinkNavigationProvider>
  );
}
`}
      />
    </MainSection.Subsection>
  </MainSection>,
);

card(
  <MainSection name="Writing">
    <MainSection.Subsection columns={2}>
      <MainSection.Card
        cardSize="md"
        type="do"
        description={`
- If your object is already described on the screen, Buttons only need a verb.
- If your object isn’t described on the screen, Buttons need a verb + the object.
- Use fewer than 3 words.
- Use sentence case.
`}
      />
      <MainSection.Card
        cardSize="md"
        type="don't"
        description={`
- Do not use punctuation.
`}
      />
    </MainSection.Subsection>
  </MainSection>,
);

card(
  <MainSection name="Related">
    <MainSection.Subsection
      description={`
**[ButtonGroup](/buttongroup)**
When displaying multiple Buttons in a layout, use ButtonGroup to ensure consistent spacing and wrapping behavior.
**[IconButton](/iconbutton)**
Use IconButton when only an icon is needed instead of text.
**[TapArea](/taparea)**
Use TapArea to make non-button elements interactive, like an Image. This ensures the element interaction is accessible and uses Gestalt styles.
**[Tabs](/tabs)**
Tabs are intended for page-level navigation between multiple URLs.
**[OnLinkNavigationProvider](/OnLinkNavigationProvider)**
OnLinkNavigationProvider allows external link navigation control across all children components with link behavior.
See [custom navigation](#Custom-navigation) variant for examples.
      `}
    />
  </MainSection>,
);

export default function ButtonPage(): Node {
  return <CardPage cards={cards} page="Button" />;
}
