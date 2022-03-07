describe('RadioButton visual regression check', () => {
  beforeEach(() => {
    cy.visit('/visual-test/RadioButton');
  });

  it('Compares screenshots', () => {
    cy.get('[data-test-id="visual-test"]').toMatchImageSnapshot({
      name: 'RadioButton',
    });
  });
});
