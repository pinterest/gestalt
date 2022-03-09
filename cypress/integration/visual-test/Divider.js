describe('Divider visual regression check', () => {
  beforeEach(() => {
    cy.visit('/visual-test/Divider');
  });

  it('Compares snapshots', () => {
    cy.get('[data-test-id="visual-test"]').toMatchImageSnapshot({
      name: 'Divider',
    });
  });
});
