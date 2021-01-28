function genBointLookup(
  propName,
  start,
  end = 12
) {
  const lookupMap = {};
  for (let i = start; i <= end; i += 1) {
    const px = i * 4;
    let msg = `  Use prop \`${propName}={${i}}\` instead`;
    // Special case for marginLeft and marginRight
    if (['marginLeft', 'marginRight'].includes(propName)) {
      const recommendedProp =
        propName === 'marginLeft' ? 'marginStart' : 'marginEnd';
      msg = `  Use prop \`${recommendedProp}={${i}}\` instead`;
    }
    lookupMap[px] = msg;
    lookupMap[`${px}px`] = msg;
  }
  return lookupMap;
}

const roundingLookup = genBointLookup('rounding', 0, 8);

module.exports = {
  genBointLookup,
  validateBackgroundColor: (value) => {
    if (value === '#e60023') {
      return '  Use prop `color="red"` instead';
    }
    if (value === 'white' || value === '#fff' || value === '#ffffff') {
      return '  Use prop `color="white"` instead';
    }
    if (value === '#efefef') {
      return '  Use prop `color="lightGray"` instead';
    }
    if (value === '#767676') {
      return '  Use prop `color="gray"` instead';
    }
    if (value === '#333' || value === '#333333') {
      return '  Use prop `color="darkGray"` instead';
    }
    if (value === '#0fa573') {
      return '  Use prop `color="green"` instead';
    }
    if (value === '#0a6955') {
      return '  Use prop `color="pine"` instead';
    }
    if (value === '#364a4c') {
      return '  Use prop `color="olive"` instead';
    }
    if (value === '#0074e8') {
      return '  Use prop `color="blue"` instead';
    }
    if (value === '#004b91') {
      return '  Use prop `color="navy"` instead';
    }
    if (value === '#133a5e') {
      return '  Use prop `color="midnight"` instead';
    }
    if (value === '#b469eb') {
      return '  Use prop `color="purple"` instead';
    }
    if (value === '#8046a5') {
      return '  Use prop `color="orchid"` instead';
    }
    if (value === '#5b2677') {
      return '  Use prop `color="eggplant"` instead';
    }
    if (value === '#6e0f3c') {
      return '  Use prop `color="maroon"` instead';
    }
    if (value === '#f13535') {
      return '  Use prop `color="watermelon"` instead';
    }
    if (value === '#e3780c') {
      return '  Use prop `color="orange"` instead';
    }
    if (value === 'transparent') {
      return '  Use prop `color="transparent"` instead';
    }
    if (value === 'rgba(51,51,51,.8)') {
      return '  Use prop `color="transparentDarkGray"` instead';
    }
    if (value === '#e2e2e2') {
      return '  Use prop `color="lightWash"` instead';
    }
    if (value === '#dadada') {
      return '  Use prop `color="darkWash"` instead';
    }
    return undefined;
  },
  validateBorderRadius: (value) => {
    if (value === '50%') {
      return '  Use prop `rounding="circle"` instead';
    }
    if (value === '999px') {
      return '  Use prop `rounding="pill"` instead';
    }
    return roundingLookup[value];
  },
};
