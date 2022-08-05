// @flow strict
import { type Context, type Node, createContext, useContext } from 'react';

const defaultDeviceType = 'desktop';

type DeviceType = 'desktop' | 'phone' | 'tablet';

const DeviceTypeContext: Context<DeviceType> = createContext<DeviceType>(defaultDeviceType);

type Props = {|
  /**
   *
   */
  children: Node,
  /**
   * The device type as determined by logic within your app. This will be used within certain Gestalt components to render device-specific UI.
   */
  deviceType: DeviceType,
|};

/**
 * *ALPHA - DO NOT USE YET - MAY HAVE BREAKING CHANGES IN THE NEAR FUTURE*
 * [DeviceTypeProvider](https://gestalt.pinterest.systems/web/utilities/devicetypeprovider) is an optional [React Context provider](https://reactjs.org/docs/context.html#contextprovider) to enable device-specific UI for Gestalt components that support it.
 */
export default function DeviceTypeProvider({ children, deviceType }: Props): Node {
  return <DeviceTypeContext.Provider value={deviceType}>{children}</DeviceTypeContext.Provider>;
}

export function useDeviceType(): DeviceType {
  return useContext(DeviceTypeContext) ?? defaultDeviceType;
}
