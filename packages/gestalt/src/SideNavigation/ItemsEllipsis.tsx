import Box from '../Box';
import { useDefaultLabelContext } from '../contexts/DefaultLabelProvider';
import { useSideNavigation } from '../contexts/SideNavigationProvider';
import Icon from '../Icon';
import { type Props as TopItemProps } from '../SideNavigationTopItem';
import TapArea from '../TapArea';

export type Props = Pick<TopItemProps, 'active' | 'notificationAccessibilityLabel'> & {
  accessibilityLabel?: string;
};

export default function ItemsEllipsis({
  active,
  accessibilityLabel,
  notificationAccessibilityLabel,
}: Props) {
  const { setOverlayPreview } = useSideNavigation();
  const { accessibilityEllipsisLabel: deafultAccessibilityEllipsisLabel } =
    useDefaultLabelContext('SideNavigation');

  return (
    <TapArea
      accessibilityLabel={accessibilityLabel || deafultAccessibilityEllipsisLabel}
      onTap={() => setOverlayPreview(true)}
      rounding={2}
    >
      <Box
        alignItems="center"
        color={active === 'page' ? 'selected' : undefined}
        display="flex"
        height={44}
        justifyContent="center"
        position="relative"
        rounding={2}
        width={44}
      >
        {notificationAccessibilityLabel ? (
          <Box
            aria-label={notificationAccessibilityLabel}
            color="primary"
            dangerouslySetInlineStyle={{ __style: { top: 4, right: 4 } }}
            height={8}
            position="absolute"
            role="status"
            rounding="circle"
            width={8}
          />
        ) : null}

        <Box aria-hidden>
          <Icon
            accessibilityLabel=""
            color={active === 'page' ? 'inverse' : 'default'}
            icon="ellipsis"
            inline
            size={20}
          />
        </Box>
      </Box>
    </TapArea>
  );
}
