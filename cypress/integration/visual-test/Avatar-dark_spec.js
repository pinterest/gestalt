describe('Avatar dark mode visual regression check', () => {
  beforeEach(() => {
    cy.visit('/visual-test/Avatar-dark');
  });

  it('Compares screenshots', () => {
    cy.get('[data-test-id="visual-test"]').toMatchImageSnapshot({
      name: 'Avatar-dark',
    });
  });
});
