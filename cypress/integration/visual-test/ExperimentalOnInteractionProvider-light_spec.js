describe('ExperimentalOnInteractionProvider light mode visual regression check', () => {
  beforeEach(() => {
    cy.visit('/visual-test/ExperimentalOnInteractionProvider-light');
  });

  // eslint-disable-next-line jest/expect-expect
  it('Compares screenshots', () => {
    cy.get('[data-test-id="visual-test"]').toMatchImageSnapshot({
      name: 'ExperimentalOnInteractionProvider-light',
    });
  });
});
