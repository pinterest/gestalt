describe('DeviceTypeProvider Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/devicetypeprovider');
    cy.injectAxe();
  });

  it('Tests accessibility on the DeviceTypeProvider page', () => {
    cy.configureAxe();
    cy.checkA11y();
  });
});
