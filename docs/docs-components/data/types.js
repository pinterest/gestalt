// @flow strict
import { type Element } from 'react';
import Accessibility from '../../graphics/foundations/accessibility.svg';

// Flow doesn't include types for SVGs (https://github.com/facebook/flow/pull/4551#issuecomment-570667660)
// This workaround is dumb, but it works
type SVGElement = Element<typeof Accessibility>;

export type DesignOverview = {|
  title: string,
  description: string,
  path: string,
  svg: SVGElement,
|};

export type StatusType = 'notAvailable' | 'partial' | 'planned' | 'ready';

export type ComponentAccessibility = {|
  a11yComprehension?: StatusType,
  a11yNavigation?: StatusType,
  a11yScreenreader?: StatusType,
  a11yVisual?: StatusType,
  summary?: StatusType,
|};

export type ComponentCategory =
  | 'Actions'
  | 'Avatars'
  | 'Building blocks'
  | 'Controls'
  | 'Data'
  | 'Fields and forms'
  | 'Help and guidance'
  | 'Indicators'
  | 'Loading'
  | 'Messaging'
  | 'Navigation'
  | 'Overlays'
  | 'Pins and imagery'
  | 'Structure'
  | 'Text'
  | 'Utilities';

export type Platform = 'android' | 'figma' | 'ios' | 'web';

type PlatformObjType<T> = {|
  android?: T,
  figma?: T,
  ios?: T,
  web?: T,
|};

export type ComponentStatus = {|
  accessible?: ComponentAccessibility,
  badge?: 'New' | 'Pilot' | 'Experimental',
  documentation: StatusType,
  figmaStatus?: StatusType,
  mobileAdaptive?: StatusType,
  responsive?: StatusType,
  status: StatusType | 'deprecated',
  knownIssues?: $ReadOnlyArray<{|
    title: string,
    description: string,
    codesandboxUrl?: string,
    internalDocUrl?: string,
  |}>,
|};

export type PlatformData = {|
  name: string,
  visual: {|
    svg: SVGElement,
    hasDarkBackground?: boolean,
  |},
  category: $ReadOnlyArray<ComponentCategory>,
  path?: string, // This should be eliminated eventually by building the path from the platform, category (if needed), and component name
  alias?: $ReadOnlyArray<string>,
  description?: string,
  status: ComponentStatus,
|};

export type ComponentData = {|
  id: string, // This is essentially the internal name
  platform: PlatformObjType<PlatformData>,
|};
