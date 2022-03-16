describe('PageHeader visual dark mode regression check', () => {
  beforeEach(() => {
    cy.visit('/visual-test/PageHeader-dark');
  });

  it('Compares snapshots', () => {
    cy.get('[data-test-id="visual-test"]').toMatchImageSnapshot({
      name: 'PageHeader-dark',
    });
  });
});
