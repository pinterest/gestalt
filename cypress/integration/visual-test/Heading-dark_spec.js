describe('Heading dark mode visual regression check', () => {
  beforeEach(() => {
    cy.visit('/visual-test/Heading-dark');
  });

  it('Compares snapshots', () => {
    cy.get('[data-test-id="visual-test"]').toMatchImageSnapshot({
      name: 'Heading-dark',
    });
  });
});
