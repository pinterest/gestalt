describe('TextArea visual regression check', () => {
  beforeEach(() => {
    cy.visit('/visual-test/TextArea');
  });

  it('Compares screenshots', () => {
    cy.get('[data-test-id="visual-test"]').toMatchImageSnapshot({
      name: 'TextArea',
    });
  });
});
