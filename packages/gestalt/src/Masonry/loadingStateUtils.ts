import { LoadingStateItem } from './types';

export function isLoadingStateItem<T>(
  item: T | LoadingStateItem,
  renderLoadingState?: boolean,
): item is LoadingStateItem {
  return Boolean(renderLoadingState && item && typeof item === 'object' && 'height' in item);
}

export function isLoadingStateItems<T>(
  items: ReadonlyArray<T> | ReadonlyArray<LoadingStateItem>,
  renderLoadingState?: boolean,
): items is ReadonlyArray<LoadingStateItem> {
  return items.some((item) => isLoadingStateItem(item, renderLoadingState));
}

export function isSkeletonPin<T>(item: T | LoadingStateItem): item is LoadingStateItem {
  return Boolean(item && typeof item === 'object' && 'height' in item && 'isSkeletonPin' in item);
}
