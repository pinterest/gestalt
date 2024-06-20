import TapArea, { Props as TapAreaProps } from '../TapArea';
import TapAreaLink, { Props as TapAreaLinkProps } from '../TapAreaLink';

type TProps = Pick<TapAreaProps, 'accessibilityControls' | 'accessibilityExpanded' | 'tapStyle'> & {
  accessibilityCurrent?: TapAreaLinkProps['accessibilityCurrent'];
  children: JSX.Element;
  href?: string;
  isExpandable: boolean | undefined;
  onLinkClick?: TapAreaLinkProps['onTap'];
  onTap: () => void;
  onBlur: () => void;
  onFocus: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
};

export default function SideNavigationGroupItemTapControl({
  accessibilityControls,
  accessibilityCurrent,
  accessibilityExpanded,
  children,
  onLinkClick,
  onTap,
  href,
  isExpandable,
  tapStyle,
  onBlur,
  onFocus,
  onMouseEnter,
  onMouseLeave,
}: TProps) {
  if (href) {
    return (
      <TapAreaLink
        accessibilityCurrent={accessibilityCurrent}
        href={href}
        onBlur={onBlur}
        onFocus={onFocus}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onTap={(e) => {
          onLinkClick?.(e);
          onTap?.();
        }}
        rounding={2}
        tapStyle={tapStyle}
      >
        {children}
      </TapAreaLink>
    );
  }

  if (isExpandable) {
    return (
      <TapArea
        accessibilityControls={accessibilityControls}
        accessibilityExpanded={accessibilityExpanded}
        onBlur={onBlur}
        onFocus={onFocus}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onTap={onTap}
        rounding={2}
        tapStyle={tapStyle}
      >
        {children}
      </TapArea>
    );
  }

  return children;
}
