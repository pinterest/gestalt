// @flow strict

import { type Node as ReactNode } from 'react';
import tokens from 'gestalt-design-tokens/dist/js/tokens';
import MainSection from '../../../docs-components/MainSection';
import Page from '../../../docs-components/Page';
import PageHeader from '../../../docs-components/PageHeader';
import TokenTable from '../../../docs-components/TokenTable';

const tokenCategories: $ReadOnlyArray<{
  name: string,
  category: string,
  id: string,
  darkValues: boolean,
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
  name: string,
  value: string,
  darkValue?: string,
  originalValue: string,
  originalDarkValue?: string,
  comment?: string,
  category: string,
};

const allTokens: $ReadOnlyArray<Token> = tokens;

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

export default function DesignTokensPage(): ReactNode {
  return (
    <Page title="Design component tokens">
      <PageHeader
        name="Component tokens"
        description="Component tokens are under development. We do not recommend their direct consumption as they will be subject to change and documented as minor/patch releases"
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
                  name={name}
                  id={id}
                  darkValues={darkValues}
                  category={category}
                  data={existingTokens}
                />
              </MainSection.Subsection>
            ) : null;
          })}
        </MainSection>
      ))}
    </Page>
  );
}
