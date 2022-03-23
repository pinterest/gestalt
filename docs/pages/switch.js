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
      <MainSection name="Variants">
        <MainSection.Subsection
          title="With a label"
          description={`
        Whenever using Switch, always use a [Label](/label) with it to make your component accessible.`}
        >
          <MainSection.Card
            defaultCode={`
        function SwitchExample() {
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
    </Page>
  );
}

export async function getServerSideProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: { generatedDocGen: await docgen({ componentName: 'Switch' }) },
  };
}
