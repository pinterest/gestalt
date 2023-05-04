/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable no-empty-pattern */
/* eslint-disable react/no-unused-prop-types */
// @flow strict

/**
 * React Prop Types File for React-DocGen to share props across similar components
 */
import { type Node } from 'react';

export type TrendObject = {|
  accessibilityLabel: string,
  value: number,
|};

export type DataPointBaseProps = {|
  /**
   * The header text for the component.
   */
  title: string,
  /**
   * Object detailing the trend value (change in time - e.g., +30%), and accessibilityLabel to describe the trend's icon (e.g., "Trending up").  See the [trend](https://gestalt.pinterest.systems/web/datapoint#Trend) variant to learn more.
   */
  trend?: TrendObject,
  /**
   * A visual indicator whether the trend is considered "good", "bad" or "neutral". By setting \`trendSentiment\` to \`auto\`, a positive trend will be considered "good", a negative trend will be considered "bad" and a trend of zero will be considered "neutral".  See the [trendSentiment](https://gestalt.pinterest.systems/web/datapoint#Trend-sentiment) variant to learn more.
   */
  trendSentiment?: 'good' | 'bad' | 'neutral' | 'auto',
  /**
   * The datapoint value (e.g., 1.23M)
   */
  value: string,
|};

export default function DatapointBaseProps({}: DataPointBaseProps): Node {
  return <br />;
}
