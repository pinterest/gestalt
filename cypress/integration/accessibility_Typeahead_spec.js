describe('Typeahead Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/Typeahead');
    cy.injectAxe();
  });

  // eslint-disable-next-line jest/no-disabled-tests
  it.skip('Tests accessibility on the Typeahead page', () => {
    cy.checkA11y();
  });
});
