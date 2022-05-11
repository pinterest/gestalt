// @flow strict
import React, { type Node } from 'react';
import { Box, ColorSchemeProvider, Flex, Text } from 'gestalt';
import Page from '../components/Page.js';
import CombinationNew from '../components/CombinationNew.js';
import PageHeader from '../components/PageHeader.js';
import MainSection from '../components/MainSection.js';
import GeneratedPropTable from '../components/GeneratedPropTable.js';
import docgen, { type DocGen } from '../components/docgen.js';
import QualityChecklist from '../components/QualityChecklist.js';

import AccessibilitySection from '../components/AccessibilitySection.js';

const ignoredProps = [
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
    <Flex gap={4}>
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
    <Page title="Box">
      <PageHeader name="Box" description={generatedDocGen?.description} />

      <GeneratedPropTable generatedDocGen={generatedDocGen} excludeProps={ignoredProps} />

      <MainSection name="Best practices">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description={`
        Use Box as a building block when creating other components or layouts that do not rely on flexbox. The included properties should cover any variations needed to create a diverse range of options.

        If you find yourself using Box for flexbox layouts, consider [Flex](/flex) instead.
        `}
            defaultCode={`
<Box column={12}>
  <Box column={12}>
    <Box color="midnight" height={50} width="100%">
      <Text color="light" weight="bold">Header</Text>
    </Box>
    <Box column={6} display="inlineBlock">
      <Box color="maroon" height={50} width="100%">
        <Text color="light" weight="bold">Body 50% Content</Text>
      </Box>
    </Box>
    <Box column={6} display="inlineBlock">
      <Box color="eggplant" height={50} width="100%">
        <Text color="light" weight="bold">Body 50% Content</Text>
      </Box>
    </Box>
    <Box color="midnight" height={50} width="100%">
      <Text color="light" weight="bold">Footer</Text>
    </Box>
  </Box>
</Box>
`}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description={`Don’t use the \`onClick\`, \`className\` and \`style\` properties.

Box is a pass-through component, meaning that any other properties you provide to it will be directly applied to the underlying \`<div>\`. The above properties are exceptions, however.  We don’t allow  \`onClick\`  for  accessibility reasons, so consider a [Button](/button) or [TapArea](/taparea) instead. We remove \`className\` and \`style\` to ensure style encapsulation. If necessary, \`dangerouslySetInlineStyle\` can be used to supply a style not supported by Box props.

If you need to use these features for animation purposes, use a \`<div>\` instead.`}
            defaultCode={`
<Box
  className="This class name will not appear"
  style={{backgroundColor: "orange"}}
  color="midnight"
  column={12}
  height={100}
  padding={4}
>
  <Box
    onClick={() => {console.log("This won't get logged.");}}
    paddingX={1}
    color="maroon"
    height={50}
  >
    <Text color="light" weight="bold">Adding onClick here will do nothing</Text>
  </Box>
</Box>
`}
          />
        </MainSection.Subsection>

        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description={`When addressing the spacing of the Box, use padding before you use margins, as padding will compose better and won't collapse. Padding is applied in 4px increments and is always symmetric. Learn more about [margin collapsing](https://css-tricks.com/what-you-should-know-about-collapsing-margins/).`}
            defaultCode={`
<Box>
  <Box marginTop={4} color="blue" width={200} height={50}>
    <Box
      color="green"
      height={50}
      marginTop={2}
    >
      <Box
        color="midnight"
        height={50}
        marginTop={3}
      >
        <Text color="light" weight="bold">
          These margins all collapsed
        </Text>
      </Box>
    </Box>
  </Box>
  <Box marginTop={4} paddingY={1} color="blue" width={200} height={100}>
    <Box
      color="green"
      height={100}
      paddingY={2}
    >
      <Box
        color="midnight"
        height={100}
        padding={2}
      >
        <Text color="light" weight="bold">
          These are not collapsed, because they use padding
        </Text>
      </Box>
    </Box>
  </Box>
</Box>
`}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description={`Avoid using arbitrary \`<div>\` elements. Instead, when building a component, prioritize using Box. If you need to set a custom style, you can do so using the \`dangerouslySetInlineStyle\` prop. However, this should be avoided whenever possible by utilizing the other props provided in Box. We provide a [lint rule](https://github.com/pinterest/gestalt/blob/master/packages/eslint-plugin-gestalt/src/no-box-dangerous-style-duplicates.js) to prevent this from happening.`}
            defaultCode={`
function MenuButtonExample() {
  const firstBoxHeight = 50;
  const secondBoxHeight = 25;

  return (
    <Box paddingY={2}>
      <Box
        color="midnight"
        height={firstBoxHeight}
        padding={2}
        marginBottom={1}
      >
        <Text color="light" weight="bold">
          This uses a proper, Gestalt colored Box
        </Text>
      </Box>
      <div
        style={{backgroundColor: '#6e0f3c', color: 'white'}}
      >
        This could be using Box, but isn't.
      </div>
      <Box
        color="eggplant"
        dangerouslySetInlineStyle={{
          __style: {
            paddingBottom: '${50 + 25}px',
          },
        }}
        height={50}
        padding={2}
        marginTop={1}
      >
        <Text color="light" weight="bold">
          This uses dangerouslySetInlineStyle to add a calculated paddingBottom
        </Text>
      </Box>
    </Box>
  );
}
`}
          />
        </MainSection.Subsection>
      </MainSection>

      <AccessibilitySection
        name={generatedDocGen?.displayName}
        description={`The \`visuallyHidden\` option of the \`display\` property can be used to prevent content from being visible while ensuring that screen readers still have access to the content. This can be useful when adding context for screen reader users, such as adding a pause to the labels of [Checkboxes](/checkboxes).`}
      >
        <MainSection.Subsection
          title="Visually hidden content"
          description={`
    Setting \`display="visuallyHidden"\` on Box allows for an element to be visually hidden but still be read by screen readers.
  `}
        >
          <MainSection.Card
            cardSize="lg"
            defaultCode={`
<Box>
  <Text>Enable your screen reader to hear the following text:</Text>
  <Box display="visuallyHidden">In the darkest night, Box will rise to bring the light. The Lloyd has spoken.</Box>
</Box>
`}
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
            defaultCode={`
<Flex direction="column" flex="grow">
  <Flex alignItems="top">
    <Box
      as="nav"
      title="as prop example nav"
      column={6}
      color="maroon"
      width="100%"
      padding={2}
      borderStyle="sm"
    >
      <Text color="light" weight="bold">
        Top Nav Menu: as="nav"
      </Text>
    </Box>
    <Box column={6} display="inlineBlock" borderStyle="sm">
      <Box color="midnight" width="100%" padding={2}>
        <Text color="light" weight="bold">
          HTML output:
        </Text>
        <Text color="light" weight="bold">
          {'<nav>Menu</nav>'}
        </Text>
      </Box>
    </Box>
  </Flex>
  <Flex alignItems="top">
    <Box as="article" column={6} color="pine" width="100%" padding={2} borderStyle="sm">
      <Heading color="light" size="500">
        Article 1
      </Heading>
      <Text color="light" weight="bold">
        Article: as="article"
      </Text>
    </Box>
    <Box column={6} display="inlineBlock" borderStyle="sm">
      <Box color="midnight" width="100%" padding={2}>
        <Text color="light" weight="bold">
          HTML output:
        </Text>
        <Text color="light" weight="bold">
          {'<article>'}
        </Text>
        <Text color="light" weight="bold">
          {' '}
          {'<h2>Article 1</h2>'}
        </Text>
        <Text color="light" weight="bold">
          {'</article>'}
        </Text>
      </Box>
    </Box>
  </Flex>
</Flex>
`}
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
            defaultCode={`
<Box column={12}>
  <Box role="feed" color="midnight" width="100%" padding={2}>
    <Text color="light" weight="bold">
      Container: role="feed"
    </Text>
    <Box column={8} display="inlineBlock">
      <Box role="article" title="Article 1" color="maroon" height={50} width="100%" padding={2}>
        <Text color="light" weight="bold">
          Content: role="article"
        </Text>
      </Box>
    </Box>
    <Box column={4} display="inlineBlock">
      <Box role="form" color="eggplant" height={50} width="100%" padding={2}>
        <Text color="light" weight="bold">
          Contact Form: role="form"
        </Text>
      </Box>
    </Box>
  </Box>
  <Box role="navigation" title="Site Map" color="pine" height={50} width="100%" padding={2}>
    <Text color="light" weight="bold">
      Site Map: role="navigation"
    </Text>
  </Box>
  <Text>{"Everything above will render as a <div>"}</Text>
</Box>
`}
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
            defaultCode={`
function Example() {
  const MarginSwatch = (props) => (
    <Box
      margin={1}
      dangerouslySetInlineStyle={{
        __style: { backgroundColor: 'rgba(110, 15, 60, 0.2)' },
      }}
    >
      <Box
        padding={1}
        {...props}
        dangerouslySetInlineStyle={{
          __style: { backgroundColor: 'rgba(19, 58, 94, 0.2)' },
        }}
      >
        <Text>{JSON.stringify(props)}</Text>
      </Box>
    </Box>
  );

  const toggleRTL = () => {
    if (document.documentElement) {
      const isRTL = document.documentElement.dir === 'rtl';
      document.documentElement.dir = isRTL ? 'ltr' : 'rtl';
    }
  };

  return (
    <Box maxWidth={200} marginBottom={2}>
      <Button size="sm" onClick={toggleRTL} text="Toggle Page Direction" />
      <MarginSwatch marginStart={2} />
      <MarginSwatch marginEnd={2} />
      <MarginSwatch marginStart={-2} />
      <MarginSwatch marginEnd={-2} />
    </Box>
  );
}
`}
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Variants">
        <MainSection.Subsection
          description={`Borders are controlled by the \`borderStyle\` property. Specifying a size (\`sm\` or \`lg\`) enables a solid, light gray color in that width. Specifying \`shadow\` adds an even box-shadow around the entire container, while \`raisedTopShadow\` and \`raisedBottomShadow\` add shadows to indicate an elevated header or footer. See the [elevation foundations page](/elevation) for more details.`}
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
                color="white"
                borderStyle={borderStyle}
              />
            )}
          </CombinationNew>
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Colors"
          description={`
          The following values can be used to change the background color of Box. Be sure to use the value that semantically matches your use case. For full details on how to use our colors, visit our [Color usage page](/color_usage).
          
          Colors should be used semantically whenever possible (i.e. using "errorBase" for error scenarios). If a color is needed for a branded moment in product, Box color can be set using our [color palette design tokens](/color_palette), but it is [considered a hack](/how_to_hack_around_gestalt#Box's-dangerouslySetInlineStyle) and should be avoided.

          _⚠️ Note that the previous options ('red', 'white', 'lightGray', 'gray', 'darkGray', 'green', 'pine', 'olive', 'blue', 'navy', 'midnight', 'purple', 'orchid', 'eggplant', 'maroon', 'watermelon', 'orange') are still valid but will be deprecated soon._
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
              'transparent',
              'transparentDarkGray',
              'lightWash',
              'darkWash',
            ]}
          >
            {/* eslint-disable-next-line react/prop-types */}
            {(props) => <Box width={60} height={60} rounding="circle" color={props.color} />}
          </CombinationNew>
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Elevation"
          description="Colors and shadows can elevate elements within the UI. In light mode, `elevationAccent` can be used when shadows or borders are not an option. `elevationFloating` and `elevationRaised` are only applicable in dark mode, while `shadow` is only applicable in light mode. For full details, visit our [Elevation foundations page](/elevation)."
        >
          <Flex direction="column" gap={2}>
            <Text size="400">Color</Text>
            <Box>
              <CombinationNew color={['elevationAccent', 'elevationFloating', 'elevationRaised']}>
                {({ color }) => (
                  <ColorSchemeLayout>
                    <Box width={60} height={60} rounding="circle" color={color} marginBottom={8} />
                  </ColorSchemeLayout>
                )}
              </CombinationNew>
            </Box>
            <Text size="400">Borders and Shadows</Text>
            <Box>
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
            </Box>
          </Flex>
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`The \`rounding\` property sets a border radius for the Box. Options are \`circle\` or \`pill\` for fully rounded corners or 0-8 representing the radius in 4px increments.`}
          title="Rounding"
        >
          <CombinationNew rounding={['pill', 'circle', 0, 1, 2, 3, 4, 5, 6, 7, 8]}>
            {(props) => (
              <Box
                color="gray"
                width={props.rounding === 'pill' ? 120 : 70} // eslint-disable-line react/prop-types
                height={70}
                rounding={props.rounding} // eslint-disable-line react/prop-types
              />
            )}
          </CombinationNew>
        </MainSection.Subsection>

        <MainSection.Subsection description="" title="Opacity">
          <CombinationNew opacity={[0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]}>
            {/* eslint-disable-next-line react/prop-types */}
            {(props) => <Box color="darkGray" width={60} height={60} opacity={props.opacity} />}
          </CombinationNew>
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`
    The \`column\` property allows for automatic widths based on a 12-column grid. To create responsive layouts, specify different values for \`smColumn\`, \`mdColumn\`, and \`lgColumn\`.
  `}
          title="Column layout"
        >
          <CombinationNew column={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}>
            {/* eslint-disable-next-line react/prop-types */}
            {(props) => <Box height={100} color="midnight" column={props.column} />}
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
            defaultCode={`
<Box borderStyle="lg" column={12}>
  <Box width="25%" minHeight={25} maxHeight={100} overflow="hidden" padding={2} borderStyle="sm" color="eggplant">
    <Text color="light"> Add or remove text in the editor to see the min and max heights take affect.</Text>
  </Box>
  <Box width="50%" height={100} padding={2} borderStyle="sm" color="maroon">
    <Text color="light">Width and Height can be specified with numbers for "px" values or percentages</Text>
  </Box>
  <Box width="75%" minWidth={100} maxWidth={500} padding={2} borderStyle="sm" color="eggplant">
    <Text color="light">Change the screen width to see the min and max widths take affect </Text>
  </Box>
  <Box fit padding={2} borderStyle="sm" color="maroon">
    <Text color="light">"fit" sets width to 100% </Text>
  </Box>
</Box>
`}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`When content overflows the bounds of Box, there are multiple options to control the overflow behavior. The default is \`overflow="visible"\`, but the most common use case is supplying \`overflow="auto"\` to ensure overflow content can be accessed. Learn more about [CSS overflow](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow).`}
          title="Overflow"
        >
          <MainSection.Card
            cardSize="lg"
            defaultCode={`
function BoxPopoverExample() {
  const longText =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae nisl nec turpis vehicula ultrices. Duis pretium ut ipsum nec interdum. Vestibulum arcu dolor, consectetur ac eros a, varius commodo justo. Maecenas tincidunt neque elit, eu pretium arcu dictum ac. Donec vehicula mauris ut erat dictum, eget tempus elit luctus. In volutpat felis justo, et venenatis arcu viverra in. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin enim lorem, vulputate eget imperdiet nec, dapibus sed diam. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Suspendisse rhoncus ut leo non gravida. Nulla tincidunt tellus sit amet ornare venenatis. Sed quis lorem cursus, porttitor tellus sed, commodo ex. Praesent blandit pretium faucibus. Aenean orci tellus, vulputate id sapien sit amet, porta fermentum quam. Praesent sem risus, tristique sit amet pulvinar in, scelerisque sit amet massa.';

  return (
    <Flex gap={4} wrap>
      <Flex gap={8} direction="column" wrap>
        <Box>
          <Text>Overflow Hidden</Text>
          <Box
            overflow="hidden"
            width={300}
            maxHeight={100}
            padding={2}
            borderStyle="sm"
            color="eggplant"
          >
            <Text color="light">{longText}</Text>
          </Box>
        </Box>
        <Box>
          <Text>Overflow Scroll</Text>
          <Box
            overflow="scroll"
            width={300}
            maxHeight={100}
            padding={2}
            borderStyle="sm"
            color="maroon"
            tabIndex={0}
          >
            <Text color="light">{longText}</Text>
          </Box>
        </Box>
        <Box marginBottom={4}>
          <Text>Overflow Visible</Text>
          <Box
            overflow="visible"
            width={300}
            maxHeight={100}
            padding={2}
            borderStyle="sm"
            color="purple"
          >
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae nisl nec turpis vehicula ultrices. Duis pretium ut ipsum nec interdum. Vestibulum arcu dolor, consectetur ac eros a, varius commodo justo.
            </Text>
          </Box>
        </Box>
      </Flex>
      <Flex gap={8} direction="column" wrap>
        <Box>
          <Text>Overflow Auto</Text>
          <Box
            overflow="auto"
            width={300}
            maxHeight={100}
            padding={2}
            borderStyle="sm"
            color="eggplant"
          >
            <Box width={350} padding={2} borderStyle="sm" color="maroon" tabIndex={0}>
              <Text color="light">{longText}</Text>
            </Box>
          </Box>
        </Box>
        <Box>
          <Text>Overflow scrollX</Text>
          <Box
            overflow="scrollX"
            width={300}
            maxHeight={100}
            padding={2}
            borderStyle="sm"
            color="maroon"
          >
            <Box width={350} padding={2} borderStyle="sm" color="eggplant" tabIndex={0}>
              <Text color="light">{longText}</Text>
            </Box>
          </Box>
        </Box>
        <Box>
          <Text>Overflow scrollY</Text>
          <Box
            overflow="scrollY"
            width={300}
            maxHeight={100}
            padding={2}
            borderStyle="sm"
            color="maroon"
          >
            <Box width={350} padding={2} borderStyle="sm" color="eggplant" tabIndex={0}>
              <Text color="light">{longText}</Text>
            </Box>
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
}
`}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`
      Control the padding on different screen sizes by setting the \`smPadding\`, \`mdPadding\` or \`lgPadding\` properties. In the example, we increase the padding by 4px for every breakpoint in either all directions, the x-axis only or the y-axis only.`}
          title="Responsive padding"
        >
          <MainSection.Card
            cardSize="lg"
            defaultCode={`
<Flex gap={3}>
  <Box padding={0} smPadding={1} mdPadding={2} lgPadding={3} color="darkWash">
    <Box width={40} height={40} color="maroon" />
  </Box>
  <Box paddingX={0} smPaddingX={1} mdPaddingX={2} lgPaddingX={3} color="darkWash">
    <Box width={40} height={40} color="midnight" />
  </Box>
  <Box paddingY={0} smPaddingY={1} mdPaddingY={2} lgPaddingY={3} color="darkWash">
    <Box width={40} height={40} color="eggplant" />
  </Box>
</Flex>
`}
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
            defaultCode={`
<Box color="midnight" marginStart={12} marginEnd={12} column={12}>
  <Box borderStyle="sm" color="maroon" margin="auto" column={5} height={100}/>
  <Box borderStyle="sm" color="eggplant" marginStart="auto" column={3} height={100}/>
</Box>
`}
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
            defaultCode={`
<Box height={100}>
  <Box position="absolute" top left padding={2} color="midnight">
    <Text color="light">Top Left</Text>
  </Box>
  <Box position="absolute" top right padding={2} color="midnight">
    <Text color="light">Top Right</Text>
  </Box>
  <Box position="absolute" bottom left padding={2} color="midnight">
    <Text color="light">Bottom Left</Text>
  </Box>
  <Box position="absolute" bottom right padding={2} color="midnight">
    <Text color="light">Bottom Right</Text>
  </Box>
  <Box color="maroon" width={400} height="100%"/>
</Box>
`}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`The \`ref\` property can be used to anchor a [Popover](/popover) to a Box.`}
          title="Using as a ref"
        >
          <MainSection.Card
            cardSize="lg"
            defaultCode={`
function BoxPopoverExample() {
  const [open, setOpen] = React.useState(false);
  const [checked, setChecked] = React.useState(false);

  const anchorRef = React.useRef(null);

  return (
    <React.Fragment>
      <Flex alignItems="start" direction="column" gap={6}>
        <Button
          inline
          color="red"
          onClick={ () => setOpen((prevVal) => !prevVal) }
          size="sm"
          text={open ? "Close Popover" : "Anchor a Popover to Box"}
        />
        <Box borderStyle='sm' padding={3} ref={anchorRef} rounding={1}>
          <Text>I'm a Box</Text>
        </Box>
      </Flex>
      {open && (
        <Popover
          anchor={anchorRef.current}
          idealDirection="right"
          onDismiss={() => {}}
          shouldFocus={false}
        >
          <Box padding={3}>
            <Text weight="bold">I'm a Popover anchored to a Box</Text>
          </Box>
        </Popover>
      )}
    </React.Fragment>
  );
}`}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`It's possible to use Box with external elements using the CSS \`z-index\` property by capturing those values in controlled objects. The example below shows using a \`FixedZIndex\` for a value that comes from somewhere else, and a \`CompositeZIndex\` to layer the Box on top of it. Visit our [Z-Index documentation](/zindex_classes) for more details on how to use these utility classes.`}
          title="Z-Index"
        >
          <MainSection.Card
            cardSize="lg"
            defaultCode={`
function Example() {
  const HEADER_ZINDEX = new FixedZIndex(100);
  const zIndex = new CompositeZIndex([HEADER_ZINDEX]);
  return (
    <Box
      column={12}
      dangerouslySetInlineStyle={{ __style: { isolation: 'isolate' } }}
      height={150}
      overflow="scroll"
      tabIndex={0}
    >
      <Sticky top={0} zIndex={HEADER_ZINDEX}>
        <Box color="maroon" width="80%" height={60} padding={2}>
          <Text color="light">This is sticky and won't move when scrolling</Text>
        </Box>
      </Sticky>
      <Box color="midnight" width="50%" height={100} zIndex={zIndex} position="relative" padding={2}>
        <Text color="light">This will float above the maroon Box when scrolling</Text>
      </Box>
      <Box color="pine" width="30%" height={120} padding={2}>
        <Text color="light">This will go behind the maroon Box</Text>
      </Box>
    </Box>
)}
`}
          />
        </MainSection.Subsection>
      </MainSection>

      <QualityChecklist component={generatedDocGen?.displayName} />

      <MainSection name="Related">
        <MainSection.Subsection
          description={`
        **[Flex](/flex)**
        Use Flex for flexbox layouts, especially when even spacing between elements is desired, by using the \`gap\` property.

        **[Container](/container)**
        Use Container to responsively layout content with a max-width on large screens.

        **[ScrollBoundaryContainer](/scrollboundarycontainer)**
        For proper positioning when using anchored components (Popover, Tooltip, etc.) within a container that could scroll, use ScrollBoundaryContainer.

        **[TapArea](/taparea)**
        If a tap target is needed in order to click on a portion of the page, use TapArea, since \`onClick\` is not supported on Box.

        **[Sticky](/sticky)**
        Use Sticky if a portion of the page should stick to either the top or bottom when scrolling.
      `}
        />
      </MainSection>
    </Page>
  );
}

export async function getServerSideProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  const generatedDocGen = await docgen({ componentName: 'Box' });

  return {
    props: { generatedDocGen },
  };
}
