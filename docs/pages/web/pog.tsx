import { ReactNode } from 'react';
import { Pog } from 'gestalt';
import AccessibilitySection from '../../docs-components/AccessibilitySection';
import CombinationNew from '../../docs-components/CombinationNew';
import docGen, { DocGen } from '../../docs-components/docgen';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable';
import MainSection from '../../docs-components/MainSection';
import Page from '../../docs-components/Page';
import PageHeader from '../../docs-components/PageHeader';
import QualityChecklist from '../../docs-components/QualityChecklist';
import SandpackExample from '../../docs-components/SandpackExample';
import main from '../../examples/pog/main';
import states from '../../examples/pog/states';
import statesOnBackground from '../../examples/pog/statesOnBackground';

export default function DocsPage({ generatedDocGen }: { generatedDocGen: DocGen }) {
  return (
    <Page title="Pog">
      <PageHeader description={generatedDocGen?.description} name="Pog">
        <SandpackExample
          code={main}
          hideEditor
          layout="column"
          name="Main Example"
          previewHeight={200}
        />
      </PageHeader>

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <AccessibilitySection name={generatedDocGen?.displayName} />
      <MainSection name="Variants">
        <MainSection.Subsection title="Icon colors">
          <CombinationNew iconColor={['darkGray', 'gray', 'red', 'white', 'brandPrimary']}>
            {({ iconColor }) => <Pog icon="heart" iconColor={iconColor} />}
          </CombinationNew>
        </MainSection.Subsection>
        <MainSection.Subsection
          description={`Pog can be presented in combinations of icon and background colors. In the absence of combinations, for each \`iconColor\` or \`bgColor\` value, a default paired value is assigned.

Follow these guidelines for \`bgColor\`

1. Red ("red"). High emphasis, used for primary actions.
2. Light Gray ("lightGray"). Medium emphasis, used for secondary actions.
3. Gray ("gray"). Used for tertiary actions or in cases where the primary "red" is not an option. Medium emphasis when placed on dark backgrounds, used for secondary actions.
`}
          title="Background colors on white backgrounds"
        >
          <CombinationNew bgColor={['red', 'lightGray', 'gray']}>
            {({ bgColor }) => <Pog bgColor={bgColor} icon="heart" />}
          </CombinationNew>
        </MainSection.Subsection>
        <MainSection.Subsection
          description={`Pog can be presented in combinations of icon and background colors. In the absence of combinations, for each \`iconColor\` or \`bgColor\` value, a default paired value is assigned.

Follow these guidelines for \`bgColor\`

1. Transparent Dark Gray ("transparentDarkGray"). Medium emphasis, used for secondary actions, usually above a colored background.
2. White ("white"). Used when there is a need of an IconButton over an image or colored background to provide better contrast and visibility.
3. Transparent ("transparent"). Used when there is a need to have an IconButton over an image without a background.
`}
          title="Background colors on color/image backgrounds"
        >
          <CombinationNew bgColor={['transparentDarkGray', 'white', 'transparent']}>
            {({ bgColor }) => <Pog bgColor={bgColor} icon="heart" />}
          </CombinationNew>
        </MainSection.Subsection>
        <MainSection.Subsection title="States">
          <MainSection.Card
            cardSize="lg"
            sandpackExample={<SandpackExample code={states} name="States on white backgrounds" />}
          />
        </MainSection.Subsection>
        <MainSection.Subsection title="States on color/image backgrounds">
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={statesOnBackground}
                name="States states on image/color background"
              />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection title="Sizes with default padding">
          <CombinationNew hasCheckerboard={false} size={['xs', 'sm', 'md', 'lg', 'xl']}>
            {({ size }) => <Pog bgColor="lightGray" icon="heart" size={size} />}
          </CombinationNew>
        </MainSection.Subsection>
        <MainSection.Subsection title="Sizes with custom padding">
          <CombinationNew
            hasCheckerboard={false}
            padding={[1, 2, 3, 4, 5]}
            size={['xs', 'sm', 'md', 'lg', 'xl']}
          >
            {({ size, padding }) => (
              <Pog bgColor="lightGray" icon="heart" padding={padding} size={size} />
            )}
          </CombinationNew>
        </MainSection.Subsection>
      </MainSection>
      <QualityChecklist component={generatedDocGen?.displayName} />
    </Page>
  );
}

export async function getServerSideProps(): Promise<{
  props: {
    generatedDocGen: DocGen;
  };
}> {
  const generatedDocGen = await docGen('Pog');

  generatedDocGen.props.icon = {
    ...generatedDocGen.props.icon,
    tsType: {
      name: 'string',
      raw: 'Icon[icon]',
    },
  };

  return {
    props: { generatedDocGen },
  };
}
