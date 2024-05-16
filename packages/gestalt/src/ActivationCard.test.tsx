import {create} from 'react-test-renderer';
import ActivationCard from './ActivationCard';

describe('<ActivationCard />', () => {
  test('Pending ActivationCard', () => {
    const tree = create(
      <ActivationCard
        message="We will notify you via email as soon as your site has been successfully claimed"
        status="pending"
        statusMessage="Pending"
        title="Claiming your website"
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Needs attention ActivationCard', () => {
    const tree = create(
      <ActivationCard
        message="Oops! Your tag has errors that need to be fixed"
        status="needsAttention"
        statusMessage="Needs attention"
        title="Tag is unhealthy"
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Not started ActivationCard', () => {
    const tree = create(
      <ActivationCard
        message="Claim your website to unlock new features"
        status="notStarted"
        statusMessage="Not started"
        title="Claim your website"
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('complete ActivationCard', () => {
    const tree = create(
      <ActivationCard
        message="You are all done here"
        status="complete"
        statusMessage="Complete"
        title="Nice work"
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('message + title', () => {
    const tree = create(
      <ActivationCard
        message="Oops! Your tag must be healthy to continue."
        status="needsAttention"
        statusMessage="Needs attention"
        title="Tag is unhealthy"
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('message + title + link', () => {
    const tree = create(
      <ActivationCard
        link={{
          href: 'https://pinterest.com',
          label: 'Learn more',
          accessibilityLabel: 'Learn more about tags',
        }}
        message="Oops! Your tag must be healthy to continue."
        status="needsAttention"
        statusMessage="Needs attention"
        title="Tag is unhealthy"
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('message + title + link + dismissButton', () => {
    const tree = create(
      <ActivationCard
        dismissButton={{
          accessibilityLabel: 'Dismiss card',
          onDismiss: jest.fn(),
        }}
        link={{
          href: 'https://pinterest.com',
          label: 'Learn more',
          accessibilityLabel: 'Learn more about tags',
        }}
        message="Oops! Your tag must be healthy to continue."
        status="needsAttention"
        statusMessage="Needs attention"
        title="Tag is unhealthy"
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
