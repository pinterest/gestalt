describe('ActivationCard dark mode visual regression check', () => {
  beforeEach(() => {
    cy.visit('/visual-test/ActivationCard-dark');
  });

  it('Compares snapshots', () => {
    cy.get('[data-test-id="visual-test"]').toMatchImageSnapshot({
      name: 'ActivationCard-dark',
    });
  });
});
