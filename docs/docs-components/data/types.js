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

type StatusType = 'notAvailable' | 'partial' | 'planned' | 'ready';

/**
 * All components should be in a single list. That list can be filtered by category/platform/etc where needed.
 */

type ComponentAccessibility = {|
  a11yComprehension?: StatusType,
  a11yNavigation?: StatusType,
  a11yScreenreader?: StatusType,
  a11yVisual?: StatusType,
  summary?: StatusType,
|};

type ComponentCategory =
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

type PlatformObjType<T> = {|
  android?: T,
  figma?: T,
  ios?: T,
  web?: T,
|};

export type ComponentData = {|
  id: string, // This is essentially the internal name
  name: PlatformObjType<string>,
  visual: {|
    svg: PlatformObjType<SVGElement>,
    hasDarkBackground?: boolean,
  |},
  alias: PlatformObjType<$ReadOnlyArray<string>>,
  description: PlatformObjType<string>,
  category: PlatformObjType<$ReadOnlyArray<ComponentCategory>>,
  status: PlatformObjType<{|
    accessible: ComponentAccessibility,
    badge?: 'New' | 'Pilot' | 'Experimental',
    documentation: StatusType,
    figmaOnly?: boolean,
    figmaStatus?: StatusType,
    mobileAdaptive?: StatusType,
    responsive?: StatusType,
    status: StatusType | 'deprecated',
  |}>,
|};
