import axe from '@axe-core/playwright';
import { expect } from '@playwright/test';

// @ts-expect-error - TS2339 - Property 'default' does not exist on type 'typeof AxeBuilder'.
const AxeBuilder = axe.default;

export default async function expectAccessiblePage(
// @ts-expect-error - TS7031 - Binding element 'page' implicitly has an 'any' type. | TS7031 - Binding element 'rules' implicitly has an 'any' type.
  { page, rules } /*: {| page: any, rules?: any |} */,
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
// @ts-expect-error - TS7031 - Binding element 'id' implicitly has an 'any' type. | TS7031 - Binding element 'impact' implicitly has an 'any' type. | TS7031 - Binding element 'description' implicitly has an 'any' type. | TS7031 - Binding element 'help' implicitly has an 'any' type. | TS7031 - Binding element 'helpUrl' implicitly has an 'any' type. | TS7031 - Binding element 'nodes' implicitly has an 'any' type. | TS7006 - Parameter 'index' implicitly has an 'any' type.
          ({ id, impact, description, help, helpUrl, nodes }, index) =>
            `

  #${index}
  id: ${id}
  impact: ${impact}
  description: ${description}
  help: ${help}
  helpUrl: ${helpUrl}
  nodes: ${nodes.map(
// @ts-expect-error - TS7031 - Binding element 'failureSummary' implicitly has an 'any' type. | TS7031 - Binding element 'html' implicitly has an 'any' type. | TS7031 - Binding element 'target' implicitly has an 'any' type. | TS7006 - Parameter 'nodeIndex' implicitly has an 'any' type.
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
