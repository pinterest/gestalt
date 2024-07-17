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
  return items.every((item) => isLoadingStateItem(item, renderLoadingState));
}
