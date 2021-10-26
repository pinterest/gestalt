import type { Node } from "react";
import { Fragment, useCallback, useState, useEffect } from "react";
import Box from "./Box";
import Divider from "./Divider";
import ModuleExpandableItem from "./ModuleExpandableItem";
import type {
  PublicModuleExpandableProps,
  PublicModuleExpandableItemProps,
} from "./moduleTypes";

function getExpandedId(
  expandedIndex: number | null | undefined
): number | null | undefined {
  return Number.isFinite(expandedIndex) ? expandedIndex : null;
}
/**
 * https://gestalt.pinterest.systems/Module
 */

export default function ModuleExpandable({
  accessibilityExpandLabel,
  accessibilityCollapseLabel,
  expandedIndex,
  id,
  items,
  onExpandedChange,
}: PublicModuleExpandableProps): Node {
  const [expandedId, setExpandedId] = useState<number | null | undefined>(
    getExpandedId(expandedIndex)
  );
  useEffect(() => {
    setExpandedId(getExpandedId(expandedIndex));
  }, [expandedIndex, setExpandedId]);
  const buildOnModuleClickHandler = useCallback(
    (index: number) => (isExpanded: boolean): void => {
      if (onExpandedChange) {
        onExpandedChange(isExpanded ? null : index);
      }

      setExpandedId(isExpanded ? null : index);
    },
    [onExpandedChange]
  );
  return (
    <Box borderStyle="shadow" rounding={4}>
      {items.map((props: PublicModuleExpandableItemProps, index) => {
        const {
          children,
          iconAccessibilityLabel,
          summary,
          title,
          type,
        } = props;
        return (
          <Fragment key={index}>
            {index > 0 && <Divider />}
            <ModuleExpandableItem
              accessibilityCollapseLabel={accessibilityCollapseLabel}
              accessibilityExpandLabel={accessibilityExpandLabel}
              badgeText={props.badgeText ? props.badgeText : undefined}
              icon={props.icon ? props.icon : undefined}
              iconAccessibilityLabel={iconAccessibilityLabel}
              iconButton={props.iconButton ? props.iconButton : undefined}
              id={`${id}-${index}`}
              isCollapsed={expandedId !== index}
              onModuleClicked={buildOnModuleClickHandler(index)}
              summary={summary}
              title={title}
              type={type}
            >
              {children}
            </ModuleExpandableItem>
          </Fragment>
        );
      })}
    </Box>
  );
}