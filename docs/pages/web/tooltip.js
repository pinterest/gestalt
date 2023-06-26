// @flow strict
import { type Node } from 'react';
import { SlimBanner } from 'gestalt';
import AccessibilitySection from '../../docs-components/AccessibilitySection.js';
import docGen, { type DocGen } from '../../docs-components/docgen.js';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable.js';
import MainSection from '../../docs-components/MainSection.js';
import Page from '../../docs-components/Page.js';
import PageHeader from '../../docs-components/PageHeader.js';
import QualityChecklist from '../../docs-components/QualityChecklist.js';

export default function DocsPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title="Tooltip">
      <PageHeader
        name="Tooltip"
        description={generatedDocGen?.description}
        slimBanner={
          <SlimBanner
            type="info"
            iconAccessibilityLabel="Info"
            message="Planning to use Tooltip with IconButton? Instead, use"
            helperLink={{
              text: "IconButton's built-in tooltip.",
              accessibilityLabel: 'View IconButton Docs, with Tooltip section',
              href: '/web/iconbutton#With-Tooltip',
              onClick: () => {},
            }}
          />
        }
        defaultCode={`
<Flex>
  <Tooltip text="Align left" accessibilityLabel="">
    <IconButton
      accessibilityLabel="Align left"
      bgColor="white"
      icon="text-align-left"
      iconColor="darkGray"
      size="lg"
    />
  </Tooltip>
  <Tooltip text="Align center" accessibilityLabel="">
    <IconButton
      accessibilityLabel="Align center"
      bgColor="white"
      icon="text-align-center"
      iconColor="darkGray"
      size="lg"
    />
  </Tooltip>
  <Tooltip text="Align right" accessibilityLabel="">
    <IconButton
      accessibilityLabel="Align right"
      bgColor="white"
      icon="text-align-right"
      iconColor="darkGray"
      size="lg"
    />
  </Tooltip>
</Flex>
        `}
      />

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            title="When to use"
            description={`
          - Providing helpful, but non-essential context to a UI element.
          - Enhancing a baseline understanding of an element or feature.
        `}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            title="When not to use"
            description={`
          - Using a separate Tooltip instance with IconButton. Use [IconButton's built-in tooltip](/web/iconbutton#With-Tooltip) instead.
          - Displaying information that is critical to the understanding of an element/feature. Use inline text instead.
          - Offering context at the surface-level scope. Consider a [Callout](/web/callout) instead.
        `}
          />
        </MainSection.Subsection>
      </MainSection>
      <MainSection name="Best practices">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Use Tooltip to describe the function of an interactive element, typically [Icon Button](/web/iconbutton), in as few words as possible."
            defaultCode={`
<Tooltip text="Send Pin" accessibilityLabel="">
  <IconButton
    accessibilityLabel="Send Pin"
    bgColor="white"
    icon="share"
    iconColor="darkGray"
    size="lg"
  />
</Tooltip>`}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Use Tooltip to restate text already visible on screen."
            defaultCode={`
<Tooltip text="Save">
  <Button color="red" text="Save" size="lg" />
</Tooltip>
`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Use Tooltip to distinguish related actions with visually similar iconography."
            defaultCode={`
<Flex>
  <Tooltip text="Align left" accessibilityLabel="">
    <IconButton
      accessibilityLabel="Align left"
      bgColor="white"
      icon="text-align-left"
      iconColor="darkGray"
      size="lg"
    />
  </Tooltip>
  <Tooltip text="Align center" accessibilityLabel="">
    <IconButton
      accessibilityLabel="Align center"
      bgColor="white"
      icon="text-align-center"
      iconColor="darkGray"
      size="lg"
    />
  </Tooltip>
  <Tooltip text="Align right" accessibilityLabel="">
    <IconButton
      accessibilityLabel="Align right"
      bgColor="white"
      icon="text-align-right"
      iconColor="darkGray"
      size="lg"
    />
  </Tooltip>
</Flex>`}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Use Tooltip to communicate critical information, such as an error, instructions for performing a task or interaction feedback."
            defaultCode={`
<Tooltip text="Pssst! Looks like you've already saved this Pin.">
  <Button color="red" text="Save" size="lg" />
</Tooltip>
`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Use Tooltip to add supplementary information about a feature, typically paired with an `info-circle` [IconButton](/web/iconbutton)."
            defaultCode={`
        <Flex direction="column" gap={{ column: 1, row: 0 }}>
          <Flex alignItems="center" gap={{ row: 1, column: 0 }}>
            <Label htmlFor="business-url-field">
              <Text size="100">Business URL</Text>
            </Label>
            <Tooltip text="This is the site users will be redirected to when interacting with your ad">
              <IconButton
                accessibilityLabel="Additional info"
                bgColor="white"
                icon="info-circle"
                iconColor="darkGray"
                size="md"
                padding={1}
              />
            </Tooltip>
          </Flex>
          <TextField
            id="business-url-field"
            onChange={() => {}}
          />
        </Flex>
`}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Pair Tooltip with a disabled element. See [disabled elements](#Disabled-elements) to learn more."
            defaultCode={`
<Tooltip
  link={
    <Text color="inverse" size="100" weight="bold">
      <Link
        href="https://help.pinterest.com/en/business/article/get-a-business-account"
        target="blank"
      >
        Learn more
      </Link>
    </Text>
  }
  text="There was a problem converting to a personal account."
>
  <Button size="lg" disabled text="Convert to personal account" />
</Tooltip>
`}
          />
        </MainSection.Subsection>
      </MainSection>
      <AccessibilitySection name={generatedDocGen?.displayName}>
        <MainSection.Subsection
          title="Labels"
          description={`
When using Tooltip with [IconButton](/web/iconbutton), avoid repetitive labeling. The \`accessibilityLabel\` provided to IconButton should describe the intent of the button, not the icon itself. For instance, use “Settings” instead of “Cog icon”. Tooltip \`text\` should expand upon that intention, as seen in the "cog" example below. If Tooltip \`text\` is the same as IconButton \`accessibilityLabel\`, then add \`accessibilityLabel=""\` to the Tooltip, as seen with the "share" example below`}
          columns={2}
        >
          <MainSection.Card
            cardSize="md"
            defaultCode={`
<Tooltip text="Customize performance stats for your paid ads">
  <IconButton
    accessibilityLabel="Settings"
    bgColor="white"
    icon="cog"
    iconColor="darkGray"
    size="lg"
  />
</Tooltip>
`}
          />
          <MainSection.Card
            cardSize="md"
            defaultCode={`
<Tooltip text="Share" accessibilityLabel="">
  <IconButton
    accessibilityLabel="Share"
    bgColor="white"
    icon="share"
    iconColor="darkGray"
    size="lg"
  />
</Tooltip>
`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Disabled elements"
          description={`
Tooltips must be paired with an interactive, focusable element, like [Button](/web/button) or [IconButton](/web/iconbutton). They cannot be paired with anything disabled or static, because this prevents keyboard users from triggering Tooltip and consuming its content. To test if you’re using Tooltip properly, use your keyboard rather than your mouse to trigger Tooltip.

If you need to explain why an item is disabled, consider adding plain [Text](/web/text) near the disabled item, or an \`info-circle\` [IconButton](/web/iconbutton) adjacent to the disabled element.
`}
        />
        <MainSection.Card />
      </AccessibilitySection>
      <MainSection
        name="Localization"
        description={`Be sure to localize the \`text\` and \`accessibilityLabel\` props. Note that localization can lengthen text by 20 to 30 percent.`}
      />
      <MainSection name="Variants">
        <MainSection.Subsection
          title="Ideal direction"
          description={`Pass in \`idealDirection\` to specify the preferred position of Tooltip relative to its anchor element. The default direction is "down", which should be used in most cases. The actual position may change given the available space around the anchor element.`}
        >
          <MainSection.Card
            cardSize="lg"
            defaultCode={`
        function ExampleTooltip() {
  const [idealDirection, setIdealDirection] = React.useState('down');

  return (
    <Flex direction="column" alignItems="center" gap={{ column: 8, row: 0 }}>
      <Flex gap={{ column: 0, row: 4 }}>
        <RadioButton
          checked={idealDirection === 'up'}
          id="up"
          label="Up"
          name="idealDirection"
          onChange={() => setIdealDirection( 'up' )}
          value="up"
        />
        <RadioButton
          checked={idealDirection === 'right'}
          id="right"
          label="Right"
          name="idealDirection"
          onChange={() => setIdealDirection( 'right' )}
          value="right"
        />
        <RadioButton
          checked={idealDirection === 'down'}
          id="down"
          label="Down"
          name="idealDirection"
          onChange={() => setIdealDirection( 'down' )}
          value="down"
        />
        <RadioButton
          checked={idealDirection === 'left'}
          id="left"
          label="Left"
          name="idealDirection"
          onChange={() => setIdealDirection( 'left' )}
          value="left"
        />
      </Flex>
      <Tooltip
        idealDirection={idealDirection}
        inline
        text="Share"
        accessibilityLabel=""
        >
          <IconButton
            accessibilityLabel="Share this Pin"
            bgColor="white"
            icon="share"
            iconColor="darkGray"
            inline
            size="lg"
          />
        </Tooltip>
      </Flex>

  )
}
`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Inline"
          description="Use inline to properly position Tooltip relative to an inline element, such as an [Icon Button](/web/iconbutton)"
        >
          <MainSection.Card
            cardSize="lg"
            defaultCode={`
function SectionsIconButtonDropdownExample() {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  return (
    <Box width={600}>
      <Heading accessibilityLevel={4}>Sugar-Free Strawberry-Chocolate Greek Yogurt Bark Three-Step Recipe.
        <Tooltip inline text="More board options" idealDirection="right" accessibilityLabel="">
          <IconButton
            accessibilityControls="sections-dropdown-example"
            accessibilityHaspopup
            accessibilityExpanded={open}
            accessibilityLabel="More board options"
            bgColor="lightGray"
            icon="ellipsis"
            iconColor="darkGray"
            selected={open}
            onClick={ () => setOpen((prevVal) => !prevVal) }
            ref={anchorRef}
            size="sm"
          />
        </Tooltip>
      </Heading>
      {open && (
        <Dropdown id="sections-dropdown-example" anchor={anchorRef.current} onDismiss={() => {setOpen(false)}}>
        <Dropdown.Section label="Board Options">
          <Dropdown.Item
            handleSelect={() => {}}
            option={{ value: "edit", label: "Edit Board" }}
          />
          <Dropdown.Item
            handleSelect={() => {}}
            option={{ value: "share", label: "Share" }}
          />
          <Dropdown.Item
            handleSelect={() => {}}
            option={{ value: "merge", label: "Merge" }}
          />
        </Dropdown.Section>
      </Dropdown>
      )}
    </Box>
  );
}
`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Link"
          description={`
      Pass in \`link\` to display a link at the bottom of Tooltip.

      ⚠️ Note: this feature will soon be deprecated, as it is not accessible. Please do not use it in new designs or features.
      ⚠️ Note: Please use [HelpButton](/web/helpbutton) instead.
      `}
        >
          <MainSection.Card
            cardSize="lg"
            defaultCode={`
  <Flex gap={{ row: 2, column: 0 }} justifyContent="center" alignItems="center">
    <Text>Enable expanded targeting</Text>
    <Tooltip
      text="Use your Pin to expand your targeting."
      link={
        <Text color="inverse" size="100" weight="bold">
          <Link
            href="https://help.pinterest.com/en/business/article/expanded-targeting"
            target="blank"
          >
            Learn more
          </Link>
        </Text>
      }
    >
      <IconButton
        accessibilityLabel="Additional info."
        bgColor="white"
        icon="info-circle"
        iconColor="darkGray"
        size="sm"
      />
    </Tooltip>
  </Flex>
`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Z-index"
          description={`Tooltip has [Layer](/web/layer) built in, allowing it to overlay surrounding content. Use \`zIndex\` to specify the stacking order of Tooltip along the z-axis in the current stacking context. The example below shows [FixedZIndex](/web/zindex_classes#FixedZIndex) used in [Modal](/web/modal) and [CompositeZIndex](zindex_classes#CompositeZIndex) to layer Tooltip on top.

`}
        >
          <MainSection.Card
            cardSize="lg"
            defaultCode={`
function ScrollBoundaryContainerExample() {
  const [showModal, setShowModal] = React.useState(false);
  const [alignText, setAlignText] = React.useState('left')
  const MODAL_Z_INDEX = new FixedZIndex(11);

  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
      >
        <Button
          accessibilityLabel="Edit this Pin"
          bgColor="white"
          onClick={() => setShowModal(true)}
          text="Open edit modal"
          size="lg"
        />
      </Box>
      {showModal && (
        <Layer zIndex={MODAL_Z_INDEX}>
          <Modal
            accessibilityModalLabel="Edit Pin"
            heading="Edit"
            size="lg"
            onDismiss={() => setShowModal(false)}
            footer={
              <Box
                flex="grow"
                paddingX={3}
                paddingY={3}
              >
                <Box
                  justifyContent="end"
                  marginStart={-1}
                  marginEnd={-1}
                  marginTop={-1}
                  marginBottom={-1}
                  display="flex"
                  wrap
                >
                  <Box
                    paddingX={1}
                    paddingY={1}
                  >
                    <Button
                      text="Cancel"
                      size="lg"
                      onClick={() => setShowModal(false)}
                    />
                  </Box>
                  <Box
                    paddingX={1}
                    paddingY={1}
                  >
                    <Button
                      text="Save"
                      color="red"
                      size="lg"
                      type="submit"
                      onClick={() => setShowModal(false)}
                    />
                  </Box>
                </Box>
              </Box>
            }
          >
              <Box
                column={12}
                display="flex"
                justifyContent="center"
              >
                <Box column={6} paddingX={4}>
                  <Image
                    alt="Tropic greens: The taste of Petrol and Porcelain | Interior design, Vintage Sets and Unique Pieces agave"
                    color="rgb(231, 186, 176)"
                    naturalHeight={751}
                    naturalWidth={564}
                    src="https://i.ibb.co/7bQQYkX/stock2.jpg"
                  >
                    <Box padding={3}>
                      <Heading
                        align={alignText}
                        color="white"
                        size="600"
                      >
                        Tropic greens: The taste of Petrol and Porcelain
                      </Heading>
                    </Box>
                  </Image>
                </Box>
                <Flex direction="column" gap={{ column: 4, row: 0 }}>
                  <Heading size="400" weight="bold">Text Overlay</Heading>
                  <Text size="300">Add text directly onto your Pin</Text>
                  <Text size="300" weight="bold">Alignment</Text>
                  <Flex>
                    <Tooltip text="Align left">
                      <IconButton
                        accessibilityLabel="Align left"
                        bgColor="white"
                        icon="text-align-left"
                        iconColor="darkGray"
                        onClick={() => setAlignText('left')}
                        size="lg"
                        selected={alignText === 'left'}
                      />
                    </Tooltip>
                    <Tooltip text="Align center">
                      <IconButton
                        accessibilityLabel="Align center"
                        bgColor="white"
                        icon="text-align-center"
                        iconColor="darkGray"
                        onClick={() => setAlignText('center')}
                        size="lg"
                        selected={alignText === 'center'}
                      />
                    </Tooltip>
                    <Tooltip text="Align right">
                      <IconButton
                        accessibilityLabel="Align right"
                        bgColor="white"
                        icon="text-align-right"
                        iconColor="darkGray"
                        onClick={() => setAlignText('right')}
                        size="lg"
                        selected={alignText === 'right'}
                      />
                    </Tooltip>
                  </Flex>
                </Flex>
            </Box>
          </Modal>
        </Layer>
      )}
    </>
  )
}`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Within scrolling containers"
          description="ScrollBoundaryContainer is needed for proper positioning when Tooltip is anchored to an element that is located within a scrolling container. The use of ScrollBoundaryContainer ensures Tooltip remains attached to its anchor when scrolling."
        >
          <MainSection.Card
            cardSize="lg"
            defaultCode={`
function ScrollBoundaryContainerExample() {
  const [content, setContent] = React.useState(null);
  const [claimed, setClaimed] = React.useState(null);
  const [device, setDevice] = React.useState(null);

  return (
    <ScrollBoundaryContainer overflow="scrollY" height={200}>
      <Flex width={300} direction="column" gap={{ column: 4, row: 0 }}>
        <Flex direction="column" gap={{ column: 2, row: 0 }}>
          <Flex alignItems="center" gap={{ row: 1, column: 0 }}>
            <Text weight="bold" size="lg">
              Content type
            </Text>
            <Tooltip
              idealDirection="right"
              text="See stats about different types of content created by you and/or others on Pinterest. Filter to get more details on your organic (not an ad) and paid (promoted as an ad) content."
            >
              <IconButton
                accessibilityLabel="Information"
                bgColor="white"
                icon="info-circle"
                iconColor="darkGray"
              />
            </Tooltip>
          </Flex>
          <Box display="flex" direction="column">
          <Box paddingY={1}>
              <RadioButton
                checked={content === "all"}
                id="allcontent"
                label="All"
                name="content"
                onChange={() => setContent( "all" )}
                value="all"
              />
            </Box>
            <Box paddingY={1}>
              <RadioButton
                checked={content === "organic"}
                id="organic"
                label="Organic"
                name="content"
                onChange={() => setContent( "organic" )}
                value="organic"
              />
            </Box>
            <Box paddingY={1}>
              <RadioButton
                checked={content === "paid"}
                id="paid"
                label="Paid and earned"
                name="content"
                onChange={() => setContent( "paid" )}
                value="paid"
              />
            </Box>
          </Box>
        </Flex>
        <Flex direction="column" gap={{ column: 2, row: 0 }}>
          <Flex alignItems="center" gap={{ row: 1, column: 0 }}>
            <Text weight="bold" size="lg">
              Claimed account
            </Text>
            <Tooltip
              idealDirection="right"
              text="See stats for Pins linked to your claimed accounts like websites, Etsy, Instagram or Youtube. The Other Pins category includes Pins you’ve published or saved that don’t link to any of your claimed accounts."
            >
              <Icon
                icon="info-circle"
                accessibilityLabel="Information"
                color="default"
              />
            </Tooltip>
          </Flex>
          <Box display="flex" direction="column">
          <Box paddingY={1}>
            <RadioButton
              checked={claimed === "all"}
              id="allclaimed"
              label="All Pins"
              name="claimed"
              onChange={() => setClaimed( "all" )}
              value="all"
            />
            </Box>
            <Box paddingY={1}>
              <RadioButton
                checked={claimed === "instagram"}
                id="instagram"
                label="Instagram"
                name="claimed"
                onChange={() => setClaimed( "instagram" )}
                value="instagram"
              />
            </Box>
            <Box paddingY={1}>
              <RadioButton
                checked={claimed === "other"}
                id="other"
                label="Other pins"
                name="claimed"
                onChange={() => setClaimed( "other" )}
                value="other"
              />
            </Box>
          </Box>
        </Flex>
        <Flex direction="column" gap={{ column: 2, row: 0 }}>
          <Flex alignItems="center" gap={{ row: 1, column: 0 }}>
            <Text weight="bold" size="lg">
              Device
            </Text>
            <Tooltip
              idealDirection="right"
              text="See stats for the different devices your Pinterest traffic is coming from.">
              <Icon
                icon="info-circle"
                accessibilityLabel="Information"
                color="default"
              />
            </Tooltip>
          </Flex>
          <Box display="flex" direction="column">
          <Box paddingY={1}>
            <RadioButton
              checked={device === "all"}
              id="alldevices"
              label="All"
              name="device"
              onChange={() => setDevice( "all" )}
              value="all"
            />
            </Box>
            <Box paddingY={1}>
              <RadioButton
                checked={device === "mobile"}
                id="mobile"
                label="Mobile"
                name="device"
                onChange={() => setDevice( "mobile" )}
                value="mobile"
              />
            </Box>
            <Box paddingY={1}>
              <RadioButton
                checked={device === "desktop"}
                id="desktop"
                label="Desktop"
                name="device"
                onChange={() => setDevice( "desktop" )}
                value="desktop"
              />
            </Box>
             <Box paddingY={1}>
              <RadioButton
                checked={device === "tablet"}
                id="tablet"
                label="Tablet"
                name="device"
                onChange={() => setDevice( "tablet" )}
                value="tablet"
              />
            </Box>
          </Box>
        </Flex>
      </Flex>
    </ScrollBoundaryContainer>
)}`}
          />
        </MainSection.Subsection>
      </MainSection>
      <MainSection name="Writing">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description={`
- Describe only the element that triggers Tooltip.
- Focus on the action by beginning with a verb.
- Use succinct and scannable language.
- As much as possible, limit Tooltip's text to a maximum of 60 to 75 characters.
- Use sentence case while always capitalizing the word “Pin.”
`}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description={`
- Describe elements other than the one that triggers Tooltip.
- Use Tooltip to restate text already visible on screen.
- Use Tooltip to communicate critical information, such as an error, instructions for performing a task, or interaction feedback.
`}
          />
        </MainSection.Subsection>
      </MainSection>
      <QualityChecklist component={generatedDocGen?.displayName} />

      <MainSection name="Related">
        <MainSection.Subsection
          description={`
**[Popover](/web/popover)**
Popover displays a lightweight task related to the content on screen. One example of Popover is the board picker, which allows people to choose the board to save a Pin to. While Tooltips are purely text-based, Popovers offer broader content options, such as [Buttons](/web/button) and [Images](/web/image).

**[ScrollBoundaryContainer](/web/utilities/scrollboundarycontainer)**
ScrollBoundaryContainer is needed for proper positioning when Tooltip is anchored to an element that is located within a scrolling container. The use of ScrollBoundaryContainer ensures Tooltip remains attached to its anchor when scrolling. See the [within scrolling containers](#Within-scrolling-containers) variant to learn more.

**[Toast](/web/toast)**
Toast provides feedback on an interaction. One example of Toast is the confirmation that appears when a Pin has been saved. Toasts appear at the bottom of a desktop screen or top of a mobile screen, instead of being attached to any particular element on the interface.
    `}
        />
      </MainSection>
    </Page>
  );
}

export async function getServerSideProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: { generatedDocGen: await docGen('Tooltip') },
  };
}
