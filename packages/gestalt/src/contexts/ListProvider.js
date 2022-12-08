// @flow strict
import { type Context, type Element, type Node, useContext, createContext } from 'react';

type ListTypeContextValues = 'bare' | 'ordered' | 'unordered';
type ListSizeContextValues = 'regular' | 'condensed';
type ListStyleContextValues = {|
  ol: $ReadOnlyArray<string>,
  ul: $ReadOnlyArray<string>,
|};

type ListContextType = {|
  type: ?ListTypeContextValues,
  size: ?ListSizeContextValues,
  style: ?ListStyleContextValues,
|};

type Props = {|
  children: Node,
  type: ?ListTypeContextValues,
  size: ?ListSizeContextValues,
  style: ?ListStyleContextValues,
|};

const ListContext: Context<ListContextType> = createContext<ListContextType>({
  type: null,
  size: null,
  style: null,
});

const { Provider } = ListContext;

function ListProvider({ children, type, size, style }: Props): Element<typeof Provider> {
  const { type: inheritedType, size: inheritedSize } = useContext(ListContext);

  return (
    <Provider
      value={{
        type: type ?? inheritedType,
        size: inheritedSize ?? size,
        style,
      }}
    >
      {children}
    </Provider>
  );
}

function useList(): ListContextType {
  const { type, size, style } = useContext(ListContext);
  return { type, size, style };
}

export { ListProvider, useList };
