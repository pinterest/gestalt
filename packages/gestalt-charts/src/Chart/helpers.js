// @flow strict
import { useColorScheme } from 'gestalt';
import { type DataVisualizationColors } from './types.js';

const useHexColor: (DataVisualizationColors) => string = (color) => {
  const theme = useColorScheme();
  return theme[`colorDataVisualization${color}`];
};

const useHexPalette: () => $ReadOnlyArray<string> = () => {
  const theme = useColorScheme();
  return ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'].map(
    (color) => theme[`colorDataVisualization${color}`],
  );
};

export { useHexColor, useHexPalette };
