// @flow strict
import Box from '../graphics/building-blocks/Box.svg';
import Column from '../graphics/building-blocks/Column.svg';
import Container from '../graphics/building-blocks/Container.svg';
import Flex from '../graphics/building-blocks/Flex.svg';
import Layer from '../graphics/building-blocks/Layer.svg';
import Letterbox from '../graphics/building-blocks/Letterbox.svg';
import Mask from '../graphics/building-blocks/Mask.svg';
import Pog from '../graphics/building-blocks/Pog.svg';
import ScrollBoundaryContainer from '../graphics/building-blocks/ScrollBoundaryContainer.svg';
import Sticky from '../graphics/building-blocks/Sticky.svg';
import TapArea from '../graphics/building-blocks/TapArea.svg';
import ZIndexClasses from '../graphics/building-blocks/ZIndexClasses.svg';
import { type ListItemType } from '../pages/component_overview.js';

const BUILDING_BLOCKS: ListItemType = [
  {
    svg: <Box />,
    name: 'Box',
    description:
      'Box is a component primitive that can be used to build the foundation of pretty much any other component.',
    category: 'Building Blocks',
  },
  {
    svg: <Column />,
    name: 'Column',
    description: 'Column implements a 12-column system.',
    category: 'Building Blocks',
  },
  {
    svg: <Container />,
    name: 'Container',
    description: 'Containers are useful in responsively laying out content on different screens.',
    category: 'Building Blocks',
  },
  {
    svg: <Flex />,
    name: 'Flex',
    description:
      'Flex is a layout component with a very limited subset of the props available to Box.',
    category: 'Building Blocks',
  },
  {
    svg: <Layer />,
    name: 'Layer',
    description: 'Layers allow you to render children outside the DOM hierarchy of the parent.',
    category: 'Building Blocks',
    isDark: true,
  },
  {
    svg: <Letterbox />,
    name: 'Letterbox',
    description:
      'Letterboxes are useful if you have some source media which is larger than the area you want to display it in.',
    category: 'Building Blocks',
  },
  {
    svg: <Mask />,
    name: 'Mask',
    description: 'Mask is used to display content in a specific shape.',
    category: 'Building Blocks',
  },
  {
    svg: <Pog />,
    name: 'Pog',
    description:
      'Pog is a lower-level functional component to show the active, hovered, & focused states of IconButton.',
    category: 'Building Blocks',
  },
  {
    svg: <ScrollBoundaryContainer />,
    name: 'ScrollBoundaryContainer',
    description:
      'ScrollBoundaryContainer is needed for proper positioning when Popover is anchored to an element that is located within a scrolling container.',
    category: 'Building Blocks',
  },
  {
    svg: <Sticky />,
    name: 'Sticky',
    description: 'Sticky allows an element to become fixed when it reaches a threshold.',
    category: 'Building Blocks',
  },
  {
    svg: <TapArea />,
    name: 'TapArea',
    description: 'TapArea allows components to be clickable and touchable in an accessible way.',
    category: 'Building Blocks',
  },
  {
    svg: <ZIndexClasses />,
    name: 'Z-Index Classes',
    description:
      'FixedZIndex and CompositeZIndex are utility classes that generate z-indices for Gestalt components.',
    category: 'Building Blocks',
    path: '/zindex_classes',
  },
];

export default BUILDING_BLOCKS;
