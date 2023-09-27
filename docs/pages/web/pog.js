// @flow strict
import { type Node } from 'react';
import { Pog } from 'gestalt';
import AccessibilitySection from '../../docs-components/AccessibilitySection.js';
import Combination from '../../docs-components/Combination.js';
import docGen, { type DocGen } from '../../docs-components/docgen.js';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable.js';
import Page from '../../docs-components/Page.js';
import PageHeader from '../../docs-components/PageHeader.js';
import QualityChecklist from '../../docs-components/QualityChecklist.js';
import SandpackExample from '../../docs-components/SandpackExample.js';
import main from '../../examples/pog/main.js';

export default function DocsPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title="Pog">
      <PageHeader name="Pog" description={generatedDocGen?.description}>
        <SandpackExample
          name="Main Example"
          code={main}
          layout="column"
          hideEditor
          previewHeight={200}
        />
      </PageHeader>

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <AccessibilitySection name={generatedDocGen?.displayName} />

      <Combination
        id="stateCombinations"
        name="States"
        hovered={[false, true]}
        focused={[false, true]}
        active={[false, true]}
      >
        {(props) => <Pog icon="heart" {...props} />}
      </Combination>
      <Combination
        id="sizeCombinations"
        name="Sizes with default padding"
        size={['xs', 'sm', 'md', 'lg', 'xl']}
        hasCheckerboard={false}
      >
        {(props) => <Pog bgColor="lightGray" icon="heart" {...props} />}
      </Combination>
      <Combination
        id="paddingCombinations"
        name="Sizes with custom padding"
        size={['xs', 'sm', 'md', 'lg', 'xl']}
        padding={[1, 2, 3, 4, 5]}
        hasCheckerboard={false}
      >
        {(props) => <Pog bgColor="lightGray" icon="heart" {...props} />}
      </Combination>
      <Combination
        id="iconColorCombinations"
        name="Icon Colors"
        iconColor={['darkGray', 'gray', 'red', 'white', 'brandPrimary']}
      >
        {(props) => <Pog icon="heart" {...props} />}
      </Combination>
      <Combination
        id="backgroundColorCombinations"
        name="Background Colors"
        bgColor={['transparent', 'transparentDarkGray', 'darkGray', 'white', 'lightGray', 'gray']}
      >
        {(props) => <Pog icon="heart" {...props} />}
      </Combination>
      <QualityChecklist component={generatedDocGen?.displayName} />
    </Page>
  );
}

export async function getServerSideProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  const generatedDocGen = await docGen('Pog');

  generatedDocGen.props.icon = {
    ...generatedDocGen.props.icon,
    flowType: {
      name: 'string',
      raw: 'Icon[icon]',
    },
  };

  return {
    props: { generatedDocGen },
  };
}
