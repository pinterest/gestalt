function logA11yViolations(violations) {
  cy.task(
    'logToTerminal',
    `${violations.length} accessibility violation${violations.length === 1 ? '' : 's'} ${
      violations.length === 1 ? 'was' : 'were'
    } detected`,
  );

  // Overview of accessibility violations
  cy.task(
    'table',
    violations.map(({ id, impact, description, nodes }) => ({
      id,
      impact,
      description,
      nodes: nodes.length,
    })),
  );

  // In depth description of each violation
  cy.task(
    'logToTerminal',
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

Cypress.Commands.overwrite('checkA11y', (originalFn, context, options) => {
  return originalFn(context, options, logA11yViolations);
});

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
