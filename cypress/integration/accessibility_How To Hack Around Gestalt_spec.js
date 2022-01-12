describe('How to Hack Around Gestalt Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/how_to_hack_around_gestalt');
    cy.injectAxe();
  });

  // Disable the test for now since it's timing out on GitHub CI
  // eslint-disable-next-line jest/no-disabled-tests
  it.skip('Tests accessibility on the How To Hack Around Gestalt page', () => {
    cy.configureAxe({
      rules: [
        // {
        //   id: 'link-name',
        //   enabled: false,
        // },
      ],
    });
    cy.checkA11y();
  });
});
