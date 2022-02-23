describe('Checkbox visual regression check', () => {
  beforeEach(() => {
    cy.visit('/visual-test/Checkbox');
  });

  it('Compares screenshots', () => {
    cy.get('[data-test-id="visual-test"]').toMatchImageSnapshot({
      name: 'Checkbox',
    });
  });
});
