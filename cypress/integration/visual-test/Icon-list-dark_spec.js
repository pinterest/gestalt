describe('Button dark mode visual regression check', () => {
  beforeEach(() => {
    cy.visit('/visual-test/Icon-list-dark');
  });

  it('Compares snapshots', () => {
    cy.get('[data-test-id="visual-test"]').toMatchImageSnapshot({
      name: 'Icon-list-dark',
    });
  });
});
