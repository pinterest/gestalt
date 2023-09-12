// @flow strict
import { type Node } from 'react';
import { Box, SlimBanner, TapArea, Text } from 'gestalt';
import AccessibilitySection from '../../docs-components/AccessibilitySection.js';
import Combination from '../../docs-components/Combination.js';
import docGen, { type DocGen } from '../../docs-components/docgen.js';
import MainSection from '../../docs-components/MainSection.js';
import Page from '../../docs-components/Page.js';
import PageHeader from '../../docs-components/PageHeader.js';
import PropTable from '../../docs-components/PropTable.js';
import QualityChecklist from '../../docs-components/QualityChecklist.js';
import SandpackExample from '../../docs-components/SandpackExample.js';
import accessibilityLabelExample from '../../examples/taparea/accessibilityLabelExample.js';
import heightWidthExample from '../../examples/taparea/heightWidthExample.js';
import inlineUsageExample from '../../examples/taparea/inlineUsageExample.js';
import mainExample from '../../examples/taparea/mainExample.js';
import refExample from '../../examples/taparea/refExample.js';
import rolesCompressBehaviorExample from '../../examples/taparea/rolesCompressBehaviorExample.js';
import withLinkButtonExample from '../../examples/taparea/withLinkButtonExample.js';

export default function DocsPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader
        name={generatedDocGen?.displayName}
        description={generatedDocGen?.description}
        slimBanner={
          <SlimBanner
            type="error"
            iconAccessibilityLabel="Info"
            message={`TapArea role="link" is soon to be deprecated, use TapAreaLink instead.`}
            helperLink={{
              text: 'View TapAreaLink',
              accessibilityLabel: 'View TapAreaLink documentation page',
              href: '/web/taparealink',
              onClick: () => {},
            }}
          />
        }
      />

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
            name: 'dataTestId',
            type: 'string',
            required: false,
            description: [
              'Available for testing purposes, if needed. Consider [better queries](https://testing-library.com/docs/queries/about/#priority) before using this prop.',
            ],
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
        <MainSection.Subsection title="Basic TapArea">
          <MainSection.Card
            sandpackExample={<SandpackExample name="Main Example" code={mainExample} />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection title="TapArea with Link/Button">
          <MainSection.Card
            description={`If you have a \`Link\` or \`Button\` inside of TapArea, you can apply \`e.stopPropagation()\` so the \`onTap\` doesn't get triggered.

TapArea with link interaction can be paired with GlobalEventsHandlerProvider. See [GlobalEventsHandlerProvider](/web/utilities/globaleventshandlerprovider#Link-handlers) to learn more about link navigation.
  `}
            sandpackExample={
              <SandpackExample name="With Link Button Example" code={withLinkButtonExample} />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection title="Roles & compress behavior">
          <MainSection.Card
            sandpackExample={
              <SandpackExample
                name="Roles & Compress Behavior Example"
                code={rolesCompressBehaviorExample}
                layout="column"
                previewHeight={400}
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection title="Height & width">
          <MainSection.Card
            sandpackExample={
              <SandpackExample name="Height & Width Example" code={heightWidthExample} />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection title="Inline usage">
          <MainSection.Card
            description={`While TapArea doesn't provide an \`inline\` prop, this behavior can be achieved by wrapping with \`<Box display="inlineBlock">\`.`}
            sandpackExample={
              <SandpackExample name="Inline Usage Example" code={inlineUsageExample} />
            }
          />
        </MainSection.Subsection>

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

        <MainSection.Subsection title="Ref">
          <MainSection.Card
            sandpackExample={<SandpackExample name="Ref Example" code={refExample} />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection title="Accessibility: label, controls, expanded, & popup">
          <MainSection.Card
            sandpackExample={
              <SandpackExample
                name="Accessibility: Label, Controls, Expanded, & Popup Example"
                code={accessibilityLabelExample}
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="External handlers"
          description={`TapArea consumes external handlers from [GlobalEventsHandlerProvider](/web/utilities/globaleventshandlerprovider).

Handlers:

- [onNavigation](/web/utilities/globaleventshandlerprovider#onNavigation:-custom-navigation): executed when TapArea role="link" is clicked

See [GlobalEventsHandlerProvider](/web/utilities/globaleventshandlerprovider#onNavigation:-custom-navigation) for more information.
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
    props: { generatedDocGen: await docGen('TapArea') },
  };
}
