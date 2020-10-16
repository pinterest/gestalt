describe('ModuleExpandable Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/ModuleExpandable');
    cy.injectAxe();
  });

  it('Tests accessibility on the ModuleExpandable page', () => {
    cy.checkA11y();
  });
});
