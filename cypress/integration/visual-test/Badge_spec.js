describe('Badge visual regression check', () => {
  beforeEach(() => {
    cy.visit('/visual-test/Badge');
  });

  it('Compares snapshots', () => {
    cy.get('[data-test-id="visual-test"]').toMatchImageSnapshot({
      name: 'Badge',
    });
  });
});
