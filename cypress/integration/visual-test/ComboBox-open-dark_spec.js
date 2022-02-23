describe('ComboBox visual regression check', () => {
  beforeEach(() => {
    cy.visit('/visual-test/ComboBox-open-dark');
  });

  it('Compares screenshots', () => {
    cy.get('[data-test-id="visual-test"]').find('label').click();
    cy.get('[data-test-id="visual-test"]').toMatchImageSnapshot({
      name: 'ComboBox-open-dark',
    });
  });
});
