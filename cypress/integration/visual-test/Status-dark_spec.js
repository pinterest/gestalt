describe('Status dark mode visual regression check', () => {
  beforeEach(() => {
    cy.visit('/visual-test/Status-dark');
  });

  it('Compares screenshots', () => {
    cy.get('[data-test-id="visual-test"]').toMatchImageSnapshot({
      name: 'Status-dark',
    });
  });
});
