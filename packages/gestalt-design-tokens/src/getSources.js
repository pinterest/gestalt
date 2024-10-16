function getSources({ theme, modeTheme, platform, language }) {
  if (theme === 'classic') {
    return [
      `tokens/classic/base-color.json`,
      `tokens/classic/base-font.json`,
      `tokens/classic/base-opacity.json`,
      `tokens/classic/base-rounding.json`,
      `tokens/classic/base-space.json`,
      `tokens/classic/sema-color-${modeTheme}.json`,
      `tokens/classic/base-color-dataviz-${modeTheme}.json`,
      `tokens/classic/sema-color-dataviz-${modeTheme}.json`,
      `tokens/classic/base-elevation-${modeTheme}.json`,
      ...(platform === 'web'
        ? [
            `tokens/classic/comp-web-color-${modeTheme}.json`,
            `tokens/classic/comp-web-elevation-${modeTheme}.json`,
            `tokens/classic/comp-web-rounding.json`,
            `tokens/classic/comp-web-font.json`,
          ]
        : []),
    ];
  }

  return [
    'tokens/vr-theme/base/color/default.json',
    'tokens/vr-theme/base/text/font.json',
    'tokens/vr-theme/base/opacity.json',
    'tokens/vr-theme/base/rounding.json',
    'tokens/vr-theme/base/space.json',
    'tokens/vr-theme/base/lineheight.json',
    'tokens/vr-theme/base/motion.json',
    `tokens/vr-theme/sema/color/${modeTheme}/default.json`,
    `tokens/vr-theme/sema/elevation/${modeTheme}.json`,
    'tokens/vr-theme/sema/text/font.json',
    ...(platform === 'web'
      ? [
          'tokens/vr-theme/base/color/pressed.json',
          'tokens/vr-theme/base/color/hover.json',
          `tokens/vr-theme/sema/color/${modeTheme}/hover.json`,
          `tokens/vr-theme/sema/color/${modeTheme}/pressed.json`,
        ]
      : []),
    'tokens/vr-theme/sema/elevation.json',
    'tokens/vr-theme/sema/opacity.json',
    'tokens/vr-theme/sema/rounding.json',
    'tokens/vr-theme/sema/space.json',
    `tokens/vr-theme/sema/text/language/${language}.json`,
    'tokens/vr-theme/sema/motion.json',
    'tokens/vr-theme/comp/spinner.json',
    'tokens/vr-theme/comp/radiogroupbutton.json',
    ...(theme === 'vr-theme-web-mapping'
      ? [
          `tokens/vr-theme-web-mapping/base-color-dataviz-${modeTheme}.json`,
          'tokens/vr-theme-web-mapping/base-color.json',
          `tokens/vr-theme-web-mapping/base-elevation-${modeTheme}.json`,
          'tokens/vr-theme-web-mapping/base-font.json',
          'tokens/vr-theme-web-mapping/base-opacity.json',
          'tokens/vr-theme-web-mapping/base-rounding.json',
          'tokens/vr-theme-web-mapping/base-space.json',
          `tokens/vr-theme-web-mapping/sema-color-dataviz-${modeTheme}.json`,
          'tokens/vr-theme-web-mapping/sema-color.json',
          `tokens/vr-theme-web-mapping/comp-web-color-${modeTheme}.json`,
          `tokens/vr-theme-web-mapping/comp-web-rounding.json`,
          `tokens/vr-theme-web-mapping/comp-web-font.json`,
        ]
      : []),
  ];
}

module.exports = {
  getSources,
};
