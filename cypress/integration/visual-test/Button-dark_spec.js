describe('Button dark mode visual regression check', () => {
  beforeEach(() => {
    cy.visit('/visual-test/Button-dark');
  });

  it('Compares screenshots', () => {
    cy.get('[data-test-id="visual-test"]').toMatchImageSnapshot({
      name: 'Button-dark',
    });
  });
});
