// @flow strict
import { type ElementConfig, type Node as ReactNode } from 'react';
import styles from '../BannerOverlay.css';
import Button from '../Button';
import ButtonLink from '../ButtonLink';

type Props =
  | {
      accessibilityLabel: string,
      color: 'red' | 'gray',
      href: string,
      label: string,
      onClick?: $ElementType<ElementConfig<typeof ButtonLink>, 'onClick'>,
      rel?: $ElementType<ElementConfig<typeof ButtonLink>, 'rel'>,
      role: 'link',
      size?: $ElementType<ElementConfig<typeof ButtonLink>, 'size'>,
      target?: $ElementType<ElementConfig<typeof ButtonLink>, 'target'>,
    }
  | {
      accessibilityLabel: string,
      color: 'red' | 'gray',
      label: string,
      onClick: $ElementType<ElementConfig<typeof Button>, 'onClick'>,
      role: 'button',
      size?: $ElementType<ElementConfig<typeof Button>, 'size'>,
    };

export default function CallToAction({
  accessibilityLabel,
  label,
  size = 'lg',
  ...props
}: Props): ReactNode {
  if (props.role === 'link')
    return (
      <div className={styles.parentButton}>
        <ButtonLink
          accessibilityLabel={accessibilityLabel}
          color={props.color}
          href={props.href ?? ''}
          onClick={props.onClick}
          rel={props.rel}
          target={props.target}
          text={label}
          size={size}
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
