import type { Node } from "react";
declare type DeviceType = "desktop" | "mobile";
declare type Props = {
    children: Node;
    /**
     * The device type as determined by logic within your app.
     */
    deviceType: DeviceType;
};
/**
 * [DeviceTypeProvider](https://gestalt.pinterest.systems/web/utilities/devicetypeprovider) is an optional [React Context provider](https://reactjs.org/docs/context.html#contextprovider) to enable device-specific UI for Gestalt components that support it.
 */
export default function DeviceTypeProvider({ children, deviceType, }: Props): Node;
export declare function useDeviceType(): DeviceType;
export {};
