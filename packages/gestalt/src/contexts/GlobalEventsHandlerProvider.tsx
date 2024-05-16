import { Context, createContext, ReactElement, ReactNode, useContext } from 'react';

export type NoopType = () => void;

type OnLinkNavigationType = (arg1: {
  href: string;
  target?: null | 'self' | 'blank';
}) => (arg1: { readonly event: React.SyntheticEvent }) => void | null | undefined;

type GlobalEventsHandlerContextType =
  | {
      dateFieldHandlers?: {
        onRender?: NoopType;
      };
      datePickerHandlers?: {
        onRender?: NoopType;
      };
      dateRangeHandlers?: {
        onRender?: NoopType;
      };
      sheetMobileHandlers?: {
        onOpen?: NoopType;
        onClose?: NoopType;
      };
      linkHandlers?: {
        onNavigation?: OnLinkNavigationType;
      };
      radioGroupHandlers?: {
        onRender?: NoopType;
      };
    }
  | undefined;

type Props = {
  /**
   * Context lets a parent component provide data to the entire tree below it. Only components within the GlobalEventsHandlerProvider tree will be able to subscribe to it.
   */
  children: ReactNode;
  /**
   * Handlers consumed by [DateField](https://gestalt.pinterest.systems/web/datefield).
   */
  dateFieldHandlers?: {
    onRender?: () => void;
  };
  /**
   * Handlers consumed by [DatePicker](https://gestalt.pinterest.systems/web/datepicker).
   */
  datePickerHandlers?: {
    onRender?: () => void;
  };
  /**
   * Handlers consumed by [DateRange](https://gestalt.pinterest.systems/web/daterange).
   */
  dateRangeHandlers?: {
    onRender?: () => void;
  };
  /**
   * Handlers consumed by [SheetMobile](https://gestalt.pinterest.systems/web/sheetmobile#External-handlers).
   */
  sheetMobileHandlers?: {
    onOpen?: () => void;
    onClose?: () => void;
  };
  /**
   * Handlers consumed by [Link](https://gestalt.pinterest.systems/web/link).
   */
  linkHandlers?: {
    onNavigation?: (arg1: {
      href: string;
      target?: null | 'self' | 'blank';
    }) => (arg1: { readonly event: React.SyntheticEvent }) => void | null | undefined;
  };
  /**
   * Handlers consumed by [RadioGroup](https://gestalt.pinterest.systems/web/radiogroup).
   */
  radioGroupHandlers?: {
    onRender?: () => void;
  };
};

const GlobalEventsHandlerContext: Context<GlobalEventsHandlerContextType> =
// @ts-expect-error - TS2554 - Expected 1 arguments, but got 0.
  createContext<GlobalEventsHandlerContextType>();

const { Provider } = GlobalEventsHandlerContext;

/**
 * [GlobalEventsHandlerProvider](https://gestalt.pinterest.systems/web/utilities/globaleventshandlerprovider) is a [React context provider](https://react.dev/learn/passing-data-deeply-with-context) that allows sharing global event handlers with consuming components.
 */
export default function GlobalEventsHandlerProvider({
  children,
  dateFieldHandlers,
  datePickerHandlers,
  dateRangeHandlers,
  sheetMobileHandlers,
  linkHandlers,
  radioGroupHandlers,
// @ts-expect-error - TS2315 - Type 'Element' is not generic.
}: Props): Element<typeof Provider> {
  return (
    <Provider
      value={{
        dateFieldHandlers,
        datePickerHandlers,
        dateRangeHandlers,
        sheetMobileHandlers,
        linkHandlers,
        radioGroupHandlers,
      }}
    >
      {children}
    </Provider>
  );
}

export function useGlobalEventsHandlerContext(): GlobalEventsHandlerContextType {
  return useContext(GlobalEventsHandlerContext);
}
