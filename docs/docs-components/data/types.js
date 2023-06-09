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
