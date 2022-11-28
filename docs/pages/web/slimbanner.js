// @flow strict
import { type Node } from 'react';
import MainSection from '../../docs-components/MainSection.js';
import PageHeader from '../../docs-components/PageHeader.js';
import Page from '../../docs-components/Page.js';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable.js';
import docgen, { type DocGen } from '../../docs-components/docgen.js';
import QualityChecklist from '../../docs-components/QualityChecklist.js';
import AccessibilitySection from '../../docs-components/AccessibilitySection.js';
import SandpackExample from '../../docs-components/SandpackExample.js';
import responsiveExample from '../../examples/slimbanner/responsiveExample.js';

export default function SlimBannerPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader
        name={generatedDocGen?.displayName}
        description={generatedDocGen?.description}
        defaultCode={`
<SlimBanner
  dismissButton={{
    accessibilityLabel: 'Dismiss banner',
    onDismiss: () => {},
  }}
  iconAccessibilityLabel="Information"
  message="Idea Pins are now available across platforms."
  primaryAction={{
    accessibilityLabel: 'Apply for access',
    label: 'Apply for access',
    onClick: () => {},
  }}
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
- When displaying section-level information to the user.
- When providing persistent messaging/guidance for specific elements or areas within a surface or page.
- When providing messaging/guidance on information-dense screens where there is limited space.
        `}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            title="When not to use"
            description={`
- When displaying information that pertains to the whole page and is of the highest priority. Use [Callout](/web/callout) instead.
- When interacting with the SlimBanner is required for the user to proceed with a task or flow. Use [Modal](/web/modal) instead.
- When describing the function of an interactive element that doesn’t have a text label. Use [Tooltip](/web/tooltip) instead.
- When calling a users attention to a feature for the first time. Use [Popover](/web/popover) instead.
        `}
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Best practices">
        <MainSection.Subsection columns={1}>
          <MainSection.Card
            cardSize="lg"
            type="do"
            description="Use for messages generated by the system that stay persistent on a surface"
            defaultCode={`
<SlimBanner
  type="info"
  message="This ad group is part of a campaign that is using campaign budget optimization. Changes to schedule or budget must be made at the campaign level."
  iconAccessibilityLabel="Information"
  helperLink={{
      text: 'Learn more',
      accessibilityLabel: 'Learn more about campaign budget optimization',
      href: 'http://www.pinterest.com',
      onClick: () => {},
    }}
/>
`}
          />
          <MainSection.Card
            cardSize="lg"
            type="don't"
            description={`
Use for messages generated as an immediate response to user interaction. Instead, use [Toast]/toast) for ephemeral messages, and [Modal](/web/modal) for a message that remains on the screen until it’s dismissed by a user.`}
            defaultCode={`
<SlimBanner
  type="success"
  message="The Pin was added to your"
  iconAccessibilityLabel="Information"
  helperLink={{
      text: 'Vision Board',
      accessibilityLabel: 'Vision Board',
      href: 'http://www.pinterest.com',
      onClick: () => {},
    }}
/>
`}
          />
        </MainSection.Subsection>

        <MainSection.Subsection columns={1}>
          <MainSection.Card
            cardSize="lg"
            type="do"
            description="Place SlimBanner near elements of a section that it most relates to"
            defaultCode={`
<Flex direction="column" width="100%" gap={{ column: 6, row: 0 }}>
  <Text weight="bold" size="500">Ads overview</Text>
  <Module id="doExample" title="Campaign optimization & delivery">
    <Flex direction="column" width="100%" gap={{ column: 8, row: 0 }}>
      <TextField
        id="tag-readonly"
        label="Tag ID"
        onChange={() => {}}
        value="Tag 2022"
        readOnly
      />
      <SelectList
        id="selectList"
        onChange={() => {}}
        label='Select conversion event'
        size='lg'
      >
        <SelectList.Option label="Lead" value="Lead" />
      </SelectList>
      <Divider />
      <Fieldset legend="Bidding">
        <Flex direction="column" gap={{ column: 2, row: 0 }}>
          <RadioButton
            checked
            id="automatic"
            label="Automatic (recommended)"
            name="Automatic"
            onChange={() => {}}
            value="automatic"
            subtext="Pinterest aims to get the most clicks for your budget"
          />
          <RadioButton
            id="custom"
            label="Custom"
            name="custom"
            onChange={() => {}}
            value="custom"
            subtext="You control how much to bid at auction"

          />
        </Flex>
      </Fieldset>
      <Divider />
      <Checkbox
        id="checkbox"
        label="I'll set the optimization & delivery by ad group instead"
        name="error"
        onChange={() => {}}
      />
      <SlimBanner
        type="info"
        message="For best conversion campaign performance we recommend setting optimization & delivery at the campaign level so all ad groups have the same values, but you can set them individually."
        iconAccessibilityLabel="Information"
      />
    </Flex>
  </Module>

</Flex>
        `}
          />
          <MainSection.Card
            cardSize="lg"
            type="don't"
            description={`
Place SlimBanner at the top of a page and use them for highest-priority messaging. Use [Callout](/web/callout) instead`}
            defaultCode={`
<Flex direction="column" width="100%" gap={{ column: 6, row: 0 }}>
  <Text weight="bold" size="500">Ads overview</Text>
  <SlimBanner
  type="error"
  message="There is an issue with your billing account so all ads currently paused."
  iconAccessibilityLabel="Error"
  />
</Flex>
        `}
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={1}>
          <MainSection.Card
            cardSize="lg"
            type="do"
            description={`Use "bare" SlimBanners for dense interfaces where space is an issue.`}
            defaultCode={`
<Flex direction="column" width="100%" gap={{ column: 6, row: 0 }}>
  <Text weight="bold" size="500">Campaign details</Text>
  <Flex width="100%" direction="column" gap={{ column: 4, row: 0 }}>
    <Heading size="400">Campaign name</Heading>
    <Text>Give your campaign a name. Only you will see what you've named your campaign.</Text>
    <Heading size="400">Campaign spend limits</Heading>
    <Text>For video views and web sessions objectives only, campaign spend limits help you control the amount your campaign spends.</Text>
    <SlimBanner
      type="warningBare"
      message="Spend limits may change your overall billing details."
      iconAccessibilityLabel="Warning"
    />
    <Heading size="400">Campaign status</Heading>
    <Text>Set your campaign status to active to begin serving ads as soon as you launch or set your campaign status to paused and activate it later.</Text>
  </Flex>
</Flex>
        `}
          />
          <MainSection.Card
            cardSize="lg"
            type="don't"
            description={`
Use a regular SlimBanner with a background for dense interfaces where space is an issue.`}
            defaultCode={`
<Flex direction="column" width="100%" gap={{ column: 6, row: 0 }}>
  <Text weight="bold" size="500">Campaign details</Text>
  <Flex width="100%" direction="column" gap={{ column: 4, row: 0 }}>
    <Heading size="400">Campaign name</Heading>
    <Text>Give your campaign a name. Only you will see what you've named your campaign.</Text>
    <Heading size="400">Campaign spend limits</Heading>
    <Text>For video views and web sessions objectives only, campaign spend limits help you control the amount your campaign spends.</Text>
    <SlimBanner
      type="warning"
      message="Spend limits may change your overall billing details."
      iconAccessibilityLabel="Warning"
    />
    <Heading size="400">Campaign status</Heading>
    <Text>Set your campaign status to active to begin serving ads as soon as you launch or set your campaign status to paused and activate it later.</Text>
  </Flex>
</Flex>
        `}
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={1}>
          <MainSection.Card
            cardSize="lg"
            type="do"
            description="Strive for using one SlimBanner per section instead of stacking. If SlimBanner must stack, errors and warnings take precedence."
            defaultCode={`
<SlimBanner
  type="info"
  message="Tag manager can help you optimize your advertiser spend."
  iconAccessibilityLabel="Information"
  helperLink={{
    text: 'Get started',
    accessibilityLabel: 'Get started with Tag manager',
    href: 'http://www.pinterest.com',
    onClick: () => {},
  }}
/>
`}
          />
          <MainSection.Card
            cardSize="lg"
            type="don't"
            description={`
Combine SlimBanners with other components like [Callouts](/web/callout) or [Upsells](/web/upsell).`}
            defaultCode={`
<Flex width="100%" direction="column" gap={{ column: 2, row: 0 }}>
  <Callout
    dismissButton={{
      accessibilityLabel: 'Dismiss this banner',
      onDismiss: () => {},
    }}
    iconAccessibilityLabel="Info"
    message="Measure the impact tags have on your business by adding and managing tags"
    primaryAction={{
      accessibilityLabel: "Get started with tags",
      href: "https://pinterest.com",
      label: "Get started with tags",
      target: "blank",
    }}
    title="Use Tag manager to optimize your advertiser spend"
    type="info"
  />
  <SlimBanner
    type="warning"
    message="You haven't added any tags."
    iconAccessibilityLabel="Warning"
  />
</Flex>
    `}
          />
        </MainSection.Subsection>
      </MainSection>

      <AccessibilitySection name={generatedDocGen?.displayName}>
        <MainSection.Subsection
          description={`\`iconAccessibilityLabel\` requires a short, descriptive label for screen readers. This label should communicate the intent of the icon, such as "Success", “Error”, “Info” or “Warning”. Also, if using \`dismissButton\` or \`primaryAction\`, their respective \`accessibilityLabel\`s must be used. All labels should be localized.`}
          title="Labels"
        />
      </AccessibilitySection>

      <MainSection
        name="Localization"
        description={`Remember to localize \`message\`, \`helperLink\` and \`iconAccessibilityLabel\`.
`}
      />
      <MainSection name="Variants">
        <MainSection.Subsection
          description={`Neutral SlimBanners are intended for Pinner interfaces where Pins and Boards take precedent or where we want to limit the use of color in the design.
`}
          title="Neutral"
        >
          <MainSection.Card
            cardSize="lg"
            defaultCode={`
<SlimBanner message="Your total audience includes all users who have seen or engaged with any of your Pins in the last 30 days."/>
`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description="Info SlimBanners communicate helpful messages or guidance to users about a feature or section."
          title="Info"
        >
          <MainSection.Card
            cardSize="lg"
            defaultCode={`
<Flex direction="column" gap={{ column: 5, row: 0 }} width="100%">
  <SlimBanner type="info" iconAccessibilityLabel="Info" message="Idea Pins are now available across platforms."/>
  <SlimBanner type="infoBare" iconAccessibilityLabel="Info" message="Idea Pins are now available across platforms."/>
</Flex>
`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description="Recommendation SlimBanners inform people of quick things they can do to improve their experience."
          title="Recommendation"
        >
          <MainSection.Card
            cardSize="lg"
            defaultCode={`
<Flex direction="column" gap={{ column: 5, row: 0 }} width="100%">
  <SlimBanner type="recommendation" iconAccessibilityLabel="Recommendation" message="Advertise with confidence! When you run ads on Pinterest, you'll find recommendations to improve them here."/>
  <SlimBanner type="recommendationBare" iconAccessibilityLabel="Recommendation" message="Advertise with confidence! When you run ads on Pinterest, you'll find recommendations to improve them here."/>
</Flex>
`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description="Success SlimBanners communicate confirmation regarding an action within a larger flow."
          title="Success"
        >
          <MainSection.Card
            cardSize="lg"
            defaultCode={`
<Flex direction="column" gap={{ column: 5, row: 0 }} width="100%">
  <SlimBanner type="success" iconAccessibilityLabel="Info" message="Your ads are doing great! Keep it up by using recommendations to optimize your ad spend."/>
  <SlimBanner type="successBare" iconAccessibilityLabel="Info" message="Your ads are doing great! Keep it up by using recommendations to optimize your ad spend."/>
</Flex>
`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description="Warning SlimBanners communicate cautionary messages to users. The SlimBanner should provide clear guidance on how to correct an issue and/or learn more about it. This is done via a link inside of the banner, or clear actions in the section that the banner refers to."
          title="Warning"
        >
          <MainSection.Card
            cardSize="lg"
            defaultCode={`
<Flex direction="column" gap={{ column: 5, row: 0 }} width="100%">
  <SlimBanner
    type="warning"
    iconAccessibilityLabel="Info"
    message="This feature is being sunset and will not be available after May 1, 2024."
    helperLink={{
      text: "Learn more.",
      accessibilityLabel: "Learn more about deprecated features",
      href: "http://www.pinterest.com",
      onClick: () => {}
      }}
  />
  <SlimBanner
    type="warningBare"
    iconAccessibilityLabel="Info"
    message="This feature is being sunset and will not be available after May 1, 2024."
    helperLink={{
      text: "Learn more.",
      accessibilityLabel: "Learn more about deprecated features",
      href: "http://www.pinterest.com",
      onClick: () => {}
      }}
  />
</Flex>
`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description={`Error SlimBanners inform users of problems that require immediate action to correct. Further actions on the page might be blocked if users don't correct the problems. The SlimBanner should also provide clear guidance on how to correct the issue and/or learn more about it. This is done via a link inside of the banner, or clear actions in the section that the banner refers to.`}
          title="Error"
        >
          <MainSection.Card
            cardSize="lg"
            defaultCode={`
<Flex direction="column" gap={{ column: 5, row: 0 }} width="100%">
  <SlimBanner
    type="error"
    iconAccessibilityLabel="Info"
    message="There are issues with your account."
    helperLink={{
      text: "Go to account",
      accessibilityLabel: "Go to your account",
      href: "http://www.pinterest.com",
      onClick: () => {}
      }}
  />
  <SlimBanner
    type="errorBare"
    iconAccessibilityLabel="Info"
    message="There are issues with your account."
    helperLink={{
      text: "Go to account",
      accessibilityLabel: "Go to your account",
      href: "http://www.pinterest.com",
      onClick: () => {}
      }}
  />
</Flex>
`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description="For dense interfaces and placement inline, next to blocks of text, set SlimBanner to its compact type: “infoBare”, “successBare”, “warningBare”, “errorBare”, “recommendationBare“."
          title="Compact"
        >
          <MainSection.Card
            cardSize="lg"
            defaultCode={`
<Flex direction="column" gap={{ column: 5, row: 0 }} width="100%">
  {['infoBare', 'successBare', 'warningBare', 'errorBare', 'recommendationBare'].map(type => (
    <SlimBanner
      key={type}
      type={type}
      iconAccessibilityLabel={type}
      message="This is a compact SlimBanner."
  />))
  }
</Flex>
`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description={`
The \`message\` prop accepts either a string or [Text](/Text). Use a string for simple messages without any visual style. SlimBanner will handle the message style and adherence to design guidelines. If a message with more complex style is required, such as bold text or inline links, use Text to wrap your message with any additional Text or Link usages contained within.

The SlimBanner \`message\` string can be complemented with a \`helperLink\`. When passing a Text component, \`helperLink\` isn't rendered to prevent unnecessary visual load.

Due to localization constraints, the contents of \`message\` and \`helperLink\` cannot belong to the same sentence. They must be independent sentences separated by a period. Don't attempt to construct a compound sentence using \`message\` and \`helperLink\`.
`}
          title="Message"
        >
          <MainSection.Card
            cardSize="md"
            defaultCode={`
<Flex direction="column" gap={6}>
  <Text weight="bold">Simple message string with helperText</Text>
  <SlimBanner
    type="info"
    message="This ad group is part of a campaign that is using campaign budget optimization. Changes to schedule or budget must be made at the campaign level."
    iconAccessibilityLabel="Information"
    helperLink={{
        text: 'Learn more',
        accessibilityLabel: 'Learn more about campaign budget optimization',
        href: 'http://www.pinterest.com',
        onClick: () => {},
      }}
  />

  <Text weight="bold">Rich message with Text component</Text>

  <SlimBanner
    type="recommendation"
    message={<Text inline> The campaign <Text inline weight="bold">Back to School</Text> is regularly hitting its <Link inline href="">daily cap</Link>. Consider raising daily caps to increase scale for a similar CPC and CTR.</Text> }
    primaryAction={{
      accessibilityLabel: 'Increase spend',
      label: 'Increase spend',
      onClick: () => {},
    }}
    dismissButton={{
      accessibilityLabel: 'Dismiss banner',
      onDismiss: () => {},
    }}
    iconAccessibilityLabel="Recommendation"
  />


</Flex>
`}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Primary action"
          description={`
SlimBanners can have a primary action. This action can be a [Link](/web/link), by specifying the \`href\` property, or a [Button](/web/button), when no \`href\` is supplied.

SlimBanner actions with link interaction can be paired with OnLinkNavigationProvider. See [OnLinkNavigationProvider](/web/utilities/onlinknavigationprovider) to learn more about link navigation.

For example, “Learn more” may link to a separate documentation site, while “Apply now” could be a button that opens a [Modal](/web/modal) with an application flow. Be sure to localize the labels of the actions.

If needed, actions can become disabled after clicking by setting \`disabled: true\` in the action data.

Note that actions are not available on compact ("___Bare" type) SlimBanners.
          `}
        >
          <MainSection.Card
            cardSize="lg"
            defaultCode={`
<SlimBanner
  type="info"
  message="This ad group is part of a campaign that is using campaign budget optimization. Changes to schedule or budget must be made at the campaign level."
  iconAccessibilityLabel="Information"
  primaryAction={{
    accessibilityLabel: 'Learn more about campaign budget optimization',
    label: 'Learn more',
    onClick: () => {},
  }}
/>
`}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Dismissible"
          description={`
          \`dismissButton\` can be used when SlimBanner doesn't indicate a persistent state. This will most commonly be used in \`type="info"\` SlimBanners.

        Don't use dismiss buttons in the following cases:
        - There is a persistent account or page status that the user must address.
        - The user must access SlimBanner's information again in order to perform a task.

        Note that compact ("___Bare" type) SlimBanners are not dismissible.
          `}
        >
          <MainSection.Card
            cardSize="lg"
            defaultCode={`
<SlimBanner
  type="info"
  message="This ad group is part of a campaign that is using campaign budget optimization. Changes to schedule or budget must be made at the campaign level."
  iconAccessibilityLabel="Information"
  dismissButton={{
    accessibilityLabel: 'Dismiss banner',
    onDismiss: () => {},
  }}
/>
`}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Responsive"
          description={`
SlimBanner is responsive to different [viewport breakpoints](/foundations/screen_sizes#Web-(px)).

Therefore, SlimBanner behavior relies on the window size and requires SlimBanner to be used on a full-window width to correctly respond to different breakpoints.

SlimBanner doesn't depend on DeviceTypeProvider to display a mobile view; instead, it adjusts to the smallest viewport breakpoint. The example below forces a mobile viewport width to render SlimBanner at that particular viewport.
          `}
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={responsiveExample}
                name="SlimBanner responsive example"
                layout="mobileRow"
              />
            }
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Writing">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description={`
- Use succinct and scannable language that clearly conveys information to the user without being overly clever or technical
- Consider internationalization and how other languages may be constrained
`}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description={`
- Write messages that are wordy and take up a lot of space
- For warnings and errors, exclamation points if the tone isn’t celebratory, for example: “Update your account!”
`}
          />
        </MainSection.Subsection>
      </MainSection>

      <QualityChecklist component={generatedDocGen?.displayName} />

      <MainSection name="Related">
        <MainSection.Subsection
          description={`
**[Upsell](/web/upsell)**
An Upsell is used to market new features or to encourage a user to try recommendations.

**[Callout](/web/callout)**
Callouts are used at the top-most level of a page to communicate highest-priority information that applies to the entire page or surface. Callouts can be dismissed and are also actionable.

**[Toast](/web/toast)**
Toast provides feedback shortly after a user interaction, like a confirmation that appears when a Pin has been saved. Unlike Upsells and SlimBanners, toasts overlay Page content. They also automatically disappear after a certain amount of time without being dismissed by the user.

**[Tooltip](/web/tooltip)**
Tooltip provides helpful information regarding an interactive UI element, typically an IconButton. It is displayed on hover of a UI element, and disappears on mouse out.
    `}
        />
      </MainSection>
    </Page>
  );
}

export async function getStaticProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: { generatedDocGen: await docgen({ componentName: 'SlimBanner' }) },
  };
}
