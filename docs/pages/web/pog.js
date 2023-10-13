// @flow strict
import { type Node } from 'react';
import { Pog } from 'gestalt';
import AccessibilitySection from '../../docs-components/AccessibilitySection.js';
import CombinationNew from '../../docs-components/CombinationNew.js';
import docGen, { type DocGen } from '../../docs-components/docgen.js';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable.js';
import MainSection from '../../docs-components/MainSection.js';
import Page from '../../docs-components/Page.js';
import PageHeader from '../../docs-components/PageHeader.js';
import QualityChecklist from '../../docs-components/QualityChecklist.js';
import SandpackExample from '../../docs-components/SandpackExample.js';
import main from '../../examples/pog/main.js';

export default function DocsPage({ generatedDocGen }: { generatedDocGen: DocGen }): Node {
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
      <MainSection name="Variants">
        <MainSection.Subsection title="States">
          <CombinationNew hovered={[false, true]} focused={[false, true]} active={[false, true]}>
            {({ hovered, focused, active }) => (
              <Pog icon="heart" hovered={hovered} focused={focused} active={active} />
            )}
          </CombinationNew>
        </MainSection.Subsection>

        <MainSection.Subsection title="Sizes with default padding">
          <CombinationNew size={['xs', 'sm', 'md', 'lg', 'xl']} hasCheckerboard={false}>
            {({ size }) => <Pog bgColor="lightGray" icon="heart" size={size} />}
          </CombinationNew>
        </MainSection.Subsection>

        <MainSection.Subsection title="Sizes with custom padding">
          <CombinationNew
            size={['xs', 'sm', 'md', 'lg', 'xl']}
            padding={[1, 2, 3, 4, 5]}
            hasCheckerboard={false}
          >
            {({ size, padding }) => (
              <Pog bgColor="lightGray" icon="heart" size={size} padding={padding} />
            )}
          </CombinationNew>
        </MainSection.Subsection>

        <MainSection.Subsection title="Icon Colors">
          <CombinationNew iconColor={['darkGray', 'gray', 'red', 'white', 'brandPrimary']}>
            {({ iconColor }) => <Pog icon="heart" iconColor={iconColor} />}
          </CombinationNew>
        </MainSection.Subsection>

        <MainSection.Subsection title="Background Colors">
          <CombinationNew
            bgColor={[
              'transparent',
              'transparentDarkGray',
              'darkGray',
              'white',
              'lightGray',
              'gray',
            ]}
          >
            {({ bgColor }) => <Pog icon="heart" bgColor={bgColor} />}
          </CombinationNew>
        </MainSection.Subsection>
      </MainSection>
      <QualityChecklist component={generatedDocGen?.displayName} />
    </Page>
  );
}

export async function getServerSideProps(): Promise<{
  props: { generatedDocGen: DocGen },
}> {
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
