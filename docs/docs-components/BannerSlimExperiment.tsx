import { ReactNode } from 'react';
import { useRouter } from 'next/router';
import { BannerSlim } from 'gestalt';
import { useAppContext } from './appContext';

export function BareBannerSlimExperiment({ componentName }: { componentName: string }) {
  const { experiments } = useAppContext();

  return (
    <BannerSlim
      helperLink={{
        text:
          experiments === componentName
            ? 'Learn more and/or deactivate the experimental changes.'
            : 'Learn more and/or activate the experimental changes.',
        accessibilityLabel: '',
        href: '#',
        onClick: () => {},
      }}
      iconAccessibilityLabel="Component under experiment"
      message={
        experiments === componentName
          ? `The current ${componentName} example is displaying experimental changes.`
          : `The current ${componentName} example is NOT displaying experimental changes.`
      }
      type="warningBare"
    />
  );
}

export function BannerSlimExperiment({
  componentName,
  description,
  pullRequest,
  section,
}: {
  componentName: string;
  description: string;
  pullRequest: number;
  section?: string;
}) {
  const router = useRouter();
  const { experiments, setExperiments } = useAppContext();

  return (
    <BannerSlim
      helperLink={{
        text: 'Visit the Pull Request to learn more.',
        accessibilityLabel: '',
        href: `https://github.com/pinterest/gestalt/pull/${pullRequest}/`,
        onClick: () => {},
        target: 'blank',
      }}
      iconAccessibilityLabel="Component under experiment"
      message={`${componentName} is under an experiment to ${description}.`}
// @ts-expect-error - TS2322 - Type '{ href?: string | undefined; role?: "link" | undefined; accessibilityLabel: string; label: string; onClick: () => void; }' is not assignable to type '{ accessibilityLabel: string; disabled?: boolean | undefined; href: string | undefined; label: string; onClick?: AbstractEventHandler<MouseEvent<HTMLAnchorElement, MouseEvent> | KeyboardEvent<...>, {}> | undefined; rel?: RelType | undefined; role: "link"; target?: TargetType | undefined; } | { ...; } | undefined'.
      primaryAction={{
        accessibilityLabel:
          experiments === componentName
            ? 'Deactivate component experiments in the Docs'
            : 'Activate component experiments in the Docs',
        label: experiments === componentName ? 'Deactivate experiments' : 'Activate experiments',
        onClick: () => {
          setExperiments(experiments === componentName ? '' : componentName);
          if (!section) router.reload();
        },
        ...(!!section && {
          href: section,
          role: 'link',
        }),
      }}
      type="warning"
    />
  );
}
