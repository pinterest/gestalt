// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, Flex, Pog, Text } from 'gestalt';
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
        <MainSection.Subsection title="Colors & states on white backgrounds">
          <CombinationNew hovered={[false, true]} focused={[false, true]} active={[false, true]}>
            {({ hovered, focused, active }) => (
              <Flex gap={2} direction="column">
                <Flex gap={3}>
                  <Pog
                    icon="heart"
                    hovered={hovered}
                    focused={focused}
                    active={active}
                    bgColor="red"
                  />
                  <Text size="100">red - primary</Text>
                </Flex>
                <Flex gap={3}>
                  <Pog
                    icon="heart"
                    hovered={hovered}
                    focused={focused}
                    active={active}
                    bgColor="lightGray"
                  />
                  <Text size="100">lightGray - secondary</Text>
                </Flex>
                <Flex gap={3}>
                  <Pog
                    icon="heart"
                    hovered={hovered}
                    focused={focused}
                    active={active}
                    bgColor="transparent"
                  />
                  <Text size="100">transparent - tertiary</Text>
                </Flex>
              </Flex>
            )}
          </CombinationNew>
        </MainSection.Subsection>
        <MainSection.Subsection title="Colors & states on color/image backgrounds">
          <CombinationNew hovered={[false, true]} focused={[false, true]} active={[false, true]}>
            {({ hovered, focused, active }) => (
              <Box
                borderStyle="sm"
                display="flex"
                width={200}
                height={200}
                rounding={4}
                alignItems="center"
                justifyContent="center"
                dangerouslySetInlineStyle={{
                  __style: {
                    backgroundImage: 'url("https://i.ibb.co/d0pQsJz/stock3.jpg")',
                  },
                }}
              >
                <Flex gap={2} direction="column">
                  <Flex gap={3}>
                    <Pog
                      icon="heart"
                      hovered={hovered}
                      focused={focused}
                      active={active}
                      bgColor="transparentDarkGray"
                    />
                    <Box color="transparentDarkGray">
                      <Text color="inverse" weight="bold" size="100">
                        transparentDarkGray - secondary
                      </Text>
                    </Box>
                  </Flex>
                  <Flex gap={3}>
                    <Pog
                      icon="heart"
                      hovered={hovered}
                      focused={focused}
                      active={active}
                      bgColor="white"
                    />
                    <Box color="transparentDarkGray">
                      <Text color="inverse" weight="bold" size="100">
                        white
                      </Text>
                    </Box>
                  </Flex>
                  <Flex gap={3}>
                    <Pog
                      icon="heart"
                      hovered={hovered}
                      focused={focused}
                      active={active}
                      bgColor="gray"
                    />
                    <Box color="transparentDarkGray">
                      <Text color="inverse" weight="bold" size="100">
                        gray
                      </Text>
                    </Box>
                  </Flex>
                  <Flex gap={3}>
                    <Pog
                      icon="heart"
                      hovered={hovered}
                      focused={focused}
                      active={active}
                      bgColor="darkGray"
                    />
                    <Box color="transparentDarkGray">
                      <Text color="inverse" weight="bold" size="100">
                        darkGray
                      </Text>
                    </Box>
                  </Flex>
                </Flex>
              </Box>
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
