describe('Datapoint dark mode visual regression check', () => {
  beforeEach(() => {
    cy.visit('/visual-test/Datapoint-dark');
  });

  it('Compares screenshots', () => {
    cy.get('[data-test-id="visual-test"]').toMatchImageSnapshot({
      name: 'Datapoint-dark',
    });
  });
});
