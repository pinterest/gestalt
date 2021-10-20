describe('Tag visual regression check', () => {
  beforeEach(() => {
    cy.visit('/visual-test/Tag');
  });

  it('Compares screenshots', () => {
    cy.get('[data-test-id="visual-test"]').toMatchImageSnapshot({
      name: 'Tag',
    });
  });
});
