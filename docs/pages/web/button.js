// @flow strict
import { type Node } from 'react';
import { Button, SlimBanner } from 'gestalt';
import PropTable from '../../docs-components/PropTable.js';
import CombinationNew from '../../docs-components/CombinationNew.js';
import PageHeader from '../../docs-components/PageHeader.js';
import QualityChecklist from '../../docs-components/QualityChecklist.js';
import AccessibilitySection from '../../docs-components/AccessibilitySection.js';
import MainSection from '../../docs-components/MainSection.js';
import docgen, { type DocGen } from '../../docs-components/docgen.js';
import Page from '../../docs-components/Page.js';

export default function ButtonPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader
        name={generatedDocGen?.displayName}
        description={generatedDocGen?.description}
        defaultCode={`
<Flex>
  <Button color='red' size='lg' text='Save' />
</Flex>
    `}
      />
      <PropTable
        props={[
          {
            name: 'accessibilityLabel',
            type: 'string',
            required: false,
            description: [
              'Label to provide more context around Button’s function or purpose. See the [Accessibility guidelines](/foundations/accessibility) to learn more.',
            ],
          },
          {
            name: 'accessibilityControls',
            type: 'string',
            required: false,
            description: [
              'A unique id indicating the element or elements whose contents or visibility are controlled by Button. See the [Accessibility guidelines](/foundations/accessibility) to learn more.',
            ],
          },
          {
            name: 'accessibilityExpanded',
            type: 'boolean',
            required: false,
            description: [
              'Needed if Button controls the visibility of other elements, e.g. Dropdown or Flyout. This is used to indicate if the controlled grouping is currently expanded or collapsed. See the [Accessibility guidelines](/foundations/accessibility) to learn more.',
            ],
          },
          {
            name: 'accessibilityHaspopup',
            type: 'boolean',
            required: false,
            description: [
              'Set as true if Button controls one or more interactive popup elements, such as a menu or dialog. See the [Accessibility guidelines](/foundations/accessibility) to learn more.',
            ],
          },
          {
            name: 'color',
            type: `'gray' | 'red' | 'blue' | 'transparent' |  'semiTransparentWhite' | 'transparentWhiteText' | 'white'`,
            required: false,
            defaultValue: 'gray',
            description: ['The background color of Button.'],
          },
          {
            name: 'disabled',
            type: 'boolean',
            required: false,
            defaultValue: false,
            description: [
              'Indicates if Button is disabled. Disabled Buttons are inactive and cannot be interacted with.',
            ],
          },
          {
            name: 'iconEnd',
            type: '$Keys<typeof icons>',
            required: false,
            description: [
              'An icon displayed after the text to help clarify the usage of Button. See the [icon variant](#Icons) to learn more.',
            ],
          },
          {
            name: 'fullWidth',
            type: 'boolean',
            required: false,
            defaultValue: false,
            description: [
              'Default Buttons are sized by the text within the Button whereas full-width Buttons expand to the full width of their container.',
            ],
          },
          {
            name: 'onClick',
            type: '({ event: SyntheticMouseEvent<HTMLButtonElement> | SyntheticKeyboardEvent<HTMLButtonElement> | SyntheticMouseEvent<HTMLAnchorElement> | SyntheticKeyboardEvent<HTMLAnchorElement>, {| dangerouslyDisableOnNavigation: () => void |}> }) => void',
            required: false,
            description: [
              'Callback invoked when the user clicks (press and release) on Button with the mouse or keyboard. Required with `role="button"` or `type="button"` Buttons.',
              'See [OnLinkNavigationProvider](/web/utilities/onlinknavigationprovider) to learn more about link navigation.',
            ],
          },
          {
            name: 'size',
            type: `'sm' | 'md' | 'lg'`,
            required: false,
            defaultValue: 'md',
            description: ['sm: 32px, md: 40px, lg: 48px'],
          },
          {
            name: 'text',
            type: 'string',
            required: true,
            description: [
              'Text to render inside the Button to convey the function and purpose of the Button.',
            ],
          },
          {
            name: 'type',
            type: `'submit' | 'button'`,
            required: false,
            defaultValue: 'button',
            description: ['Use “submit” if Button is used within or associated with a form.'],
          },
          {
            name: 'selected',
            type: 'boolean',
            required: false,
            defaultValue: false,
            description: ['Indicates if Button is currently selected.'],
          },
          {
            name: 'href',
            type: 'string',
            required: false,
            description: ['Specifies a link URL. Required with `role="link"` Buttons.'],
          },
          {
            name: 'ref',
            type: `React.Ref<'button'> | React.Ref<'a'>`,
            required: false,
            description: ['A React ref to forward to the underlying element.'],
          },
          {
            name: 'tabIndex',
            type: `-1 | 0`,
            required: false,
            defaultValue: 0,
            description: [
              'Use "-1" to remove Button from keyboard navigation. See the [Accessibility guidelines](/foundations/accessibility) to learn more.',
            ],
          },
          {
            name: 'role',
            type: `'button' | 'link'`,
            required: false,
            defaultValue: 'button',
            description: ['Use “link” to indicate Button that is acting as an `<a>` link.'],
          },
          {
            name: 'rel',
            type: `'none' | 'nofollow'`,
            required: false,
            defaultValue: 'none',
            description: 'Optional with link-role Buttons.',
          },
          {
            name: 'target',
            type: `null | 'self' | 'blank'`,
            required: false,
            defaultValue: 'null',
            description: [
              'Indicates the browsing context where an href will be opened. Optional with `role="link"` Buttons.',
            ],
          },
        ]}
      />
      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            title="When to use"
            description={`
          - Communicating an action that will occur.
          - Triggering or enabling an action, such as submitting requested information.
          - Progressing or regressing a user through a step in a flow.
        `}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            title="When not to use"
            description={`
          - Directing users to a new page or different part within the same page. Instead, use [Link](/web/link).
          - Limited space available. Consider using an [IconButton](/web/iconbutton) instead.
        `}
          />
        </MainSection.Subsection>
      </MainSection>
      <MainSection name="Best practices">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Place primary Buttons to the right or top of other Button styles."
            defaultCode={`
<Flex gap={{ column: 8, row: 0 }} direction="column" alignItems="stretch" alignContent="stretch" flex="grow" width="100%">
  <Flex direction="column" alignItems="center" alignContent="center" width="100%">
    <ButtonGroup>
      <Button text="Visit" size="lg" color="gray" />
      <Button text="Save" size="lg" color="red" />
    </ButtonGroup>
  </Flex>
  <Divider />
  <Flex gap={{ column: 2, row: 0 }} direction="column" flex="grow" width="100%">
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
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Show the full text on Buttons. Buttons should be stacked when they cannot be displayed side by side."
            defaultCode={`
<Flex gap={{ column: 2, row: 0 }} direction="column" alignContent="stretch">
  <Button text="Create account" size="lg" color="red" fullWidth />
  <Button text="View settings" size="lg" color="gray" fullWidth />
</Flex>
`}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Truncate the Button text. In rare instances where Buttons must remain on one line, truncate the text on the secondary Button before truncating on the primary Button."
            defaultCode={`
<Flex gap={{ column: 0, row: 2 }}>
  <Button text="Kontoeinst..." size="lg" color="gray" />
  <Button text="Neues We..." size="lg" color="red" />
</Flex>
`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Keep the Button text as simple and actionable as possible. Refer to the [Button writing guidelines](#Writing) for more detail. If text is not sufficient for accessibility, refer to [Accessibility guidelines](#Accessibility) for more detail."
            defaultCode={`
  <Button text="Create account" size="lg" color="red" />
`}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Do not add icons to a Button to reinforce the text."
            defaultCode={`
          <Button text="Create new Pinterest account" size="lg" color="red" iconEnd='person-add' />
`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Use an IconButton + Tooltip next to the disabled Button if you need to explain why it is disabled."
            defaultCode={`
  <Flex gap={{ column: 0, row: 1 }}>
    <Button text="Create account" disabled size="lg" color="red" />
    <Tooltip text="You need to fill in a username to create an account">
      <IconButton
        accessibilityLabel="Additional info."
        bgColor="white"
        icon="info-circle"
        iconColor="gray"
        size="lg"
      />
    </Tooltip>
  </Flex>
`}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Use a Tooltip on disabled Button, as it is not accessible for keyboard and screen reader users."
            defaultCode={`
  <Flex gap={{ column: 0, row: 1 }}>
    <Tooltip text="You need to fill in a username to create an account">
      <Button text="Create account" disabled size="lg" color="red" />
    </Tooltip>
  </Flex>
`}
          />
        </MainSection.Subsection>
      </MainSection>
      <AccessibilitySection name={generatedDocGen?.displayName}>
        <MainSection.Subsection
          title="ARIA attributes"
          description={`
When Button text does not provide sufficient context about the Button’s behavior, supply a short, descriptive label for screen-readers using \`accessibilityLabel\`.
Texts like “Click here“, “Follow“, or “Shop“ can be confusing when a screen reader reads them out of context. In those cases, we must pass an alternative text with deeper context to replace the Button text, like “Follow Ryan” or “Shop Wedding Invitations”.

If Button is used as a control Button to show/hide a Popover-based component, we recommend passing the following ARIA attributes to assist screen readers:
- \`accessibilityLabel\`: if present, read by screen readers read instead of the \`text\` prop.
- \`accessibilityControls\`: informs the screen reader that Button controls the display of an anchored Popover-based component. It populates [aria-controls](https://www.w3.org/TR/wai-aria-practices/examples/menu-button/menu-button-links.html).
- \`accessibilityHaspopup\`: informs the screen reader that there’s a Popover-based component attached to Button. It populates [aria-haspopup](https://www.w3.org/TR/wai-aria-practices/examples/menu-button/menu-button-links.html).
- \`accessibilityExpanded\`: informs the screen reader whether the button-anchored Popover-based component is currently open or closed. It populates [aria-expanded](https://www.w3.org/TR/wai-aria-practices/examples/menu-button/menu-button-links.html).
`}
        />
      </AccessibilitySection>
      <MainSection
        name="Localization"
        description="Be sure to localize `text` and `accessibilityLabel`. Note that localization can lengthen text by 20 to 30 percent. Avoid truncating Button text whenever possible. Refer to the [Button usage guidelines](#Usage-guidelines) for more information. "
      />
      <MainSection name="Variants">
        <MainSection.Subsection
          title="Size"
          description={`Button is available in 3 fixed sizes. The Button text has always a fixed size of 16px:
1. \`lg\` (48px)
    Large is the only size that should be used on Pinner surfaces.
2. \`md\` (40px)
    Medium is used on more dense UI such as business surfaces or internal tools.
3. \`sm\` (32px)
    Small should be used sparingly and only in places where the UI is very dense.`}
        >
          <CombinationNew size={['sm', 'md', 'lg']}>
            {({ size }) => (
              <Button
                accessibilityLabel={`Example size ${size}`}
                color="red"
                text="Save"
                size={size}
              />
            )}
          </CombinationNew>
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Width"
          description={`
1. Inline (default)
    Inline is our default Button width.  The width of an inline Button is based on the length of its text. Use in most cases where you need a Button.
2. Full-width (\`fullWidth\`)
    Full-width Buttons can be used in narrower content areas when the text in the Button is close to full width in the content area. This is especially common to see in components such as Callout and Upsell at their smaller breakpoints.`}
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
    Low emphasis when placed on dark/image backgrounds, used for tertiary actions in that context. *Note, this treatment should be used with caution as it has potential color contrast issues.*
`}
        >
          <CombinationNew color={['red', 'blue', 'gray', 'transparent']}>
            {({ color }) => {
              const map = { red: 'Save', blue: 'Shop', gray: 'Visit', transparent: 'Learn more' };
              return (
                <Button
                  accessibilityLabel={`Example width ${color}`}
                  color={color}
                  text={map[color]}
                  size="lg"
                />
              );
            }}
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

  React.useEffect(() => {
    setOpen(true)
  }, []);

  return (
    <ScrollBoundaryContainer>
      <Box ref={viewRef} width={300} height={220}>
        <Box display="flex" justifyContent="center" ref={anchorRef}>
          <Tabs
            activeTabIndex={0}
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
              <Flex alignItems="center" direction="column" gap={{ column: 4, row: 0 }}>
                <Text color="light" align="center">
                  New look! Click Created to see Pins you've published. Click Saved to see your saved Pins and boards.
                </Text>
                <Button
                  color="white"
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

  React.useEffect(() => {
    setOpen(true)
  }, []);

  return (
    <ScrollBoundaryContainer>
      <Box ref={viewRef} width={300} height={220}>
        <Box display="flex" justifyContent="center" ref={anchorRef}>
        <Tabs
          activeTabIndex={0}
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
              <Flex alignItems="center" direction="column" gap={{ column: 4, row: 0 }}>
                <Text color="light" align="center">
                  New look! Click Created to see Pins you've published. Click Saved to see your saved Pins and boards.
                </Text>
                <Flex alignItems="stretch" direction="column" gap={{ column: 2, row: 0 }}>
                  <Button
                    color="white"
                    size="lg"
                    text="Got it"
                    fullWidth
                  />
                  <Button
                    color="semiTransparentWhite"
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
\`iconEnd\` adds an icon after the Button text. Icons should only be used to visually reinforce a specific function or interaction of the Button. Menus and external links are a common use case. Use \`visit\` when linking to an external URL or \`arrow-down\` when displaying a Popover on click. Note that iconEnd on Button is not accessible to screen readers.
`}
        >
          <SlimBanner
            type="recommendationBare"
            iconAccessibilityLabel="Recommendation"
            message="Use Gestalt's Eslint rule to enforce the correct icons usage in Button."
            helperLink={{
              accessibilityLabel: 'Learn more about the "button-icon-restrictions" rule',
              href: '/get_started/developers/eslint_plugin#gestaltbutton-icon-restrictions',
              text: 'Learn more about the "button-icon-restrictions" rule',
            }}
          />
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
  accessibilityLabel='Follow'
  size="lg"
  text="Follow"
  role="button"
/>
`}
          />
          <MainSection.Card
            cardSize="md"
            defaultCode={`
<Button
  accessibilityLabel='Visit Pinterest'
  iconEnd="visit"
  size="lg"
  text="Visit Pinterest"
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
  accessibilityLabel='Visit Pinterest'
  iconEnd="visit"
  size="lg"
  text="Visit Pinterest"
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
    The typical state of a Button that represents it can be interacted with and is not in a selected state.
2. Disabled
Used to block user interaction such as hover, focus and click. Disabled Buttons are completely unreachable by a keyboard and screenreader, so do not attach Tooltips to disabled Buttons.
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
        <MainSection.Subsection title="Accessibility props: controls, expanded, & popup">
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
To control focus or position anchored components relative to Button, use \`ref\` as shown in the example below.
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
      </MainSection>
      <MainSection name="Writing">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description={`
- If your object is already described on the screen, Buttons only need a verb (Example: Save).
- If your object isn’t described on the screen, Buttons need a verb + the object (Example: Create Pin).
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
      </MainSection>

      <QualityChecklist component={generatedDocGen?.displayName} />

      <MainSection name="Related">
        <MainSection.Subsection
          description={`
**[ButtonGroup](/web/buttongroup)**
When displaying multiple Buttons in a layout, use ButtonGroup to ensure consistent spacing and wrapping behavior.

**[IconButton](/web/iconbutton)**
Use IconButton when only an icon is needed instead of text.

**[TapArea](/web/taparea)**
Use TapArea to make non-button elements interactive, like an Image. This ensures the element interaction is accessible and uses Gestalt styles.

**[Tabs](/web/tabs)**
Tabs are intended for page-level navigation between multiple URLs.

**[OnLinkNavigationProvider](/web/utilities/onlinknavigationprovider)**
OnLinkNavigationProvider allows external link navigation control across all children components with link behavior.
See [OnLinkNavigationProvider](/web/utilities/onlinknavigationprovider) to learn more about link navigation.
      `}
        />
      </MainSection>
    </Page>
  );
}

export async function getServerSideProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: { generatedDocGen: await docgen({ componentName: 'Button' }) },
  };
}
