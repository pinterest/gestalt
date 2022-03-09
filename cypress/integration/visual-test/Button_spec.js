describe('Button visual regression check', () => {
  beforeEach(() => {
    cy.visit('/visual-test/Button');
  });

  it('Compares snapshots', () => {
    cy.get('[data-test-id="visual-test"]').toMatchImageSnapshot({
      name: 'Button',
    });
  });
});
