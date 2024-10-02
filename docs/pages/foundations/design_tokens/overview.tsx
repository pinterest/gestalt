import dataVizTokens from 'gestalt-design-tokens/dist/js/classic/data-viz-tokens';
import classicTokens from 'gestalt-design-tokens/dist/js/classic/tokens';
import MainSection from '../../../docs-components/MainSection';
import Page from '../../../docs-components/Page';
import PageHeader from '../../../docs-components/PageHeader';
import TokenTable from '../../../docs-components/TokenTable';

const EXCLUSION_LIST = [
  'avatar',
  'badge',
  'box',
  'button',
  'combobox',
  'datepicker',
  'formfield',
  'mask',
  'overlay',
  'popover',
  'pulsar',
  'segmentedcontrol',
  'switch',
  'tabs',
  'tag',
  'table',
  'tableofcontents',
  'tagdata',
  'tiledata',
  'video',
];

const tokenCategories: ReadonlyArray<{
  name: string;
  category: string;
  id: string;
  infoPage: {
    name: string;
    path: string;
  };
  darkValues: boolean;
  excludedItems?: ReadonlyArray<string>;
}> = [
  {
    name: 'Background color',
    category: 'color-background',
    id: 'color-background',
    infoPage: { name: 'Box', path: 'web/box#Colors' },
    darkValues: true,
    excludedItems: EXCLUSION_LIST,
  },
  {
    name: 'Border color',
    category: 'color-border',
    id: 'color-border',
    infoPage: { name: 'Box', path: 'web/box#Borders' },
    darkValues: true,
  },
  {
    name: 'Text color',
    category: 'color-text',
    id: 'color-text',
    infoPage: { name: 'Text', path: 'web/text#Colors' },
    darkValues: true,
  },
  {
    name: 'Icon color',
    category: 'color-icon',
    id: 'color-icon',
    infoPage: { name: 'Pog', path: 'web/pog#Variants' },
    darkValues: true,
  },
  {
    name: 'Data visualization color',
    category: 'color-data-visualization',
    id: 'color-data-visualization',
    infoPage: {
      name: 'Data Visualization Guidelines',
      path: 'foundations/data_visualization/color/palette',
    },
    darkValues: true,
  },
  {
    name: 'Elevation',
    category: 'elevation',
    id: 'elevation',
    infoPage: { name: 'Box', path: 'web/box#Elevation' },
    darkValues: true,
    excludedItems: EXCLUSION_LIST,
  },
  {
    name: 'Font size',
    category: 'font-size',
    id: 'font-size',
    infoPage: { name: 'Text', path: 'web/text#Sizes' },
    darkValues: false,
  },
  {
    name: 'Font weight',
    category: 'font-weight',
    id: 'font-weight',
    infoPage: { name: 'Text', path: 'web/text#Styles' },
    darkValues: false,
  },
  {
    name: 'Font family',
    category: 'font-family',
    id: 'font-family',
    infoPage: { name: 'Typography', path: 'foundations/typography' },
    darkValues: false,
  },
  {
    name: 'Opacity',
    category: 'opacity',
    id: 'opacity',
    infoPage: { name: 'Box', path: 'web/box#Opacity' },
    darkValues: false,
  },
  {
    name: 'Spacing',
    category: 'spacing',
    id: 'space',
    infoPage: { name: 'Box', path: 'web/box#Responsive-padding' },
    darkValues: false,
  },
  {
    name: 'Rounding',
    category: 'rounding',
    id: 'rounding',
    infoPage: { name: 'Box', path: 'web/box#Rounding' },
    darkValues: false,
    excludedItems: EXCLUSION_LIST,
  },
];

export type Token = {
  name: string;
  value: string;
  darkValue?: string;
  originalValue: string;
  originalDarkValue?: string;
  comment?: string;
  category: string;
};

const dataVizColorTokens: ReadonlyArray<Token> = dataVizTokens.sort((a, b) =>
  a.name.localeCompare(b.name, undefined, {
    numeric: true,
    sensitivity: 'base',
  }),
);

type Props = {
  tokens: ReadonlyArray<Token>;
};

export default function DesignTokensPage({ tokens }: Props) {
  const allTokens: ReadonlyArray<Token> = tokens;

  return (
    <Page title="Design tokens guidelines">
      <PageHeader
        description={`
Design tokens represent the values used within a design system to construct layouts and components, such as spacing and color. Because the tokens are an abstraction, the underlying value can change in different scenarios without affecting the designer or developer experience. [Learn more about Design Tokens](https://uxdesign.cc/design-tokens-cheatsheet-927fc1404099).

The design color tokens on this section, those that start with \`$color-\` are alias (or semantic tokens) as they give semantic usage information through their name. They point to Gestalt's base color tokens (hence the name "alias"). To learn more about the complete set of Gestalt's base color tokens, read our [extended color palette section](http://localhost:8888/foundations/color/palette#Extended-palette).
        `}
        name="Design tokens"
        type="guidelines"
      />
      <MainSection name="Token values">
        {tokenCategories.map(({ name, id, darkValues, infoPage, category, excludedItems }) => (
          <MainSection.Subsection
            key={`table${name}`}
            description={`
Visit the [${infoPage?.name} page](/${infoPage?.path}) for guidelines and usage.`}
            title={name}
          >
            <TokenTable
              category={category}
              darkValues={darkValues}
              data={(name === 'Data visualization' ? dataVizColorTokens : allTokens).filter(
                ({ name: tokenName }) =>
                  tokenName.startsWith(`${id}`) &&
                  !excludedItems?.some((item) => tokenName.startsWith(`${id}-${item}`)),
              )}
              excludedItems={excludedItems}
              id={id}
              name={name}
            />
          </MainSection.Subsection>
        ))}
      </MainSection>
    </Page>
  );
}

export async function getStaticProps() {
  return {
    props: {
      tokens: classicTokens,
    },
  };
}
