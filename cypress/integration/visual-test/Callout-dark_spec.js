describe('Callout dark mode visual regression check', () => {
  beforeEach(() => {
    cy.visit('/visual-test/Callout-dark');
  });

  it('Compares snapshots', () => {
    cy.get('[data-test-id="visual-test"]').toMatchImageSnapshot({
      name: 'Callout-dark',
    });
  });
});
