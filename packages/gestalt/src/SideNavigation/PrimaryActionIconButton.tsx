import {
  cloneElement,
  ComponentProps,
  forwardRef,
  ReactElement,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import Dropdown from '../Dropdown';
import Pog from '../Pog';
import MaybeTooltip from '../sharedSubcomponents/MaybeTooltip';
import TapArea from '../TapArea';
import useInteractiveStates from '../utils/useInteractiveStates';
import { CompositeZIndex, FixedZIndex, Indexable } from '../zIndex';

type Props = {
  icon?: 'ellipsis' | 'edit' | 'trash-can';
  onClick?: (arg1: {
    event: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>;
  }) => void;
  setCompression: (arg1: 'compress' | 'none') => void;
  forceIconButton: 'force' | 'default';
  setForceIconButton: (arg1: 'force' | 'default') => void;
  setShowIconButton: (arg1: 'show' | 'hide') => void;
  isItemActive: boolean;
  tooltip: {
    accessibilityLabel?: string;
    text: string;
    zIndex?: Indexable;
  };
  dropdownItems?: ReadonlyArray<ReactElement>;
};

type ItemIconButtonProps = ComponentProps<typeof TapArea> & {
  icon: ComponentProps<typeof Pog>['icon'];
  isItemActive: boolean;
  selected?: boolean;
};

export const ItemIconButton = forwardRef<HTMLDivElement, ItemIconButtonProps>(
  function ItemIconButton(
    {
      accessibilityControls,
      accessibilityExpanded,
      accessibilityLabel,
      selected,
      icon,
      isItemActive,
      children,
      onBlur,
      onFocus,
      onMouseEnter,
      onMouseLeave,
      onTap,
    },
    ref,
  ) {
    const {
      isHovered: hovered,
      isFocused: focused,
      handleOnMouseEnter,
      handleOnMouseLeave,
      handleOnFocus,
      handleOnBlur,
    } = useInteractiveStates();

    let bgColor = 'transparent';
    let iconColor = 'darkGray';

    if (!isItemActive && !hovered && !focused) {
      bgColor = 'transparent';
      iconColor = 'darkGray';
    }

    if (isItemActive && (hovered || focused)) {
      bgColor = 'gray';
      iconColor = 'white';
    }

    if (isItemActive && !hovered && !focused) {
      iconColor = 'white';
    }

    if (isItemActive && selected) {
      bgColor = 'white';
      iconColor = 'darkGray';
    }

    return (
      <TapArea
        ref={ref}
        accessibilityControls={accessibilityControls}
        accessibilityExpanded={accessibilityExpanded}
        accessibilityLabel={accessibilityLabel}
        onBlur={(event) => {
          handleOnBlur();
          onBlur?.(event);
        }}
        onFocus={(event) => {
          handleOnFocus();
          onFocus?.(event);
        }}
        onMouseEnter={(event) => {
          handleOnMouseEnter();
          onMouseEnter?.(event);
        }}
        onMouseLeave={(event) => {
          handleOnMouseLeave();
          onMouseLeave?.(event);
        }}
        onTap={({ event }) => {
          // We need event.stopPropagation(); so the SideNavigation.TopItem's onClick doesn't get trigger as well
          event.stopPropagation();
          onTap?.({ event });
        }}
        rounding="circle"
        tapStyle="compress"
      >
        <Pog
          accessibilityLabel=""
          active={(hovered || focused) && !isItemActive}
          // @ts-expect-error - TS2322 - Type 'string' is not assignable to type '"gray" | "red" | "white" | "transparent" | "transparentDarkGray" | "lightGray" | undefined'.
          bgColor={bgColor}
          icon={icon}
          // @ts-expect-error - TS2322 - Type 'string' is not assignable to type '"darkGray" | "gray" | "red" | "white" | "brandPrimary" | undefined'.
          iconColor={iconColor}
          selected={selected === true && !isItemActive}
          size="xs"
        />
        {children}
      </TapArea>
    );
  },
);

export default function PrimaryActionIconButton({
  icon = 'ellipsis',
  onClick,
  tooltip,
  dropdownItems,
  isItemActive,
  setShowIconButton,
  forceIconButton,
  setForceIconButton,
  setCompression,
}: Props) {
  const id = useId();

  const innerRef = useRef<null | HTMLDivElement>(null);

  const [selected, setSelected] = useState(dropdownItems ? false : undefined);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // As soon as Dropdown gets dismissed and unselects IconButton, we hide and stop forcing it
    if (forceIconButton === 'force' && selected === false) {
      setShowIconButton('hide');
      setForceIconButton?.('default');
    }
  }, [selected, forceIconButton, setShowIconButton, setForceIconButton]);

  const tooltipZIndex = tooltip?.zIndex
    ? new CompositeZIndex([new FixedZIndex(1), tooltip?.zIndex].filter(Boolean))
    : new FixedZIndex(1);
  const dropdownZIndex = new CompositeZIndex([tooltipZIndex]);

  return (
    <MaybeTooltip
      disabled={open}
      tooltip={{
        text: tooltip.text,
        accessibilityLabel: '',
        zIndex: tooltipZIndex,
      }}
    >
      <ItemIconButton
        ref={innerRef}
        accessibilityControls={id}
        accessibilityExpanded={open}
        accessibilityLabel={tooltip?.accessibilityLabel ?? tooltip.text}
        icon={icon}
        isItemActive={isItemActive}
        onBlur={() => {
          // With keyboard navigation, we want to hide IconButton if we keep tabbing without opening Dropdown
          // However, Dropdown captures focus, therefore, as soon as it opens could hide IconButton and unmount itself, never displaying
          // We prevent this by disabling this action until Dropdown gets dismissed and unselects IconButton
          if (typeof selected === 'undefined' || forceIconButton === 'default') {
            setShowIconButton('hide');
          }
        }}
        onFocus={() => setShowIconButton('show')}
        onMouseEnter={() => setCompression('none')}
        onMouseLeave={() => setCompression('compress')}
        onTap={({ event }) => {
          // As soon as IconButton gets clicked, we force its display, only if selected === false.
          // We don't force if selected ===  undefined, which would indicate there's no Dropdown associated, just an action
          if (selected === false) {
            setForceIconButton?.('force');
          }

          if (selected !== undefined) {
            setSelected((value) => !value);
            setOpen((value) => !value);
          }

          onClick?.({ event });
        }}
        rounding="circle"
        selected={selected}
        tapStyle="compress"
      >
        {open && (
          <Dropdown
            anchor={innerRef.current}
            id={id}
            onDismiss={() => {
              setSelected(false);
              setOpen(false);
            }}
            zIndex={dropdownZIndex}
          >
            {dropdownItems?.map((element, idx) =>
              cloneElement(element, {
                key: `sidenavigation-dropdown-item-${idx}`,
              }),
            )}
          </Dropdown>
        )}
      </ItemIconButton>
    </MaybeTooltip>
  );
}
