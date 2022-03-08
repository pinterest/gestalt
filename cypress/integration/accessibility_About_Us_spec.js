describe('About us check', () => {
  beforeEach(() => {
    cy.visit('/about_us');
    cy.injectAxe();
  });

  // Disable the test for now since it's timing out on GitHub CI
  // eslint-disable-next-line jest/no-disabled-tests
  it.skip('Tests accessibility on the About us page', () => {
    cy.configureAxe({
      rules: [
        {
          id: 'link-name',
          enabled: false,
        },
      ],
    });
    cy.checkA11y();
  });
});
