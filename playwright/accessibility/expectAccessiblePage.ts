import AxeBuilder from '@axe-core/playwright';
import { expect } from '@playwright/test';

export default async function expectAccessiblePage(
  // @ts-expect-error - TS7031 - Binding element 'page' implicitly has an 'any' type. | TS7031 - Binding element 'rules' implicitly has an 'any' type.
  { page, rules },
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
  ${target.join('\n')}`,
  )}
    `,
        )
        .join('\n'),
    );
  }

  expect(violations.length).toEqual(0);
}
