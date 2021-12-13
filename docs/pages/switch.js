// @flow strict
import type { Node } from 'react';
import { Box, Label, Switch, Text } from 'gestalt';
import PropTable from '../components/PropTable.js';
import Example from '../components/Example.js';
import Combination from '../components/Combination.js';
import PageHeader from '../components/PageHeader.js';
import MainSection from '../components/MainSection.js';
import docgen, { type DocGen } from '../components/docgen.js';
import Page from '../components/Page.js';

export default function DocsPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title="Switch">
      <PageHeader name="Switch" description={generatedDocGen?.description} />
      <PropTable
        props={[
          {
            name: 'disabled',
            type: 'boolean',
            defaultValue: false,
            href: 'switchCombinations',
          },
          {
            name: 'id',
            type: 'string',
            required: true,
            href: 'basicExample',
          },
          {
            name: 'name',
            type: 'string',
            href: 'basicExample',
          },
          {
            name: 'onChange',
            type: '({ event: SyntheticInputEvent<>, value: boolean }) => void',
            required: true,
            href: 'basicExample',
          },
          {
            name: 'switched',
            type: 'boolean',
            defaultValue: false,
            href: 'switchCombinations',
          },
        ]}
      />
      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            title="When to Use"
            description={`
          - For a binary option that can be either active or inactive.
          - Typically used on mobile, where toggling the Switch takes immediate effect.
        `}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            title="When Not to Use"
            description={`
          - Choosing between related options. Each Switch should be considered a solitary, standalone option. For multiple, related choices, use [Checkboxes](/checkbox) or [RadioButtons](/radiobutton) instead.
        `}
          />
        </MainSection.Subsection>
      </MainSection>
      <Example
        id="basicExample"
        description={`
    Whenever you are using a \`Switch\` component, you should use a [Label](/label) with it to make your component accessible.
  `}
        name="Example: Using a label"
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
      <Combination
        id="switchCombinations"
        disabled={[false, true]}
        switched={[false, true]}
        hasCheckerboard={false}
        layout="4column"
      >
        {(props, i) => (
          <Box borderStyle="lg" padding={2}>
            <Label htmlFor={`example-${i}`}>
              <Text>{`Switch ${i + 1}`}</Text>
            </Label>
            <Switch id={`example-${i}`} onChange={() => {}} {...props} />
          </Box>
        )}
      </Combination>
    </Page>
  );
}

export async function getStaticProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: { generatedDocGen: await docgen({ componentName: 'Switch' }) },
  };
}
