describe('ComponentName dark mode visual regression check', () => {
  beforeEach(() => {
    cy.visit('/visual-test/ComponentName-dark');
  });

  // eslint-disable-next-line jest/expect-expect
  it('Compares snapshots', () => {
    cy.get('[data-test-id="visual-test"]').toMatchImageSnapshot({
      name: 'ComponentName-dark',
      imageConfig: {
        threshold: 0.001,
        thresholdType: 'percent',
      },
    });
  });
});
