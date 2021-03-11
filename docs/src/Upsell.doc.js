// @flow strict
import type { Node } from 'react';
import { Upsell } from 'gestalt';
import PropTable from './components/PropTable.js';
import PageHeader from './components/PageHeader.js';
import MainSection from './components/MainSection.js';
import FeedbackCallout from './components/FeedbackCallout.js';

const cards: Array<Node> = [];
const card = (c) => cards.push(c);

card(<FeedbackCallout componentName="Upsell" />);

card(
  <PageHeader
    name="Upsell"
    description="Upsells are banners that display short messages that focus on promoting an action or upgrading something the user already has."
    defaultCode={`
      <Upsell
        title="Give $30, get $60 in ads credit"
        message="Earn $60 of ads credit, and give $30 of ads credit to a friend"
        primaryAction={{ href: 'https://pinterest.com', label: 'Send invite', target: 'blank' }}
        dismissButton={{
          accessibilityLabel: 'Dismiss banner',
          onDismiss: () => {},
        }}
        imageData={{
          component: <Icon icon="pinterest" accessibilityLabel="" color="darkGray" size={32} />,
        }}
      />;
    `}
  />,
);

card(
  <PropTable
    name="Upsell"
    Component={Upsell}
    props={[
      {
        name: 'message',
        type: 'string',
        required: true,
        defaultValue: null,
        description: `Main content of Upsell, explains what is being offered or recommended. Content should be [localized](#Localization). See [Best Practices](#Best-practices) for more info.`,
      },
      {
        name: 'children',
        type: 'typeof UpsellForm',
        description: `To create forms within Upsell, pass an Upsell.Form as children`,
      },
      {
        name: 'dismissButton',
        type: '{| accessibilityLabel: string, onDismiss: () => void, |}',
        required: false,
        defaultValue: null,
        description: `
        Adds a dismiss button to the Upsell. The \`accessibilityLabel\` should follow the [Accessibility guidelines](#Accessibility)
        `,
      },
      {
        name: 'imageData',
        type:
          '{| component: typeof Image | typeof Icon, width?: number, mask: { rounding: "circle" | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8, wash: boolean} |}',
        required: false,
        defaultValue: null,
        description:
          'Either an [Icon](/Icon) or an [Image](/Image) to render at the start of the banner. Width is not used with Icon. Image width defaults to 128px. See the [Icon](#Icon) and [Image](#Image) variants for more info.',
      },
      {
        name: 'primaryAction',
        type:
          '{| accessibilityLabel?: string , href?: string, label: string, onClick?: ({ event: SyntheticMouseEvent<HTMLAnchorElement> | SyntheticKeyboardEvent<HTMLAnchorElement | SyntheticMouseEvent<HTMLButtonElement> | SyntheticKeyboardEvent<HTMLButtonElement> }) => void |}, onNavigationOptions: ({ [string]: Node | ({| +event: SyntheticEvent<> |}) => void }) => void',
        required: false,
        defaultValue: null,
        description: `
          Main action for people to take on Upsell. If \`href\` is supplied, the action will serve as a link. If no \`href\` is supplied, the action will be a button.
          The \`accessibilityLabel\` should follow the [Accessibility guidelines](#Accessibility).
        `,
      },
      {
        name: 'secondaryAction',
        type:
          '{| accessibilityLabel?: string , href?: string, label: string, onClick?: ({ event: SyntheticMouseEvent<HTMLAnchorElement> | SyntheticKeyboardEvent<HTMLAnchorElement | SyntheticMouseEvent<HTMLButtonElement> | SyntheticKeyboardEvent<HTMLButtonElement> }) => void |}, onNavigationOptions: ({ [string]: Node | ({| +event: SyntheticEvent<> |}) => void }) => void, rel: "none" | "nofollow", target: "null" | "self" | "blank" |}',
        required: false,
        defaultValue: null,
        description: `
          Secondary action for people to take on Upsell. If \`href\` is supplied, the action will serve as a link. If no \`href\` is supplied, the action will be a button.
          The \`accessibilityLabel\` should follow the [Accessibility guidelines](#Accessibility).
        `,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        defaultValue: null,
        description: `Brief title summarizing the Upsell. Content should be [localized](#Localization).`,
      },
    ]}
  />,
);

card(
  <PropTable
    name="Upsell.Form"
    id="Upsell.Form"
    Component={Upsell?.Form}
    props={[
      {
        name: 'children',
        type: 'React.Node',
        required: true,
        description: `Contents of the form, typically inputs like [TextField(s)](/TextField).`,
      },
      {
        name: 'onSubmit',
        type:
          '({| event: SyntheticMouseEvent<HTMLButtonElement> | SyntheticKeyboardEvent<HTMLButtonElement> | SyntheticMouseEvent<HTMLAnchorElement> | SyntheticKeyboardEvent<HTMLAnchorElement> |}) => void',
        required: true,
        description: `Actions to perform when the form has been submitted.`,
      },
      {
        name: 'submitButtonText',
        type: 'string',
        required: true,
        description: `Content of the submit button.`,
      },
      {
        name: 'submitButtonAccessibilityLabel',
        type: 'string',
        required: true,
        description: `Label for the submit button used for screen readers. Should follow the [Accessibility guidelines](#Accessibility).`,
      },
      {
        name: 'submitButtonDisabled',
        type: 'boolean',
        description: `Disables the submit button when \`true\`.`,
      },
    ]}
  />,
);

card(
  <MainSection name="Best practices">
    <MainSection.Subsection>
      <MainSection.Card
        cardSize="lg"
        type="do"
        description="Use Upsells for marketing new products or encouraging upgrades."
        defaultCode={`
<Upsell
  title="Give $30, get $60 in ads credit"
  message="Earn $60 of ads credit, and give $30 of ads credit to a friend"
  primaryAction={{ href: 'https://pinterest.com', label: 'Send invite', target: 'blank' }}
  dismissButton={{
    accessibilityLabel: 'Dismiss banner',
    onDismiss: () => {},
  }}
  imageData={{
    component: <Icon icon="pinterest" accessibilityLabel="" color="darkGray" size={32} />,
  }}
/>;
        `}
      />
      <MainSection.Card
        cardSize="lg"
        type="do"
        description={`
        Place Upsell at the top of the page under the primary navigation when possible.
        `}
        defaultCode={`
<Box>
  <Box marginBottom={4} display="flex" alignItems="center">
    <Icon accessibilityLabel="" icon="pinterest" color="red" size={32} />
    <ButtonGroup>
      <Button color="transparent" iconEnd="arrow-down" text="Business" inline />
      <Button color="transparent" iconEnd="arrow-down" text="Create" inline />
      <Button color="transparent" iconEnd="arrow-down" text="Analytics" inline />
      <Button color="transparent" iconEnd="arrow-down" text="Ads" inline />
    </ButtonGroup>
  </Box>
  <Divider />
  <Box marginTop={8}>
    <Upsell
      title="Give $30, get $60 in ads credit"
      message="Earn $60 of ads credit, and give $30 of ads credit to a friend"
      primaryAction={{ href: 'https://pinterest.com', label: 'Send invite', target: 'blank' }}
      dismissButton={{
        accessibilityLabel: 'Dismiss banner',
        onDismiss: () => {},
      }}
      imageData={{
        component: <Icon icon="pinterest" accessibilityLabel="" color="darkGray" size={32} />,
      }}
    />
  </Box>
</Box>;
        `}
      />
      <MainSection.Card
        cardSize="lg"
        type="do"
        description={`
        Plan for the timing of your Upsells with new product launches. Try to create different messages for each time an Upsell appears to the user.
        `}
        defaultCode={`
<Flex gap={4} direction="column">
  <Text>First Upsell:</Text>
  <Upsell
    title="Measure ad performance"
    message="Install the Pinterest tag to track your website traffic, conversions and more."
    primaryAction={{ label: 'Install now' }}
    dismissButton={{
      accessibilityLabel: 'Dismiss banner',
      onDismiss: () => {},
    }}
    imageData={{
      component: <Icon icon="ads-stats" accessibilityLabel="" color="darkGray" size={32} />,
    }}
  />
  <Text>Follow-up Upsell:</Text>
  <Upsell
    imageData={{
      component: <Icon icon="send" accessibilityLabel="" color="darkGray" size={32} />,
    }}
    title="So close! Finish installing your Pinterest tag, get $10 in ads credit"
    message="Track ads conversion—sales, traffic and more—with the Pinterest tag"
    primaryAction={{ label: 'Claim now' }}
  />
</Flex>;
        `}
      />
      <MainSection.Card
        cardSize="lg"
        type="don't"
        description={`
          Use Upsells for critical information, such as errors or warnings. Use [Callout](/Callout) instead. Upsells should not be used for general information either.
        `}
        defaultCode={`
<Upsell
  title="Could not link account"
  message="There was a problem connecting your account."
  primaryAction={{ label: 'Try again' }}
  dismissButton={{
    accessibilityLabel: 'Dismiss banner',
    onDismiss: () => {},
  }}
  imageData={{
    component: <Icon icon="workflow-status-warning" accessibilityLabel="Warning" color="darkGray" size={32} />,
  }}
/>;
        `}
      />
      <MainSection.Card
        cardSize="lg"
        type="don't"
        description={`
        Stack Upsells on a page. In the case that they must be stacked, [Callouts](/Callout) will appear above Upsells.
        `}
        defaultCode={`
<Box>
  <Box marginBottom={4} display="flex" alignItems="center">
    <Icon accessibilityLabel="" icon="pinterest" color="red" size={32} />
    <ButtonGroup>
      <Button color="transparent" iconEnd="arrow-down" text="Business" inline />
      <Button color="transparent" iconEnd="arrow-down" text="Create" inline />
      <Button color="transparent" iconEnd="arrow-down" text="Analytics" inline />
      <Button color="transparent" iconEnd="arrow-down" text="Ads" inline />
    </ButtonGroup>
  </Box>
  <Divider />
  <Box marginTop={8}>
    <Flex gap={2} direction="column">
      <Upsell
        imageData={{
          component: <Icon icon="send" accessibilityLabel="" color="darkGray" size={32} />,
        }}
        title="So close! Finish installing your Pinterest tag, get $10 in ads credit"
        message="Track ads conversion—sales, traffic and more—with the Pinterest tag"
        primaryAction={{ label: 'Claim now' }}
      />
      <Upsell
        title="Give $30, get $60 in ads credit"
        message="Earn $60 of ads credit, and give $30 of ads credit to a friend"
        primaryAction={{ href: 'https://pinterest.com', label: 'Send invite', target: 'blank' }}
        dismissButton={{
          accessibilityLabel: 'Dismiss banner',
          onDismiss: () => {},
        }}
        imageData={{
          component: <Icon icon="pinterest" accessibilityLabel="" color="darkGray" size={32} />,
        }}
      />
    </Flex>
  </Box>
</Box>;
        `}
      />
      <MainSection.Card
        cardSize="lg"
        type="don't"
        description={`
        Keep showing the same Upsell once it has been dismissed. Upsells should only appear a maximum of 2 times to the same user, as they have diminishing returns.
        `}
        defaultCode={`
<Flex gap={4} direction="column">
  <Upsell
    title="Measure ad performance"
    message="Install the Pinterest tag to track your website traffic, conversions and more."
    primaryAction={{ label: 'Install now' }}
    dismissButton={{
      accessibilityLabel: 'Dismiss banner',
      onDismiss: () => {},
    }}
    imageData={{
      component: <Icon icon="ads-stats" accessibilityLabel="" color="darkGray" size={32} />,
    }}
  />
  <Upsell
    title="Measure ad performance"
    message="Install the Pinterest tag to track your website traffic, conversions and more."
    primaryAction={{ label: 'Install now' }}
    dismissButton={{
      accessibilityLabel: 'Dismiss banner',
      onDismiss: () => {},
    }}
    imageData={{
      component: <Icon icon="ads-stats" accessibilityLabel="" color="darkGray" size={32} />,
    }}
  />
</Flex>;
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
      \`dismissButton\`, \`primaryAction\`, \`secondaryAction\`, and \`submitButtonAccessibilityLabel\` each require a short, descriptive label for screen readers, which should also be localized.

      In the case of [Buttons](/Button), alternative text should be provided to replace vague text like "Visit" or "Learn more" with more descriptive information, like "Learn more about work from home resources". Avoid using the word "button" in the label, as this becomes repetitive.

      For the \`dismissButton\` [IconButton](/IconButton), the label provided should indicate the intent, like “Dismiss this banner”.

      The [Image](/Image) or [Icon](/Icon) supplied to \`imageData\` should only supply an \`alt\` or \`accessibilityLabel\`, respectively, if the Image or Icon supplies extra context or information. Icons in Upsells are often purely decorative, and can therefore have an empty string as the \`accessibilityLabel\`.
      `}
    >
      <MainSection.Card
        cardSize="lg"
        defaultCode={`
<Upsell
  title="Give $30, get $60 in ads credit"
  message="Earn $60 of ads credit, and give $30 of ads credit to a friend"
  primaryAction={{
    href: 'https://pinterest.com',
    label: 'Send invite',
    accessibilityLabel: 'Invite friend to use ads',
    target: 'blank',
  }}
  dismissButton={{
    accessibilityLabel: 'Dismiss banner',
    onDismiss: () => {},
  }}
  imageData={{
    component: <Icon icon="pinterest" accessibilityLabel="" color="darkGray" size={32} />,
  }}
/>;
        `}
      />
    </MainSection.Subsection>
  </MainSection>,
);

card(
  <MainSection
    name="Localization"
    description={`Remember to localize all link or button labels, as well as \`title\` and \`message\`.`}
  >
    <MainSection.Subsection>
      <MainSection.Card
        cardSize="lg"
        defaultCode={`
<Upsell
  imageData={{
    component: <Icon icon="send" accessibilityLabel="" color="darkGray" size={32} />,
  }}
  title="Fast fertig! Beenden Sie die Installation Ihres Pinterest-Tags und erhalten Sie ein Guthaben von 10 Euro"
  message="Verfolgen Sie die Anzeigenkonvertierung - Umsatz, Traffic und mehr - mit dem Pinterest Tag"
  primaryAction={{
    label: 'Beanspruche jetzt',
    accessibilityLabel: 'Beanspruche Guthaben jetzt',
    target: 'blank',
  }}
/>;
        `}
      />
    </MainSection.Subsection>
  </MainSection>,
);

card(
  <MainSection name="Variants">
    <MainSection.Subsection
      title="Text-only"
      description="Used to convey a short message that requires no action, except dismiss."
    >
      <MainSection.Card
        cardSize="lg"
        defaultCode={`
<Upsell
  message="Single line Upsell with no title or call to action."
  dismissButton={{
    accessibilityLabel: 'Dismiss this banner',
    onDismiss: () => {},
  }}
/>;
`}
      />
    </MainSection.Subsection>
    <MainSection.Subsection
      title="Icon"
      description="The Icon is used to add additional meaning to the Upsell. The icon can reference a Pinterest product, feature or an action from our [Icon library](/Icon)."
    >
      <MainSection.Card
        cardSize="lg"
        defaultCode={`
<Upsell
  title="Give $30, get $60 in ads credit"
  message="Earn $60 of ads credit, and give $30 of ads credit to a friend"
  primaryAction={{
    href: 'https://pinterest.com',
    label: 'Send invite',
    accessibilityLabel: 'Invite friend to use ads',
    target: 'blank',
  }}
  dismissButton={{
    accessibilityLabel: 'Dismiss banner',
    onDismiss: () => {},
  }}
  imageData={{
    component: <Icon icon="pinterest" accessibilityLabel="" color="darkGray" size={32} />,
  }}
/>;
        `}
      />
    </MainSection.Subsection>
    <MainSection.Subsection
      title="Image"
      description="The [Image](/Image) in Upsell is used to add visual interest and draw the user’s attention. Images should relate to the message of the Upsell. Upsell images should use approved photography or be illustrations using our brand colors. Images will always be 128px wide."
    >
      <MainSection.Card
        cardSize="lg"
        defaultCode={`
<Upsell
  title="Stay healthy and safe"
  message="Check out our resources for adapting to these times."
  primaryAction={{
    href: 'https://pinterest.com',
    label: 'Visit',
    accessibilityLabel: 'Visit our Stay Safe resources',
    target: 'blank',
  }}
  dismissButton={{
    accessibilityLabel: 'Dismiss banner',
    onDismiss: () => {},
  }}
  imageData={{
    component: (
      <Image
        alt=""
        color="rgb(231, 186, 176)"
        naturalHeight={751}
        naturalWidth={564}
        src="https://i.ibb.co/7bQQYkX/stock2.jpg"
      />
    ),
    mask: { rounding: 4 },
    width: 128,
  }}
/>;
        `}
      />
    </MainSection.Subsection>
    <MainSection.Subsection
      title="Actions"
      description={`
      Upsells can have either one primary action, or a primary action and a secondary action. These actions can be buttons, when no \`href\` is supplied, or links, by specifying the \`href\`  property.

      For example, “Learn more” may link to a separate documentation site, while “Send invite” could be a button that opens a [Modal](/Modal) with an invite flow. Be sure to localize the labels of the actions.`}
    >
      <MainSection.Card
        cardSize="lg"
        defaultCode={`
function Example(props) {
  const [showModal, setShowModal] = React.useState(false);

  return (
    <Box marginStart={-1} marginEnd={-1}>
      <Upsell
        title="Give $30, get $60 in ads credit"
        message="Earn $60 of ads credit, and give $30 of ads credit to a friend"
        primaryAction={{
          label: 'Send invite',
          onClick: () => {
            setShowModal(!showModal);
          },
        }}
        secondaryAction={{
          href: 'https://help.pinterest.com/en/business/article/verified-merchant-program',
          label: 'Learn more',
          target: 'blank',
          accessibilityLabel: 'Learn more: Verified Merchant Program',
        }}
        dismissButton={{
          accessibilityLabel: 'Dismiss banner',
          onDismiss: () => {},
        }}
      />
      {showModal && (
        <Layer>
          <Modal
            accessibilityModalLabel="Invite a friend to the Verified Merchant Program"
            heading="Verified Merchant Program Invitation"
            subHeading="When your friend spends their first $30 on ads, you’ll earn $60 of ads credit, and they’ll get $30 of ads credit, too."
            onDismiss={() => {
              setShowModal(!showModal);
            }}
            footer={
              <Flex flex="grow" justifyContent="end">
                <ButtonGroup>
                  <Button
                    text="Cancel"
                    inline
                    onClick={() => {
                      setShowModal(!showModal);
                    }}
                    size="lg"
                  />
                  <Button color="red" inline text="Send invite" size="lg" />
                </ButtonGroup>
              </Flex>
            }
            size="md"
          >
            <Box display="flex" direction="row" position="relative">
              <Column span={12}>
                <Box paddingY={2} paddingX={8} display="flex">
                  <Column span={4}>
                    <Label htmlFor="name">
                      <Text align="left" weight="bold">
                        Friend's Name
                      </Text>
                    </Label>
                  </Column>
                  <Column span={8}>
                    <TextField id="name" onChange={() => undefined} />
                  </Column>
                </Box>
                <Box paddingY={2} paddingX={8} display="flex">
                  <Column span={4}>
                    <Label htmlFor="email">
                      <Text align="left" weight="bold">
                        Friend's E-mail
                      </Text>
                    </Label>
                  </Column>
                  <Column span={8}>
                    <TextField id="email" onChange={() => undefined} />
                  </Column>
                </Box>
                <Box paddingY={2} paddingX={8} display="flex">
                  <Column span={4}>
                    <Label htmlFor="desc">
                      <Text align="left" weight="bold">
                        Personal Message
                      </Text>
                    </Label>
                  </Column>
                  <Column span={8}>
                    <TextArea id="desc" onChange={() => undefined} />
                  </Column>
                </Box>
              </Column>
            </Box>
          </Modal>
        </Layer>
      )}
    </Box>
  );
}
        `}
      />
    </MainSection.Subsection>
    <MainSection.Subsection
      title="Forms"
      description={`Inputs can be added to Upsells to collect information from users (ex: name or email) through the use of \`Upsell.Form\`. Most Upsells should have no more than 2 inputs. If more inputs are needed, direct users to a full page using the \`primaryAction\`.`}
    >
      <MainSection.Card
        cardSize="lg"
        title="Single TextField"
        defaultCode={`
function FormExample(props) {
  const [value, setValue] = React.useState('');
  return (
    <Upsell
      title="Give $30, get $60 in ads credit"
      message="Earn $60 of ads credit, and give $30 of ads credit to a friend"
      dismissButton={{
        accessibilityLabel: 'Dismiss banner',
        onDismiss: ()=>{},
      }}
      imageData={{
        component: <Icon icon="pinterest" accessibilityLabel="Pin" color="darkGray" size={32}/>
      }}
    >
      <Upsell.Form
        onSubmit={(event) => {event.preventDefault();}}
        submitButtonText="Submit"
        submitButtonAccessibilityLabel="Submit name for ads credit"
      >
        <TextField
          id="nameField"
          onChange={({ value }) => setValue(value)}
          placeholder="Name"
          value={value}
        />
      </Upsell.Form>
    </Upsell>
  );
}
      `}
      />
      <MainSection.Card
        cardSize="lg"
        title="Multiple TextFields"
        defaultCode={`
function Example(props) {
  const [nameValue, setNameValue] = React.useState('');
  const [emailValue, setEmailValue] = React.useState('');
  return (
    <Upsell
      title="Interested in a free ads consultation?"
      message="Learn how to grow your business with a Pinterest ads expert today!"
      dismissButton={{
        accessibilityLabel: 'Dismiss banner',
        onDismiss: ()=>{},
      }}
      imageData={{
        component:
          <Image
            alt="Succulent plant against pink background"
            color="rgb(231, 186, 176)"
            naturalHeight={751}
            naturalWidth={564}
            src="https://i.ibb.co/7bQQYkX/stock2.jpg"
          />,
          mask: {rounding: 4},
        width: 128,
      }}
    >
      <Upsell.Form
        onSubmit={(event) => {event.preventDefault();}}
        submitButtonText="Contact me"
        submitButtonAccessibilityLabel="Submit info for contact"
      >
        <Box display="block" smDisplay="flex">
          <Box
            flex="grow"
            smMarginEnd={1}
            marginEnd={0}
            smMarginBottom={0}
            marginBottom={2}
          >
            <TextField
              id="name"
              onChange={({ value }) => setNameValue(value)}
              placeholder="Name"
              value={nameValue}
            />
          </Box>
          <Box flex="grow" smMarginStart={1} marginStart={0}>
            <TextField
              id="email"
              onChange={({ value }) => setEmailValue(value)}
              placeholder="Email"
              type="email"
              value={emailValue}
            />
          </Box>
        </Box>
      </Upsell.Form>
    </Upsell>
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
      **[Callout](/Callout)**
      Use Callout when communicating critical information, such as an error or warning. Callout can also be used to present the user with general information and further actions they can take, like the successful creation of a business account.

      **[Toast](/Toast)**
      Toast provides feedback on a user interaction, like a confirmation that appears when a Pin has been saved. Unlike Upsell and Callout, Toasts don’t contain actions. They’re also less persistent, and disappear after a certain duration.

      **[ActivationCard](/ActivationCard)**
      ActivationCards are used in groups to communicate a user’s stage in a series of steps toward an overall action.

    `}
    />
  </MainSection>,
);

export default cards;
