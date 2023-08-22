// @flow strict
import { useColorScheme } from 'gestalt';

const useHexColor = (): $ReadOnlyArray<string> => {
  const theme = useColorScheme();
  return ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'].map(
    (vizColor) => theme[`colorDataVisualization${vizColor}`],
  );
};

// eslint-disable-next-line import/prefer-default-export
export { useHexColor };
