describe('Text dark mode visual regression check', () => {
  beforeEach(() => {
    cy.visit('/visual-test/Text-dark');
  });

  it('Compares screenshots', () => {
    cy.get('[data-test-id="visual-test"]').toMatchImageSnapshot({
      name: 'Text-dark',
    });
  });
});
