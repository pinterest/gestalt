// @flow strict
import type { Node } from 'react';
import { Pog } from 'gestalt';
import Combination from '../components/Combination.js';
import Example from '../components/Example.js';
import GeneratedPropTable from '../components/GeneratedPropTable.js';
import Page from '../components/Page.js';
import PageHeader from '../components/PageHeader.js';
import docgen, { type DocGen } from '../components/docgen.js';

export default function DocsPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title="Pog">
      <PageHeader name="Pog" description={generatedDocGen?.description} />

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <Example
        name="Example"
        defaultCode={`
<Pog
  icon="heart"
  iconColor="red"
/>
`}
      />
      <Combination
        id="stateCombinations"
        name="Combinations: State"
        hovered={[false, true]}
        focused={[false, true]}
        active={[false, true]}
      >
        {(props) => <Pog icon="heart" {...props} />}
      </Combination>
      <Combination
        id="sizeCombinations"
        name="Combinations: Size with default padding"
        size={['xs', 'sm', 'md', 'lg', 'xl']}
      >
        {(props) => <Pog icon="heart" {...props} />}
      </Combination>
      <Combination
        id="paddingCombinations"
        name="Combinations: Size with custom padding"
        size={['xs', 'sm', 'md', 'lg', 'xl']}
        padding={[1, 2, 3, 4, 5]}
      >
        {(props) => <Pog icon="heart" {...props} />}
      </Combination>
      <Combination
        id="iconColorCombinations"
        name="Combinations: Icon Color"
        iconColor={['darkGray', 'gray', 'red', 'white']}
      >
        {(props) => <Pog icon="heart" {...props} />}
      </Combination>
      <Combination
        id="backgroundColorCombinations"
        name="Combinations: Background Color"
        bgColor={['transparent', 'transparentDarkGray', 'darkGray', 'white', 'lightGray', 'gray']}
      >
        {(props) => <Pog icon="heart" {...props} />}
      </Combination>
    </Page>
  );
}

export async function getStaticProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  const generatedDocGen = await docgen({ componentName: 'Pog' });

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
