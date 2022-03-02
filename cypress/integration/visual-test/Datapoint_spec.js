describe('Datapoint visual regression check', () => {
  beforeEach(() => {
    cy.visit('/visual-test/Datapoint');
  });

  it('Compares screenshots', () => {
    cy.get('[data-test-id="visual-test"]').toMatchImageSnapshot({
      name: 'Datapoint',
    });
  });
});
