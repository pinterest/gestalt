import { Props as ItemContentProps } from './ItemContent';
import Box from '../Box';
import Icon from '../Icon';
import IconButton, { Props as IconButtonProps } from '../IconButton';
import useInteractiveStates from '../utils/useInteractiveStates';

type Props = Pick<ItemContentProps, 'active'> & {
  expanded: boolean;
  isLink?: boolean;
  expandIconButtonProps?: Pick<
    IconButtonProps,
    'accessibilityControls' | 'accessibilityExpanded' | 'onClick'
  >;
};

export default function GroupExpandIconButton({
  expanded,
  active,
  isLink: hasLink,
  expandIconButtonProps,
}: Props) {
  const {
    handleOnBlur,
    handleOnFocus,
    handleOnMouseEnter,
    handleOnMouseLeave,
    isHovered,
    isFocused,
  } = useInteractiveStates();
  const activeIconButtonColor = isFocused || isHovered ? 'gray' : 'transparent';

  if (!hasLink) {
    return (
      <Box
        alignItems="center"
        aria-hidden
        display="flex"
        height={24}
        justifyContent="center"
        marginEnd={-2}
        rounding="circle"
        tabIndex={-1}
        width={24}
      >
        <Icon
          accessibilityLabel=""
          color={active ? 'inverse' : 'default'}
          icon={expanded ? 'arrow-up' : 'arrow-down'}
          size={12}
        />
      </Box>
    );
  }

  return (
    <IconButton
      accessibilityControls={expandIconButtonProps?.accessibilityControls}
      accessibilityExpanded={expandIconButtonProps?.accessibilityExpanded}
      accessibilityLabel=""
      bgColor={active ? activeIconButtonColor : 'transparent'}
      icon={expanded ? 'arrow-up' : 'arrow-down'}
      iconColor={active ? 'white' : 'darkGray'}
      onBlur={handleOnBlur}
      onClick={(arg) => {
        arg.event.preventDefault();
        arg.event.stopPropagation();
        expandIconButtonProps?.onClick?.(arg);
      }}
      onFocus={handleOnFocus}
      onKeyDown={({ event }) => event.stopPropagation()}
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
      size="xs"
    />
  );
}
