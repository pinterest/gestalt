// @flow strict
import React, { type Node } from 'react';
import PropTable from './components/PropTable.js';
import PageHeader from './components/PageHeader.js';
import MainSection from './components/MainSection.js';
import FeedbackCallout from './components/FeedbackCallout.js';

const cards: Array<Node> = [];
const card = (c) => cards.push(c);

card(
  <FeedbackCallout link="https://docs.google.com/forms/d/e/1FAIpQLSe7h8kVcD7QqvPvjkE8s8WvnuFfhYvAEQ6L7tZwPgHjJPAbSw/viewform?usp=pp_url&entry.847151274=Tooltip" />,
);

card(
  <PageHeader
    name="Tooltip"
    description={`
Tooltip is a floating text label that succinctly describes the function of an interactive element, typically [Icon Button](/IconButton). It’s displayed continuously as long as the user hovers over or focuses on the element.`}
    defaultCode={`
      <Flex>
        <Tooltip text="Align left">
          <IconButton
            accessibilityLabel="Align left"
            bgColor="white"
            icon="text-align-left"
            iconColor="darkGray"
            size="lg"
          />
        </Tooltip>
        <Tooltip text="Align center">
          <IconButton
            accessibilityLabel="Align center"
            bgColor="white"
            icon="text-align-center"
            iconColor="darkGray"
            size="lg"
          />
        </Tooltip>
        <Tooltip text="Align right">
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
  />,
);

card(
  <PropTable
    props={[
      {
        name: 'children',
        type: 'React.Node',
        description: `The anchor element, usually [Icon Button](/IconButton), that triggers Tooltip on hover or focus`,
        required: true,
      },
      {
        name: 'idealDirection',
        type: `'up' | 'right' | 'down' | 'left'`,
        description: `Specifies the preferred position of Tooltip relative to its anchor element. See the [ideal direction](#Ideal_direction) variant to learn more.`,
        defaultValue: 'down',
        href: 'Ideal-direction',
      },
      {
        name: 'inline',
        type: 'boolean',
        description: `Properly positions Tooltip relative to an inline element, such as [Icon Button](/IconButton) using the inline property. See the [inline](/Inline) variant to learn more.`,
        defaultValue: 'false',
        href: 'Inline',
      },

      {
        name: 'text',
        type: 'string',
        description:
          'The text shown in Tooltip to describe its anchor element. See [localization ](#localization) to learn more.',
        required: true,
      },
      {
        name: 'link',
        type: 'React.Node',
        description:
          'Displays a link at the bottom of Tooltip. See the [link](#Link) variant to learn more.',
        href: 'Link',
      },
      {
        name: 'zIndex',
        type: 'interface Indexable { index(): number; }',
        description:
          'Specifies the stacking order of Tooltip along the z-axis in the current stacking context. See the [z-index](#Z-index) variant to learn more.',
        href: 'Z-index',
      },
    ]}
  />,
);

card(
  <MainSection name="Best practices">
    <MainSection.Subsection>
      <MainSection.Card
        cardSize="md"
        type="do"
        description="Use Tooltip to describe the function of an interactive element, typically [Icon Button](/IconButton), in as few words as possible."
        defaultCode={`
<Tooltip text="Send Pin">
  <IconButton
    accessibilityLabel=""
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
  <Button color="red" text="Save" size="lg" inline />
</Tooltip>
`}
      />
    </MainSection.Subsection>
    <MainSection.Subsection>
      <MainSection.Card
        cardSize="md"
        type="do"
        description="Use Tooltip to distinguish related actions with visually similar iconography."
        defaultCode={`
<Flex>
  <Tooltip text="Align left">
    <IconButton
      accessibilityLabel=""
      bgColor="white"
      icon="text-align-left"
      iconColor="darkGray"
      size="lg"
    />
  </Tooltip>
  <Tooltip text="Align center">
    <IconButton
      accessibilityLabel=""
      bgColor="white"
      icon="text-align-center"
      iconColor="darkGray"
      size="lg"
    />
  </Tooltip>
  <Tooltip text="Align right">
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
  <Button color="red" text="Save" inline size="lg" />
</Tooltip>
`}
      />
    </MainSection.Subsection>
    <MainSection.Subsection>
      <MainSection.Card
        cardSize="md"
        type="do"
        description="Use Tooltip to add supplementary information about a feature, typically paired with an `info-circle` [IconButton](/IconButton)."
        defaultCode={`
<Tooltip text="Total ad spend in the select time period">
  <IconButton
    accessibilityLabel="Additional info."
    bgColor="white"
    icon="info-circle"
    iconColor="darkGray"
    size="lg"
  />
  </Tooltip>
`}
      />
      <MainSection.Card
        cardSize="md"
        type="don't"
        description="Pair Tooltip with a disabled element. See [disabled items](#Disabled-items) to learn more."
        defaultCode={`
<Tooltip
  link={
    <Text color="white" size="sm" weight="bold">
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
  </MainSection>,
);

card(
  <MainSection name="Accessibility">
    <MainSection.Subsection
      title="Labels"
      description={`
When using Tooltip with [IconButton](/IconButton), avoid repetitive labeling. The \`accessibilityLabel\` provided to IconButton should describe the intent of the button, not the icon itself. For instance, use “Settings” instead of “Cog icon”. Tooltip \`text\` can expand upon that intention, as seen with the \`cog\` IconButton. If Tooltip \`text\` and IconButton \`accessibilityLabel\` contain the same content, pass an empty string to \`accessibilityLabel\`, as seen with the \`send\` IconButton.`}
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
<Tooltip text="Send Pin">
  <IconButton
    accessibilityLabel=""
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
Tooltips must be paired with an interactive, focusable element, like [Button](/Button) or [IconButton](/IconButton). They cannot be paired with anything disabled or static, because this prevents keyboard users from triggering Tooltip and consuming its content. To test if you’re using Tooltip properly, use your keyboard rather than your mouse to trigger Tooltip.

If you need to explain why an item is disabled, consider adding plain [Text](/Text) near the disabled item, or an \`info-circle\` [IconButton](/IconButton) adjacent to the disabled element.
`}
    />
    <MainSection.Card />
  </MainSection>,
);

card(
  <MainSection
    name="Localization"
    description={`Be sure to localize the \`text\` and \`accessibilityLabel\` props. Note that localization can lengthen text by 20 to 30 percent.`}
  />,
);

card(
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
    <Flex direction="column" alignItems="center" gap={8}>
      <Flex gap={4}>
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
      description="Use inline to properly position Tooltip relative to an inline element, such as an [Icon Button](/IconButton)"
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
        <Tooltip inline text="More board options" idealDirection="right">
          <IconButton
            accessibilityControls="sections-dropdown-example"
            accessibilityHaspopup
            accessibilityExpanded={open}
            accessibilityLabel=""
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
      description={`Pass in \`link\` to display a link at the bottom of Tooltip. Use sparingly.`}
    >
      <MainSection.Card
        cardSize="lg"
        defaultCode={`
  <Flex gap={2} justifyContent="center" alignItems="center">
    <Text>Enable expanded targeting</Text>
    <Tooltip
      text="Use your Pin to expand your targeting."
      link={
        <Text color="white" size="sm" weight="bold">
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
      description={`Tooltip has [Layer](/Layer) built in, allowing it to overlay surrounding content. Use \`zIndex\` to specify the stacking order of Tooltip along the z-axis in the current stacking context. The example below shows [FixedZIndex](/ZIndex%20Classes#FixedZIndex) used in [Modal](/Modal) and [CompositeZIndex](ZIndex%20Classes#CompositeZIndex) to layer Tooltip on top.

`}
    >
      <MainSection.Card
        cardSize="lg"
        defaultCode={`
function ScrollBoundaryContainerExample() {
  const [showModal, setShowModal] = React.useState(false);
  const [alignText, setAlignText] = React.useState('left')
  const MODAL_Z_INDEX = new FixedZIndex(11);
  const TOOLTIP_Z_INDEX = new CompositeZIndex([MODAL_Z_INDEX]);

  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
      >
        <Button
          accessibilityLabel="Edit this Pin"
          bgColor="white"
          inline
          onClick={() => setShowModal(true)}
          text="Open edit modal"
          size="lg"
        />
      </Box>
      {showModal && (
        <Layer zIndex={MODAL_Z_INDEX}>
          <Modal
            _dangerousScrollableExperimentEnabled
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
                      inline
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
                        size="lg"
                      >
                        Tropic greens: The taste of Petrol and Porcelain
                      </Heading>
                    </Box>
                  </Image>
                </Box>
                <Flex direction="column" gap={4}>
                  <Heading size="sm" weight="bold">Text Overlay</Heading>
                  <Text size="lg">Add text directly onto your Pin</Text>
                  <Text size="lg" weight="bold">Alignment</Text>
                  <Flex>
                    <Tooltip text="Align left" zIndex={TOOLTIP_Z_INDEX}>
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
                    <Tooltip text="Align center" zIndex={TOOLTIP_Z_INDEX}>
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
                    <Tooltip text="Align right" zIndex={TOOLTIP_Z_INDEX}>
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
    <ScrollBoundaryContainer
      overflow="scrollY"
      height={200}
    >
      <Flex
        width={300}
        direction="column"
        gap={4}
      >
        <Flex
          direction="column"
          gap={2}
        >
          <Flex
            alignItems="center"
            gap={1}
          >
            <Text
              weight="bold"
              size="lg"
            >
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
          <Box
            display="flex"
            direction="column"
          >
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
        <Flex
          direction="column"
          gap={2}
        >
          <Flex
            alignItems="center"
            gap={1}
          >
            <Text
              weight="bold"
              size="lg"
            >
              Claimed account
            </Text>
            <Tooltip
              idealDirection="right"
              text="See stats for Pins linked to your claimed accounts like websites, Etsy, Instagram or Youtube. The Other Pins category includes Pins you’ve published or saved that don’t link to any of your claimed accounts."
            >
              <Icon
                icon="info-circle"
                accessibilityLabel="Information"
                color="darkGray"
              />
            </Tooltip>
          </Flex>
          <Box
            display="flex"
            direction="column"
          >
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
        <Flex
          direction="column"
          gap={2}
        >
          <Flex
            alignItems="center"
            gap={1}
          >
            <Text
              weight="bold"
              size="lg"
            >
              Device
            </Text>
            <Tooltip
              idealDirection="right"
              text="See stats for the different devices your Pinterest traffic is coming from.">
              <Icon
                icon="info-circle"
                accessibilityLabel="Information"
                color="darkGray"
              />
            </Tooltip>
          </Flex>
          <Box
            display="flex"
            direction="column"
          >
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
  </MainSection>,
);

card(
  <MainSection name="Writing">
    <MainSection.Subsection>
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
  </MainSection>,
);

card(
  <MainSection name="Related">
    <MainSection.Subsection
      description={`
**[Flyout](/Flyout)**
Flyout displays a lightweight task related to the content on screen. One example of Flyout is the board picker, which allows people to choose the board to save a Pin to. While Tooltips are purely text-based, Flyouts offer broader content options, such as [Buttons](/Buttons) and [Images](/Images).

**[ScrollBoundaryContainer](/ScrollBoundaryContainer)**
ScrollBoundaryContainer is needed for proper positioning when Tooltip is anchored to an element that is located within a scrolling container. The use of ScrollBoundaryContainer ensures Tooltip remains attached to its anchor when scrolling. See the [within scrolling containers](#Within-scrolling-containers) variant to learn more.

**[Toast](/Toast)**
Toast provides feedback on an interaction. One example of Toast is the confirmation that appears when a Pin has been saved. Toasts appear at the bottom of a desktop screen or top of a mobile screen, instead of being attached to any particular element on the interface.
    `}
    />
  </MainSection>,
);
export default cards;
