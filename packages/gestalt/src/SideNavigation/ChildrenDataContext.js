// @flow strict
import {
  type Context,
  createContext,
  type Element,
  type Node as ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useSideNavigation } from '../contexts/SideNavigationProvider';

type ChildrenData = Record<string, { component: ReactNode, context: ChildrenData }>;

type ChildrenDataContextType = {
  childrenData: ChildrenData,
  setChildrenData: (Record<string, ChildrenData>) => void,
  parentId?: string,
  shouldCollapseAsEllipsis: boolean,
  setShouldCollapseAsEllipsis: (boolean) => void,
  hasActiveItem: boolean,
  setHasActiveItem: (boolean) => void,
  // setParentId: (string) => void,
};

type Props = {
  children: ReactNode,
  parentId?: string,
};

const ChildrenDataContext: Context<ChildrenDataContextType> =
  createContext<ChildrenDataContextType>({
    childrenData: {},
    setChildrenData: () => {},
    shouldCollapseAsEllipsis: true,
    setShouldCollapseAsEllipsis: () => {},
    hasActiveItem: false,
    setHasActiveItem: () => {},
  });

const { Provider } = ChildrenDataContext;

function ChildrenDataContextProvider({ children, parentId }: Props): Element<typeof Provider> {
  const { selectedItemId } = useSideNavigation();
  const [childrenData, setChildrenData] = useState({});
  const [shouldCollapseAsEllipsis, setCollapseAsEllipsisState] = useState(false);
  const [hasActiveItem, setHasActiveItem] = useState(false);

  const setShouldCollapseAsEllipsis = (hasIcon: boolean) => {
    setCollapseAsEllipsisState((state) => state || hasIcon);
  };

  const setHasActiveItem_ = (isActive: boolean) => {
    setActiveItemState((state) => state || isActive);
  };

  return (
    <Provider
      value={{
        parentId,
        childrenData,
        setChildrenData,
        shouldCollapseAsEllipsis,
        setShouldCollapseAsEllipsis,
        hasActiveItem,
        setHasActiveItem,
      }}
    >
      {children}
    </Provider>
  );
}

function useChildrenDataContext(): ChildrenDataContextType {
  return useContext(ChildrenDataContext);
}
export { ChildrenDataContextProvider, useChildrenDataContext };
