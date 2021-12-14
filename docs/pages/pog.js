// @flow strict
import type { Node } from 'react';
import { Pog } from 'gestalt';
import PropTable from '../components/PropTable.js';
import Example from '../components/Example.js';
import Combination from '../components/Combination.js';
import PageHeader from '../components/PageHeader.js';
import docgen, { type DocGen } from '../components/docgen.js';
import Page from '../components/Page.js';

export default function DocsPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title="Pog">
      <PageHeader name="Pog" description={generatedDocGen?.description} />
      <PropTable
        props={[
          {
            name: 'accessibilityLabel',
            type: 'string',
            defaultValue: '',
            description: `Omit if and only if an ancestor element already has the aria-label set.`,
          },
          {
            name: 'active',
            type: 'boolean',
            defaultValue: false,
            href: 'stateCombinations',
          },
          {
            name: 'bgColor',
            type: `"transparent" | "transparentDarkGray" | "darkGray" | "gray" | "lightGray" | "white" | "red"`,
            defaultValue: 'transparent',
            href: 'colorCombinations',
          },
          {
            name: 'dangerouslySetSvgPath',
            type: `{ __path: string }`,
            description: `When using this prop, make sure that the viewbox around the SVG path is 24x24`,
          },
          {
            name: 'focused',
            type: 'boolean',
            defaultValue: false,
            href: 'stateCombinations',
          },
          {
            name: 'hovered',
            type: 'boolean',
            defaultValue: false,
            href: 'stateCombinations',
          },
          {
            name: 'iconColor',
            type: `"darkGray" | "gray" | "red" | "white"`,
            defaultValue: 'gray',
            href: 'colorCombinations',
          },
          {
            name: 'icon',
            type: '$Keys<typeof icons>',
            description: `This allows us to type check for a valid icon name based on the keys from the list of icons in
        Icon`,
          },
          {
            name: 'padding',
            type: `1 | 2 | 3 | 4 | 5`,
            description: `Padding in boints. If omitted, padding is derived from the \`size\` prop.`,
            href: 'paddingCombinations',
          },
          {
            name: 'selected',
            type: 'boolean',
            defaultValue: false,
            href: 'combinations',
          },
          {
            name: 'size',
            type: `"xs" | "sm" | "md" | "lg" | "xl"`,
            description: `This controls the icon size and the default padding size. Available sizes are "xs" (12px), "sm" (16px), "md" (18px), "lg" (20px), and "xl" (24px). If padding is omitted, button sizes are "xs" (24px), "sm" (32px), "md" (40px), "lg" (48px), and "xl" (56px)`,
            defaultValue: 'md',
            href: 'sizeCombinations',
          },
        ]}
      />
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
  return {
    props: { generatedDocGen: await docgen({ componentName: 'Pog' }) },
  };
}
