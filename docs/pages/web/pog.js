// @flow strict
import { type Node as ReactNode } from 'react';
import { Flex, Pog } from 'gestalt';
import AccessibilitySection from '../../docs-components/AccessibilitySection';
import CombinationNew from '../../docs-components/CombinationNew';
import docGen, { type DocGen } from '../../docs-components/docgen';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable';
import MainSection from '../../docs-components/MainSection';
import Page from '../../docs-components/Page';
import PageHeader from '../../docs-components/PageHeader';
import QualityChecklist from '../../docs-components/QualityChecklist';
import SandpackExample from '../../docs-components/SandpackExample';
import main from '../../examples/pog/main';

export default function DocsPage({ generatedDocGen }: { generatedDocGen: DocGen }): ReactNode {
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
              <Flex gap={1} wrap>
                <Pog
                  icon="heart"
                  hovered={hovered}
                  focused={focused}
                  active={active}
                  bgColor="red"
                />
                <Pog
                  icon="heart"
                  hovered={hovered}
                  focused={focused}
                  active={active}
                  bgColor="white"
                />
                <Pog
                  icon="heart"
                  hovered={hovered}
                  focused={focused}
                  active={active}
                  bgColor="lightGray"
                />
                <Pog
                  icon="heart"
                  hovered={hovered}
                  focused={focused}
                  active={active}
                  bgColor="gray"
                />
                <Pog
                  icon="heart"
                  hovered={hovered}
                  focused={focused}
                  active={active}
                  bgColor="transparentDarkGray"
                />
                <Pog
                  icon="heart"
                  hovered={hovered}
                  focused={focused}
                  active={active}
                  bgColor="darkGray"
                />
                <Pog
                  icon="heart"
                  hovered={hovered}
                  focused={focused}
                  active={active}
                  bgColor="transparent"
                />
              </Flex>
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
