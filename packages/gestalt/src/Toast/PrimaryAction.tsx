import { ComponentProps } from 'react';
import Button from '../Button';
import ButtonLink from '../ButtonLink';
import useInExperiment from '../useInExperiment';

type Props =
  | {
      accessibilityLabel: string;
      href: string;
      label: string;
      onClick?: ComponentProps<typeof ButtonLink>['onClick'];
      rel?: ComponentProps<typeof ButtonLink>['rel'];
      role: 'link';
      size?: ComponentProps<typeof ButtonLink>['size'];
      target?: ComponentProps<typeof ButtonLink>['target'];
    }
  | {
      accessibilityLabel: string;
      label: string;
      onClick: ComponentProps<typeof Button>['onClick'];
      role: 'button';
      size?: ComponentProps<typeof Button>['size'];
    };

export default function PrimaryAction({ accessibilityLabel, label, size = 'lg', ...props }: Props) {
  const isInExperiment = useInExperiment({
    webExperimentName: 'web_gestalt_visualrefresh',
    mwebExperimentName: 'web_gestalt_visualrefresh',
  });

  if (props.role === 'link')
    return (
      <ButtonLink
        accessibilityLabel={accessibilityLabel}
        color="white"
        href={props.href ?? ''}
        onClick={props.onClick}
        rel={props.rel}
        size={size}
        target={props.target}
        text={label}
      />
    );

  return (
    <Button
      accessibilityLabel={accessibilityLabel}
      color={isInExperiment ? 'white' : undefined}
      onClick={props.onClick}
      size={size}
      text={label}
    />
  );
}
