import classicTokens from 'gestalt-design-tokens/dist/js/classic/tokens';
import MainSection from '../../../docs-components/MainSection';
import Page from '../../../docs-components/Page';
import PageHeader from '../../../docs-components/PageHeader';
import TokenTable from '../../../docs-components/TokenTable';

const tokenCategories: ReadonlyArray<{
  name: string;
  category: string;
  id: string;
  darkValues: boolean;
}> = [
  {
    name: 'Background color',
    category: 'color-background',
    id: 'color-background',
    darkValues: true,
  },
  {
    name: 'Border color',
    category: 'color-border',
    id: 'color-border',
    darkValues: true,
  },
  {
    name: 'Text color',
    category: 'color-text',
    id: 'color-text',
    darkValues: true,
  },
  {
    name: 'Icon color',
    category: 'color-icon',
    id: 'color-icon',
    darkValues: true,
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

const components = [
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

export default function DesignTokensPage(props: { tokens: { name: string }[] }) {
  const allTokens: ReadonlyArray<Token> = props.tokens;

  return (
    <Page title="Design component tokens">
      <PageHeader
        description="Component tokens are under development. We do not recommend their direct consumption as they will be subject to change and documented as minor/patch releases"
        name="Component tokens"
        type="guidelines"
      />
      {components.map((cmp) => (
        <MainSection key={cmp} name={cmp.charAt(0).toUpperCase() + cmp.slice(1)}>
          {tokenCategories.map(({ name, id, darkValues, category }) => {
            const existingTokens = allTokens.filter(({ name: tokenName }) =>
              tokenName.startsWith(`${id}-${cmp}-`),
            );

            return existingTokens.length > 0 ? (
              <MainSection.Subsection key={`table${cmp}${name}`} title={`${category}-${cmp}`}>
                <TokenTable
                  category={category}
                  darkValues={darkValues}
                  data={existingTokens}
                  id={id}
                  name={name}
                />
              </MainSection.Subsection>
            ) : null;
          })}
        </MainSection>
      ))}
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
