// @flow strict
import { type Node } from 'react';
import { Box, SlimBanner, TapArea, Text } from 'gestalt';
import AccessibilitySection from '../../docs-components/AccessibilitySection.js';
import Combination from '../../docs-components/Combination.js';
import docgen, { type DocGen } from '../../docs-components/docgen.js';
import Example from '../../docs-components/Example.js';
import MainSection from '../../docs-components/MainSection.js';
import Page from '../../docs-components/Page.js';
import PageHeader from '../../docs-components/PageHeader.js';
import PropTable from '../../docs-components/PropTable.js';
import QualityChecklist from '../../docs-components/QualityChecklist.js';

export default function DocsPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader name={generatedDocGen?.displayName} description={generatedDocGen?.description} />

      <PropTable
        componentName={generatedDocGen?.displayName}
        props={[
          {
            name: 'accessibilityLabel',
            type: 'string',
            required: false,
            defaultValue: null,
            description: [
              'Supply a short, descriptive label for screen-readers to replace TapArea texts that do not provide sufficient context about the button component behavior.',
              'Accessibility: It populates aria-label.',
            ],
            href: 'accessibility',
          },
          {
            name: 'accessibilityControls',
            type: 'string',
            required: false,
            defaultValue: null,
            description: [
              'Specify the `id` of an associated element (or elements) whose contents or visibility are controlled by a button component so that screen reader users can identify the relationship between elements.',
              'Optional with button-role.',
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
              'Optional with button-role.',
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
              'Optional with button-role.',
              'Accessibility: It populates aria-haspopup.',
            ],
            href: 'accessibility',
          },
          {
            name: 'children',
            type: 'React.Node',
            required: true,
            defaultValue: null,
            description:
              'TapArea is a wrapper around non-button components (or children) that provides clicking / touching functionality as if they were a unified button area.',
            href: 'basic-taparea',
          },
          {
            name: 'disabled',
            type: 'boolean',
            required: false,
            defaultValue: null,
            description:
              'Set disabled state so TapArea cannot be interacted with and actions are not available.',
            href: 'roles',
          },
          {
            name: 'fullHeight',
            type: 'boolean',
            required: false,
            defaultValue: null,
            description: 'Set the TapArea height to expand to the full height of the parent.',
            href: 'fullHeightWidth',
          },
          {
            name: 'fullWidth',
            type: 'boolean',
            required: false,
            defaultValue: true,
            description: 'Set the TapArea width to expand to the full width of the parent.',
            href: 'fullHeightWidth',
          },
          {
            name: 'mouseCursor',
            type: `"copy" | "grab" | "grabbing" | "move" | "noDrop" | "pointer" | "zoomIn" | "zoomOut"`,
            required: false,
            defaultValue: 'pointer',
            description: ['Select a mouse cursor type to convey the TapArea expected behavior .'],
            href: 'mouseCursor',
          },
          {
            name: 'onBlur',
            type: '({ event: SyntheticFocusEvent<HTMLDivElement> | SyntheticFocusEvent<HTMLAnchorElement> }) => void',
            required: false,
            defaultValue: null,
            description: ['Callback fired when a TapArea component loses focus.'],
            href: 'basicExample',
          },
          {
            name: 'onFocus',
            type: '({ event: SyntheticFocusEvent<HTMLDivElement> | SyntheticFocusEvent<HTMLAnchorElement> }) => void',
            required: false,
            defaultValue: null,
            description: [
              'Callback fired when a TapArea component gets focus via keyboard navigation, mouse click (pressed), or focus method',
            ],
            href: 'basicExample',
          },
          {
            name: 'onMouseDown',
            type: '({ event: SyntheticMouseEvent<HTMLDivElement> | SyntheticMouseEvent<HTMLAnchorElement>, {| dangerouslyDisableOnNavigation: () => void |}> }) => void',
            required: false,
            defaultValue: null,
            description: ['Callback fired when a click event begins.'],
          },
          {
            name: 'onMouseUp',
            type: '({ event: SyntheticMouseEvent<HTMLDivElement> | SyntheticMouseEvent<HTMLAnchorElement> }) => void',
            required: false,
            defaultValue: null,
            description: ['Callback fired when a click event ends.'],
          },
          {
            name: 'onMouseEnter',
            type: '({ event: SyntheticMouseEvent<HTMLDivElement> | SyntheticMouseEvent<HTMLAnchorElement>, {| dangerouslyDisableOnNavigation: () => void |}> }) => void',
            required: false,
            defaultValue: null,
            description: ['Callback fired when a mouse pointer moves onto a TapArea component.'],
          },
          {
            name: 'onMouseLeave',
            type: '({ event: SyntheticMouseEvent<HTMLDivElement> | SyntheticMouseEvent<HTMLAnchorElement> }) => void',
            required: false,
            defaultValue: null,
            description: ['Callback fired when a mouse pointer moves out a TapArea component.'],
          },
          {
            name: 'onTap',
            type: '({ event: SyntheticMouseEvent<HTMLDivElement> | SyntheticKeyboardEvent<HTMLDivElement> | SyntheticMouseEvent<HTMLAnchorElement> | SyntheticKeyboardEvent<HTMLAnchorElement>, {| dangerouslyDisableOnNavigation: () => void |}> }) }) => void',
            required: false,
            defaultValue: null,
            description: [
              'Callback fired when a TapArea component is clicked (pressed and released) with a mouse or keyboard.',
              'Required with button-role + button-type buttons.',
              'See [GlobalEventsHandlerProvider](/web/utilities/globaleventshandlerprovider#Link-handlers) to learn more about link navigation.',
            ],
            href: 'basic-taparea',
          },
          {
            name: 'ref',
            type: `React.Ref<'div'> | React.Ref<'a'>`,
            required: false,
            defaultValue: null,
            description: 'Forward the ref to the underlying div or anchor element.',
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
            href: 'roles',
          },
          {
            name: 'rounding',
            type: `"pill" | "circle" | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8`,
            required: false,
            defaultValue: null,
            description: [
              'Sets a border radius for the TapArea. Select a rounding option that aligns with its children.',
              'Options are "circle" or "pill" for fully rounded corners or 0-8 representing the radius in boints.',
            ],
            href: 'rounding',
          },
          {
            name: 'href',
            type: 'string',
            required: false,
            defaultValue: null,
            description: ['Specify a link URL.', 'Required with role=link.'],
            href: 'roles',
          },
          {
            name: 'role',
            type: `'button' | 'link'`,
            required: false,
            defaultValue: 'button',
            description: [
              `Select a TapArea variant:`,
              `- 'button': Use for TapArea to act like buttons. The TapArea is rendered as a \`<div>\`.`,
              `- 'link': Use for TapArea to act like links. The button is rendered as an \`<a>\`.`,
              `Required with role=link.`,
            ],
            href: 'roles',
          },
          {
            name: 'rel',
            type: `'none' | 'nofollow'`,
            required: false,
            defaultValue: 'none',
            description: 'Optional with role=link.',
            href: 'roles',
          },
          {
            name: 'target',
            type: `null | 'self' | 'blank'`,
            required: false,
            defaultValue: 'null',
            description: [
              'Define the frame or window to open the anchor defined on `href`:',
              `- 'null' opens the anchor in the same window.`,
              `- 'blank' opens the anchor in a new window.`,
              `- 'self' opens an anchor in the same frame.`,
              'Optional with role=link.',
            ],
            href: 'roles',
          },
          {
            name: 'tapStyle',
            type: `none | 'compress'`,
            required: false,
            defaultValue: 'none',
            description: [
              'Set a compressing behavior when the TapArea is clicked / touched.',
              `- 'none' does not compress TapArea.`,
              `- 'compress' scales down TapArea.`,
            ],
            href: 'roles',
          },
        ]}
      />

      <AccessibilitySection name={generatedDocGen?.displayName} />

      <MainSection name="Localization">
        <SlimBanner
          iconAccessibilityLabel="Localize the default label"
          message="TapAreas with link role announce to assistive technologies that the link opens in a new tab when setting target to 'blank'. Localize the default label with DefaultLabelProvider."
          type="recommendationBare"
          helperLink={{
            text: 'Learn more',
            accessibilityLabel: 'Learn more about DefaultLabelProvider',
            href: '/web/utilities/defaultlabelprovider',
            onClick: () => {},
          }}
        />
      </MainSection>

      <MainSection name="Variants">
        <Example
          name="Basic TapArea"
          id="basic-taparea"
          defaultCode={`
function TapAreaExample() {
  return (
    <Box rounding={4} borderStyle="sm" width={170}>
      <TapArea rounding={4}>
        <Box
          alignItems="center"
          direction="column"
          display="flex"
          padding={3}
        >
          <Avatar
            name="Alberto"
            size="xl"
            src="https://i.ibb.co/NsK2w5y/Alberto.jpg"
            verified
          />
          <Text weight="bold">Alberto's Profile</Text>
        </Box>
      </TapArea>
    </Box>
  );
}
`}
        />

        <Example
          id="link_buttons"
          description={`If you have a \`Link\` or \`Button\` inside of TapArea, you can apply \`e.stopPropagation()\` so the \`onTap\` doesn't get triggered.

TapArea with link interaction can be paired with GlobalEventsHandlerProvider. See [GlobalEventsHandlerProvider](/web/utilities/globaleventshandlerprovider#Link-handlers) to learn more about link navigation.
  `}
          name="TapArea with Link/Button"
          defaultCode={`
function TapAreaExample() {
  const [touches, setTouches] = React.useState(0);

  return (
    <Box width={200}>
      <TapArea
        onTap={() => setTouches(touches + 1)}
        rounding={2}
      >
        <Box color="selected" rounding={4} borderStyle="sm">
          <Mask rounding={2}>
            <Image
              alt="Antelope Canyon"
              naturalHeight={1}
              naturalWidth={1}
              src="https://i.ibb.co/DwYrGy6/stock14.jpg"
            />
          </Mask>
          <Box paddingY={2}>
            <Link
              href="https://www.pinterest.com/search/pins/?rs=ac&len=2&q=antelope%20canyon%20arizona&eq=Antelope%20Canyon"
              onClick={({ event }) => event.stopPropagation()}
              rounding="pill"
              target="blank"
            >
              <Text align="center" color="inverse">Find More on Pinterest</Text>
            </Link>
          </Box>
        </Box>
      </TapArea>
      <Box paddingY={2}>
        <Text color="subtle" align="center">
          Touched {touches} {touches === 1 ? 'time' : 'times'}
        </Text>
      </Box>
    </Box>
  );
}
`}
        />

        <Example
          name="Roles & compress behavior"
          id="roles"
          defaultCode={`
function Example() {
  const [disabled, setDisabled] = React.useState(false);
  const [compressed, setCompressed] = React.useState('compress');
  const [touches, setTouches] = React.useState(0);
  const [tabIndex, setTabIndex] = React.useState(false);

  return (
    <Flex alignItems="start" direction="column" gap={{ column: 6, row: 0 }}>
      <Flex gap={6} wrap>
        <Tooltip text="Default TapArea">
          <TapArea
            tapStyle={compressed}
            disabled={disabled}
            onTap={() => setTouches(touches + 1)}
            tabIndex={tabIndex ? -1 : 0}
          >
            <Box padding={3} column={12} borderStyle="lg" width={200}>
              <Mask rounding={2}>
                <Image
                  alt="Antelope Canyon"
                  naturalHeight={1}
                  naturalWidth={1}
                  src="https://i.ibb.co/DwYrGy6/stock14.jpg"
                />
              </Mask>
              <Text align="center">Touched {touches} {touches === 1 ? 'time' : 'times'}</Text>
            </Box>
          </TapArea>
        </Tooltip>
        <Tooltip text="Link TapArea">
          <TapArea
            tapStyle={compressed}
            disabled={disabled}
            role="link"
            target="blank"
            href="https://www.pinterest.com"
            tabIndex={tabIndex ? -1 : 0}
          >
            <Box padding={3} column={12} borderStyle="lg" width={200}>
              <Mask rounding={2}>
                <Image
                  alt="Antelope Canyon"
                  naturalHeight={1}
                  naturalWidth={1}
                  src="https://i.ibb.co/DwYrGy6/stock14.jpg"
                />
              </Mask>
              <Text align="center">Visit Pinterest.com</Text>
            </Box>
          </TapArea>
        </Tooltip>
      </Flex>
      <Flex gap={{ column: 0, row: 2 }}>
        <Switch
          onChange={() => setCompressed(compressed === "compress" ? "none" : "compress")}
          id="compress-buttons"
          switched={compressed === "compress" ? true : false }
        />
        <Box paddingX={2} flex="grow">
          <Label htmlFor="compress-buttons">
            <Text>Compress TapArea</Text>
          </Label>
        </Box>
      </Flex>
      <Flex gap={{ column: 0, row: 2 }}>
        <Switch
          onChange={() => setDisabled(!disabled)}
          id="disable-buttons"
          switched={disabled}
        />
        <Box paddingX={2} flex="grow">
          <Label htmlFor="disable-buttons">
            <Text>Disable TapArea</Text>
          </Label>
        </Box>
      </Flex>
      <Flex gap={{ column: 0, row: 2 }}>
        <Switch
          onChange={() => setTabIndex(!tabIndex)}
          id="unreachable-buttons"
          switched={tabIndex}
        />
        <Box paddingX={2} flex="grow">
          <Label htmlFor="unreachable-buttons">
            <Text>Remove from keyboard navigation with tabIndex</Text>
          </Label>
        </Box>
      </Flex>
    </Flex>
  );
}
`}
        />

        <Example
          name="Height & width"
          id="fullHeightWidth"
          defaultCode={`
<Flex gap={6} wrap maxWidth={500} height={250}>
  <Box borderStyle="sm" margin={3} width="100%" height="100%">
    <TapArea fullHeight>
      <Box height="100%" color="secondary">
        <Text align="center">
          Full parent height
        </Text>
      </Box>
    </TapArea>
  </Box>
  <Box borderStyle="sm" margin={3} width="100%" height="100%">
    <TapArea>
      <Box height="100%" color="secondary">
        <Text align="center">
          Child height only
        </Text>
      </Box>
    </TapArea>
  </Box>
</Flex>
`}
        />

        <Example
          name="Inline usage"
          id="inlineUsage"
          description={`While TapArea doesn't provide an \`inline\` prop, this behavior can be achieved by wrapping with \`<Box display="inlineBlock">\`.`}
          defaultCode={`
<Box color="warningBase" height={250} padding={3} maxWidth={500}>
  <Flex direction="column" gap={{ column: 6, row: 0 }}>
    <Flex.Item>
      <Text color="inverse" inline>Other content</Text>
      <Box borderStyle="sm" margin={3} column={6}>
        <TapArea>
          <Box height="100%" color="secondary">
            <Text align="center">
              Default behavior (block)
            </Text>
          </Box>
        </TapArea>
      </Box>
    </Flex.Item>

    <Flex.Item>
      <Text color="inverse" inline>Other content</Text>
      <Box borderStyle="sm" display="inlineBlock" margin={3} column={6}>
        <TapArea>
          <Box height="100%" color="secondary">
            <Text align="center">
              Inline behavior
            </Text>
          </Box>
        </TapArea>
      </Box>
    </Flex.Item>
  </Flex>
</Box>
`}
        />

        <Combination
          id="mouseCursor"
          name="Mouse cursor"
          mouseCursor={[
            'copy',
            'grab',
            'grabbing',
            'move',
            'noDrop',
            'pointer',
            'zoomIn',
            'zoomOut',
          ]}
        >
          {(props, i) => (
            <TapArea id={`example-${i}`} {...props}>
              <Box borderStyle="lg" padding={3} color="default">
                {/* eslint-disable-next-line react/prop-types */}
                <Text>{props.mouseCursor}</Text>
              </Box>
            </TapArea>
          )}
        </Combination>

        <Combination
          id="rounding"
          name="Rounding"
          rounding={[0, 1, 2, 3, 4, 5, 6, 7, 8, 'circle', 'pill']}
        >
          {(props, i) => (
            <TapArea id={`example-${i}`} {...props}>
              <Box
                color="default"
                borderStyle="lg"
                // eslint-disable-next-line react/prop-types
                width={props.rounding === 'pill' ? 120 : 70}
                height={70}
                display="flex"
                alignItems="center"
                justifyContent="center"
                {...props}
              >
                {/* eslint-disable-next-line react/prop-types */}
                <Text>{props.rounding}</Text>
              </Box>
            </TapArea>
          )}
        </Combination>

        <Example
          id="ref"
          name="Ref"
          defaultCode={`
function TapAreaRefExample() {
  const ref = React.useRef();
  const [focus, setFocus] = React.useState(0);

  return (
    <Flex gap={{ column: 0, row: 2 }}>
      <Button
        text="Focus the TapArea"
        onClick={() => ref.current.focus()}
      />
      <TapArea
        ref={ref}
        rounding="pill"
        onFocus={() => setFocus(focus + 1)}
      >
        <Box
          borderStyle="sm"
          padding={2}
          rounding="pill"
        >
          <Text>TapArea is focused {focus} times</Text>
        </Box>
      </TapArea>
    </Flex>
  );
}`}
        />

        <Example
          name="Accessibility: label, controls, expanded, & popup"
          id="accessibility"
          defaultCode={`
function MenuButtonExample() {
  const [selected, setSelected] = React.useState(false);
  const anchorRef = React.useRef();

  return (
    <React.Fragment>
        <TapArea
          accessibilityLabel="Open the options menu"
          accessibilityControls="menu"
          accessibilityExpanded={selected}
          accessibilityHaspopup
          onTap={() => setSelected(!selected)}
        >
          <Box
            ref={anchorRef}
            borderStyle="sm"
            display="inlineBlock"
            alignItems="center"
            rounding={1}
            padding={2}
          >
            <Flex gap={{ column: 0, row: 2 }}>
              <Box height={50} width={50}>
                <Mask rounding={1}>
                  <Image
                    alt="Antelope Canyon"
                    naturalHeight={1}
                    naturalWidth={1}
                    src="https://i.ibb.co/FY2MKr5/stock6.jpg"
                  />
                </Mask>
              </Box>
              <Text weight="bold" align="center">Menu</Text>
            </Flex>
          </Box>
      </TapArea>
      {selected && (
        <Layer>
          <Popover
            anchor={anchorRef.current}
            idealDirection="down"
            onDismiss={() => setSelected(false)}
            positionRelativeToAnchor={false}
            size="md"
          >
            <Box id="menu" direction="column" display="flex" padding={2}>
              <Box padding={2}>
                <Text weight="bold">
                  Option 1
                </Text>
              </Box>
              <Box padding={2}>
                <Text weight="bold">
                  Option 2
                </Text>
              </Box>
            </Box>
          </Popover>
        </Layer>
      )}
    </React.Fragment>
  );
}
`}
        />
      </MainSection>

      <QualityChecklist component={generatedDocGen?.displayName} />

      <MainSection name="Related">
        <MainSection.Subsection
          description={`
**[GlobalEventsHandlerProvider](/web/utilities/globaleventshandlerprovider#Link-handlers)**
GlobalEventsHandlerProvider allows external link navigation control across all children components with link behavior.
      `}
        />
      </MainSection>
    </Page>
  );
}

export async function getServerSideProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: { generatedDocGen: await docgen({ componentName: 'TapArea' }) },
  };
}
