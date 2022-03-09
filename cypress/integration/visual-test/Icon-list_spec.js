describe('Button visual regression check', () => {
  beforeEach(() => {
    cy.visit('/visual-test/Icon-list');
  });

  it('Compares snapshots', () => {
    cy.get('[data-test-id="visual-test"]').toMatchImageSnapshot({
      name: 'Icon-list',
    });
  });
});
