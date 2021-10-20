describe('Tag visual dark mode regression check', () => {
  beforeEach(() => {
    cy.visit('/visual-test/Tag-dark');
  });

  it('Compares screenshots', () => {
    cy.get('[data-test-id="visual-test"]').toMatchImageSnapshot({
      name: 'Tag-dark',
    });
  });
});
