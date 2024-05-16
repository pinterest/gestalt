import PopoverEducational from './PopoverEducational';
import Text from './Text';
import renderWithExperiment from './utils/testing/renderWithExperiment';

describe('PopoverEducational', () => {
  it('renders correctly', () => {
    const element = document.createElement('div');
    const { container } = renderWithExperiment(
      'web_gestalt_popover_v2_popovereducational',
      <PopoverEducational
        accessibilityLabel="text"
        anchor={element}
        message="text"
        onDismiss={jest.fn()}
        primaryAction={{ text: 'next', role: 'button' }}
      />,
    );

    expect(container).toMatchSnapshot();
  });

  it('renders correctly with custom children', () => {
    const element = document.createElement('div');
    const { container } = renderWithExperiment(
      'web_gestalt_popover_v2_popovereducational',
      <PopoverEducational accessibilityLabel="text" anchor={element} onDismiss={jest.fn()}>
        <Text>Custom children</Text>
      </PopoverEducational>,
    );

    expect(container).toMatchSnapshot();
  });

  it('does not render when the anchor is null', () => {
    const { container } = renderWithExperiment(
      'web_gestalt_popover_v2_popovereducational',
      <PopoverEducational
        accessibilityLabel="text"
        anchor={null}
        message="text"
        onDismiss={() => {}}
        primaryAction={{ text: 'next', role: 'button' }}
      />,
    );

    expect(container).toMatchSnapshot();
  });
});
