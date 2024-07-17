import { LoadingStateItem } from './types';

export function isLoadingStateItem<T>(item: T | LoadingStateItem): item is LoadingStateItem {
  return item && typeof item === 'object' && 'height' in item;
}

export function isLoadingStateItems<T>(
  items: ReadonlyArray<T> | ReadonlyArray<LoadingStateItem>,
): items is ReadonlyArray<LoadingStateItem> {
  return items.every(isLoadingStateItem);
}
