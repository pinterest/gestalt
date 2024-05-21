type LookupMapProp = Partial<Record<string | number, string>>;

const colorMap = {
  white: `color="default"`,
  '#fff': `color="default"`,
  '#ffffff': `color="default"`,
  '#0074e8': `color="infoBase|shopping|education"`,
  '#d7edff': `color="infoWeak"`,
  '#cc0000': `color="errorBase"`,
  '#ffe0e0': `color="errorWeak"`,
  '#bd5b00': `color="warningBase"`,
  '#ffe4c1': `color="warningWeak"`,
  '#008753': `color="successBase"`,
  '#c3f9c2': `color="successWeak"`,
  '#e60023': `color="primary|brand"`,
  '#e9e9e9': `color="secondary"`,
  '#767676': `color="tertiary"`,
  '#111111': `color="selected|inverse"`,
  transparent: `color="transparent"`,
  'rgba(51,51,51,.8)': `color="transparentDarkGray"`,
  '#e2e2e2': `color="lightWash"`,
  '#dadada': `color="darkWash"`,
} as const;

const borderRadiusMap = {
  '50%': `rounding="circle"`,
  '999px': `rounding="circle"`,
} as const;

const borderMap = {
  '#efefef 1px solid': `borderStyle="sm"`,
  '#eee 1px solid': `borderStyle="sm"`,
  '1px lightgray solid': `borderStyle="sm"`,
  '#efefef 2px solid': `borderStyle="lg"`,
  '#eee 2px solid': `borderStyle="lg"`,
  '2px lightgray solid': `borderStyle="lg"`,
} as const;

const flexMap = {
  '1 1 auto': 'grow',
  '0 1 auto': 'shrink',
  '0 0 auto': 'none',
} as const;

type KebabToCamelCaseType = (arg1: { attribute: string }) => string;

export const kebabToCamelCase: KebabToCamelCaseType = ({ attribute }) =>
  attribute.replace(/-([a-z])/gi, (s, group1) => group1.toUpperCase());

type GenBointLookupType = LookupMapProp;

export function genBointLookup(
  propName: string,
  start: number,
  end: number = 12,
): GenBointLookupType {
  const lookupMap: LookupMapProp = {};

  for (let i = start; i <= end; i += 1) {
    const px = i * 4;

    let msg = `${propName}={${i}}`;

    // Special case for marginLeft and marginRight
    if (['marginLeft', 'marginRight'].includes(propName)) {
      const recommendedProp = propName === 'marginLeft' ? 'marginStart' : 'marginEnd';
      msg = `${recommendedProp}={${i}}`;
    }
    lookupMap[px] = msg;
    lookupMap[`${px}px`] = msg;
  }
  return lookupMap;
}

type GenOpacityLookupType = () => LookupMapProp;

const genOpacityLookup: GenOpacityLookupType = () => {
  const lookupMap: LookupMapProp = {};
  for (let i = 0; i <= 10; i += 1) {
    const val = i / 10; // Why not increment i by 0.1? Floats
    const msg = `opacity={${val}}`;
    lookupMap[val] = msg;
    lookupMap[`${val}`] = msg;
  }
  return lookupMap;
};

export const marginLookup: GenBointLookupType = genBointLookup('margin', -12);
export const marginBottomLookup: GenBointLookupType = genBointLookup('marginBottom', -12);
export const marginLeftLookup: GenBointLookupType = genBointLookup('marginLeft', -12);
export const marginRightLookup: GenBointLookupType = genBointLookup('marginRight', -12);
export const marginTopLookup: GenBointLookupType = genBointLookup('marginTop', -12);
export const opacityLookup: GenBointLookupType = genOpacityLookup();
export const overflowLookup: GenBointLookupType = {
  visible: `overflow="visible"`,
  hidden: `overflow="hidden"`,
  scroll: `overflow="scroll"`,
  auto: `overflow="auto"`,
};
export const paddingLookup: GenBointLookupType = genBointLookup('padding', 0);

export const validateBackgroundColor = (value: string): string | null | undefined =>
  // @ts-expect-error - TS7053 - Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ readonly white: "color=\"default\""; readonly '#fff': "color=\"default\""; readonly '#ffffff': "color=\"default\""; readonly '#0074e8': "color=\"infoBase|shopping|education\""; readonly '#d7edff': "color=\"infoWeak\""; ... 13 more ...; readonly '#dadada': "color=\"darkWash\""; }'.
  colorMap[value];

export const validateFlex = (value: string): string | null | undefined =>
  // @ts-expect-error - TS7053 - Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ readonly '1 1 auto': "grow"; readonly '0 1 auto': "shrink"; readonly '0 0 auto': "none"; }'. | TS7053 - Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ readonly '1 1 auto': "grow"; readonly '0 1 auto': "shrink"; readonly '0 0 auto': "none"; }'.
  flexMap[value] ? `flex="${flexMap[value]}"` : undefined;

export const validateBorder = (value: string): string | null | undefined => {
  // If the value is a string:
  // 1) convert everything to lowerCase (css is case-insensitive)
  // 2) sort the values since some found uses have the wrong order
  const cleanValue = value?.toLowerCase?.().split(' ').sort().join(' ') ?? value;

  // @ts-expect-error - TS7053 - Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ readonly '#efefef 1px solid': "borderStyle=\"sm\""; readonly '#eee 1px solid': "borderStyle=\"sm\""; readonly '1px lightgray solid': "borderStyle=\"sm\""; readonly '#efefef 2px solid': "borderStyle=\"lg\""; readonly '#eee 2px solid': "borderStyle=\"lg\""; readonly '2px lightgray solid': "borderStyle=\"lg\""; }'.
  return borderMap[cleanValue];
};

const roundingLookup = genBointLookup('rounding', 0, 8);

export const validateBorderRadius = (value: string): number | null | undefined | string =>
  // @ts-expect-error - TS7053 - Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ readonly '50%': "rounding=\"circle\""; readonly '999px': "rounding=\"circle\""; }'. | TS7053 - Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ readonly '50%': "rounding=\"circle\""; readonly '999px': "rounding=\"circle\""; }'.
  borderRadiusMap[value] ? borderRadiusMap[value] : roundingLookup[value];

export const validateBoxShadow = (value: string): string | null | undefined => {
  // If the value is a string:
  // 1) strip out the rgba portion
  // 2) convert the pixel portion to only numbers
  // 3) If both pieces match, recommend borderStyle="shadow"
  // eslint-disable-next-line prefer-regex-literals
  const rgbaRegex = new RegExp(
    /rgba\(\s*(-?\d+|-?\d*\.\d+(?=%))(%?)\s*,\s*(-?\d+|-?\d*\.\d+(?=%))(\2)\s*,\s*(-?\d+|-?\d*\.\d+(?=%))(\2)\s*,\s*(-?\d+|-?\d*.\d+)\s*\)/,
    'g',
  );

  const rgbaPortion = value.match(rgbaRegex);
  const cleanRgbaPortion =
    rgbaPortion && rgbaPortion?.length > 0 ? rgbaPortion[0].replace(/ /g, '') : undefined;
  const rgbaMatch =
    cleanRgbaPortion && ['rgba(0,0,0,0.1)', 'rgba(0,0,0,.1)'].includes(cleanRgbaPortion);

  const pixelPortion = value.replace(rgbaRegex, '');
  const cleanPixelPortion = pixelPortion.replace(/px/g, '').replace(/ /g, '');
  const pixelsMatch = ['008'].includes(cleanPixelPortion);

  return rgbaMatch && pixelsMatch ? 'borderStyle="shadow"' : undefined;
};

type DimensionFormattingType = (arg1: {
  keyName: string;
  value: string;
}) => string | null | undefined;

export const dimensionFormatting: DimensionFormattingType = ({ keyName, value }) => {
  if (typeof value === 'number') return `${keyName ?? ''}={${value}}`;
  if (value.endsWith('%')) return `${keyName ?? ''}="${value}"`;
  if (value.endsWith('px')) return `${keyName ?? ''}={${value.replace('px', '')}}`;
  return null;
};
