// @flow strict
import { type Node } from 'react';
import Page from '../../../docs-components/Page.js';
import PageHeader from '../../../docs-components/PageHeader.js';
import MainSection from '../../../docs-components/MainSection.js';
import GeneratedPropTable from '../../../docs-components/GeneratedPropTable.js';
import docgen, { type DocGen } from '../../../docs-components/docgen.js';
import QualityChecklist from '../../../docs-components/QualityChecklist.js';

import AccessibilitySection from '../../../docs-components/AccessibilitySection.js';

export default function DocsPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title="Callout">
      <PageHeader
        name="Callout"
        description={generatedDocGen?.description}
        defaultCode={`
<Callout
  dismissButton={{
    accessibilityLabel: 'Dismiss this banner',
    onDismiss: () => {},
  }}
  iconAccessibilityLabel="Info"
  message="Apply to the Verified Merchant Program"
  primaryAction={{
    accessibilityLabel: "Get started: Verified Merchant Program",
    href: "https://pinterest.com",
    label: "Get started",
    target: "blank",
  }}
  secondaryAction={{
    accessibilityLabel: "Learn more: Verified Merchant Program",
    href: "https://pinterest.com",
    label: "Learn more",
    target: "blank",
  }}
  title="Your business account was created!"
  type="info"
/>
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
          - When displaying high priority, surface-level information to the user.
          - When providing persistent, non-blocking feedback.
          - When communicating updates to the state or status of the surface.
        `}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            title="When not to use"
            description={`
          - When providing messaging/guidance for specific elements or areas within a surface. [Let the team know](https://app.slack.com/client/T024LJUGB/C0HUV5J93) if this is needed.
          - When displaying information that is intended for promotional/marketing purposes. Use [Upsell](/components/web/upsell) instead.
          - When interacting with the Callout is required for the user to proceed with a task or flow. Use [Modal](/components/web/modal) instead.
        `}
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Best practices">
        <MainSection.Subsection>
          <MainSection.Card
            cardSize="lg"
            type="do"
            description="Use Callout for messages coming from the product or user interaction. Can be used in both Business and Pinner products."
            defaultCode={`
          <Callout
            iconAccessibilityLabel="Error"
            message="Your tag has errors, so information may be outdated. Fix your tag for the most accurate metrics."
            primaryAction={{
              accessibilityLabel: 'Fix Pinterest Tag',
              href: "https://pinterest.com",
              label: "Fix tag",
              target: "blank",
            }}
            title="Pinterest tag needs attention"
            type="error"
          />
        `}
          />
          <MainSection.Card
            cardSize="lg"
            type="do"
            description={`
        Place Callout at the top of the page, under the primary navigation or page header when possible.
        `}
            defaultCode={`
          <Flex direction="column" gap={4}>
            <Flex alignItems="center" justifyContent="start">
              <Icon accessibilityLabel="" icon="pinterest" color="error" size={32}/>
              <ButtonGroup>
                <Button color="transparent" iconEnd="arrow-down" text="Business" />
                <Button color="transparent" iconEnd="arrow-down" text="Create" />
                <Button color="transparent" iconEnd="arrow-down" text="Analytics" />
                <Button color="transparent" iconEnd="arrow-down" text="Ads" />
              </ButtonGroup>
            </Flex>

            <Divider/>

            <Box marginTop={4}>
              <Callout
                dismissButton={{
                  accessibilityLabel: 'Dismiss this banner',
                  onDismiss: () => {},
                }}
                iconAccessibilityLabel="Info"
                message="It may take up to 10 minutes to automatically detect a newly installed tag. If you'd like to manually verify your tag, please click the Verify Tag button."
                primaryAction={{
                  accessibilityLabel: "Manually verify tag",
                  label: "Verify Tag",
                }}
                title="We have not yet detected your tag"
                type="info"
              />
            </Box>
          </Flex>
        `}
          />
          <MainSection.Card
            cardSize="lg"
            type="don't"
            description={`
        Use Callouts for marketing new products or features. Use [Upsell](/components/web/upsell) instead.
        `}
            defaultCode={`
          <Callout
            dismissButton={{
              accessibilityLabel: 'Dismiss this banner',
              onDismiss: () => {},
            }}
            iconAccessibilityLabel="Info"
            message="Earn $60 of ads credit, and send $30 of ads credit to a friend"
            primaryAction={{
              accessibilityLabel: "Send ads invite",
              label: "Send invite",
            }}
            title="Give $30, get $60 in ads credit"
            type="info"
          />
        `}
          />
          <MainSection.Card
            cardSize="lg"
            type="don't"
            description={`
        Stack Callouts. In the case that banners must be stacked, Callouts should come before Upsells.
        `}
            defaultCode={`
        <Flex direction="column" gap={4}>
          <Flex alignItems="center" justifyContent="start">
            <Icon accessibilityLabel="" icon="pinterest" color="error" size={32}/>
            <ButtonGroup>
              <Button color="transparent" iconEnd="arrow-down" text="Business" />
              <Button color="transparent" iconEnd="arrow-down" text="Create" />
              <Button color="transparent" iconEnd="arrow-down" text="Analytics" />
              <Button color="transparent" iconEnd="arrow-down" text="Ads" />
            </ButtonGroup>
          </Flex>

          <Divider/>

          <Box marginTop={4}>
            <Flex gap={2} direction="column">
              <Upsell
                imageData={{
                  component: <Icon icon="send" accessibilityLabel="Send" color="default" size={32}/>
                }}
                message="Track ads conversion—sales, traffic and more—with the Pinterest tag"
                primaryAction={{
                  accessibilityLabel: "Claim ads credit now",
                  label: "Claim now",
                }}
                title="So close! Finish installing your Pinterest tag, get $10 in ads credit"
              />
              <Callout
                dismissButton={{
                  accessibilityLabel: 'Dismiss this banner',
                  onDismiss: () => {},
                }}
                iconAccessibilityLabel="Info"
                message="It may take up to 10 minutes to automatically detect a newly installed tag. If you'd like to manually verify your tag, please click the Verify Tag button."
                primaryAction={{
                  accessibilityLabel: "Manually verify tag",
                  label: "Verify Tag",
                }}
                title="We have not yet detected your tag"
                type="info"
              />
            </Flex>
          </Box>
        </Flex>
        `}
          />
        </MainSection.Subsection>
      </MainSection>

      <AccessibilitySection name={generatedDocGen?.displayName}>
        <MainSection.Subsection
          title="Labels"
          description={`
      \`iconAccessibilityLabel\`, \`dismissButton\`, \`primaryAction\` and \`secondaryAction\` each require a short, descriptive label for screen readers. These labels should communicate the intent of the icon, such as “Error”, “Info” or “Warning”. They should also be localized.

      When using \`primaryAction\` or \`secondaryAction\`, alternative text should be provided through the \`accessibilityLabel\` prop to replace vague text like "Visit" or "Learn more" with more descriptive information, like "Learn more about work from home resources". Avoid using the words "button" or "link" in the label, as this becomes repetitive. If the action text is already descriptive, an empty string can be passed.

      For the \`dismissButton\`, the label provided should indicate the intent, like “Dismiss this banner”.
      `}
        >
          <MainSection.Card
            cardSize="lg"
            defaultCode={`
<Callout
  dismissButton={{
    accessibilityLabel: 'Dismiss this banner',
    onDismiss: () => {},
  }}
  iconAccessibilityLabel="Info"
  message="Apply to the Verified Merchant Program"
  primaryAction={{
    accessibilityLabel: "Get started: Verified Merchant Program",
    href: "https://pinterest.com",
    label: "Get started",
    target: "blank",
  }}
  secondaryAction={{
    accessibilityLabel: "Learn more: Verified Merchant Program",
    href: "https://pinterest.com",
    label: "Learn more",
    target: "blank",
  }}
  title="Your business account was created!"
  type="info"
/>
        `}
          />
        </MainSection.Subsection>
      </AccessibilitySection>

      <MainSection
        name="Localization"
        description={`Remember to localize all link or button labels, as well as \`title\` and \`message\`.`}
      >
        <MainSection.Subsection>
          <MainSection.Card
            cardSize="lg"
            defaultCode={`
<Callout
  dismissButton={{
    accessibilityLabel: 'Dismiss this banner',
    onDismiss: () => {},
  }}
  iconAccessibilityLabel="Info"
  message="Bewerben Sie sich beim Verified Merchant Program"
  primaryAction={{
    accessibilityLabel: "Loslegen: Verified Merchant Program",
    href: "https://pinterest.com",
    label: "Loslegen",
    target: "blank",
  }}
  secondaryAction={{
    accessibilityLabel: "Erfahren Sie mehr: Verified Merchant Program",
    href: "https://pinterest.com",
    label: "Erfahren Sie mehr",
    target: "blank",
  }}
  title="Ihr Geschäftskonto wurde erstellt!"
  type="info"
/>
        `}
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Variants">
        <MainSection.Subsection
          title="Info"
          description="Info Callouts communicate helpful messages to users about the product. In most cases, they should provide an action for users to take."
        >
          <MainSection.Card
            cardSize="lg"
            defaultCode={`
<Callout
  dismissButton={{
    accessibilityLabel: 'Dismiss this banner',
    onDismiss: () => {},
  }}
  iconAccessibilityLabel="Info"
  message="Apply to the Verified Merchant Program"
  primaryAction={{
    accessibilityLabel: "Get started: Verified Merchant Program",
    href: "https://pinterest.com",
    label: "Get started",
    target: "blank",
  }}
  secondaryAction={{
    accessibilityLabel: "Learn more: Verified Merchant Program",
    href: "https://pinterest.com",
    label: "Learn more",
    target: "blank",
  }}
  title="Your business account was created!"
  type="info"
/>
`}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Warning"
          description="Warning Callouts communicate cautionary messages to users. Action shouldn't be required. The Callout should provide clear guidance on how to correct an issue and/or learn more about it."
        >
          <MainSection.Card
            cardSize="lg"
            defaultCode={`
<Callout
  dismissButton={{
    accessibilityLabel: 'Dismiss warning',
    onDismiss: () => {},
  }}
  iconAccessibilityLabel="Warning"
  message="We have noticed that you have audiences in your advertiser account that have been used in an ad campaign. Pinterest will be deleting any unused audiences on May 30, 2020."
  primaryAction={{
    accessibilityLabel: "View unused audiences",
    href: "https://pinterest.com",
    label: "View audiences",
    target: "blank",
  }}
  title="Unused audiences are going away"
  type="warning"
/>
`}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Error"
          description="Error Callouts inform users of problems that require immediate action to correct. Further actions on the page might be blocked if users don't correct the problems. The Callout should also provide clear guidance on how to correct the issue and/or learn more about it."
        >
          <MainSection.Card
            cardSize="lg"
            defaultCode={`
<Callout
  iconAccessibilityLabel="Error"
  message="Your tag has errors, so information may be outdated. Fix your tag for the most accurate metrics."
  primaryAction={{
    accessibilityLabel: "Fix Pinterest tag",
    href: "https://pinterest.com",
    label: "Fix tag",
    target: "blank",
  }}
  title="Pinterest tag needs attention"
  type="error"
/>
`}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Actions"
          description={`
        Callouts can have either one primary action, or a primary action and a secondary action. These actions can be [Links](/components/web/link), by specifying the \`href\` property, or [Buttons](/components/web/buttons/button), when no \`href\` is supplied.

        Callout actions with link interaction can be paired with OnLinkNavigationProvider. See [OnLinkNavigationProvider](/components/web/utilities/onlinknavigationprovider) to learn more about link navigation.

        For example, “Learn more” may link to a separate documentation site, while “Apply now” could be a Button that opens a [Modal](/components/web/modal) with an application flow. Be sure to localize the labels of the actions.

        If needed, actions can become disabled after clicking by setting \`disabled: true\` in the action data.

        `}
        >
          <MainSection.Card
            cardSize="lg"
            defaultCode={`
function Example(props) {
  const [showModal, setShowModal] = React.useState(false);
  const toggleModal = () => {
    setShowModal((currState) => !currState);
  };

  return (
    <Box marginStart={-1} marginEnd={-1}>
      <Callout
        dismissButton={{
          accessibilityLabel: 'Dismiss banner',
          onDismiss: () => {},
        }}
        iconAccessibilityLabel="Info"
        message="Apply to the Verified Merchant Program"
        primaryAction={{
          accessibilityLabel: "Apply now: verified merchant program",
          label: "Apply now",
          onClick: toggleModal,
        }}
        secondaryAction={{
          accessibilityLabel: "Learn more: Verified Merchant Program",
          href: "https://help.pinterest.com/en/business/article/verified-merchant-program",
          label: "Learn more",
          target: "blank",
        }}
        title="Your business account was created!"
        type="info"
      />

      {showModal && (
        <Layer>
          <Modal
            accessibilityModalLabel="Apply for the Verified Merchant Program"
            footer={
              <Flex flex="grow" justifyContent="end">
                  <ButtonGroup>
                    <Button
                      onClick={toggleModal}
                      size="lg"
                      text="Cancel"
                    />
                    <Button
                      color="red"
                      onClick={toggleModal}
                      size="lg"
                      text="Save"
                    />
                  </ButtonGroup>
              </Flex>
            }
            heading="Verified Merchant Program Application"
            onDismiss={toggleModal}
            size="md"
          >
            <Flex>
              <Column span={12}>
                <Box paddingY={2} paddingX={8} display="flex">
                  <Column span={4}>
                    <Label htmlFor="name">
                      <Text align="start" weight="bold">
                        Name
                      </Text>
                    </Label>
                  </Column>
                  <Column span={8}>
                    <TextField id="name" onChange={() => {}} />
                  </Column>
                </Box>

                <Box paddingY={2} paddingX={8} display="flex">
                  <Column span={4}>
                    <Label htmlFor="desc">
                      <Text align="start" weight="bold">
                        Business Description
                      </Text>
                    </Label>
                  </Column>
                  <Column span={8}>
                    <TextArea id="desc" onChange={() => {}} />
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
          title="Dismissible"
          description={`
        \`dismissButton\` can be used when Callout doesn't indicate a persistent state. This will most commonly be used in \`type="info"\` Callouts.

        Don't use dismiss buttons in the following cases:
        - There is a persistent account or page status that the user must address.
        - The user must access Callout's information again in order to perform a task.
        `}
        >
          <MainSection.Card
            cardSize="lg"
            defaultCode={`
<Callout
  dismissButton={{
    accessibilityLabel: 'Dismiss this banner',
    onDismiss: () => {},
  }}
  iconAccessibilityLabel="Info"
  message="Apply to the Verified Merchant Program"
  primaryAction={{
    accessibilityLabel: "Get started: Verified Merchant Program",
    href: "https://pinterest.com",
    label: "Get started",
    target: "blank",
  }}
  secondaryAction={{
    accessibilityLabel: "Learn more: Verified Merchant Program",
    href: "https://pinterest.com",
    label: "Learn more",
    target: "blank",
  }}
  title="Your business account was created!"
  type="info"
/>
      `}
          />
        </MainSection.Subsection>
      </MainSection>

      <QualityChecklist component={generatedDocGen?.displayName} />

      <MainSection name="Related">
        <MainSection.Subsection
          description={`
      **[Upsell](/components/web/upsell)**
      If marketing new products or features, or encouraging upgrades, use Upsell instead.

      **[Toast](/components/web/toast)**
      Toast provides feedback on a user interaction, like a confirmation that appears when a Pin has been saved. Unlike Upsell and Callout, Toasts don’t contain actions. They’re also less persistent, and disappear after a certain duration.

      **[ActivationCard](/components/web/activationcard)**
      ActivationCards are used in groups to communicate a user’s stage in a series of steps toward an overall action.

      **[OnLinkNavigationProvider](/components/web/utilities/onlinknavigationprovider)**
      OnLinkNavigationProvider allows external link navigation control across all children components with link behavior.

    `}
        />
      </MainSection>
    </Page>
  );
}

export async function getServerSideProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: { generatedDocGen: await docgen({ componentName: 'Callout' }) },
  };
}
