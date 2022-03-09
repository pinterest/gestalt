describe('Text visual regression check', () => {
  beforeEach(() => {
    cy.visit('/visual-test/Text');
  });

  it('Compares snapshots', () => {
    cy.get('[data-test-id="visual-test"]').toMatchImageSnapshot({
      name: 'Text',
    });
  });
});
