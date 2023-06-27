// @flow strict
import React, { type Node } from 'react';
import { Box, ColorSchemeProvider, Flex, Text } from 'gestalt';
import AccessibilitySection from '../../docs-components/AccessibilitySection.js';
import CombinationNew from '../../docs-components/CombinationNew.js';
import docGen, { type DocGen } from '../../docs-components/docgen.js';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable.js';
import MainSection from '../../docs-components/MainSection.js';
import Page from '../../docs-components/Page.js';
import PageHeader from '../../docs-components/PageHeader.js';
import QualityChecklist from '../../docs-components/QualityChecklist.js';
import SandpackExample from '../../docs-components/SandpackExample.js';
import absolute from '../../examples/box/absolute.js';
import asProp from '../../examples/box/as.js';
import autoMargins from '../../examples/box/autoMargins.js';
import buildingBlock from '../../examples/box/buildingBlock.js';
import divs from '../../examples/box/divs.js';
import main from '../../examples/box/main.js';
import notAllowed from '../../examples/box/notAllowed.js';
import overflow from '../../examples/box/overflow.js';
import padding from '../../examples/box/padding.js';
import ref from '../../examples/box/ref.js';
import responsive from '../../examples/box/responsive.js';
import role from '../../examples/box/role.js';
import rtl from '../../examples/box/rtl.js';
import sizing from '../../examples/box/sizing.js';
import visuallyHidden from '../../examples/box/visuallyHidden.js';
import zIndex from '../../examples/box/zIndex.js';

const ignoredProps = [
  'smAlignItems',
  'mdAlignItems',
  'lgAlignItems',
  'smColumn',
  'mdColumn',
  'lgColumn',
  'smDirection',
  'mdDirection',
  'lgDirection',
  'smDisplay',
  'mdDisplay',
  'lgDisplay',
  'smMargin',
  'mdMargin',
  'lgMargin',
  'smMarginBottom',
  'mdMarginBottom',
  'lgMarginBottom',
  'smMarginEnd',
  'mdMarginEnd',
  'lgMarginEnd',
  'smMarginStart',
  'mdMarginStart',
  'lgMarginStart',
  'smMarginTop',
  'mdMarginTop',
  'lgMarginTop',
  'smPadding',
  'mdPadding',
  'lgPadding',
  'smPaddingX',
  'mdPaddingX',
  'lgPaddingX',
  'smPaddingY',
  'mdPaddingY',
  'lgPaddingY',
];

type ColorCardProps = {|
  children: Node,
|};
function ColorSchemeLayout({ children }: ColorCardProps): Node {
  return (
    <Flex
      gap={{
        row: 4,
        column: 0,
      }}
    >
      {['light', 'dark'].map((scheme) => (
        <ColorSchemeProvider key={scheme} colorScheme={scheme} id={scheme}>
          <Box color="default" padding={4} display="flex" direction="column" alignItems="center">
            {children}
            <Text>{scheme === 'light' ? 'Light mode' : 'Dark mode'}</Text>
          </Box>
        </ColorSchemeProvider>
      ))}
    </Flex>
  );
}

export default function BoxPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader name={generatedDocGen?.displayName} description={generatedDocGen?.description}>
        <SandpackExample code={main} name="Main example" hideEditor previewHeight={150} />
      </PageHeader>
      <GeneratedPropTable generatedDocGen={generatedDocGen} excludeProps={ignoredProps} />

      <MainSection name="Best practices">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description={`
        Use Box as a building block when creating other components or layouts that do not rely on flexbox. The included properties should cover any variations needed to create a diverse range of options.

        If you find yourself using Box for flexbox layouts, consider [Flex](/web/flex) instead.
        `}
            sandpackExample={
              <SandpackExample
                code={buildingBlock}
                name="Building block example"
                hideEditor
                previewHeight={200}
              />
            }
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description={`Don’t use the \`onClick\`, \`className\` and \`style\` properties.

Box is a pass-through component, meaning that any other properties you provide to it will be directly applied to the underlying \`<div>\`. The above properties are exceptions, however.  We don’t allow  \`onClick\`  for  accessibility reasons, so consider a [Button](/web/button) or [TapArea](/web/taparea) instead. We remove \`className\` and \`style\` to ensure style encapsulation. If necessary, \`dangerouslySetInlineStyle\` can be used to supply a style not supported by Box props.

If you need to use these features for animation purposes, use a \`<div>\` instead.`}
            sandpackExample={
              <SandpackExample
                code={notAllowed}
                name="Not allowed props example"
                hideEditor
                previewHeight={200}
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description={`When addressing the spacing of the Box, use padding before you use margins, as padding will compose better and won't collapse. Padding is applied in 4px increments and is always symmetric. Learn more about [margin collapsing](https://css-tricks.com/what-you-should-know-about-collapsing-margins/).`}
            sandpackExample={
              <SandpackExample
                code={padding}
                name="Padding example"
                hideEditor
                previewHeight={200}
              />
            }
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description={`Avoid using arbitrary \`<div>\` elements. Instead, when building a component, prioritize using Box. If you need to set a custom style, you can do so using the \`dangerouslySetInlineStyle\` prop. However, this should be avoided whenever possible by utilizing the other props provided in Box. We provide a [lint rule](https://github.com/pinterest/gestalt/blob/master/packages/eslint-plugin-gestalt/src/no-box-dangerous-style-duplicates.js) to prevent this from happening.`}
            sandpackExample={
              <SandpackExample code={divs} name="Divs example" hideEditor previewHeight={200} />
            }
          />
        </MainSection.Subsection>
      </MainSection>

      <AccessibilitySection
        name={generatedDocGen?.displayName}
        description={`The \`visuallyHidden\` option of the \`display\` property can be used to prevent content from being visible while ensuring that screen readers still have access to the content. This can be useful when adding context for screen reader users, such as adding a pause to the labels of [Checkboxes](/web/checkbox).`}
      >
        <MainSection.Subsection
          title="Visually hidden content"
          description={`
Setting \`display="visuallyHidden"\` on Box allows for an element to be visually hidden but still be read by screen readers.

The ‘visually-hidden’ CSS technique applies absolute positioning to the element.

    <code>
      height: 1px;
      overflow: hidden;
      position: absolute;
      width: 1px;
      ...
    </code>

For a correct implementation, make sure the  ‘visually-hidden’ element is correctly contained within a relative-positioned Box.
  `}
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={visuallyHidden} name="Visually hidden example" />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Using 'as' property"
          description={`
        By default, the Box component renders a \`div\` element, which is a non-semantic element that doesn't provide much meaning to the user or assistive technology. Use the \`as\` prop to inform which semantic HTML element should be rendered by the Box component instead of a \`div\` to ensure a more meaningful experience for both the user and the browser.

        When using a Box component as a custom element, it is your responsibility to address all the accessibility implications. Both the \`role\` and \`as\` properties semantically classify the Box; however, the \`as\` prop defines a more concise way to describe the HTML element by modifying the underlying DOM element directly, which helps support both accessibility and SEO. Use the \`as\` prop whenever possible, making sure that the prop type is semantically associated with the Box content.

        Review the [available options for the as prop](#Props). For some of the options, like \`nav\`, you will also need to specify a \`title\` to ensure unique landmarks on the page. Learn more about [semantics in HTML](https://developer.mozilla.org/en-US/docs/Glossary/Semantics#semantics_in_html).
      `}
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={asProp}
                name="As prop example"
                layout="column"
                previewHeight={200}
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Using 'role' property"
          description={`
        Setting the  \`role\` property on Box classifies the Box as the semantically appropriate HTML element through the use of an ARIA role while leaving the underlying element as a \`div\`. For example, setting \`role="banner"\` will designate that Box to be the equivalent of a \`<header>\` within the page hierarchy, allowing assistive technology to classify the Box appropriately.

        Using the \`role\` property creates more specific element classification and gives the user better context on the layout of the page, especially when the ability to specify the ['as' property](#Using-'as'-property) is not available. Learn more about [ARIA roles](https://www.w3.org/TR/wai-aria/#usage_intro).
      `}
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={role}
                name="Role prop example"
                layout="column"
                previewHeight={200}
              />
            }
          />
        </MainSection.Subsection>
      </AccessibilitySection>

      <MainSection
        name="Localization"
        description={`Utilizing the \`marginStart\` and \`marginEnd\`  properties will account for right-to-left languages and maintain proper spacing.`}
      >
        <MainSection.Subsection
          description={`
    Some languages (ex. Arabic, Hebrew) read from right to left (RTL) instead of from left to right. For this reason, we use \`marginStart\` and \`marginEnd\` (as opposed to left and right options) to support RTL. If specific left and right options are needed, use \`dangerouslySetInlineStyle\`.

    \`marginStart\` is a left margin that flips to a right margin in a RTL layout.

    \`marginEnd\` is a right margin that flips to a left margin in a RTL layout.

    You can toggle the page direction using the button below to see this behavior.
    `}
          title="Page direction"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={<SandpackExample code={rtl} name="Right-to-left example" />}
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Variants">
        <MainSection.Subsection
          description={`Borders are controlled by the \`borderStyle\` property. Specifying a size (\`sm\` or \`lg\`) enables a solid, light gray color in that width. Specifying \`shadow\` adds an even box-shadow around the entire container, while \`raisedTopShadow\` and \`raisedBottomShadow\` add shadows to indicate an elevated header or footer. See the [elevation foundations page](/foundations/elevation) for more details.`}
          title="Borders"
        >
          <CombinationNew
            borderStyle={['sm', 'lg', 'shadow', 'raisedTopShadow', 'raisedBottomShadow']}
          >
            {({ borderStyle }) => (
              <Box
                width={60}
                height={60}
                rounding="circle"
                color="default"
                borderStyle={borderStyle}
              />
            )}
          </CombinationNew>
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Colors"
          description={`
          The following values can be used to change the background color of Box. Be sure to use the value that semantically matches your use case. For full details on how to use our colors, visit our [Color usage page](/foundations/color/usage).

          Colors should be used semantically whenever possible (i.e. using "errorBase" for error scenarios). If a color is needed for a branded moment in product, Box color can be set using our [color palette design tokens](/foundations/color/palette), but it is [considered a hack](/get_started/developers/hacking_gestalt#Box's-dangerouslySetInlineStyle) and should be avoided.
        `}
        >
          <CombinationNew
            color={[
              'default',
              'infoBase',
              'infoWeak',
              'errorBase',
              'errorWeak',
              'warningBase',
              'warningWeak',
              'successBase',
              'successWeak',
              'shopping',
              'primary',
              'secondary',
              'tertiary',
              'selected',
              'inverse',
              'brand',
              'education',
              'light',
              'dark',
              'transparent',
              'transparentDarkGray',
              'lightWash',
              'darkWash',
            ]}
          >
            {({ color }) => <Box width={60} height={60} rounding="circle" color={color} />}
          </CombinationNew>
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Elevation"
          description="Colors and shadows can elevate elements within the UI. In light mode, `elevationAccent` can be used when shadows or borders are not an option. `elevationFloating` and `elevationRaised` are only applicable in dark mode, while `shadow` is only applicable in light mode. For full details, visit our [Elevation foundations page](/foundations/elevation)."
        >
          <Flex
            direction="column"
            gap={{
              row: 0,
              column: 2,
            }}
          >
            <Text size="400">Color</Text>
            <CombinationNew color={['elevationAccent', 'elevationFloating', 'elevationRaised']}>
              {({ color }) => (
                <ColorSchemeLayout>
                  <Box width={60} height={60} rounding="circle" color={color} marginBottom={8} />
                </ColorSchemeLayout>
              )}
            </CombinationNew>
            <Text size="400">Borders and Shadows</Text>
            <CombinationNew borderStyle={['shadow', 'raisedTopShadow', 'raisedBottomShadow']}>
              {({ borderStyle }) => (
                <ColorSchemeLayout>
                  <Box
                    width={60}
                    height={60}
                    rounding="circle"
                    borderStyle={borderStyle}
                    marginBottom={8}
                  />
                </ColorSchemeLayout>
              )}
            </CombinationNew>
          </Flex>
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`The \`rounding\` property sets a border radius for the Box. Options are \`circle\` or \`pill\` for fully rounded corners or 0-8 representing the radius in 4px increments.`}
          title="Rounding"
        >
          <CombinationNew rounding={['pill', 'circle', 0, 1, 2, 3, 4, 5, 6, 7, 8]}>
            {({ rounding }) => (
              <Box
                color="tertiary"
                width={rounding === 'pill' ? 120 : 70}
                height={70}
                rounding={rounding}
              />
            )}
          </CombinationNew>
        </MainSection.Subsection>

        <MainSection.Subsection
          description="While we offer the full range of opacity options, below are usage guidelines for different values. See the [opacity design tokens](/foundations/design_tokens#Opacity)."
          title="Opacity"
        >
          <MainSection.Card
            description={`
          - **3% (0.03)**: Use for Pin wash. Permanent overlay used on Pin images to ensure a visual separation between the white background and any Pin images that have pure white peripheries. For the time being, iOS uses 4%, but this will be reevaluated in the near future.
              - Note: at the moment, this can only be accomplished using the \`$opacity-100\` token as an inline style on Box
          - **20% (0.2)**: Overlay wash to be used sparingly. Only use it in situations where a high-level of opacity is needed and if the 40% doesn't fit the design goal.
          - **40% (0.4)**: Overlay wash to supply a mid-range wash over an item (e.g. #FFFFFF media controls | #000000 wash behind modals, wash on images with text overlays).
          - **80% (0.8)**: Overlay wash used on most surface's scrims. Used to supply a low-level of opacity over an element (e.g. #FFFFFF image overlay | #00000 Board cover overlay) .
          - **90% (0.9)**: Component wash applied on IconButton and other elements as needed (e.g. image overlays). In dark mode we recommend an inverse wash.  For example: Use $color-background-wash-light instead of $color-background-wash-dark.
          `}
          />
          <CombinationNew
            hasCheckerboard
            opacity={[0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]}
          >
            {({ opacity }) => <Box color="selected" width={60} height={60} opacity={opacity} />}
          </CombinationNew>
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`
    The \`column\` property allows for automatic widths based on a 12-column grid. To create responsive layouts, specify different values for \`smColumn\`, \`mdColumn\`, and \`lgColumn\`.
  `}
          title="Column layout"
        >
          <CombinationNew column={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}>
            {({ column }) => <Box height={100} color="infoBase" column={column} />}
          </CombinationNew>
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`
    Box can also be sized using a mixture of \`width\`, \`height\`, \`max/min width\`, \`max/min height\`, and \`fit\`.

    When setting the size of a Box, the \`overflow\` property may need to be set in order to hide or scroll content that is outside the bounds of the Box.
    `}
          title="Sizing"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={sizing} name="Sizing example" layout="column" />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`When content overflows the bounds of Box, there are multiple options to control the overflow behavior. The default is \`overflow="visible"\`, but the most common use case is supplying \`overflow="auto"\` to ensure overflow content can be accessed. Learn more about [CSS overflow](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow).`}
          title="Overflow"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={overflow} name="Overflow example" previewHeight={925} />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`
      Control the padding on different screen sizes by setting the \`smPadding\`, \`mdPadding\` or \`lgPadding\` properties. In the example, we increase the padding for every breakpoint in either all directions, the x-axis only or the y-axis only.`}
          title="Responsive padding"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={responsive}
                layout="column"
                name="Responsive padding example"
                previewHeight={200}
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`
      Auto margin is a useful tool when positioning items without using flexbox layouts. By setting any of the margin properties to "auto", the margin will extend to fill the extra space.

      This can be seen below, where the 5-column width Box is centered using \`margin="auto"\` and the 3-column width Box uses \`marginStart="auto"\` to automatically adjust the Box to the far edge.
      `}
          title="Auto margins"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={autoMargins}
                layout="column"
                name="Auto margins example"
                previewHeight={200}
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`
    Position is static by default but can be made absolute. Box has helpers to help align to absolute edges (top, bottom, left, right). These can be used in combination with padding to achieve desired offsets from edges.

    `}
          title="Absolute positioning"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={absolute} name="Absolute positioning example" />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`The \`ref\` property can be used to anchor a [Popover](/web/popover) to a Box.`}
          title="Using as a ref"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={<SandpackExample code={ref} name="Ref example" />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`It's possible to use Box with external elements using the CSS \`z-index\` property by capturing those values in controlled objects. The example below shows using a \`FixedZIndex\` for a value that comes from somewhere else, and a \`CompositeZIndex\` to layer the Box on top of it. Visit our [Z-Index documentation](/web/zindex_classes) for more details on how to use these utility classes.`}
          title="Z-Index"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={zIndex}
                layout="column"
                previewHeight={150}
                name="zIndex example"
              />
            }
          />
        </MainSection.Subsection>
      </MainSection>

      <QualityChecklist component={generatedDocGen?.displayName} />

      <MainSection name="Related">
        <MainSection.Subsection
          description={`
        **[Flex](/web/flex)**
        Use Flex for flexbox layouts, especially when even spacing between elements is desired, by using the \`gap\` property.

        **[Container](/web/container)**
        Use Container to responsively layout content with a max-width on large screens.

        **[ScrollBoundaryContainer](/web/utilities/scrollboundarycontainer)**
        For proper positioning when using anchored components (Popover, Tooltip, etc.) within a container that could scroll, use ScrollBoundaryContainer.

        **[TapArea](/web/taparea)**
        If a tap target is needed in order to click on a portion of the page, use TapArea, since \`onClick\` is not supported on Box.

        **[Sticky](/web/sticky)**
        Use Sticky if a portion of the page should stick to either the top or bottom when scrolling.
      `}
        />
      </MainSection>
    </Page>
  );
}

export async function getServerSideProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: { generatedDocGen: await docGen('Box') },
  };
}
