describe('ComboBox visual regression check', () => {
  beforeEach(() => {
    cy.visit('/visual-test/ComboBox-open');
  });

  it('Compares snapshots', () => {
    cy.get('[data-test-id="visual-test"]').find('label').first().click();
    cy.get('[data-test-id="visual-test"]').toMatchImageSnapshot({
      name: 'ComboBox-open',
    });
  });
});
