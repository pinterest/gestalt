// @flow strict
import PopoverEducational from './PopoverEducational';
import renderWithExperiment from './utils/testing/renderWithExperiment';

test('PopoverEducational renders', () => {
  const element = document.createElement('div');
  // Remove experiment after PopoverEducational v2 is fully released
  const { container } = renderWithExperiment(
    'web_gestalt_popover_v2_popovereducational',
    <PopoverEducational
      accessibilityLabel="test"
      anchor={element}
      onDismiss={jest.fn()}
      size="sm"
      message="text"
      primaryAction={{ text: 'next', role: 'button', onClick: () => {} }}
    />,
  );

  expect(container).toMatchSnapshot();
});
