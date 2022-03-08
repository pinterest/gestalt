// @flow strict
import { type Node } from 'react';
import GeneratedPropTable from '../components/GeneratedPropTable.js';
import MainSection from '../components/MainSection.js';
import Page from '../components/Page.js';
import PageHeader from '../components/PageHeader.js';
import { multipledocgen, type DocGen } from '../components/docgen.js';

export default function DocsPage({
  generatedDocGen,
}: {|
  generatedDocGen: {| [string]: DocGen |},
|}): Node {
  return (
    <Page title="Upsell">
      <PageHeader
        name={generatedDocGen?.Upsell?.displayName}
        description={generatedDocGen?.Upsell?.description}
        defaultCode={`
      <Upsell
        dismissButton={{
          accessibilityLabel: 'Dismiss banner',
          onDismiss: () => {},
        }}
        imageData={{
          component: <Icon icon="pinterest" accessibilityLabel="" color="darkGray" size={32} />,
        }}
        message="Earn $60 of ads credit, and give $30 of ads credit to a friend"
        primaryAction={{
          accessibilityLabel: "Send ads invite",
          href: 'https://pinterest.com',
          label: 'Send invite',
          target: 'blank',
        }}
        title="Give $30, get $60 in ads credit"
      />;
    `}
      />

      <GeneratedPropTable generatedDocGen={generatedDocGen?.Upsell} />

      <MainSection name="Subcomponents">
        <MainSection.Subsection
          title={generatedDocGen?.UpsellForm?.displayName}
          description={generatedDocGen?.UpsellForm?.description}
        >
          <GeneratedPropTable
            generatedDocGen={generatedDocGen?.UpsellForm}
            id={generatedDocGen?.UpsellForm?.displayName}
            name={generatedDocGen?.UpsellForm?.displayName}
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            title="When to use"
            description={`
          - Displaying promotional information to a user that is not tied to a task or state on the surface.
          - Sharing updates or changes to the features and offerings of the product.
        `}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            title="When not to use"
            description={`
          - Anything related to state or status within the surface. Consider a [Callout](/callout) instead.
          - Promoting or highlighting specific elements / areas within a surface. [Let the team know](https://app.slack.com/client/T024LJUGB/C0HUV5J93) if this is needed.
        `}
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Best practices">
        <MainSection.Subsection>
          <MainSection.Card
            cardSize="lg"
            type="do"
            description="Use Upsells for marketing new products or encouraging upgrades."
            defaultCode={`
<Upsell
  dismissButton={{
    accessibilityLabel: 'Dismiss banner',
    onDismiss: () => {},
  }}
  imageData={{
    component: <Icon accessibilityLabel="" color="darkGray" icon="pinterest" size={32} />,
  }}
  message="Earn $60 of ads credit, and give $30 of ads credit to a friend"
  primaryAction={{
    accessibilityLabel: "Send ads invite",
    href: 'https://pinterest.com',
    label: 'Send invite',
    target: 'blank',
  }}
  title="Give $30, get $60 in ads credit"
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
  <Box alignItems="center" display="flex" marginBottom={4}>
    <Icon accessibilityLabel="" color="red" icon="pinterest" size={32} />
    <ButtonGroup>
      <Button color="transparent" iconEnd="arrow-down" text="Business" />
      <Button color="transparent" iconEnd="arrow-down" text="Create" />
      <Button color="transparent" iconEnd="arrow-down" text="Analytics" />
      <Button color="transparent" iconEnd="arrow-down" text="Ads" />
    </ButtonGroup>
  </Box>

  <Divider />

  <Box marginTop={8}>
    <Upsell
      dismissButton={{
        accessibilityLabel: 'Dismiss banner',
        onDismiss: () => {},
      }}
      imageData={{
        component: <Icon icon="pinterest" accessibilityLabel="" color="darkGray" size={32} />,
      }}
      message="Earn $60 of ads credit, and give $30 of ads credit to a friend"
      primaryAction={{
        accessibilityLabel: "Send ads invite",
        href: 'https://pinterest.com',
        label: 'Send invite',
        target: 'blank',
      }}
      title="Give $30, get $60 in ads credit"
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
    dismissButton={{
      accessibilityLabel: 'Dismiss banner',
      onDismiss: () => {},
    }}
    imageData={{
      component: <Icon icon="ads-stats" accessibilityLabel="" color="darkGray" size={32} />,
    }}
    message="Install the Pinterest tag to track your website traffic, conversions and more."
    primaryAction={{ label: 'Install now', accessibilityLabel: 'Install Pinterest tag now' }}
    title="Measure ad performance"
  />

  <Text>Follow-up Upsell:</Text>
  <Upsell
    imageData={{
      component: <Icon icon="send" accessibilityLabel="" color="darkGray" size={32} />,
    }}
    message="Track ads conversion—sales, traffic and more—with the Pinterest tag"
    primaryAction={{ label: 'Claim now', accessibilityLabel: "Claim ads credit" }}
    title="So close! Finish installing your Pinterest tag, get $10 in ads credit"
  />
</Flex>;
        `}
          />

          <MainSection.Card
            cardSize="lg"
            type="don't"
            description={`
          Use Upsells for critical information, such as errors or warnings. Use [Callout](/callout) instead. Upsells should not be used for general information either.
        `}
            defaultCode={`
<Upsell
  dismissButton={{
    accessibilityLabel: 'Dismiss banner',
    onDismiss: () => {},
  }}
  imageData={{
    component: <Icon icon="workflow-status-warning" accessibilityLabel="Warning" color="darkGray" size={32} />,
  }}
  message="There was a problem connecting your account."
  primaryAction={{ label: 'Try again', accessibilityLabel: 'Try linking account again' }}
  title="Could not link account"
/>;
        `}
          />

          <MainSection.Card
            cardSize="lg"
            type="don't"
            description={`
        Stack Upsells on a page. In the case that they must be stacked, [Callouts](/callout) will appear above Upsells.
        `}
            defaultCode={`
<Box>
  <Box alignItems="center" display="flex" marginBottom={4}>
    <Icon accessibilityLabel="" color="red" icon="pinterest" size={32} />
    <ButtonGroup>
      <Button color="transparent" iconEnd="arrow-down" text="Business" />
      <Button color="transparent" iconEnd="arrow-down" text="Create" />
      <Button color="transparent" iconEnd="arrow-down" text="Analytics" />
      <Button color="transparent" iconEnd="arrow-down" text="Ads" />
    </ButtonGroup>
  </Box>

  <Divider />

  <Box marginTop={8}>
    <Flex direction="column" gap={2}>
      <Upsell
        imageData={{
          component: <Icon icon="send" accessibilityLabel="" color="darkGray" size={32} />,
        }}
        message="Track ads conversion—sales, traffic and more—with the Pinterest tag"
        primaryAction={{ label: 'Claim now', accessibilityLabel: 'Claim ads credit now' }}
        title="So close! Finish installing your Pinterest tag, get $10 in ads credit"
      />
      <Upsell
        dismissButton={{
          accessibilityLabel: 'Dismiss banner',
          onDismiss: () => {},
        }}
        imageData={{
          component: <Icon icon="pinterest" accessibilityLabel="" color="darkGray" size={32} />,
        }}
        message="Earn $60 of ads credit, and give $30 of ads credit to a friend"
        primaryAction={{
          accessibilityLabel: 'Send ads invite',
          href: 'https://pinterest.com',
          label: 'Send invite',
          target: 'blank',
        }}
        title="Give $30, get $60 in ads credit"
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
<Flex direction="column" gap={4}>
  <Upsell
    dismissButton={{
      accessibilityLabel: 'Dismiss banner',
      onDismiss: () => {},
    }}
    imageData={{
      component: <Icon icon="ads-stats" accessibilityLabel="" color="darkGray" size={32} />,
    }}
    message="Install the Pinterest tag to track your website traffic, conversions and more."
    primaryAction={{ label: 'Install now', accessibilityLabel: 'Install Pinterest tag' }}
    title="Measure ad performance"
  />
  <Upsell
    dismissButton={{
      accessibilityLabel: 'Dismiss banner',
      onDismiss: () => {},
    }}
    imageData={{
      component: <Icon icon="ads-stats" accessibilityLabel="" color="darkGray" size={32} />,
    }}
    message="Install the Pinterest tag to track your website traffic, conversions and more."
    primaryAction={{ label: 'Install now', accessibilityLabel: 'Install Pinterest tag' }}
    title="Measure ad performance"
  />
</Flex>;
        `}
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Accessibility">
        <MainSection.Subsection
          title="Labels"
          description={`
      \`dismissButton\`, \`primaryAction\`, \`secondaryAction\`, and \`submitButtonAccessibilityLabel\` each require a short, descriptive label for screen readers, which should also be localized.

      In the case of action [Buttons](/button) or [Links](/link), alternative text should be provided through the \`accessibilityLabel\` prop to replace vague text like "Visit" or "Learn more" with more descriptive information, like "Learn more about work from home resources". Avoid using the words "button" or "link" in the label, as this becomes repetitive. If the action text is already descriptive, an empty string can be passed.

      For the \`dismissButton\` [IconButton](/iconbutton), the label provided should indicate the intent, like “Dismiss this banner”.

      The [Image](/image) or [Icon](/icon) supplied to \`imageData\` should only supply an \`alt\` or \`accessibilityLabel\`, respectively, if the Image or Icon supplies extra context or information. Icons in Upsells are often purely decorative, and can therefore have an empty string as the \`accessibilityLabel\`.
      `}
        >
          <MainSection.Card
            cardSize="lg"
            defaultCode={`
<Upsell
  dismissButton={{
    accessibilityLabel: 'Dismiss banner',
    onDismiss: () => {},
  }}
  imageData={{
    component: <Icon icon="pinterest" accessibilityLabel="" color="darkGray" size={32} />,
  }}
  message="Earn $60 of ads credit, and give $30 of ads credit to a friend"
  primaryAction={{
    href: 'https://pinterest.com',
    label: 'Send invite',
    accessibilityLabel: 'Invite friend to use ads',
    target: 'blank',
  }}
  title="Give $30, get $60 in ads credit"
/>;
        `}
          />
        </MainSection.Subsection>
      </MainSection>

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
  message="Verfolgen Sie die Anzeigenkonvertierung - Umsatz, Traffic und mehr - mit dem Pinterest Tag"
  primaryAction={{
    label: 'Beanspruche jetzt',
    accessibilityLabel: 'Beanspruche Guthaben jetzt',
    target: 'blank',
  }}
  title="Fast fertig! Beenden Sie die Installation Ihres Pinterest-Tags und erhalten Sie ein Guthaben von 10 Euro"
/>;
        `}
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Variants">
        <MainSection.Subsection
          title="Text-only"
          description="Used to convey a short message that requires no action, except dismiss."
        >
          <MainSection.Card
            cardSize="lg"
            defaultCode={`
<Upsell
  dismissButton={{
    accessibilityLabel: 'Dismiss this banner',
    onDismiss: () => {},
  }}
  message="Single line Upsell with no title or call to action."
/>;
`}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Icon"
          description="The Icon is used to add additional meaning to the Upsell. The icon can reference a Pinterest product, feature or an action from our [Icon library](/icon)."
        >
          <MainSection.Card
            cardSize="lg"
            defaultCode={`
<Upsell
  dismissButton={{
    accessibilityLabel: 'Dismiss banner',
    onDismiss: () => {},
  }}
  imageData={{
    component: <Icon icon="pinterest" accessibilityLabel="" color="darkGray" size={32} />,
  }}
  message="Earn $60 of ads credit, and give $30 of ads credit to a friend"
  primaryAction={{
    href: 'https://pinterest.com',
    label: 'Send invite',
    accessibilityLabel: 'Invite friend to use ads',
    target: 'blank',
  }}
  title="Give $30, get $60 in ads credit"
/>;
        `}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Image"
          description="The [Image](/image) in Upsell is used to add visual interest and draw the user’s attention. Images should relate to the message of the Upsell. Upsell images should use approved photography or be illustrations using our brand colors. Images will always be 128px wide."
        >
          <MainSection.Card
            cardSize="lg"
            defaultCode={`
<Upsell
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
  message="Check out our resources for adapting to these times."
  primaryAction={{
    href: 'https://pinterest.com',
    label: 'Visit',
    accessibilityLabel: 'Visit our Stay Safe resources',
    target: 'blank',
  }}
  title="Stay healthy and safe"
/>;
        `}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Actions"
          description={`
      Upsells can have either one primary action, or a primary action and a secondary action. These actions can be buttons, when no \`href\` is supplied, or links, by specifying the \`href\`  property.

      Upsell actions with link interaction can be paired with OnLinkNavigationProvider. See [OnLinkNavigationProvider](/onlinknavigationprovider) to learn more about link navigation.

      For example, “Learn more” may link to a separate documentation site, while “Send invite” could be a button that opens a [Modal](/modal) with an invite flow. Be sure to localize the labels of the actions.

      If needed, actions can become disabled after clicking by setting \`disabled: true\` in the action data.
      `}
        >
          <MainSection.Card
            cardSize="lg"
            defaultCode={`
function Example(props) {
  const [showModal, setShowModal] = React.useState(false);

  return (
    <Box marginStart={-1} marginEnd={-1}>
      <Upsell
        dismissButton={{
          accessibilityLabel: 'Dismiss banner',
          onDismiss: () => {},
        }}
        message="Earn $60 of ads credit, and give $30 of ads credit to a friend"
        primaryAction={{
          accessibilityLabel: 'Send ads invite',
          label: 'Send invite',
          onClick: () => {
            setShowModal(!showModal);
          },
        }}
        secondaryAction={{
          accessibilityLabel: 'Learn more: Verified Merchant Program',
          href: 'https://help.pinterest.com/en/business/article/verified-merchant-program',
          label: 'Learn more',
          target: 'blank',
        }}
        title="Give $30, get $60 in ads credit"
      />

      {showModal && (
        <Layer>
          <Modal
            accessibilityModalLabel="Invite a friend to the Verified Merchant Program"
            footer={
              <Flex flex="grow" justifyContent="end">
                <ButtonGroup>
                  <Button
                    onClick={() => {
                      setShowModal(!showModal);
                    }}
                    size="lg"
                    text="Cancel"
                  />
                  <Button color="red" size="lg" text="Send invite" />
                </ButtonGroup>
              </Flex>
            }
            heading="Verified Merchant Program Invitation"
            onDismiss={() => {
              setShowModal(!showModal);
            }}
            size="md"
            subHeading="When your friend spends their first $30 on ads, you’ll earn $60 of ads credit, and they’ll get $30 of ads credit, too."
          >
            <Flex direction="row">
              <Column span={12}>
                <Box display="flex" paddingY={2} paddingX={8}>
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

                <Box display="flex" paddingY={2} paddingX={8}>
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

                <Box display="flex" paddingY={2} paddingX={8}>
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
            </Flex>
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
  const handleSubmit = ({ event }) => {
    event.preventDefault();
    // your submit logic using state values
  };

  return (
    <Upsell
      dismissButton={{
        accessibilityLabel: 'Dismiss banner',
        onDismiss: ()=>{},
      }}
      imageData={{
        component: <Icon icon="pinterest" accessibilityLabel="Pin" color="darkGray" size={32}/>
      }}
      message="Earn $60 of ads credit, and give $30 of ads credit to a friend"
      title="Give $30, get $60 in ads credit"
    >
      <Upsell.Form
        onSubmit={handleSubmit}
        submitButtonAccessibilityLabel="Submit name for ads credit"
        submitButtonText="Submit"
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
  const handleSubmit = ({ event }) => {
    event.preventDefault();
    // your submit logic using state values
  };

  return (
    <Upsell
      dismissButton={{
        accessibilityLabel: 'Dismiss banner',
        onDismiss: () => {},
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
      message="Learn how to grow your business with a Pinterest ads expert today!"
      title="Interested in a free ads consultation?"
    >
      <Upsell.Form
        onSubmit={handleSubmit}
        submitButtonAccessibilityLabel="Submit info for contact"
        submitButtonText="Contact me"
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
      </MainSection>

      <MainSection name="Related">
        <MainSection.Subsection
          description={`
      **[Callout](/callout)**
      Use Callout when communicating critical information, such as an error or warning. Callout can also be used to present the user with general information and further actions they can take, like the successful creation of a business account.

      **[Toast](/toast)**
      Toast provides feedback on a user interaction, like a confirmation that appears when a Pin has been saved. Unlike Upsell and Callout, Toasts don’t contain actions. They’re also less persistent, and disappear after a certain duration.

      **[OnLinkNavigationProvider](/onlinknavigationprovider)**
      OnLinkNavigationProvider allows external link navigation control across all children components with link behavior.

      **[ActivationCard](/activationcard)**
      ActivationCards are used in groups to communicate a user’s stage in a series of steps toward an overall action.

    `}
        />
      </MainSection>
    </Page>
  );
}

export async function getServerSideProps(): Promise<{|
  props: {| generatedDocGen: {| [string]: DocGen |} |},
|}> {
  const generatedDocGen = await multipledocgen({ componentName: ['Upsell', 'UpsellForm'] });

  return {
    props: { generatedDocGen },
  };
}
