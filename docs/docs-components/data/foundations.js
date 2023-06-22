// @flow strict
import { type DesignOverview } from './types.js';
import Accessibility from '../../graphics/foundations/accessibility.svg';
import Animation from '../../graphics/foundations/animation.svg';
import BrandExpression from '../../graphics/foundations/brand_expression.svg';
import Color from '../../graphics/foundations/color.svg';
import Content from '../../graphics/foundations/content.svg';
import DataVisualization from '../../graphics/foundations/data_visualization.svg';
import DesignTokens from '../../graphics/foundations/design-tokens.svg';
import Elevation from '../../graphics/foundations/elevation.svg';
import Forms from '../../graphics/foundations/forms.svg';
import Iconography from '../../graphics/foundations/iconography.svg';
import Illustration from '../../graphics/foundations/illustration.svg';
import Layouts from '../../graphics/foundations/layouts.svg';
import Messaging from '../../graphics/foundations/messaging.svg';
import ScreenSizes from '../../graphics/foundations/screen-size.svg';
import Typography from '../../graphics/foundations/typography.svg';

const foundationsTiles: $ReadOnlyArray<DesignOverview> = [
  {
    svg: <Accessibility />,
    title: 'Accessibility',
    description:
      'How to create accessible designs and components that contribute to an accessible product',
    path: '/foundations/accessibility',
  },
  {
    svg: <Animation />,
    title: 'Animation',
    description: 'Guidelines for animation in product and implementation options',
    path: '/foundations/animation/principles',
  },
  {
    svg: <BrandExpression />,
    title: 'Brand expression',
    description: 'Guidelines for representing brand moments in product',
    path: '/foundations/brand_expression/guidelines',
  },
  {
    svg: <Color />,
    title: 'Color',
    description: 'Palettes and guidelines for using color across product interfaces and surfaces',
    path: '/foundations/color/palette',
  },
  {
    svg: <Content />,
    title: 'Content Standards',
    description: 'When writing at Pinterest, keep these guiding words in mind',
    path: '/foundations/content_standards/voice',
  },

  {
    svg: <DesignTokens />,
    title: 'Design tokens',
    description:
      'An expanded color palette for charts, graphs and other data visualizations. Includes guidelines for accessibility and usage.',
    path: '/foundations/design_tokens',
  },
  {
    svg: <DataVisualization />,
    title: 'Data visualization',
    description: 'Data visualization',
    path: '/foundations/data_visualization/overview',
  },
  {
    svg: <Elevation />,
    title: 'Elevation',
    description:
      'How and when to lift UI elements from the base surface via color, borders, shadows and other methods',
    path: '/foundations/elevation',
  },
  {
    svg: <Forms />,
    title: 'Forms',
    description: 'Guidelines for form layout, behavior and usage',
    path: '/foundations/forms/overview',
  },
  {
    svg: <Iconography />,
    title: 'Iconography',
    description: 'Our current icon library, complete with guidelines on using and creating icons',
    path: '/foundations/iconography/library',
  },
  {
    svg: <Illustration />,
    title: 'Illustration',
    description:
      'How to use illustration for communicating empty, success, error and loading statuses in the product',
    path: '/foundations/illustration',
  },
  {
    svg: <Layouts />,
    title: 'Layouts',
    description:
      'How to create accessible designs and components that contribute to an accessible product',
    path: '/foundations/layouts',
  },
  {
    svg: <Messaging />,
    title: 'Messaging',
    description:
      'How to communicate errors, warnings, successes, recommendations and general information on system status.',
    path: '/foundations/messaging/overview',
  },
  {
    svg: <ScreenSizes />,
    title: 'Screen sizes',
    description: 'Responsive breakpoints and screen sizes for desktop, iOS and Android',
    path: '/foundations/screen_sizes',
  },
  {
    svg: <Typography />,
    title: 'Typography',
    description: 'A typographic system for a content hierarchy that is scannable and efficient',
    path: '/foundations/typography/guidelines',
  },
];

export default foundationsTiles;
