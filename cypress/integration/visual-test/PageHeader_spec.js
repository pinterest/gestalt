describe('PageHeader visual regression check', () => {
  beforeEach(() => {
    cy.visit('/visual-test/PageHeader');
  });

  it('Compares snapshots', () => {
    cy.get('[data-test-id="visual-test"]').toMatchImageSnapshot({
      name: 'PageHeader',
    });
  });
});
