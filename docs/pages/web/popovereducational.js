// @flow strict
import { type Node } from 'react';
import AccessibilitySection from '../../docs-components/AccessibilitySection.js';
import docgen, { type DocGen } from '../../docs-components/docgen.js';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable.js';
import MainSection from '../../docs-components/MainSection.js';
import Page from '../../docs-components/Page.js';
import PageHeader from '../../docs-components/PageHeader.js';
import QualityChecklist from '../../docs-components/QualityChecklist.js';

export default function DocsPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader
        name={generatedDocGen?.displayName}
        description={generatedDocGen?.description}
        defaultCode={`
function Example() {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef();

  React.useEffect(() => {
    setOpen(true)
  }, []);

  return (
    <Box height="100%" width="60%" display="flex" justifyContent="start">
      <TapArea ref={anchorRef} rounding={3} fullWidth={false}>
        <Box padding={3} color="secondary" height={75} width={200} rounding={3}>
          <Flex gap={2}>
            <Box aria-hidden height={500} width={50}>
              <Mask rounding={3} wash>
                <Image
                  alt="Image of a Spanish paella from above. Yellow rice with red peppers and shrimp on top."
                  color="rgb(231, 186, 176)"
                  loading="lazy"
                  naturalHeight={1}
                  naturalWidth={1}
                  src="https://i.ibb.co/d2tpDss/IMG-0494.jpg"
                />
              </Mask>
            </Box>
            <Flex direction="column">
              <Text size="100">More ideas for</Text>
              <Text weight="bold">Food, Drinks, Snacks</Text>
            </Flex>
          </Flex>
        </Box>
      </TapArea>
      {open && (
        <PopoverEducational
          id="popover-primary-action"
          idealDirection="right"
          anchor={anchorRef.current}
          onDismiss={() => {}}
          message="Tap to tag a product or press and hold to see product details"
          primaryAction={{ text: "Next"}}
        />
      )}
    </Box>
)}`}
      />

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            title="When to use"
            description={`
- Bringing attention to specific user interface elements for educational or onboarding purposes.
        `}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            title="When not to use"
            description={`
- Displaying critical information that prevents users from accomplishing a task.
- Displaying information out of context.
- As a replacement for [Tooltip](/web/tooltip).
- For presenting a list of actions or options. Use [Dropdown](/web/dropdown) instead.
        `}
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Best practices">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Use the PopoverEducational to educate users on a new or existing feature. Be sure to use a caret pointing to the feature. If there is more than one item, use a CTA button to move the user to the next popover."
            defaultCode={`
            function Example() {
  const [openA, setOpenA] = React.useState(false);
  const [openB, setOpenB] = React.useState(false);

  const anchorRefA = React.useRef();
  const anchorRefB = React.useRef();

  React.useEffect(() => {
    setOpenA(true)
    setOpenB(false)
  }, []);

  return (
    <Box width="100%" height="100%">
      <Flex direction="column" alignItems="start" height="100%">
        <Flex.Item flex="grow">
          <Box padding={3} color="secondary" height={75} width={175} ref={anchorRefA} rounding={3}>
            <Flex gap={2}>
              <Box height={500} width={50}>
                <Mask rounding={3} wash>
                  <Image
                    alt="Image of a Spanish paella from above. Yellow rice with red peppers and shrimp on top."
                    color="rgb(231, 186, 176)"
                    loading="lazy"
                    naturalHeight={1}
                    naturalWidth={1}
                    src="https://i.ibb.co/d2tpDss/IMG-0494.jpg"
                  />
                </Mask>
              </Box>
              <Flex direction="column">
                <Text size="100">More ideas for</Text>
                <Text weight="bold">Food & Drinks</Text>
              </Flex>
            </Flex>
          </Box>
        </Flex.Item>
        <TapArea fullWidth={false} rounding={3}>
          <Box borderStyle="shadow" padding={3} rounding={3} width={350}>
            <Flex direction="column" gap={3}>
              <Flex>
                <Flex.Item flex="grow">
                  <Flex direction="column" gap={1}>
                    <Text size="100">Ideas for you</Text>
                    <Box display="flex">
                      <Text ref={anchorRefB} inline weight="bold">
                        <Box marginEnd={2}>Small tattoos</Box>
                      </Text>
                    </Box>
                  </Flex>
                </Flex.Item>
                <Flex.Item flex="none">
                  <Icon
                    accessibilityLabel=""
                    icon="arrow-forward"
                  />
                </Flex.Item>
              </Flex>
              <Box width="100%" aria-hidden>
                <Mask rounding={1} wash>
                  <Image
                    alt=""
                    color="rgb(231, 186, 176)"
                    loading="lazy"
                    naturalHeight={181}
                    naturalWidth={698}
                    src="https://i.ibb.co/DWJFWkV/Screenshot-2023-02-24-at-2-27-59-PM.png"
                  />
                </Mask>
              </Box>
            </Flex>
          </Box>
        </TapArea>

        {openA && (
            <PopoverEducational
              idealDirection="right"
              anchor={anchorRefA.current}
              onDismiss={() => {}}
              message="Tap to tag a product to see product details"
              primaryAction={{ text: "Next", onClick: () => {
                setOpenA(false)
                setOpenB(true)
              }}}
            />
        )}
        {openB && (
          <PopoverEducational
            idealDirection="right"
            anchor={anchorRefB.current}
            onDismiss={() => {}}
            message="Explore your recent searches in more details"
          />
        )}
      </Flex>
    </Box>
)}
`}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Show more than one PopoverEducational at a time. If used for onboarding, show a next button instead, to launch the next popover."
            defaultCode={`
            function Example() {
  const [openA, setOpenA] = React.useState(false);
  const [openB, setOpenB] = React.useState(false);

  const anchorRefA = React.useRef();
  const anchorRefB = React.useRef();

  React.useEffect(() => {
    setOpenA(true)
    setOpenB(true)
  }, []);

  return (
    <Box width="100%" height="100%">
      <Flex direction="column" alignItems="start" height="100%">
        <Flex.Item flex="grow">
          <Box padding={3} color="secondary" height={75} width={175} ref={anchorRefA} rounding={3}>
            <Flex gap={2}>
              <Box height={500} width={50}>
                <Mask rounding={3} wash>
                  <Image
                    alt="Image of a Spanish paella from above. Yellow rice with red peppers and shrimp on top."
                    color="rgb(231, 186, 176)"
                    loading="lazy"
                    naturalHeight={1}
                    naturalWidth={1}
                    src="https://i.ibb.co/d2tpDss/IMG-0494.jpg"
                  />
                </Mask>
              </Box>
              <Flex direction="column">
                <Text size="100">More ideas for</Text>
                <Text weight="bold">Food & Drinks</Text>
              </Flex>
            </Flex>
          </Box>
        </Flex.Item>
        <TapArea fullWidth={false} rounding={3}>
          <Box borderStyle="shadow" padding={3} rounding={3} width={350}>
            <Flex direction="column" gap={3}>
              <Flex>
                <Flex.Item flex="grow">
                  <Flex direction="column" gap={1}>
                    <Text size="100">Ideas for you</Text>
                    <Box display="flex">
                      <Text ref={anchorRefB} inline weight="bold">
                        <Box marginEnd={2}>Small tattoos</Box>
                      </Text>
                    </Box>
                  </Flex>
                </Flex.Item>
                <Flex.Item flex="none">
                  <Icon
                    accessibilityLabel=""
                    icon="arrow-forward"
                  />
                </Flex.Item>
              </Flex>
              <Box width="100%" aria-hidden>
                <Mask rounding={1} wash>
                  <Image
                    alt=""
                    color="rgb(231, 186, 176)"
                    loading="lazy"
                    naturalHeight={181}
                    naturalWidth={698}
                    src="https://i.ibb.co/DWJFWkV/Screenshot-2023-02-24-at-2-27-59-PM.png"
                  />
                </Mask>
              </Box>
            </Flex>
          </Box>
        </TapArea>

        {openA && (
            <PopoverEducational
              idealDirection="right"
              anchor={anchorRefA.current}
              onDismiss={() => {}}
              message="Tap to tag a product to see product details"
            />
        )}
        {openB && (
          <PopoverEducational
            idealDirection="right"
            anchor={anchorRefB.current}
            onDismiss={() => {}}
            message="Explore your recent searches in more details"
          />
        )}
      </Flex>
    </Box>
)}
`}
          />
        </MainSection.Subsection>

        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Position PopoverEducational appropriately on the screen. Make sure the arrow points directly to the element it is referencing."
            defaultCode={`
function Example() {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef();

  React.useEffect(() => {
    setOpen(true)
  }, []);

  return (
    <React.Fragment>
      <TapArea fullWidth={false} rounding={3}>
        <Box borderStyle="shadow" padding={3} rounding={3} width={400}>
          <Flex direction="column" gap={3}>
            <Flex>
              <Flex.Item flex="grow">
                <Flex direction="column" gap={1}>
                  <Text size="100">Ideas for you</Text>
                  <Box display="flex">
                    <Text ref={anchorRef} inline weight="bold">
                      <Box marginEnd={2}>Small tattoos</Box>
                    </Text>
                  </Box>
                </Flex>
              </Flex.Item>
              <Flex.Item flex="none">
                <Icon
                  accessibilityLabel=""
                  icon="arrow-forward"
                />
              </Flex.Item>
            </Flex>
            <Box width="100%" aria-hidden>
              <Mask rounding={1} wash>
                <Image
                  alt=""
                  color="rgb(231, 186, 176)"
                  loading="lazy"
                  naturalHeight={181}
                  naturalWidth={698}
                  src="https://i.ibb.co/DWJFWkV/Screenshot-2023-02-24-at-2-27-59-PM.png"
                />
              </Mask>
            </Box>
          </Flex>
        </Box>
      </TapArea>
      {open && (
        <PopoverEducational
          id="popover-do-educate"
          idealDirection="right"
          anchor={anchorRef.current}
          onDismiss={() => {}}
          message="Explore your recent searches in more details"
        />
      )}
    </React.Fragment>
)}`}
          />
        </MainSection.Subsection>
      </MainSection>

      <AccessibilitySection name={generatedDocGen?.displayName}>
        <MainSection.Subsection
          title="Keyboard navigation"
          description={`
PopoverEducational doesn't behave like regular popovers where they are open/closed upon user interaction, i.e. Tooltip, Dropdown, or ComboBox. PopoverEducational visibility is not directly controlled by the user; instead, its visibility is defined as part of a broader user experience and the user interaction engagement with this experience.

In most cases, PopoverEducational might be already visible on page load. See [visible on page load](#Visibility-on-page-load) to learn more. However, popover-based components rely on the opening/closing action to capture focus.

If PopoverEducational is already visible, we need its content to be keyboard accessible in sequential order. Don't use Layer to wrap PopoverEducational as it would move PopoverEducational outside the DOM hierarchy of the parent component and it will lose contextual sequencial order. The content will placed last in the keyboard navigations sequence, becoming unreachable in its content context.
`}
        />
        <MainSection.Subsection
          title="ARIA attributes"
          description={`
To provide an accessible experience, make sure \`accessibilityLabel\` introduces the elements on the screen that PopoverEducational is providing context about. Use \`id\` paired to \`aria-describedBy\` to link PopoverEducational to the element is providing additional information about to the user.
`}
        />
        <MainSection.Subsection
          title="Role"
          description={`
We recommend passing the following ARIA attribute to PopoverEducational for a better screen reader experience:

- \`accessibilityLabel\`: describes the main purpose of a PopoverEducational for the screen reader. Should be unique and concise. For example, "Save to board" instead of "PopoverEducational".  It populates [aria-label](https://w3c.github.io/aria-practices/#dialog_roles_states_props).

When not passing \`children\`, PopoverEducational handles \`role\`. However, when passing \`children\` to a custom PopoverEducational, \`role\` is set to "tooltip" by default. Override \`role\` following the guidance provided.

For the \`role\` prop, use:
- 'tooltip' if the PopoverEducational is a simple contextual text bubble that displays a description on a feature. When \`message\` is passed with no \`primaryAction\`, \`role\` is set to "tooltip".
- 'dialog' if the PopoverEducational is a dialog that requires a response from the user. When \`primaryAction\` is passed to PopoverEducational, \`role\` is set to "dialog".
`}
        >
          <MainSection.Card cardSize="lg" />
        </MainSection.Subsection>
      </AccessibilitySection>

      <MainSection
        name="Localization"
        description="Be sure to localize any text elements within PopoverEducational, along with `accessibilityLabel`. Note that localization can lengthen text by 20 to 30 percent."
      />

      <MainSection name="Variants">
        <MainSection.Subsection
          title="Message"
          description={`
The \`message\` prop accepts either a string or [Text](/web/text). Use a string for simple messages without any visual style. PopoverEducational will handle the message style and adherence to design guidelines. If a message with more complex style is required, such as bold text or inline links, use Text to wrap your message with any additional Text or Link usages contained within.
`}
        >
          <MainSection.Card
            cardSize="md"
            defaultCode={`
function Example() {
  const [openA, setOpenA] = React.useState(false);
  const [openB, setOpenB] = React.useState(false);
  const anchorRefA = React.useRef();
  const anchorRefB = React.useRef();

  React.useEffect(() => {
    setOpenA(true);
    setOpenB(true);
  }, []);

  return (
    <Flex alignItems="center" justifyContent="between" height="100%" width="100%">
      <IconButton
        accessibilityLabel="This IconButton represents a new feature"
        iconColor="darkGray"
        icon="pin"
        onClick={() => {}}
        ref={anchorRefA}
        size="lg"
      />
      <IconButton
        accessibilityLabel="This IconButton represents a new feature"
        iconColor="darkGray"
        icon="pin"
        onClick={() => {}}
        ref={anchorRefB}
        size="lg"
      />
      {openA && (
        <PopoverEducational
          anchor={anchorRefA.current}
          idealDirection="right"
          onDismiss={() => {}}
          message="Simple message string"
        />
      )}
      {openB && (
        <PopoverEducational
          anchor={anchorRefB.current}
          idealDirection="right"
          onDismiss={() => {}}
          message={<Text inline>Rich message with Text component and <Text inline weight="bold">bold text</Text></Text>}
        />
      )}
    </Flex>
  );
}
`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Primary action"
          description={`CTA buttons are used to move users through an onboarding or informational flow.
          Generally with the text “Next”.

\`primaryAction\` displays a CTA button at the bottom of PopoverEducational.
`}
        >
          <MainSection.Card
            cardSize="md"
            defaultCode={`
function Example() {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef();

  React.useEffect(() => {
    setOpen(true)
  }, []);

  return (
    <Box height="100%">
      <TapArea ref={anchorRef} rounding={3}>
        <Box padding={3} color="secondary" height={75} width={200} rounding={3}>
          <Flex gap={2}>
            <Box aria-hidden height={500} width={50}>
              <Mask rounding={3} wash>
                <Image
                  alt="Image of a Spanish paella from above. Yellow rice with red peppers and shrimp on top."
                  color="rgb(231, 186, 176)"
                  loading="lazy"
                  naturalHeight={1}
                  naturalWidth={1}
                  src="https://i.ibb.co/d2tpDss/IMG-0494.jpg"
                />
              </Mask>
            </Box>
            <Flex direction="column">
              <Text size="100">More ideas for</Text>
              <Text weight="bold">Food, Drinks, Snacks</Text>
            </Flex>
          </Flex>
        </Box>
      </TapArea>
      {open && (
        <PopoverEducational
          id="popover-primary-action"
          idealDirection="down"
          anchor={anchorRef.current}
          onDismiss={() => {}}
          message="Tap to tag a product or press and hold to see product details"
          primaryAction={{ text: "Next"}}
        />
      )}
    </Box>
)}`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Custom content"
          description={`For more flexibility, PopoverEducational allows passing children. If passed, \`message\` and \`primaryAction\` are not rendered.

PopoverEducational doesn't overwrite style in children or set any padding or margin, therefore, make sure any Text's \`color\` is "light" and any Button's \`color\` is "white".`}
        >
          <MainSection.Card
            cardSize="md"
            defaultCode={`
function Example() {
  const [openA, setOpenA] = React.useState(false);
  const anchorRefA = React.useRef();

  React.useEffect(() => {
    setOpenA(true);
  }, []);

  return (
    <Flex alignItems="center" justifyContent="center" height="100%" width="100%">
      <IconButton
        accessibilityLabel="This IconButton represents a new feature"
        iconColor="darkGray"
        icon="pin"
        onClick={() => {}}
        ref={anchorRefA}
        size="lg"
      />
      {openA && (
        <PopoverEducational
          anchor={anchorRefA.current}
          idealDirection="down"
          onDismiss={() => {}}
        >
          <Box padding={3}>
            <Flex direction="column" gap={3}>
              <Text color="light">Tap to tag a product or press and hold to see product details</Text>
              <Flex.Item alignSelf="end"><Button color="white" text="Next"/></Flex.Item>
            </Flex>
          </Box>
        </PopoverEducational>
      )}
    </Flex>
  )
}
`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Size"
          description={`
The maximum width of PopoverEducational. PopoverEducational has different size configurations:
- \`sm\`: 230px wide by default. Height grows to accommodate
- \`flexible\`: Without a defined maximum width. Grows to fill the container. Height grows to accommodate copy.
      `}
        >
          <MainSection.Card
            cardSize="md"
            defaultCode={`
function Example() {
  const [openA, setOpenA] = React.useState(false);
  const [openB, setOpenB] = React.useState(false);
  const anchorRefA = React.useRef();
  const anchorRefB = React.useRef();

  React.useEffect(() => {
    setOpenA(true);
    setOpenB(true);
  }, []);

  return (
    <React.Fragment>
      <Flex direction="column" width="100%" height="100%">
        <Flex.Item flex="grow">
          <IconButton
            accessibilityLabel="This IconButton represents a new feature"
            iconColor="darkGray"
            icon="pin"
            onClick={() => {}}
            ref={anchorRefA}
            size="lg"
        />
        </Flex.Item>
        <Flex.Item flex="grow">
          <IconButton
            accessibilityLabel="This IconButton represents a new feature"
            iconColor="darkGray"
            icon="pin"
            onClick={() => {}}
            ref={anchorRefB}
            size="lg"
          />
        </Flex.Item>

        </Flex>
        {openA && (
          <PopoverEducational
            size="flexible"
            anchor={anchorRefA.current}
            idealDirection="right"
            onDismiss={() => {}}
            message="Ads allow you to reach more people who matter to you. When audiences engage with your ad, you'll be able to track performance here."
          />
        )}
        {openB && (
          <PopoverEducational
            anchor={anchorRefB.current}
            idealDirection="right"
            onDismiss={() => {}}
            message="Ads allow you to reach more people who matter to you. When audiences engage with your ad, you'll be able to track performance here."

          />
        )}
    </React.Fragment>
  );
}
`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Visibility on page load"
          description={`
PopoverEducational's positioning algorithm requires that the anchor element renders before PopoverEducational is rendered. If PopoverEducational should be visible on page load, use \`useEffect\` to toggle the visibility after the first render.
`}
        >
          <MainSection.Card
            cardSize="lg"
            defaultCode={`
function Example() {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef();

  React.useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <Flex alignItems="center" justifyContent="center" height="100%" width="100%">
      <IconButton
        accessibilityLabel="This IconButton represents a new feature"
        iconColor="darkGray"
        icon="pin"
        onClick={() => {}}
        ref={anchorRef}
        size="lg"
      />
      {open && (
        <PopoverEducational
          anchor={anchorRef.current}
          idealDirection="right"
          onDismiss={() => {}}
          message="This PopoverEducational is visible on initial page load"
        />
      )}
    </Flex>
  );
}
`}
          />
        </MainSection.Subsection>
      </MainSection>

      <QualityChecklist component={generatedDocGen?.displayName} />

      <MainSection name="Related">
        <MainSection.Subsection
          description={`
**[Dropdown](/web/dropdown)**
Use Dropdown to display a list of actions or options in a Popover.

**[Tooltip](/web/tooltip)**
Tooltip describes the function of an interactive element, typically [IconButton](/web/iconbutton), on hover.`}
        />
      </MainSection>
    </Page>
  );
}

export async function getServerSideProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: { generatedDocGen: await docgen({ componentName: 'PopoverEducational' }) },
  };
}
