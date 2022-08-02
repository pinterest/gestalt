// @flow strict
import { type Node } from 'react';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable.js';
import MainSection from '../../docs-components/MainSection.js';
import Page from '../../docs-components/Page.js';
import PageHeader from '../../docs-components/PageHeader.js';
import docgen, { type DocGen } from '../../docs-components/docgen.js';
import QualityChecklist from '../../docs-components/QualityChecklist.js';
import AccessibilitySection from '../../docs-components/AccessibilitySection.js';

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
          - Choosing between related options. Each Switch should be considered a solitary, standalone option. For multiple, related choices, use [Checkboxes](/web/checkbox) or [RadioGroup](/web/radiogroup) instead.
        `}
          />
        </MainSection.Subsection>
      </MainSection>
      <MainSection name="Best practices">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Use a label to give Switch context when possible."
            defaultCode={`
function SwitchExample() {
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
            description="Truncate label text. Instead, allow it to wrap to form another line. "
            defaultCode={`
function SwitchExample() {
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
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
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
      <Text>Show secret boards</Text>
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
  <Heading size="300" accessibilityLevel={3}>On Pinterest notifications</Heading>
  <Flex direction="column" gap={4}>
    <Flex alignItems="center">
      <Flex.Item flex="grow">
        <Text>Comments</Text>
      </Flex.Item>
      <Icon icon="check-circle" color="default" accessibilityLabel="checked circle" />
    </Flex>
    <Flex alignItems="center">
      <Flex.Item flex="grow">
        <Text>Mentions</Text>
      </Flex.Item>
      <Icon icon="check-circle" color="default" accessibilityLabel="checked circle" />
    </Flex>
    <Flex alignItems="center">
      <Flex.Item flex="grow">
        <Text>Views</Text>
      </Flex.Item>
      <Icon icon="circle-outline" accessibilityLabel="unchecked circle" />
    </Flex>
    <Flex alignItems="center">
      <Flex.Item flex="grow">
        <Text>Saves</Text>
      </Flex.Item>
      <Icon icon="check-circle" color="default" accessibilityLabel="checked circle" />
    </Flex>
  </Flex>
</Flex>
`}
          />
        </MainSection.Subsection>
      </MainSection>
      <AccessibilitySection
        name={generatedDocGen.displayName}
        description={`Switches should have [Labels](https://github.com/Label) that can be read by screen readers, and that can be clicked or tapped to make it easier for users to select and deselect. Make sure Label has an \`htmlFor\` prop that matches the \`id\` on the Switch. Test that the Switch and Label are properly connected by clicking or tapping on the label and confirming that it activates the Switch next to it.`}
      >
        <MainSection.Subsection
          title="Keyboard navigation"
          columns={2}
          description={`
    Switch has conventional keyboard support.
    - Users relying on the keyboard expect to move focus to the Switch by using the tab key or shift+tab when moving backwards.
    - Setting \`disabled\` will prevent Switch from receiving keyboard focus or input.
    - Once focused, the Space key toggles the Switch.
`}
        />
      </AccessibilitySection>

      <MainSection
        name="Localization"
        description={`Be sure to localize \`label\` and \`subtext\`. Be mindful of label length so that it doesn’t truncate in languages with lengthier character counts.`}
      />

      <MainSection name="Variants">
        <MainSection.Subsection
          title="With a label"
          description={`
        Whenever using Switch, always use a [Label](/web/label) with it to make your component accessible.`}
        >
          <MainSection.Card
            defaultCode={`
    function SwitchExample() {
      const [switched1, setSwitched1] = React.useState(false);
      const [switched2, setSwitched2] = React.useState(true);
      const [switched3, setSwitched3] = React.useState(true);

      return (
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
                  switched={switched1}
                  onChange={() => setSwitched1(!switched1)}
                  id="boardfood"
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
                  switched={switched2}
                  onChange={() => setSwitched2(!switched2)}
                  id="boardoutfits"
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
                  onChange={() => setSwitched3(!switched3)}
                  id="boardhomedecor"
                  switched={switched3}
                />
              </Flex>
            </Flex>
          </Flex>
        );
      }
        `}
          />
        </MainSection.Subsection>
        <MainSection.Subsection title="Disabled and switched combinations">
          <MainSection.Card
            defaultCode={`
function SwitchExample() {
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

      <MainSection name="Writing">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description={`
- Be clear and brief with Switch labels so they can be easily understood.
- When possible, use verbs to clarify the action. Something like “set…” or “show…”.
- If possible, be clear whether the setting is activated or deactivated.
- Use sentence case for labels.
`}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description={`
- Use vague language out of context, like “turn on” or “turn off” repeating the state of the switch is redundant and can clutter the interface.
- Don’t use “you,” “your,” or “my” to describe an action. Instead describe switches objectively.
`}
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Related">
        <MainSection.Subsection
          description={`
      **[RadioGroup](/web/radiogroup)**
      Use when presenting a user with a list of choices for which there can only be one selection.
`}
        />
        <MainSection.Subsection
          description={`
      **[Checkbox](/web/checkbox)**
      Used when presenting a user with a list of choices for which there can be multiple selections.
`}
        />
        <MainSection.Subsection
          description={`
      **[Fieldset](/web/fieldset)**
      Used to group a list of related Switches with a legend that describes the list.
    `}
        />
      </MainSection>
      <QualityChecklist component={generatedDocGen?.displayName} />
    </Page>
  );
}

export async function getServerSideProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: { generatedDocGen: await docgen({ componentName: 'Switch' }) },
  };
}
