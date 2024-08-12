import { type ComponentProps } from 'react';
import styles from '../BannerOverlay.css';
import Button from '../Button';
import ButtonLink from '../ButtonLink';

type Props =
  | {
      accessibilityLabel: string;
      color: 'red' | 'gray';
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
      color: 'red' | 'gray';
      label: string;
      onClick: ComponentProps<typeof Button>['onClick'];
      role: 'button';
      size?: ComponentProps<typeof Button>['size'];
    };

export default function CallToAction({ accessibilityLabel, label, size = 'lg', ...props }: Props) {
  if (props.role === 'link')
    return (
      <div className={styles.parentButton}>
        <ButtonLink
          accessibilityLabel={accessibilityLabel}
          color={props.color}
          href={props.href ?? ''}
          onClick={props.onClick}
          rel={props.rel}
          size={size}
          target={props.target}
          text={label}
        />
      </div>
    );

  return (
    <div className={styles.parentButton}>
      <Button
        accessibilityLabel={accessibilityLabel}
        color={props.color}
        onClick={props.onClick}
        size={size}
        text={label}
      />
    </div>
  );
}
