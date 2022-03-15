// @flow strict
import { type Element } from 'react';
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
import ZindexClasses from '../graphics/building-blocks/zindex_classes.svg';
import { type ListItemType } from './component_overview.js';

const BUILDING_BLOCKS: ListItemType = [
  {
    svg: <Box />,
    name: 'Box',
    description: 'Im a description',
    category: 'building-blocks',
  },
  {
    svg: <Column />,
    name: 'Column',
    description: 'Im a description',
    category: 'building-blocks',
  },
  {
    svg: <Container />,
    name: 'Container',
    description: 'Im a description',
    category: 'building-blocks',
  },
  {
    svg: <Flex />,
    name: 'Flex',
    description: 'Im a description',
    category: 'building-blocks',
  },
  {
    svg: <Layer />,
    name: 'Layer',
    description: 'Im a description',
    category: 'building-blocks',
  },
  {
    svg: <Letterbox />,
    name: 'Letterbox',
    description: 'Im a description',
    category: 'building-blocks',
  },
  {
    svg: <Mask />,
    name: 'Mask',
    description: 'Im a description',
    category: 'building-blocks',
  },
  {
    svg: <Pog />,
    name: 'Pog',
    description: 'Im a description',
    category: 'building-blocks',
  },
  {
    svg: <ScrollBoundaryContainer />,
    name: 'ScrollBoundaryContainer',
    description: 'Im a description',
    category: 'building-blocks',
  },
  {
    svg: <Sticky />,
    name: 'Sticky',
    description: 'Im a description',
    category: 'building-blocks',
  },
  {
    svg: <TapArea />,
    name: 'TapArea',
    description: 'Im a description',
    category: 'building-blocks',
  },
  {
    svg: <ZindexClasses />,
    name: 'Z-Index Classes',
    description: 'Im a description',
    category: 'building-blocks',
    path: '/zindex_classes',
  },
];

export default BUILDING_BLOCKS;
