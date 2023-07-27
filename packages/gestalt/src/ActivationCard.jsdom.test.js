// @flow strict
import { render } from '@testing-library/react';
import ActivationCard from './ActivationCard.js';

describe('<ActivationCard />', () => {
  it('Pending ActivationCard', () => {
    const { container } = render(
      <ActivationCard
        status="pending"
        statusMessage="Pending"
        title="Claiming your website"
        message="We will notify you via email as soon as your site has been successfully claimed"
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('Needs attention ActivationCard', () => {
    const { container } = render(
      <ActivationCard
        status="needsAttention"
        statusMessage="Needs attention"
        title="Tag is unhealthy"
        message="Oops! Your tag has errors that need to be fixed"
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('Not started ActivationCard', () => {
    const { container } = render(
      <ActivationCard
        status="notStarted"
        statusMessage="Not started"
        title="Claim your website"
        message="Claim your website to unlock new features"
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('complete ActivationCard', () => {
    const { container } = render(
      <ActivationCard
        status="complete"
        statusMessage="Complete"
        title="Nice work"
        message="You are all done here"
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('message + title', () => {
    const { container } = render(
      <ActivationCard
        status="needsAttention"
        statusMessage="Needs attention"
        title="Tag is unhealthy"
        message="Oops! Your tag must be healthy to continue."
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('message + title + link', () => {
    const { container } = render(
      <ActivationCard
        status="needsAttention"
        statusMessage="Needs attention"
        title="Tag is unhealthy"
        message="Oops! Your tag must be healthy to continue."
        link={{
          href: 'https://pinterest.com',
          label: 'Learn more',
          accessibilityLabel: 'Learn more about tags',
        }}
      />,
    );
    expect(container).toMatchSnapshot();
  });
  it('message + title + link + dismissButton', () => {
    const { container } = render(
      <ActivationCard
        status="needsAttention"
        statusMessage="Needs attention"
        title="Tag is unhealthy"
        message="Oops! Your tag must be healthy to continue."
        link={{
          href: 'https://pinterest.com',
          label: 'Learn more',
          accessibilityLabel: 'Learn more about tags',
        }}
        dismissButton={{
          accessibilityLabel: 'Dismiss card',
          onDismiss: jest.fn(),
        }}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('ActivationCard handles onDismiss callback', () => {
    const mockOnDismiss = jest.fn<[], void>();
    const { getByLabelText } = render(
      <ActivationCard
        status="pending"
        statusMessage="Pending"
        title="Claiming your website"
        message="We will notify you via email as soon as your site has been successfully claimed"
        dismissButton={{
          accessibilityLabel: 'Dismiss card',
          onDismiss: mockOnDismiss,
        }}
      />,
    );
    getByLabelText('Dismiss card').click();
    expect(mockOnDismiss).toHaveBeenCalled();
  });
});
