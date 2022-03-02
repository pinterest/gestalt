describe('ComboBox visual regression check', () => {
  beforeEach(() => {
    cy.visit('/visual-test/ComboBox-closed-dark');
  });

  it('Compares screenshots', () => {
    cy.get('[data-test-id="visual-test"]').toMatchImageSnapshot({
      name: 'ComboBox-closed-dark',
    });
  });
});
