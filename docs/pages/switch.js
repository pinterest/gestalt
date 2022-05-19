// @flow strict
import { type Node } from 'react';
import GeneratedPropTable from '../components/GeneratedPropTable.js';
import MainSection from '../components/MainSection.js';
import Page from '../components/Page.js';
import PageHeader from '../components/PageHeader.js';
import docgen, { type DocGen } from '../components/docgen.js';

export default function DocsPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title="Switch">
      <PageHeader
        name="Switch"
        description={generatedDocGen?.description}
        defaultCode={`
      function SwitchExample() {
        const [switched, setSwitched] = React.useState(false);

        return (
          <Box display="flex" alignItems="center">
            <Box paddingX={2}>
              <Label htmlFor="introExample">
                <Text>Airplane mode</Text>
              </Label>
            </Box>
            <Switch
              onChange={() => setSwitched(!switched)}
              id="introExample"
              switched={switched}
            />
          </Box>
        );
      }
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
          - For a binary option that can be either active or inactive.
          - Typically used on mobile, where toggling the Switch takes immediate effect.
        `}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            title="When not to use"
            description={`
          - Choosing between related options. Each Switch should be considered a solitary, standalone option. For multiple, related choices, use [Checkboxes](/checkbox) or [RadioButtons](/radiobutton) instead.
        `}
          />
        </MainSection.Subsection>
      </MainSection>
      <MainSection name="Best practices">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Use a label to give the Switch context when possible."
            defaultCode={`
function SwitchExample2() {
  const [switched, setSwitched] = React.useState(true);

  return (
    <Flex gap={2} alignItems="center" width="100%" maxWidth={300}>
      <Flex.Item flex="grow">
        <Label htmlFor="makesecret">
          <Text weight="bold">Make this board secret</Text>
        </Label>
      </Flex.Item>
      <Switch
        onChange={() => setSwitched(!switched)}
        id="makesecret"
        switched={switched}
      />
    </Flex>
  );
}
`}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Truncate label text, instead allow it to wrap to form another line. "
            defaultCode={`
function SwitchExample3() {
  const [switched, setSwitched] = React.useState(false);

  return (
    <Flex gap={2} alignItems="center">
      <Switch
        onChange={() => setSwitched(!switched)}
        id="setboard"
        switched={switched}
      />
      <Label htmlFor="setboard">
        <Text>Set board to...</Text>
      </Label>
    </Flex>
  );
}
`}
          />
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Communicate why a switch is disabled and how to enable it if possible."
            defaultCode={`
<Flex gap={2} alignItems="center">
  <Switch
    onChange={() => {}}
    id="showsecretboards"
    switched={false}
    disabled={true}
  />
  <Label htmlFor="showsecretboards">
    <Flex direction="column" gap={1}>
      <Text color="subtle">Show secret boards</Text>
      <Text size="100" color="subtle">You don't have any secret boards</Text>
    </Flex>
  </Label>
</Flex>
`}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Use alternative styling to represent the functionality of a switch. Use Switch instead."
            defaultCode={`
<Flex direction="column" gap={2} width="100%" maxWidth={300}>
  <Heading size="300">On Pinterest notifications</Heading>
  <Flex direction="column" gap={4}>
    <Flex alignItems="center">
      <Flex.Item flex="grow">
        <Text>Comments</Text>
      </Flex.Item>
      <Icon icon="check-circle" color="default" />
    </Flex>
    <Flex alignItems="center">
      <Flex.Item flex="grow">
        <Text>Mentions</Text>
      </Flex.Item>
      <Icon icon="check-circle" color="default" />
    </Flex>
    <Flex alignItems="center">
      <Flex.Item flex="grow">
        <Text>Views</Text>
      </Flex.Item>
      <Icon icon="circle-outline" />
    </Flex>
    <Flex alignItems="center">
      <Flex.Item flex="grow">
        <Text>Saves</Text>
      </Flex.Item>
      <Icon icon="check-circle" color="default" />
    </Flex>
  </Flex>
</Flex>
`}
          />
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Use a standalone switch if the surrounding context is clear without an associated label. However, be sure to include a visually hidden label for screen readers."
            defaultCode={`
<Flex direction="column" gap={2} width="100%" maxWidth={300}>
  <Heading size="300">Tune your home feed</Heading>
  <Text>Turn off any boards that you don't want us to use for your home feed recommendations</Text>
  <Flex direction="column" gap={4}>
    <Flex alignItems="center">
      <Flex.Item flex="grow">
        <Label htmlFor="boardfood">
          <Flex direction="column" gap={1}>
            <Text>Food</Text>
            <Text size="100">55 pins · 1 section</Text>
          </Flex>
        </Label>
      </Flex.Item>
      <Switch
        onChange={() => {}}
        id="boardfood"
        switched={false}
      />
    </Flex>
    <Flex alignItems="center">
      <Flex.Item flex="grow">
        <Label htmlFor="boardoutfits">
          <Flex direction="column" gap={1}>
            <Text>Outfits</Text>
            <Text size="100">138 pins · 5 sections</Text>
          </Flex>
        </Label>
      </Flex.Item>
      <Switch
        onChange={() => {}}
        id="boardoutfits"
        switched={true}
      />
    </Flex>
    <Flex alignItems="center">
      <Flex.Item flex="grow">
        <Label htmlFor="boardhomedecor">
          <Flex direction="column" gap={1}>
            <Text>Home Decor</Text>
            <Text size="100">33 pins · 2 sections</Text>
          </Flex>
        </Label>
      </Flex.Item>
      <Switch
        onChange={() => {}}
        id="boardhomedecor"
        switched={true}
      />
    </Flex>
  </Flex>
</Flex>
`}
          />
        </MainSection.Subsection>
      </MainSection>
      <MainSection
        name="Accessibility"
        description={`
    Switches should have labels that can be read by screen readers, and that can be clicked or tapped to make it easier for users to select and deselect. Therefore, make sure to supply the \`label\` prop. If that is not possible, make sure your stand-alone Label has an \`htmlFor\` prop that matches the \`id\` on the Switch. Test that the Switch and label are properly connected by clicking or tapping on the label and confirming that it activates the Switch next to it.

      If Switch is labeled by content elsewhere on the page, or a more complex label is needed, the \`labelDisplay\` prop can be used to visually hide the label. In this case, it is still available to screen reader users, but will not appear visually on the screen. See the [Label visibility example](https://gestalt.netlify.app/checkbox#Label-visibility) for more detail.`}
      >
        <MainSection.Subsection
          title="Keyboard navigation"
          columns={2}
          description={`
    Switch has conventional keyboard support.
    - Users relying on the keyboard expect to move focus to the Switch by using the tab key or shift+tab when moving backwards.
    - Setting \`disabled\` will prevent Switch from receiving keyboard focus or input
`}
        />
      </MainSection>

      <MainSection
        name="Localization"
        description={`Be sure to localize \`label\` and any \`subtext\`. Be mindful of label length so that it doesn’t truncate in languages with lengthier character counts.`}
      />

      <MainSection name="Variants">
        <MainSection.Subsection
          title="With a label"
          description={`
        Whenever using Switch, always use a [Label](/label) with it to make your component accessible.`}
        >
          <MainSection.Card
            defaultCode={`
        function SwitchExample4() {
          const [switched, setSwitched] = React.useState(false);

          return (
            <Box display="flex" alignItems="center">
              <Box paddingX={2}>
                <Label htmlFor="emailNotifications">
                  <Text>Airplane mode</Text>
                </Label>
              </Box>
              <Switch
                onChange={() => setSwitched(!switched)}
                id="emailNotifications"
                switched={switched}
              />
            </Box>
          );
        }
        `}
          />
        </MainSection.Subsection>
        <MainSection.Subsection title="Disabled and switched combinations">
          <MainSection.Card
            defaultCode={`
function SwitchExample5() {
  return (
    <Flex alignItems="center" gap={8}>
      <Flex direction="column" gap={2}>
        <Label htmlFor="base">
          <Text>Base state</Text>
        </Label>
        <Switch
          onChange={() => {}}
          id="base"
          switched={false}
        />
      </Flex>
      <Flex direction="column" gap={2}>
      <Label htmlFor="switched">
        <Text>Switched</Text>
      </Label>
      <Switch
        onChange={() => {}}
        id="switched"
        switched={true}
      />
    </Flex>
    <Flex direction="column" gap={2}>
        <Label htmlFor="disabled">
          <Text>Disabled, not switched</Text>
        </Label>
        <Switch
          onChange={() => {}}
          id="disabled"
          switched={false}
          disabled={true}
        />
      </Flex>
      <Flex direction="column" gap={2}>
        <Label htmlFor="disabledAndSwitched">
          <Text>Disabled and switched</Text>
        </Label>
        <Switch
          onChange={() => {}}
          id="disabledAndSwitched"
          switched={true}
          disabled={true}
        />
      </Flex>
    </Flex>
  );
}
    `}
          />
        </MainSection.Subsection>
      </MainSection>
    </Page>
  );
}

export async function getServerSideProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: { generatedDocGen: await docgen({ componentName: 'Switch' }) },
  };
}
