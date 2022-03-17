describe('Dropdown visual regression check', () => {
  beforeEach(() => {
    cy.visit('/visual-test/Dropdown-open-dark');
  });

  it('Compares snapshots', () => {
    cy.get('[data-test-id="visual-test"]').find('button').click();
    cy.get('[data-test-id="visual-test"]').toMatchImageSnapshot({
      name: 'Dropdown-open-dark',
      imageConfig: {
        threshold: 0.001,
        thresholdType: 'percent',
      },
    });
  });
});
