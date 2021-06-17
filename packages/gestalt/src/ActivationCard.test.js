// @flow strict
import { create } from 'react-test-renderer';
import ActivationCard from './ActivationCard.js';

describe('<ActivationCard />', () => {
  test('Pending ActivationCard', () => {
    const tree = create(
      <ActivationCard
        status="pending"
        statusMessage="Pending"
        title="Claiming your website"
        message="We will notify you via email as soon as your site has been successfully claimed"
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Needs attention ActivationCard', () => {
    const tree = create(
      <ActivationCard
        status="needsAttention"
        statusMessage="Needs attention"
        title="Tag is unhealthy"
        message="Oops! Your tag has errors that need to be fixed"
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Not started ActivationCard', () => {
    const tree = create(
      <ActivationCard
        status="notStarted"
        statusMessage="Not started"
        title="Claim your website"
        message="Claim your website to unlock new features"
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('complete ActivationCard', () => {
    const tree = create(
      <ActivationCard
        status="complete"
        statusMessage="Complete"
        title="Nice work"
        message="You are all done here"
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('message + title', () => {
    const tree = create(
      <ActivationCard
        status="needsAttention"
        statusMessage="Needs attention"
        title="Tag is unhealthy"
        message="Oops! Your tag must be healthy to continue."
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('message + title + link', () => {
    const tree = create(
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
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('message + title + link + dismissButton', () => {
    const tree = create(
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
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
