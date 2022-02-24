describe('Badge dark mode visual regression check', () => {
  beforeEach(() => {
    cy.visit('/visual-test/Badge-dark');
  });

  it('Compares screenshots', () => {
    cy.get('[data-test-id="visual-test"]').toMatchImageSnapshot({
      name: 'Badge-dark',
    });
  });
});
