// @flow strict
import { type Node } from 'react';
import { SlimBanner } from 'gestalt';
import { useAppContext } from './appContext.js';

export function BareSlimBannerExperiment({ componentName }: { componentName: string }): Node {
  const { experiments } = useAppContext();

  return (
    <SlimBanner
      iconAccessibilityLabel="Component under experiment"
      message={
        experiments === componentName
          ? `The current ${componentName} example is displaying experimental changes.`
          : `The current ${componentName} example is NOT displaying experimental changes.`
      }
      type="warningBare"
      helperLink={{
        text:
          experiments === componentName
            ? 'Learn more and/or deactivate the experimental changes.'
            : 'Learn more and/or activate the experimental changes.',
        accessibilityLabel: '',
        href: '#',
        onClick: () => {},
      }}
    />
  );
}

export function SlimBannerExperiment({
  componentName,
  description,
  pullRequest,
  section,
}: {
  componentName: string,
  description: string,
  pullRequest: number,
  section: string,
}): Node {
  const { experiments, setExperiments } = useAppContext();

  return (
    <SlimBanner
      iconAccessibilityLabel="Component under experiment"
      message={`${componentName} is under an experiment to ${description}.`}
      type="warning"
      helperLink={{
        text: 'Visit the Pull Request to learn more.',
        accessibilityLabel: '',
        href: `https://github.com/pinterest/gestalt/pull/${pullRequest}/`,
        onClick: () => {},
        target: 'blank',
      }}
      primaryAction={{
        accessibilityLabel:
          experiments === componentName
            ? 'Deactivate component experiments in the Docs'
            : 'Activate component experiments in the Docs',
        label: experiments === componentName ? 'Deactivate experiments' : 'Activate experiments',
        onClick: () => setExperiments(experiments === componentName ? '' : componentName),
        href: section,
        role: 'link',
      }}
    />
  );
}
