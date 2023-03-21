// @flow strict
import { expect } from '@playwright/test';
import axe from '@axe-core/playwright';

const AxeBuilder = axe.default;

export default async function expectAccessiblePage(
  // $FlowFixMe[unclear-type]
  { page, rules } /*: {| page: any, rules?: any |} */
) {
  const { violations } = await new AxeBuilder({ page })
    .options({ rules })
    .exclude('iframe')
    .exclude('.live-editor-pane')
    .exclude('.skip-accessibility-check')
    .exclude('.sp-layout')
    .analyze();

  if (violations.length > 0) {
    // eslint-disable-next-line no-console
    console.log(
      violations
        .map(
          ({ id, impact, description, help, helpUrl, nodes }, index) =>
            `

  #${index}
  id: ${id}
  impact: ${impact}
  description: ${description}
  help: ${help}
  helpUrl: ${helpUrl}
  nodes: ${nodes.map(
    ({ failureSummary, html, target }, nodeIndex) => `

  #${index}.${nodeIndex}
  failureSummary:
  ${failureSummary}

  html:
  ${html}

  target:
  ${target.join('\n')}`
  )}
    `
        )
        .join('\n')
    );
  }

  expect(violations.length).toEqual(0);
}
