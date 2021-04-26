/**
 * @fileoverview Require specific props when using an icon with Button
 * @author Ryan James <rjames@pinterest.com>
 *
 * Gestalt is more permissive than PDS recommends in adding icons to Buttons.
 * Buttons using iconEnd must use:
 * - icon "arrow-down"
 * - color "white"
 * - size "lg"
 */
const rule$5 = {
  meta: {
    docs: {
      description: 'Button icon restrictions',
      recommended: false
    },
    schema: [{
      type: 'object',
      additionalProperties: false
    }]
  },

  // $FlowFixMe[unclear-type]
  create(context) {
    let importedComponent = false;
    let localIdentifierName;
    const componentName = 'Button';

    function getAttribute(node, attributeName) {
      return Object.entries(node.attributes).find( // eslint-disable-next-line no-unused-vars
      ([key, value]) => // $FlowFixMe[incompatible-use]
      value && value.name && value.name.name === attributeName);
    }

    function getValue(attribute) {
      // $FlowFixMe[incompatible-use]
      return attribute ? attribute[1].value.value : null;
    }

    return {
      ImportDeclaration(decl) {
        if (decl.source.value !== 'gestalt') {
          return;
        }

        importedComponent = decl.specifiers.some(node => {
          const isValidComponent = node.imported.name === componentName;

          if (isValidComponent) {
            localIdentifierName = node.local.name;
          }

          return isValidComponent;
        });
      },

      JSXOpeningElement(node) {
        if (!importedComponent || localIdentifierName !== node.name.name) {
          return;
        }

        const iconAttribute = getAttribute(node, 'iconEnd');
        const isCorrectIcon = getValue(iconAttribute) === 'arrow-down'; // Not using iconEnd, early return

        if (!iconAttribute) {
          return;
        }

        const colorAttribute = getAttribute(node, 'color');
        const isCorrectColor = getValue(colorAttribute) === 'white';
        const sizeAttribute = getAttribute(node, 'size');
        const isCorrectSize = getValue(sizeAttribute) === 'lg'; // Not using correct props

        if (!isCorrectColor || !isCorrectIcon || !isCorrectSize) {
          context.report(node, 'Buttons using iconEnd must use "arrow-down", color "white", and size "lg"');
        }
      }

    };
  }

};

/**
 * @fileoverview Disallow marginLeft/marginRight on Box
 * @author Vincent Tian <vincent@pinterest.com>
 *
 * In order to have consistent usage of marginLeft/marginRight on Box in pinboard,
 * we update all of them to marginStart/marginEnd
 */
const disallowedProps = ['marginLeft', 'smMarginLeft', 'mdMarginLeft', 'lgMarginLeft', 'marginRight', 'smMarginRight', 'mdMarginRight', 'lgMarginRight'];
const errorMessage = 'marginLeft/marginRight have been deprecated. Please use marginStart/marginEnd to support Right-to-Left (RTL)\nhttps://gestalt.netlify.app/Box';
const rule$4 = {
  meta: {
    docs: {
      description: 'Enforce usage of Right-to-Left (RTL)-compliant marginStart/marginEnd over marginLeft/marginRight',
      recommended: false
    },
    schema: [{
      type: 'object',
      additionalProperties: false
    }]
  },

  // $FlowFixMe[unclear-type]
  create(context) {
    let importedComponent = false;
    return {
      ImportDeclaration(decl) {
        if (decl.source.value !== 'gestalt') {
          return;
        }

        importedComponent = decl.specifiers.some(node => {
          return node.imported.name === 'Box';
        });
      },

      JSXOpeningElement(node) {
        if (!importedComponent) {
          return;
        }

        const isMarginLeftRightAttribute = Object.entries(node.attributes // eslint-disable-next-line no-unused-vars
        ).find(([key, value]) => disallowedProps.includes( // $FlowFixMe[incompatible-use]
        value && value.name && value.name.name)); // No marginLeft or marginRight attributes on Box

        if (isMarginLeftRightAttribute) {
          context.report(node, errorMessage);
        }
      }

    };
  }

};

function genBointLookup(propName, start, end = 12) {
  const lookupMap = {};

  for (let i = start; i <= end; i += 1) {
    const px = i * 4;
    let msg = `  Use prop \`${propName}={${i}}\` instead`; // Special case for marginLeft and marginRight

    if (['marginLeft', 'marginRight'].includes(propName)) {
      const recommendedProp = propName === 'marginLeft' ? 'marginStart' : 'marginEnd';
      msg = `  Use prop \`${recommendedProp}={${i}}\` instead`;
    }

    lookupMap[px] = msg;
    lookupMap[`${px}px`] = msg;
  }

  return lookupMap;
}
const roundingLookup = genBointLookup('rounding', 0, 8);
const validateBackgroundColor = value => {
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
};
const validateBorderRadius = value => {
  if (value === '50%') {
    return '  Use prop `rounding="circle"` instead';
  }

  if (value === '999px') {
    return '  Use prop `rounding="pill"` instead';
  }

  return roundingLookup[value];
};
const validateBorder = value => {
  // If the value is a string:
  // 1) convert everything to lowerCase (css is case-insensitive)
  // 2) sort the values since some found uses have the wrong order
  const cleanValue = value && value.toLowerCase ? value.toLowerCase().split(' ').sort().join(' ') : value;

  if (cleanValue === '#efefef 1px solid' || cleanValue === '#eee 1px solid' || cleanValue === '1px lightgray solid') {
    return '  Use prop `borderStyle="sm"` instead';
  }

  if (cleanValue === '#efefef 2px solid' || cleanValue === '#eee 2px solid' || cleanValue === '2px lightgray solid') {
    return '  Use prop `borderStyle="lg"` instead';
  }

  return undefined;
};
const validateBoxShadow = value => {
  // If the value is a string:
  // 1) strip out the rgba portion
  // 2) convert the pixel portion to only numbers
  // 3) If both pieces match, recommend borderStyle="shadow"
  const rgbaRegex = new RegExp(/rgba\(\s*(-?\d+|-?\d*\.\d+(?=%))(%?)\s*,\s*(-?\d+|-?\d*\.\d+(?=%))(\2)\s*,\s*(-?\d+|-?\d*\.\d+(?=%))(\2)\s*,\s*(-?\d+|-?\d*.\d+)\s*\)/, 'g');
  const rgbaPortion = value.match(rgbaRegex);
  const cleanRgbaPortion = rgbaPortion && rgbaPortion.length > 0 ? rgbaPortion[0].replace(/ /g, '') : undefined;
  const pixelPortion = value.replace(rgbaRegex, '');
  const cleanPixelPortion = pixelPortion.replace(/px/g, '').replace(/ /g, '');
  let rgbaMatch = false;
  let pixelsMatch = false;

  if (cleanRgbaPortion && ['rgba(0,0,0,0.1)', 'rgba(0,0,0,.1)'].includes(cleanRgbaPortion)) {
    rgbaMatch = true;
  }

  if (['008', '0080'].includes(cleanPixelPortion)) {
    pixelsMatch = true;
  }

  if (rgbaMatch && pixelsMatch) {
    return '  Use prop `borderStyle="shadow"` instead';
  }

  return undefined;
};

/**
 * @fileoverview Prevent using dangerouslySetInlineStyle on Box for props that are already directly implemented
 * @author Jenny Steele <jsteele@pinterest.com>
 *
 * Box supports some props already that are not widely known and instead are being
 * implemented with dangerouslySetInlineStyle. This linter checks for usage of already
 * available props as dangerous styles and suggests the alternative
 */

function getInlineDefinedStyles$1(attr) {
  return attr.value.expression && attr.value.expression.properties && attr.value.expression.properties[0] && attr.value.expression.properties[0].key.name === '__style' ? attr.value.expression.properties[0].value.properties : null;
}

function getVariableDefinedStyles$1(ref) {
  return ref.resolved && ref.resolved.defs && ref.resolved.defs[0] && ref.resolved.defs[0].node && ref.resolved.defs[0].node.init && ref.resolved.defs[0].node.init.properties && ref.resolved.defs[0].node.init.properties[0] && ref.resolved.defs[0].node.init.properties[0].key.name === '__style' ? ref.resolved.defs[0].node.init.properties[0].value.properties : null;
}

function genOpacityLookup() {
  const lookupMap = {};

  for (let i = 0; i <= 10; i += 1) {
    const val = i / 10; // Why not increment i by 0.1? Floats

    const msg = `  Use prop \`opacity={${val}}\` instead`;
    lookupMap[val] = msg;
    lookupMap[`${val}`] = msg;
  }

  return lookupMap;
}

const overflowLookup = {
  visible: '  Use prop `overflow="visible"` instead',
  hidden: '  Use prop `overflow="hidden"` instead',
  scroll: '  Use prop `overflow="scroll"` instead',
  auto: '  Use prop `overflow="auto"` instead'
};
const rule$3 = {
  meta: {
    docs: {
      description: 'Prevent using dangerouslySetInlineStyle on Box for props that are already directly implemented',
      recommended: false
    },
    schema: [{
      type: 'object',
      properties: {
        onlyKeys: {
          type: 'array',
          items: {
            type: 'string'
          },
          uniqueItems: true
        }
      },
      additionalProperties: false
    }]
  },

  // $FlowFixMe[unclear-type]
  create(context) {
    let importedBox = false;
    let localIdentifierName = 'Box';
    const {
      onlyKeys
    } = context.options[0] || {};

    function includeKey(key) {
      return !onlyKeys || onlyKeys.includes(key);
    }

    const marginLookup = genBointLookup('margin', -12);
    const marginBottomLookup = genBointLookup('marginBottom', -12);
    const marginLeftLookup = genBointLookup('marginLeft', -12);
    const marginRightLookup = genBointLookup('marginRight', -12);
    const marginTopLookup = genBointLookup('marginTop', -12);
    const opacityLookup = genOpacityLookup();
    const paddingLookup = genBointLookup('padding', 0);

    function matchKeyErrors(matchedErrors, key) {
      switch (key.name) {
        case 'backgroundColor':
          if (includeKey('backgroundColor')) {
            const message = validateBackgroundColor(key.value);

            if (message) {
              matchedErrors.push(message);
            }
          }

          break;

        case 'borderRadius':
          if (includeKey('borderRadius')) {
            const message = validateBorderRadius(key.value);

            if (message) {
              matchedErrors.push(message);
            }
          }

          break;

        case 'border':
          if (includeKey('border')) {
            const message = validateBorder(key.value);

            if (message) {
              matchedErrors.push(message);
            }
          }

          break;

        case 'boxShadow':
          if (includeKey('boxShadow')) {
            const message = validateBoxShadow(key.value);

            if (message) {
              matchedErrors.push(message);
            }
          }

          break;

        case 'bottom':
          if (includeKey('bottom') && key.value === '0px' || key.value === 0) {
            matchedErrors.push('  Instead of dangerously styling bottom, use the "bottom" boolean prop');
          }

          break;

        case 'left':
          if (includeKey('left') && key.value === '0px' || key.value === 0) {
            matchedErrors.push('  Instead of dangerously styling left, use the "left" boolean prop');
          }

          break;

        case 'margin':
          if (includeKey('margin')) {
            if (key.value === 'auto') {
              matchedErrors.push('  Use prop `margin="auto"` instead');
            } else {
              matchedErrors.push(marginLookup[key.value]);
            }
          }

          break;

        case 'marginBottom':
          if (includeKey('marginBottom')) {
            if (key.value === 'auto') {
              matchedErrors.push('  Use prop `marginBottom="auto"` instead');
            } else {
              matchedErrors.push(marginBottomLookup[key.value]);
            }
          }

          break;

        case 'marginLeft':
          if (includeKey('marginTop')) {
            if (key.value === 'auto') {
              matchedErrors.push('  Use prop `marginStart="auto"` instead');
            } else {
              matchedErrors.push(marginLeftLookup[key.value]);
            }
          }

          break;

        case 'marginRight':
          if (includeKey('marginRight')) {
            if (key.value === 'auto') {
              matchedErrors.push('  Use prop `marginEnd="auto"` instead');
            } else {
              matchedErrors.push(marginRightLookup[key.value]);
            }
          }

          break;

        case 'marginTop':
          if (includeKey('marginTop')) {
            if (key.value === 'auto') {
              matchedErrors.push('  Use prop `marginTop="auto"` instead');
            } else {
              matchedErrors.push(marginTopLookup[key.value]);
            }
          }

          break;

        case 'maxHeight':
          if (includeKey('maxHeight')) {
            matchedErrors.push('  Use prop `maxHeight={pixels}` or `maxHeight="percentage%"` instead');
          }

          break;

        case 'minHeight':
          if (includeKey('minHeight')) {
            matchedErrors.push('  Use prop `minHeight={pixels}` or `minHeight="percentage%"` instead');
          }

          break;

        case 'maxWidth':
          if (includeKey('maxWidth')) {
            matchedErrors.push('  Use prop `maxWidth={pixels}` or `maxWidth="percentage%"` instead');
          }

          break;

        case 'minWidth':
          if (includeKey('minWidth')) {
            matchedErrors.push('  Use prop `minWidth={pixels}` or `minWidth="percentage%"` instead');
          }

          break;

        case 'opacity':
          if (includeKey('opacity')) {
            matchedErrors.push(opacityLookup[key.value]);
          }

          break;

        case 'overflow':
          if (includeKey('overflow')) {
            matchedErrors.push(overflowLookup[key.value]);
          }

          break;

        case 'overflow-x':
          if (includeKey('overflow')) {
            if (key.value === 'scroll') {
              matchedErrors.push('  Use prop `overflow="scrollX"` instead');
            }
          }

          break;

        case 'overflow-y':
          if (includeKey('overflow')) {
            if (key.value === 'scroll') {
              matchedErrors.push('  Use prop `overflow="scrollY"` instead');
            }
          }

          break;

        case 'padding':
          if (includeKey('padding')) {
            matchedErrors.push(paddingLookup[key.value]);
          }

          break;

        case 'position':
          if (includeKey('position')) {
            if (key.value === 'absolute') {
              matchedErrors.push('  Use prop `position="absolute"` instead');
            } else if (key.value === 'static') {
              matchedErrors.push('  Use prop `position="static"` instead');
            } else if (key.value === 'relative') {
              matchedErrors.push('  Use prop `position="relative"` instead');
            } else if (key.value === 'fixed') {
              matchedErrors.push('  Use prop `position="fixed"` instead');
            }
          }

          break;

        case 'right':
          if (includeKey('right') && key.value === '0px' || key.value === 0) {
            matchedErrors.push('  Instead of dangerously styling right, use the "right" boolean prop');
          }

          break;

        case 'top':
          if (includeKey('top') && key.value === '0px' || key.value === 0) {
            matchedErrors.push('  Instead of dangerously styling top, use the "top" boolean prop');
          }

          break;
      }

      return matchedErrors.filter(x => x);
    }

    return {
      ImportDeclaration(decl) {
        if (decl.source.value !== 'gestalt') {
          return;
        }

        importedBox = decl.specifiers.some(node => {
          const isBox = node.imported.name === 'Box';

          if (isBox) {
            localIdentifierName = node.local.name;
          }

          return isBox;
        });
      },

      JSXOpeningElement(node) {
        if (!importedBox || localIdentifierName !== node.name.name) {
          return;
        }

        Object.keys(node.attributes).some(attrKey => {
          const attr = node.attributes[attrKey];
          const matched = attr.name && attr.name.name === 'dangerouslySetInlineStyle';

          if (matched) {
            // If we have style properties here, this is an object declared inline
            let styleProperties = getInlineDefinedStyles$1(attr); // Not declared inline? Check to see if there's a variable matching the name defined

            if (!styleProperties && attr.value.expression.name) {
              const scope = context.getScope(node); // Look in local scope for variable reference

              const ref = scope.references.find(reference => reference.identifier.name === attr.value.expression.name);

              if (ref) {
                styleProperties = getVariableDefinedStyles$1(ref);
              }
            }

            if (styleProperties) {
              const errorMessages = styleProperties.map(({
                key,
                type,
                value
              }) => {
                // Handle things like spread props
                if (!key || value.value === undefined) {
                  return {
                    name: type,
                    value: null
                  };
                }

                return {
                  name: key.name,
                  value: value.value
                };
              }).reduce(matchKeyErrors, []);

              if (errorMessages.length) {
                context.report(attr, `Un-needed Box dangerous styles found. https://gestalt.netlify.app/Box\n${errorMessages.join('\n')}`);
              }
            }
          }

          return matched;
        });
      }

    };
  }

};

/**
 * @fileoverview Disallow medium form fields
 * @author Christian Vuerings <cvuerings@pinterest.com>
 *
 * In order to have consistent form fields in pinboard, we update all of their sizes to large and disallow medium
 */
const rule$2 = {
  meta: {
    docs: {
      description: 'Disallow medium form fields',
      recommended: false
    },
    schema: [{
      type: 'object',
      additionalProperties: false
    }]
  },

  // $FlowFixMe[unclear-type]
  create(context) {
    let importedComponent = false;
    let localIdentifierName;
    const componentNames = ['SearchField', 'SelectList', 'Tabs', 'TextField'];
    return {
      ImportDeclaration(decl) {
        if (decl.source.value !== 'gestalt') {
          return;
        }

        importedComponent = decl.specifiers.some(node => {
          const isValidComponent = componentNames.includes(node.imported.name);

          if (isValidComponent) {
            localIdentifierName = node.local.name;
          }

          return isValidComponent;
        });
      },

      JSXOpeningElement(node) {
        if (!importedComponent || localIdentifierName !== node.name.name) {
          return;
        }

        const sizeAttribute = Object.entries(node.attributes).find( // eslint-disable-next-line no-unused-vars
        ([key, value]) => // $FlowFixMe[incompatible-use]
        value && value.name && value.name.name === 'size'); // No size defined or size is not "lg"
        // $FlowFixMe[incompatible-use]

        if (!sizeAttribute || sizeAttribute[1].value.value === 'md') {
          context.report(node, 'Gestalt form fields should always have size="lg" set on them');
        }
      }

    };
  }

};

/**
 * @fileoverview Disallow role-link on Gestalt components
 * @author Alberto Carreras <acarreras@pinterest.com>
 *
 * We do not allow role='link' on Button, TapArea, and IconButton.
 * Pinboard alternative with additional functionalityp must be used instead.
 */
const rule$1 = {
  meta: {
    docs: {
      description: 'Disallow role-link on Gestalt components',
      recommended: false
    },
    schema: [{
      type: 'object',
      additionalProperties: false
    }]
  },

  // $FlowFixMe[unclear-type]
  create(context) {
    let importedComponent = false;
    let importedName;
    return {
      ImportDeclaration(decl) {
        if (decl.source.value !== 'gestalt') {
          return;
        }

        importedComponent = decl.specifiers.some(node => {
          importedName = node.imported.name;
          return ['Button', 'TapArea', 'IconButton'].includes(node.imported.name);
        });
      },

      JSXOpeningElement(node) {
        if (!importedComponent) {
          return;
        }

        const isRoleLink = Object.entries(node.attributes).find( // eslint-disable-next-line no-unused-vars
        ([key, value]) => value && value.name && value.name.name === 'role' && value.value && // $FlowFixMe[incompatible-use]
        value.value.value === 'link');

        if (isRoleLink) {
          context.report(node, `${importedName} Components with role-link are disallowed in Pinboard. Please use app/common/react/ui/${importedName}Link.js instead.`);
        }
      }

    };
  }

};

/**
 * @fileoverview Prevent using inline styles on divs that could be gestalt Box props
 * @author Jenny Steele <jsteele@pinterest.com>
 *
 * We prefer using gestalt Box over divs with inline styling to get styling consistency
 * across the app and shared css classes. This linter checks for usage of inline styling
 * that is available as Box props.
 */

function getInlineDefinedStyles(attr) {
  return attr.value.expression.properties ? attr.value.expression.properties : null;
}

function getVariableDefinedStyles(ref) {
  return ref.resolved && ref.resolved.defs && ref.resolved.defs[0] && ref.resolved.defs[0].node && ref.resolved.defs[0].node.init && ref.resolved.defs[0].node.init.properties ? ref.resolved.defs[0].node.init.properties : null;
}

const rule = {
  meta: {
    docs: {
      description: 'linter checks for usage of inline styling that is available as Box props',
      recommended: false
    },
    schema: [{
      type: 'object',
      additionalProperties: false
    }]
  },

  // $FlowFixMe[unclear-type]
  create(context) {
    function matchKeyErrors(matchedErrors, key) {
      let message = '';

      switch (key.name) {
        case 'backgroundColor':
          message = validateBackgroundColor(key.value);

          if (message) {
            matchedErrors.push(message);
          }

          break;

        case 'borderRadius':
          message = validateBorderRadius(key.value);

          if (message) {
            matchedErrors.push(message);
          }

          break;

        case 'border':
          message = validateBorder(key.value);

          if (message) {
            matchedErrors.push(message);
          }

          break;
      }

      return matchedErrors.filter(x => x);
    }

    return {
      JSXOpeningElement(node) {
        if (node.name.name !== 'div') {
          return;
        }

        Object.keys(node.attributes).some(attrKey => {
          const attr = node.attributes[attrKey];
          const matched = attr.name && attr.name.name === 'style';

          if (matched) {
            // If we have style properties here, this is an object declared inline
            let styleProperties = getInlineDefinedStyles(attr); // Not declared inline? Check to see if there's a variable matching the name defined

            if (!styleProperties && attr.value.expression.name) {
              const scope = context.getScope(node); // Look in local scope for variable reference

              const ref = scope.references.find(reference => reference.identifier.name === attr.value.expression.name);

              if (ref) {
                styleProperties = getVariableDefinedStyles(ref);
              }
            }

            if (styleProperties) {
              const errorMessages = styleProperties.map(({
                key,
                type,
                value
              }) => {
                // Handle things like spread props
                if (!key || value.value === undefined) {
                  return {
                    name: type,
                    value: null
                  };
                }

                return {
                  name: key.name,
                  value: value.value
                };
              }).reduce(matchKeyErrors, []);

              if (errorMessages.length) {
                context.report(attr, `Replace this div with a gestalt Box. https://gestalt.netlify.app/Box\n${errorMessages.join('\n')}`);
              }
            }
          }

          return matched;
        });
      }

    };
  }

};

module.exports = {
  rules: {
    'button-icon-restrictions': rule$5,
    'no-box-marginleft-marginright': rule$4,
    'no-dangerous-style-duplicates': rule$3,
    'no-medium-formfields': rule$2,
    'no-role-link-components': rule$1,
    'prefer-box': rule
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXNsaW50LXBsdWdpbi1nZXN0YWx0LmVzLmpzIiwic291cmNlcyI6WyIuLi9zcmMvYnV0dG9uLWljb24tcmVzdHJpY3Rpb25zLmpzIiwiLi4vc3JjL25vLWJveC1tYXJnaW5sZWZ0LW1hcmdpbnJpZ2h0LmpzIiwiLi4vc3JjL3ZhbGlkYXRvcnMuanMiLCIuLi9zcmMvbm8tZGFuZ2Vyb3VzLXN0eWxlLWR1cGxpY2F0ZXMuanMiLCIuLi9zcmMvbm8tbWVkaXVtLWZvcm1maWVsZHMuanMiLCIuLi9zcmMvbm8tcm9sZS1saW5rLWNvbXBvbmVudHMuanMiLCIuLi9zcmMvcHJlZmVyLWJveC5qcyIsIi4uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBmaWxlb3ZlcnZpZXcgUmVxdWlyZSBzcGVjaWZpYyBwcm9wcyB3aGVuIHVzaW5nIGFuIGljb24gd2l0aCBCdXR0b25cbiAqIEBhdXRob3IgUnlhbiBKYW1lcyA8cmphbWVzQHBpbnRlcmVzdC5jb20+XG4gKlxuICogR2VzdGFsdCBpcyBtb3JlIHBlcm1pc3NpdmUgdGhhbiBQRFMgcmVjb21tZW5kcyBpbiBhZGRpbmcgaWNvbnMgdG8gQnV0dG9ucy5cbiAqIEJ1dHRvbnMgdXNpbmcgaWNvbkVuZCBtdXN0IHVzZTpcbiAqIC0gaWNvbiBcImFycm93LWRvd25cIlxuICogLSBjb2xvciBcIndoaXRlXCJcbiAqIC0gc2l6ZSBcImxnXCJcbiAqL1xuXG4vLyBAZmxvdyBzdHJpY3RcbmNvbnN0IHJ1bGUgPSB7XG4gIG1ldGE6IHtcbiAgICBkb2NzOiB7XG4gICAgICBkZXNjcmlwdGlvbjogJ0J1dHRvbiBpY29uIHJlc3RyaWN0aW9ucycsXG4gICAgICByZWNvbW1lbmRlZDogZmFsc2UsXG4gICAgfSxcbiAgICBzY2hlbWE6IFtcbiAgICAgIHtcbiAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgIGFkZGl0aW9uYWxQcm9wZXJ0aWVzOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgXSxcbiAgfSxcblxuICAvLyAkRmxvd0ZpeE1lW3VuY2xlYXItdHlwZV1cbiAgY3JlYXRlKGNvbnRleHQ6IE9iamVjdCk6IE9iamVjdCB7XG4gICAgbGV0IGltcG9ydGVkQ29tcG9uZW50ID0gZmFsc2U7XG4gICAgbGV0IGxvY2FsSWRlbnRpZmllck5hbWU7XG4gICAgY29uc3QgY29tcG9uZW50TmFtZSA9ICdCdXR0b24nO1xuXG4gICAgZnVuY3Rpb24gZ2V0QXR0cmlidXRlKG5vZGUsIGF0dHJpYnV0ZU5hbWUpIHtcbiAgICAgIHJldHVybiBPYmplY3QuZW50cmllcyhub2RlLmF0dHJpYnV0ZXMpLmZpbmQoXG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuICAgICAgICAoW2tleSwgdmFsdWVdKSA9PlxuICAgICAgICAgIC8vICRGbG93Rml4TWVbaW5jb21wYXRpYmxlLXVzZV1cbiAgICAgICAgICB2YWx1ZSAmJiB2YWx1ZS5uYW1lICYmIHZhbHVlLm5hbWUubmFtZSA9PT0gYXR0cmlidXRlTmFtZSxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0VmFsdWUoYXR0cmlidXRlKSB7XG4gICAgICAvLyAkRmxvd0ZpeE1lW2luY29tcGF0aWJsZS11c2VdXG4gICAgICByZXR1cm4gYXR0cmlidXRlID8gYXR0cmlidXRlWzFdLnZhbHVlLnZhbHVlIDogbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgSW1wb3J0RGVjbGFyYXRpb24oZGVjbCkge1xuICAgICAgICBpZiAoZGVjbC5zb3VyY2UudmFsdWUgIT09ICdnZXN0YWx0Jykge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpbXBvcnRlZENvbXBvbmVudCA9IGRlY2wuc3BlY2lmaWVycy5zb21lKChub2RlKSA9PiB7XG4gICAgICAgICAgY29uc3QgaXNWYWxpZENvbXBvbmVudCA9IG5vZGUuaW1wb3J0ZWQubmFtZSA9PT0gY29tcG9uZW50TmFtZTtcbiAgICAgICAgICBpZiAoaXNWYWxpZENvbXBvbmVudCkge1xuICAgICAgICAgICAgbG9jYWxJZGVudGlmaWVyTmFtZSA9IG5vZGUubG9jYWwubmFtZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGlzVmFsaWRDb21wb25lbnQ7XG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICAgIEpTWE9wZW5pbmdFbGVtZW50KG5vZGUpIHtcbiAgICAgICAgaWYgKCFpbXBvcnRlZENvbXBvbmVudCB8fCBsb2NhbElkZW50aWZpZXJOYW1lICE9PSBub2RlLm5hbWUubmFtZSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGljb25BdHRyaWJ1dGUgPSBnZXRBdHRyaWJ1dGUobm9kZSwgJ2ljb25FbmQnKTtcbiAgICAgICAgY29uc3QgaXNDb3JyZWN0SWNvbiA9IGdldFZhbHVlKGljb25BdHRyaWJ1dGUpID09PSAnYXJyb3ctZG93bic7XG5cbiAgICAgICAgLy8gTm90IHVzaW5nIGljb25FbmQsIGVhcmx5IHJldHVyblxuICAgICAgICBpZiAoIWljb25BdHRyaWJ1dGUpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjb2xvckF0dHJpYnV0ZSA9IGdldEF0dHJpYnV0ZShub2RlLCAnY29sb3InKTtcbiAgICAgICAgY29uc3QgaXNDb3JyZWN0Q29sb3IgPSBnZXRWYWx1ZShjb2xvckF0dHJpYnV0ZSkgPT09ICd3aGl0ZSc7XG5cbiAgICAgICAgY29uc3Qgc2l6ZUF0dHJpYnV0ZSA9IGdldEF0dHJpYnV0ZShub2RlLCAnc2l6ZScpO1xuICAgICAgICBjb25zdCBpc0NvcnJlY3RTaXplID0gZ2V0VmFsdWUoc2l6ZUF0dHJpYnV0ZSkgPT09ICdsZyc7XG5cbiAgICAgICAgLy8gTm90IHVzaW5nIGNvcnJlY3QgcHJvcHNcbiAgICAgICAgaWYgKCFpc0NvcnJlY3RDb2xvciB8fCAhaXNDb3JyZWN0SWNvbiB8fCAhaXNDb3JyZWN0U2l6ZSkge1xuICAgICAgICAgIGNvbnRleHQucmVwb3J0KFxuICAgICAgICAgICAgbm9kZSxcbiAgICAgICAgICAgICdCdXR0b25zIHVzaW5nIGljb25FbmQgbXVzdCB1c2UgXCJhcnJvdy1kb3duXCIsIGNvbG9yIFwid2hpdGVcIiwgYW5kIHNpemUgXCJsZ1wiJyxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgIH07XG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBydWxlO1xuIiwiLyoqXG4gKiBAZmlsZW92ZXJ2aWV3IERpc2FsbG93IG1hcmdpbkxlZnQvbWFyZ2luUmlnaHQgb24gQm94XG4gKiBAYXV0aG9yIFZpbmNlbnQgVGlhbiA8dmluY2VudEBwaW50ZXJlc3QuY29tPlxuICpcbiAqIEluIG9yZGVyIHRvIGhhdmUgY29uc2lzdGVudCB1c2FnZSBvZiBtYXJnaW5MZWZ0L21hcmdpblJpZ2h0IG9uIEJveCBpbiBwaW5ib2FyZCxcbiAqIHdlIHVwZGF0ZSBhbGwgb2YgdGhlbSB0byBtYXJnaW5TdGFydC9tYXJnaW5FbmRcbiAqL1xuXG4vLyBAZmxvdyBzdHJpY3RcbmNvbnN0IGRpc2FsbG93ZWRQcm9wcyA9IFtcbiAgJ21hcmdpbkxlZnQnLFxuICAnc21NYXJnaW5MZWZ0JyxcbiAgJ21kTWFyZ2luTGVmdCcsXG4gICdsZ01hcmdpbkxlZnQnLFxuICAnbWFyZ2luUmlnaHQnLFxuICAnc21NYXJnaW5SaWdodCcsXG4gICdtZE1hcmdpblJpZ2h0JyxcbiAgJ2xnTWFyZ2luUmlnaHQnLFxuXTtcblxuZXhwb3J0IGNvbnN0IGVycm9yTWVzc2FnZSA9XG4gICdtYXJnaW5MZWZ0L21hcmdpblJpZ2h0IGhhdmUgYmVlbiBkZXByZWNhdGVkLiBQbGVhc2UgdXNlIG1hcmdpblN0YXJ0L21hcmdpbkVuZCB0byBzdXBwb3J0IFJpZ2h0LXRvLUxlZnQgKFJUTClcXG5odHRwczovL2dlc3RhbHQubmV0bGlmeS5hcHAvQm94JztcblxuY29uc3QgcnVsZSA9IHtcbiAgbWV0YToge1xuICAgIGRvY3M6IHtcbiAgICAgIGRlc2NyaXB0aW9uOlxuICAgICAgICAnRW5mb3JjZSB1c2FnZSBvZiBSaWdodC10by1MZWZ0IChSVEwpLWNvbXBsaWFudCBtYXJnaW5TdGFydC9tYXJnaW5FbmQgb3ZlciBtYXJnaW5MZWZ0L21hcmdpblJpZ2h0JyxcbiAgICAgIHJlY29tbWVuZGVkOiBmYWxzZSxcbiAgICB9LFxuICAgIHNjaGVtYTogW1xuICAgICAge1xuICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgYWRkaXRpb25hbFByb3BlcnRpZXM6IGZhbHNlLFxuICAgICAgfSxcbiAgICBdLFxuICB9LFxuXG4gIC8vICRGbG93Rml4TWVbdW5jbGVhci10eXBlXVxuICBjcmVhdGUoY29udGV4dDogT2JqZWN0KTogT2JqZWN0IHtcbiAgICBsZXQgaW1wb3J0ZWRDb21wb25lbnQgPSBmYWxzZTtcblxuICAgIHJldHVybiB7XG4gICAgICBJbXBvcnREZWNsYXJhdGlvbihkZWNsKSB7XG4gICAgICAgIGlmIChkZWNsLnNvdXJjZS52YWx1ZSAhPT0gJ2dlc3RhbHQnKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGltcG9ydGVkQ29tcG9uZW50ID0gZGVjbC5zcGVjaWZpZXJzLnNvbWUoKG5vZGUpID0+IHtcbiAgICAgICAgICByZXR1cm4gbm9kZS5pbXBvcnRlZC5uYW1lID09PSAnQm94JztcbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICAgSlNYT3BlbmluZ0VsZW1lbnQobm9kZSkge1xuICAgICAgICBpZiAoIWltcG9ydGVkQ29tcG9uZW50KSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgaXNNYXJnaW5MZWZ0UmlnaHRBdHRyaWJ1dGUgPSBPYmplY3QuZW50cmllcyhcbiAgICAgICAgICBub2RlLmF0dHJpYnV0ZXMsXG4gICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gICAgICAgICkuZmluZCgoW2tleSwgdmFsdWVdKSA9PlxuICAgICAgICAgIGRpc2FsbG93ZWRQcm9wcy5pbmNsdWRlcyhcbiAgICAgICAgICAgIC8vICRGbG93Rml4TWVbaW5jb21wYXRpYmxlLXVzZV1cbiAgICAgICAgICAgIHZhbHVlICYmIHZhbHVlLm5hbWUgJiYgdmFsdWUubmFtZS5uYW1lLFxuICAgICAgICAgICksXG4gICAgICAgICk7XG5cbiAgICAgICAgLy8gTm8gbWFyZ2luTGVmdCBvciBtYXJnaW5SaWdodCBhdHRyaWJ1dGVzIG9uIEJveFxuICAgICAgICBpZiAoaXNNYXJnaW5MZWZ0UmlnaHRBdHRyaWJ1dGUpIHtcbiAgICAgICAgICBjb250ZXh0LnJlcG9ydChub2RlLCBlcnJvck1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgIH07XG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBydWxlO1xuIiwiLy8gQGZsb3cgc3RyaWN0XG5leHBvcnQgZnVuY3Rpb24gZ2VuQm9pbnRMb29rdXAoXG4gIHByb3BOYW1lOiBzdHJpbmcsXG4gIHN0YXJ0OiBudW1iZXIsXG4gIGVuZDogbnVtYmVyID0gMTIsXG4pOiB7fCBbc3RyaW5nIHwgbnVtYmVyXTogc3RyaW5nIHx9IHtcbiAgY29uc3QgbG9va3VwTWFwID0ge307XG4gIGZvciAobGV0IGkgPSBzdGFydDsgaSA8PSBlbmQ7IGkgKz0gMSkge1xuICAgIGNvbnN0IHB4ID0gaSAqIDQ7XG4gICAgbGV0IG1zZyA9IGAgIFVzZSBwcm9wIFxcYCR7cHJvcE5hbWV9PXske2l9fVxcYCBpbnN0ZWFkYDtcbiAgICAvLyBTcGVjaWFsIGNhc2UgZm9yIG1hcmdpbkxlZnQgYW5kIG1hcmdpblJpZ2h0XG4gICAgaWYgKFsnbWFyZ2luTGVmdCcsICdtYXJnaW5SaWdodCddLmluY2x1ZGVzKHByb3BOYW1lKSkge1xuICAgICAgY29uc3QgcmVjb21tZW5kZWRQcm9wID0gcHJvcE5hbWUgPT09ICdtYXJnaW5MZWZ0JyA/ICdtYXJnaW5TdGFydCcgOiAnbWFyZ2luRW5kJztcbiAgICAgIG1zZyA9IGAgIFVzZSBwcm9wIFxcYCR7cmVjb21tZW5kZWRQcm9wfT17JHtpfX1cXGAgaW5zdGVhZGA7XG4gICAgfVxuICAgIGxvb2t1cE1hcFtweF0gPSBtc2c7XG4gICAgbG9va3VwTWFwW2Ake3B4fXB4YF0gPSBtc2c7XG4gIH1cbiAgcmV0dXJuIGxvb2t1cE1hcDtcbn1cblxuY29uc3Qgcm91bmRpbmdMb29rdXAgPSBnZW5Cb2ludExvb2t1cCgncm91bmRpbmcnLCAwLCA4KTtcblxuZXhwb3J0IGNvbnN0IHZhbGlkYXRlQmFja2dyb3VuZENvbG9yID0gKHZhbHVlOiBzdHJpbmcpOiA/c3RyaW5nID0+IHtcbiAgaWYgKHZhbHVlID09PSAnI2U2MDAyMycpIHtcbiAgICByZXR1cm4gJyAgVXNlIHByb3AgYGNvbG9yPVwicmVkXCJgIGluc3RlYWQnO1xuICB9XG4gIGlmICh2YWx1ZSA9PT0gJ3doaXRlJyB8fCB2YWx1ZSA9PT0gJyNmZmYnIHx8IHZhbHVlID09PSAnI2ZmZmZmZicpIHtcbiAgICByZXR1cm4gJyAgVXNlIHByb3AgYGNvbG9yPVwid2hpdGVcImAgaW5zdGVhZCc7XG4gIH1cbiAgaWYgKHZhbHVlID09PSAnI2VmZWZlZicpIHtcbiAgICByZXR1cm4gJyAgVXNlIHByb3AgYGNvbG9yPVwibGlnaHRHcmF5XCJgIGluc3RlYWQnO1xuICB9XG4gIGlmICh2YWx1ZSA9PT0gJyM3Njc2NzYnKSB7XG4gICAgcmV0dXJuICcgIFVzZSBwcm9wIGBjb2xvcj1cImdyYXlcImAgaW5zdGVhZCc7XG4gIH1cbiAgaWYgKHZhbHVlID09PSAnIzMzMycgfHwgdmFsdWUgPT09ICcjMzMzMzMzJykge1xuICAgIHJldHVybiAnICBVc2UgcHJvcCBgY29sb3I9XCJkYXJrR3JheVwiYCBpbnN0ZWFkJztcbiAgfVxuICBpZiAodmFsdWUgPT09ICcjMGZhNTczJykge1xuICAgIHJldHVybiAnICBVc2UgcHJvcCBgY29sb3I9XCJncmVlblwiYCBpbnN0ZWFkJztcbiAgfVxuICBpZiAodmFsdWUgPT09ICcjMGE2OTU1Jykge1xuICAgIHJldHVybiAnICBVc2UgcHJvcCBgY29sb3I9XCJwaW5lXCJgIGluc3RlYWQnO1xuICB9XG4gIGlmICh2YWx1ZSA9PT0gJyMzNjRhNGMnKSB7XG4gICAgcmV0dXJuICcgIFVzZSBwcm9wIGBjb2xvcj1cIm9saXZlXCJgIGluc3RlYWQnO1xuICB9XG4gIGlmICh2YWx1ZSA9PT0gJyMwMDc0ZTgnKSB7XG4gICAgcmV0dXJuICcgIFVzZSBwcm9wIGBjb2xvcj1cImJsdWVcImAgaW5zdGVhZCc7XG4gIH1cbiAgaWYgKHZhbHVlID09PSAnIzAwNGI5MScpIHtcbiAgICByZXR1cm4gJyAgVXNlIHByb3AgYGNvbG9yPVwibmF2eVwiYCBpbnN0ZWFkJztcbiAgfVxuICBpZiAodmFsdWUgPT09ICcjMTMzYTVlJykge1xuICAgIHJldHVybiAnICBVc2UgcHJvcCBgY29sb3I9XCJtaWRuaWdodFwiYCBpbnN0ZWFkJztcbiAgfVxuICBpZiAodmFsdWUgPT09ICcjYjQ2OWViJykge1xuICAgIHJldHVybiAnICBVc2UgcHJvcCBgY29sb3I9XCJwdXJwbGVcImAgaW5zdGVhZCc7XG4gIH1cbiAgaWYgKHZhbHVlID09PSAnIzgwNDZhNScpIHtcbiAgICByZXR1cm4gJyAgVXNlIHByb3AgYGNvbG9yPVwib3JjaGlkXCJgIGluc3RlYWQnO1xuICB9XG4gIGlmICh2YWx1ZSA9PT0gJyM1YjI2NzcnKSB7XG4gICAgcmV0dXJuICcgIFVzZSBwcm9wIGBjb2xvcj1cImVnZ3BsYW50XCJgIGluc3RlYWQnO1xuICB9XG4gIGlmICh2YWx1ZSA9PT0gJyM2ZTBmM2MnKSB7XG4gICAgcmV0dXJuICcgIFVzZSBwcm9wIGBjb2xvcj1cIm1hcm9vblwiYCBpbnN0ZWFkJztcbiAgfVxuICBpZiAodmFsdWUgPT09ICcjZjEzNTM1Jykge1xuICAgIHJldHVybiAnICBVc2UgcHJvcCBgY29sb3I9XCJ3YXRlcm1lbG9uXCJgIGluc3RlYWQnO1xuICB9XG4gIGlmICh2YWx1ZSA9PT0gJyNlMzc4MGMnKSB7XG4gICAgcmV0dXJuICcgIFVzZSBwcm9wIGBjb2xvcj1cIm9yYW5nZVwiYCBpbnN0ZWFkJztcbiAgfVxuICBpZiAodmFsdWUgPT09ICd0cmFuc3BhcmVudCcpIHtcbiAgICByZXR1cm4gJyAgVXNlIHByb3AgYGNvbG9yPVwidHJhbnNwYXJlbnRcImAgaW5zdGVhZCc7XG4gIH1cbiAgaWYgKHZhbHVlID09PSAncmdiYSg1MSw1MSw1MSwuOCknKSB7XG4gICAgcmV0dXJuICcgIFVzZSBwcm9wIGBjb2xvcj1cInRyYW5zcGFyZW50RGFya0dyYXlcImAgaW5zdGVhZCc7XG4gIH1cbiAgaWYgKHZhbHVlID09PSAnI2UyZTJlMicpIHtcbiAgICByZXR1cm4gJyAgVXNlIHByb3AgYGNvbG9yPVwibGlnaHRXYXNoXCJgIGluc3RlYWQnO1xuICB9XG4gIGlmICh2YWx1ZSA9PT0gJyNkYWRhZGEnKSB7XG4gICAgcmV0dXJuICcgIFVzZSBwcm9wIGBjb2xvcj1cImRhcmtXYXNoXCJgIGluc3RlYWQnO1xuICB9XG4gIHJldHVybiB1bmRlZmluZWQ7XG59O1xuXG5leHBvcnQgY29uc3QgdmFsaWRhdGVCb3JkZXJSYWRpdXMgPSAodmFsdWU6IHN0cmluZyk6IG51bWJlciB8IHN0cmluZyA9PiB7XG4gIGlmICh2YWx1ZSA9PT0gJzUwJScpIHtcbiAgICByZXR1cm4gJyAgVXNlIHByb3AgYHJvdW5kaW5nPVwiY2lyY2xlXCJgIGluc3RlYWQnO1xuICB9XG4gIGlmICh2YWx1ZSA9PT0gJzk5OXB4Jykge1xuICAgIHJldHVybiAnICBVc2UgcHJvcCBgcm91bmRpbmc9XCJwaWxsXCJgIGluc3RlYWQnO1xuICB9XG4gIHJldHVybiByb3VuZGluZ0xvb2t1cFt2YWx1ZV07XG59O1xuXG5leHBvcnQgY29uc3QgdmFsaWRhdGVCb3JkZXIgPSAodmFsdWU6IHN0cmluZyk6ID9zdHJpbmcgPT4ge1xuICAvLyBJZiB0aGUgdmFsdWUgaXMgYSBzdHJpbmc6XG4gIC8vIDEpIGNvbnZlcnQgZXZlcnl0aGluZyB0byBsb3dlckNhc2UgKGNzcyBpcyBjYXNlLWluc2Vuc2l0aXZlKVxuICAvLyAyKSBzb3J0IHRoZSB2YWx1ZXMgc2luY2Ugc29tZSBmb3VuZCB1c2VzIGhhdmUgdGhlIHdyb25nIG9yZGVyXG4gIGNvbnN0IGNsZWFuVmFsdWUgPVxuICAgIHZhbHVlICYmIHZhbHVlLnRvTG93ZXJDYXNlID8gdmFsdWUudG9Mb3dlckNhc2UoKS5zcGxpdCgnICcpLnNvcnQoKS5qb2luKCcgJykgOiB2YWx1ZTtcbiAgaWYgKFxuICAgIGNsZWFuVmFsdWUgPT09ICcjZWZlZmVmIDFweCBzb2xpZCcgfHxcbiAgICBjbGVhblZhbHVlID09PSAnI2VlZSAxcHggc29saWQnIHx8XG4gICAgY2xlYW5WYWx1ZSA9PT0gJzFweCBsaWdodGdyYXkgc29saWQnXG4gICkge1xuICAgIHJldHVybiAnICBVc2UgcHJvcCBgYm9yZGVyU3R5bGU9XCJzbVwiYCBpbnN0ZWFkJztcbiAgfVxuICBpZiAoXG4gICAgY2xlYW5WYWx1ZSA9PT0gJyNlZmVmZWYgMnB4IHNvbGlkJyB8fFxuICAgIGNsZWFuVmFsdWUgPT09ICcjZWVlIDJweCBzb2xpZCcgfHxcbiAgICBjbGVhblZhbHVlID09PSAnMnB4IGxpZ2h0Z3JheSBzb2xpZCdcbiAgKSB7XG4gICAgcmV0dXJuICcgIFVzZSBwcm9wIGBib3JkZXJTdHlsZT1cImxnXCJgIGluc3RlYWQnO1xuICB9XG4gIHJldHVybiB1bmRlZmluZWQ7XG59O1xuXG5leHBvcnQgY29uc3QgdmFsaWRhdGVCb3hTaGFkb3cgPSAodmFsdWU6IHN0cmluZyk6ID9zdHJpbmcgPT4ge1xuICAvLyBJZiB0aGUgdmFsdWUgaXMgYSBzdHJpbmc6XG4gIC8vIDEpIHN0cmlwIG91dCB0aGUgcmdiYSBwb3J0aW9uXG4gIC8vIDIpIGNvbnZlcnQgdGhlIHBpeGVsIHBvcnRpb24gdG8gb25seSBudW1iZXJzXG4gIC8vIDMpIElmIGJvdGggcGllY2VzIG1hdGNoLCByZWNvbW1lbmQgYm9yZGVyU3R5bGU9XCJzaGFkb3dcIlxuXG4gIGNvbnN0IHJnYmFSZWdleCA9IG5ldyBSZWdFeHAoXG4gICAgL3JnYmFcXChcXHMqKC0/XFxkK3wtP1xcZCpcXC5cXGQrKD89JSkpKCU/KVxccyosXFxzKigtP1xcZCt8LT9cXGQqXFwuXFxkKyg/PSUpKShcXDIpXFxzKixcXHMqKC0/XFxkK3wtP1xcZCpcXC5cXGQrKD89JSkpKFxcMilcXHMqLFxccyooLT9cXGQrfC0/XFxkKi5cXGQrKVxccypcXCkvLFxuICAgICdnJyxcbiAgKTtcbiAgY29uc3QgcmdiYVBvcnRpb24gPSB2YWx1ZS5tYXRjaChyZ2JhUmVnZXgpO1xuICBjb25zdCBjbGVhblJnYmFQb3J0aW9uID1cbiAgICByZ2JhUG9ydGlvbiAmJiByZ2JhUG9ydGlvbi5sZW5ndGggPiAwID8gcmdiYVBvcnRpb25bMF0ucmVwbGFjZSgvIC9nLCAnJykgOiB1bmRlZmluZWQ7XG5cbiAgY29uc3QgcGl4ZWxQb3J0aW9uID0gdmFsdWUucmVwbGFjZShyZ2JhUmVnZXgsICcnKTtcbiAgY29uc3QgY2xlYW5QaXhlbFBvcnRpb24gPSBwaXhlbFBvcnRpb24ucmVwbGFjZSgvcHgvZywgJycpLnJlcGxhY2UoLyAvZywgJycpO1xuXG4gIGxldCByZ2JhTWF0Y2ggPSBmYWxzZTtcbiAgbGV0IHBpeGVsc01hdGNoID0gZmFsc2U7XG4gIGlmIChjbGVhblJnYmFQb3J0aW9uICYmIFsncmdiYSgwLDAsMCwwLjEpJywgJ3JnYmEoMCwwLDAsLjEpJ10uaW5jbHVkZXMoY2xlYW5SZ2JhUG9ydGlvbikpIHtcbiAgICByZ2JhTWF0Y2ggPSB0cnVlO1xuICB9XG4gIGlmIChbJzAwOCcsICcwMDgwJ10uaW5jbHVkZXMoY2xlYW5QaXhlbFBvcnRpb24pKSB7XG4gICAgcGl4ZWxzTWF0Y2ggPSB0cnVlO1xuICB9XG5cbiAgaWYgKHJnYmFNYXRjaCAmJiBwaXhlbHNNYXRjaCkge1xuICAgIHJldHVybiAnICBVc2UgcHJvcCBgYm9yZGVyU3R5bGU9XCJzaGFkb3dcImAgaW5zdGVhZCc7XG4gIH1cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn07XG4iLCIvKipcbiAqIEBmaWxlb3ZlcnZpZXcgUHJldmVudCB1c2luZyBkYW5nZXJvdXNseVNldElubGluZVN0eWxlIG9uIEJveCBmb3IgcHJvcHMgdGhhdCBhcmUgYWxyZWFkeSBkaXJlY3RseSBpbXBsZW1lbnRlZFxuICogQGF1dGhvciBKZW5ueSBTdGVlbGUgPGpzdGVlbGVAcGludGVyZXN0LmNvbT5cbiAqXG4gKiBCb3ggc3VwcG9ydHMgc29tZSBwcm9wcyBhbHJlYWR5IHRoYXQgYXJlIG5vdCB3aWRlbHkga25vd24gYW5kIGluc3RlYWQgYXJlIGJlaW5nXG4gKiBpbXBsZW1lbnRlZCB3aXRoIGRhbmdlcm91c2x5U2V0SW5saW5lU3R5bGUuIFRoaXMgbGludGVyIGNoZWNrcyBmb3IgdXNhZ2Ugb2YgYWxyZWFkeVxuICogYXZhaWxhYmxlIHByb3BzIGFzIGRhbmdlcm91cyBzdHlsZXMgYW5kIHN1Z2dlc3RzIHRoZSBhbHRlcm5hdGl2ZVxuICovXG5cbi8vIEBmbG93IHN0cmljdFxuaW1wb3J0IHtcbiAgZ2VuQm9pbnRMb29rdXAsXG4gIHZhbGlkYXRlQmFja2dyb3VuZENvbG9yLFxuICB2YWxpZGF0ZUJvcmRlcixcbiAgdmFsaWRhdGVCb3JkZXJSYWRpdXMsXG4gIHZhbGlkYXRlQm94U2hhZG93LFxufSBmcm9tICcuL3ZhbGlkYXRvcnMuanMnO1xuXG5mdW5jdGlvbiBnZXRJbmxpbmVEZWZpbmVkU3R5bGVzKGF0dHIpIHtcbiAgcmV0dXJuIGF0dHIudmFsdWUuZXhwcmVzc2lvbiAmJlxuICAgIGF0dHIudmFsdWUuZXhwcmVzc2lvbi5wcm9wZXJ0aWVzICYmXG4gICAgYXR0ci52YWx1ZS5leHByZXNzaW9uLnByb3BlcnRpZXNbMF0gJiZcbiAgICBhdHRyLnZhbHVlLmV4cHJlc3Npb24ucHJvcGVydGllc1swXS5rZXkubmFtZSA9PT0gJ19fc3R5bGUnXG4gICAgPyBhdHRyLnZhbHVlLmV4cHJlc3Npb24ucHJvcGVydGllc1swXS52YWx1ZS5wcm9wZXJ0aWVzXG4gICAgOiBudWxsO1xufVxuXG5mdW5jdGlvbiBnZXRWYXJpYWJsZURlZmluZWRTdHlsZXMocmVmKSB7XG4gIHJldHVybiByZWYucmVzb2x2ZWQgJiZcbiAgICByZWYucmVzb2x2ZWQuZGVmcyAmJlxuICAgIHJlZi5yZXNvbHZlZC5kZWZzWzBdICYmXG4gICAgcmVmLnJlc29sdmVkLmRlZnNbMF0ubm9kZSAmJlxuICAgIHJlZi5yZXNvbHZlZC5kZWZzWzBdLm5vZGUuaW5pdCAmJlxuICAgIHJlZi5yZXNvbHZlZC5kZWZzWzBdLm5vZGUuaW5pdC5wcm9wZXJ0aWVzICYmXG4gICAgcmVmLnJlc29sdmVkLmRlZnNbMF0ubm9kZS5pbml0LnByb3BlcnRpZXNbMF0gJiZcbiAgICByZWYucmVzb2x2ZWQuZGVmc1swXS5ub2RlLmluaXQucHJvcGVydGllc1swXS5rZXkubmFtZSA9PT0gJ19fc3R5bGUnXG4gICAgPyByZWYucmVzb2x2ZWQuZGVmc1swXS5ub2RlLmluaXQucHJvcGVydGllc1swXS52YWx1ZS5wcm9wZXJ0aWVzXG4gICAgOiBudWxsO1xufVxuXG5mdW5jdGlvbiBnZW5PcGFjaXR5TG9va3VwKCkge1xuICBjb25zdCBsb29rdXBNYXAgPSB7fTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPD0gMTA7IGkgKz0gMSkge1xuICAgIGNvbnN0IHZhbCA9IGkgLyAxMDsgLy8gV2h5IG5vdCBpbmNyZW1lbnQgaSBieSAwLjE/IEZsb2F0c1xuICAgIGNvbnN0IG1zZyA9IGAgIFVzZSBwcm9wIFxcYG9wYWNpdHk9eyR7dmFsfX1cXGAgaW5zdGVhZGA7XG4gICAgbG9va3VwTWFwW3ZhbF0gPSBtc2c7XG4gICAgbG9va3VwTWFwW2Ake3ZhbH1gXSA9IG1zZztcbiAgfVxuICByZXR1cm4gbG9va3VwTWFwO1xufVxuXG5jb25zdCBvdmVyZmxvd0xvb2t1cCA9IHtcbiAgdmlzaWJsZTogJyAgVXNlIHByb3AgYG92ZXJmbG93PVwidmlzaWJsZVwiYCBpbnN0ZWFkJyxcbiAgaGlkZGVuOiAnICBVc2UgcHJvcCBgb3ZlcmZsb3c9XCJoaWRkZW5cImAgaW5zdGVhZCcsXG4gIHNjcm9sbDogJyAgVXNlIHByb3AgYG92ZXJmbG93PVwic2Nyb2xsXCJgIGluc3RlYWQnLFxuICBhdXRvOiAnICBVc2UgcHJvcCBgb3ZlcmZsb3c9XCJhdXRvXCJgIGluc3RlYWQnLFxufTtcblxuY29uc3QgcnVsZSA9IHtcbiAgbWV0YToge1xuICAgIGRvY3M6IHtcbiAgICAgIGRlc2NyaXB0aW9uOlxuICAgICAgICAnUHJldmVudCB1c2luZyBkYW5nZXJvdXNseVNldElubGluZVN0eWxlIG9uIEJveCBmb3IgcHJvcHMgdGhhdCBhcmUgYWxyZWFkeSBkaXJlY3RseSBpbXBsZW1lbnRlZCcsXG4gICAgICByZWNvbW1lbmRlZDogZmFsc2UsXG4gICAgfSxcbiAgICBzY2hlbWE6IFtcbiAgICAgIHtcbiAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICBvbmx5S2V5czoge1xuICAgICAgICAgICAgdHlwZTogJ2FycmF5JyxcbiAgICAgICAgICAgIGl0ZW1zOiB7IHR5cGU6ICdzdHJpbmcnIH0sXG4gICAgICAgICAgICB1bmlxdWVJdGVtczogdHJ1ZSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBhZGRpdGlvbmFsUHJvcGVydGllczogZmFsc2UsXG4gICAgICB9LFxuICAgIF0sXG4gIH0sXG5cbiAgLy8gJEZsb3dGaXhNZVt1bmNsZWFyLXR5cGVdXG4gIGNyZWF0ZShjb250ZXh0OiBPYmplY3QpOiBPYmplY3Qge1xuICAgIGxldCBpbXBvcnRlZEJveCA9IGZhbHNlO1xuICAgIGxldCBsb2NhbElkZW50aWZpZXJOYW1lID0gJ0JveCc7XG4gICAgY29uc3QgeyBvbmx5S2V5cyB9ID0gY29udGV4dC5vcHRpb25zWzBdIHx8IHt9O1xuXG4gICAgZnVuY3Rpb24gaW5jbHVkZUtleShrZXkpIHtcbiAgICAgIHJldHVybiAhb25seUtleXMgfHwgb25seUtleXMuaW5jbHVkZXMoa2V5KTtcbiAgICB9XG5cbiAgICBjb25zdCBtYXJnaW5Mb29rdXAgPSBnZW5Cb2ludExvb2t1cCgnbWFyZ2luJywgLTEyKTtcbiAgICBjb25zdCBtYXJnaW5Cb3R0b21Mb29rdXAgPSBnZW5Cb2ludExvb2t1cCgnbWFyZ2luQm90dG9tJywgLTEyKTtcbiAgICBjb25zdCBtYXJnaW5MZWZ0TG9va3VwID0gZ2VuQm9pbnRMb29rdXAoJ21hcmdpbkxlZnQnLCAtMTIpO1xuICAgIGNvbnN0IG1hcmdpblJpZ2h0TG9va3VwID0gZ2VuQm9pbnRMb29rdXAoJ21hcmdpblJpZ2h0JywgLTEyKTtcbiAgICBjb25zdCBtYXJnaW5Ub3BMb29rdXAgPSBnZW5Cb2ludExvb2t1cCgnbWFyZ2luVG9wJywgLTEyKTtcblxuICAgIGNvbnN0IG9wYWNpdHlMb29rdXAgPSBnZW5PcGFjaXR5TG9va3VwKCk7XG5cbiAgICBjb25zdCBwYWRkaW5nTG9va3VwID0gZ2VuQm9pbnRMb29rdXAoJ3BhZGRpbmcnLCAwKTtcblxuICAgIGZ1bmN0aW9uIG1hdGNoS2V5RXJyb3JzKG1hdGNoZWRFcnJvcnMsIGtleSkge1xuICAgICAgc3dpdGNoIChrZXkubmFtZSkge1xuICAgICAgICBjYXNlICdiYWNrZ3JvdW5kQ29sb3InOlxuICAgICAgICAgIGlmIChpbmNsdWRlS2V5KCdiYWNrZ3JvdW5kQ29sb3InKSkge1xuICAgICAgICAgICAgY29uc3QgbWVzc2FnZSA9IHZhbGlkYXRlQmFja2dyb3VuZENvbG9yKGtleS52YWx1ZSk7XG4gICAgICAgICAgICBpZiAobWVzc2FnZSkge1xuICAgICAgICAgICAgICBtYXRjaGVkRXJyb3JzLnB1c2gobWVzc2FnZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdib3JkZXJSYWRpdXMnOlxuICAgICAgICAgIGlmIChpbmNsdWRlS2V5KCdib3JkZXJSYWRpdXMnKSkge1xuICAgICAgICAgICAgY29uc3QgbWVzc2FnZSA9IHZhbGlkYXRlQm9yZGVyUmFkaXVzKGtleS52YWx1ZSk7XG4gICAgICAgICAgICBpZiAobWVzc2FnZSkge1xuICAgICAgICAgICAgICBtYXRjaGVkRXJyb3JzLnB1c2gobWVzc2FnZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdib3JkZXInOlxuICAgICAgICAgIGlmIChpbmNsdWRlS2V5KCdib3JkZXInKSkge1xuICAgICAgICAgICAgY29uc3QgbWVzc2FnZSA9IHZhbGlkYXRlQm9yZGVyKGtleS52YWx1ZSk7XG4gICAgICAgICAgICBpZiAobWVzc2FnZSkge1xuICAgICAgICAgICAgICBtYXRjaGVkRXJyb3JzLnB1c2gobWVzc2FnZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdib3hTaGFkb3cnOlxuICAgICAgICAgIGlmIChpbmNsdWRlS2V5KCdib3hTaGFkb3cnKSkge1xuICAgICAgICAgICAgY29uc3QgbWVzc2FnZSA9IHZhbGlkYXRlQm94U2hhZG93KGtleS52YWx1ZSk7XG4gICAgICAgICAgICBpZiAobWVzc2FnZSkge1xuICAgICAgICAgICAgICBtYXRjaGVkRXJyb3JzLnB1c2gobWVzc2FnZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdib3R0b20nOlxuICAgICAgICAgIGlmICgoaW5jbHVkZUtleSgnYm90dG9tJykgJiYga2V5LnZhbHVlID09PSAnMHB4JykgfHwga2V5LnZhbHVlID09PSAwKSB7XG4gICAgICAgICAgICBtYXRjaGVkRXJyb3JzLnB1c2goXG4gICAgICAgICAgICAgICcgIEluc3RlYWQgb2YgZGFuZ2Vyb3VzbHkgc3R5bGluZyBib3R0b20sIHVzZSB0aGUgXCJib3R0b21cIiBib29sZWFuIHByb3AnLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2xlZnQnOlxuICAgICAgICAgIGlmICgoaW5jbHVkZUtleSgnbGVmdCcpICYmIGtleS52YWx1ZSA9PT0gJzBweCcpIHx8IGtleS52YWx1ZSA9PT0gMCkge1xuICAgICAgICAgICAgbWF0Y2hlZEVycm9ycy5wdXNoKFxuICAgICAgICAgICAgICAnICBJbnN0ZWFkIG9mIGRhbmdlcm91c2x5IHN0eWxpbmcgbGVmdCwgdXNlIHRoZSBcImxlZnRcIiBib29sZWFuIHByb3AnLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ21hcmdpbic6XG4gICAgICAgICAgaWYgKGluY2x1ZGVLZXkoJ21hcmdpbicpKSB7XG4gICAgICAgICAgICBpZiAoa2V5LnZhbHVlID09PSAnYXV0bycpIHtcbiAgICAgICAgICAgICAgbWF0Y2hlZEVycm9ycy5wdXNoKCcgIFVzZSBwcm9wIGBtYXJnaW49XCJhdXRvXCJgIGluc3RlYWQnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIG1hdGNoZWRFcnJvcnMucHVzaChtYXJnaW5Mb29rdXBba2V5LnZhbHVlXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdtYXJnaW5Cb3R0b20nOlxuICAgICAgICAgIGlmIChpbmNsdWRlS2V5KCdtYXJnaW5Cb3R0b20nKSkge1xuICAgICAgICAgICAgaWYgKGtleS52YWx1ZSA9PT0gJ2F1dG8nKSB7XG4gICAgICAgICAgICAgIG1hdGNoZWRFcnJvcnMucHVzaCgnICBVc2UgcHJvcCBgbWFyZ2luQm90dG9tPVwiYXV0b1wiYCBpbnN0ZWFkJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBtYXRjaGVkRXJyb3JzLnB1c2gobWFyZ2luQm90dG9tTG9va3VwW2tleS52YWx1ZV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnbWFyZ2luTGVmdCc6XG4gICAgICAgICAgaWYgKGluY2x1ZGVLZXkoJ21hcmdpblRvcCcpKSB7XG4gICAgICAgICAgICBpZiAoa2V5LnZhbHVlID09PSAnYXV0bycpIHtcbiAgICAgICAgICAgICAgbWF0Y2hlZEVycm9ycy5wdXNoKCcgIFVzZSBwcm9wIGBtYXJnaW5TdGFydD1cImF1dG9cImAgaW5zdGVhZCcpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgbWF0Y2hlZEVycm9ycy5wdXNoKG1hcmdpbkxlZnRMb29rdXBba2V5LnZhbHVlXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdtYXJnaW5SaWdodCc6XG4gICAgICAgICAgaWYgKGluY2x1ZGVLZXkoJ21hcmdpblJpZ2h0JykpIHtcbiAgICAgICAgICAgIGlmIChrZXkudmFsdWUgPT09ICdhdXRvJykge1xuICAgICAgICAgICAgICBtYXRjaGVkRXJyb3JzLnB1c2goJyAgVXNlIHByb3AgYG1hcmdpbkVuZD1cImF1dG9cImAgaW5zdGVhZCcpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgbWF0Y2hlZEVycm9ycy5wdXNoKG1hcmdpblJpZ2h0TG9va3VwW2tleS52YWx1ZV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnbWFyZ2luVG9wJzpcbiAgICAgICAgICBpZiAoaW5jbHVkZUtleSgnbWFyZ2luVG9wJykpIHtcbiAgICAgICAgICAgIGlmIChrZXkudmFsdWUgPT09ICdhdXRvJykge1xuICAgICAgICAgICAgICBtYXRjaGVkRXJyb3JzLnB1c2goJyAgVXNlIHByb3AgYG1hcmdpblRvcD1cImF1dG9cImAgaW5zdGVhZCcpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgbWF0Y2hlZEVycm9ycy5wdXNoKG1hcmdpblRvcExvb2t1cFtrZXkudmFsdWVdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ21heEhlaWdodCc6XG4gICAgICAgICAgaWYgKGluY2x1ZGVLZXkoJ21heEhlaWdodCcpKSB7XG4gICAgICAgICAgICBtYXRjaGVkRXJyb3JzLnB1c2goXG4gICAgICAgICAgICAgICcgIFVzZSBwcm9wIGBtYXhIZWlnaHQ9e3BpeGVsc31gIG9yIGBtYXhIZWlnaHQ9XCJwZXJjZW50YWdlJVwiYCBpbnN0ZWFkJyxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdtaW5IZWlnaHQnOlxuICAgICAgICAgIGlmIChpbmNsdWRlS2V5KCdtaW5IZWlnaHQnKSkge1xuICAgICAgICAgICAgbWF0Y2hlZEVycm9ycy5wdXNoKFxuICAgICAgICAgICAgICAnICBVc2UgcHJvcCBgbWluSGVpZ2h0PXtwaXhlbHN9YCBvciBgbWluSGVpZ2h0PVwicGVyY2VudGFnZSVcImAgaW5zdGVhZCcsXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnbWF4V2lkdGgnOlxuICAgICAgICAgIGlmIChpbmNsdWRlS2V5KCdtYXhXaWR0aCcpKSB7XG4gICAgICAgICAgICBtYXRjaGVkRXJyb3JzLnB1c2goXG4gICAgICAgICAgICAgICcgIFVzZSBwcm9wIGBtYXhXaWR0aD17cGl4ZWxzfWAgb3IgYG1heFdpZHRoPVwicGVyY2VudGFnZSVcImAgaW5zdGVhZCcsXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnbWluV2lkdGgnOlxuICAgICAgICAgIGlmIChpbmNsdWRlS2V5KCdtaW5XaWR0aCcpKSB7XG4gICAgICAgICAgICBtYXRjaGVkRXJyb3JzLnB1c2goXG4gICAgICAgICAgICAgICcgIFVzZSBwcm9wIGBtaW5XaWR0aD17cGl4ZWxzfWAgb3IgYG1pbldpZHRoPVwicGVyY2VudGFnZSVcImAgaW5zdGVhZCcsXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnb3BhY2l0eSc6XG4gICAgICAgICAgaWYgKGluY2x1ZGVLZXkoJ29wYWNpdHknKSkge1xuICAgICAgICAgICAgbWF0Y2hlZEVycm9ycy5wdXNoKG9wYWNpdHlMb29rdXBba2V5LnZhbHVlXSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdvdmVyZmxvdyc6XG4gICAgICAgICAgaWYgKGluY2x1ZGVLZXkoJ292ZXJmbG93JykpIHtcbiAgICAgICAgICAgIG1hdGNoZWRFcnJvcnMucHVzaChvdmVyZmxvd0xvb2t1cFtrZXkudmFsdWVdKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ292ZXJmbG93LXgnOlxuICAgICAgICAgIGlmIChpbmNsdWRlS2V5KCdvdmVyZmxvdycpKSB7XG4gICAgICAgICAgICBpZiAoa2V5LnZhbHVlID09PSAnc2Nyb2xsJykge1xuICAgICAgICAgICAgICBtYXRjaGVkRXJyb3JzLnB1c2goJyAgVXNlIHByb3AgYG92ZXJmbG93PVwic2Nyb2xsWFwiYCBpbnN0ZWFkJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdvdmVyZmxvdy15JzpcbiAgICAgICAgICBpZiAoaW5jbHVkZUtleSgnb3ZlcmZsb3cnKSkge1xuICAgICAgICAgICAgaWYgKGtleS52YWx1ZSA9PT0gJ3Njcm9sbCcpIHtcbiAgICAgICAgICAgICAgbWF0Y2hlZEVycm9ycy5wdXNoKCcgIFVzZSBwcm9wIGBvdmVyZmxvdz1cInNjcm9sbFlcImAgaW5zdGVhZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAncGFkZGluZyc6XG4gICAgICAgICAgaWYgKGluY2x1ZGVLZXkoJ3BhZGRpbmcnKSkge1xuICAgICAgICAgICAgbWF0Y2hlZEVycm9ycy5wdXNoKHBhZGRpbmdMb29rdXBba2V5LnZhbHVlXSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdwb3NpdGlvbic6XG4gICAgICAgICAgaWYgKGluY2x1ZGVLZXkoJ3Bvc2l0aW9uJykpIHtcbiAgICAgICAgICAgIGlmIChrZXkudmFsdWUgPT09ICdhYnNvbHV0ZScpIHtcbiAgICAgICAgICAgICAgbWF0Y2hlZEVycm9ycy5wdXNoKCcgIFVzZSBwcm9wIGBwb3NpdGlvbj1cImFic29sdXRlXCJgIGluc3RlYWQnKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoa2V5LnZhbHVlID09PSAnc3RhdGljJykge1xuICAgICAgICAgICAgICBtYXRjaGVkRXJyb3JzLnB1c2goJyAgVXNlIHByb3AgYHBvc2l0aW9uPVwic3RhdGljXCJgIGluc3RlYWQnKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoa2V5LnZhbHVlID09PSAncmVsYXRpdmUnKSB7XG4gICAgICAgICAgICAgIG1hdGNoZWRFcnJvcnMucHVzaCgnICBVc2UgcHJvcCBgcG9zaXRpb249XCJyZWxhdGl2ZVwiYCBpbnN0ZWFkJyk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGtleS52YWx1ZSA9PT0gJ2ZpeGVkJykge1xuICAgICAgICAgICAgICBtYXRjaGVkRXJyb3JzLnB1c2goJyAgVXNlIHByb3AgYHBvc2l0aW9uPVwiZml4ZWRcImAgaW5zdGVhZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAncmlnaHQnOlxuICAgICAgICAgIGlmICgoaW5jbHVkZUtleSgncmlnaHQnKSAmJiBrZXkudmFsdWUgPT09ICcwcHgnKSB8fCBrZXkudmFsdWUgPT09IDApIHtcbiAgICAgICAgICAgIG1hdGNoZWRFcnJvcnMucHVzaChcbiAgICAgICAgICAgICAgJyAgSW5zdGVhZCBvZiBkYW5nZXJvdXNseSBzdHlsaW5nIHJpZ2h0LCB1c2UgdGhlIFwicmlnaHRcIiBib29sZWFuIHByb3AnLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3RvcCc6XG4gICAgICAgICAgaWYgKChpbmNsdWRlS2V5KCd0b3AnKSAmJiBrZXkudmFsdWUgPT09ICcwcHgnKSB8fCBrZXkudmFsdWUgPT09IDApIHtcbiAgICAgICAgICAgIG1hdGNoZWRFcnJvcnMucHVzaCgnICBJbnN0ZWFkIG9mIGRhbmdlcm91c2x5IHN0eWxpbmcgdG9wLCB1c2UgdGhlIFwidG9wXCIgYm9vbGVhbiBwcm9wJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG1hdGNoZWRFcnJvcnMuZmlsdGVyKCh4KSA9PiB4KTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgSW1wb3J0RGVjbGFyYXRpb24oZGVjbCkge1xuICAgICAgICBpZiAoZGVjbC5zb3VyY2UudmFsdWUgIT09ICdnZXN0YWx0Jykge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpbXBvcnRlZEJveCA9IGRlY2wuc3BlY2lmaWVycy5zb21lKChub2RlKSA9PiB7XG4gICAgICAgICAgY29uc3QgaXNCb3ggPSBub2RlLmltcG9ydGVkLm5hbWUgPT09ICdCb3gnO1xuICAgICAgICAgIGlmIChpc0JveCkge1xuICAgICAgICAgICAgbG9jYWxJZGVudGlmaWVyTmFtZSA9IG5vZGUubG9jYWwubmFtZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGlzQm94O1xuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICBKU1hPcGVuaW5nRWxlbWVudChub2RlKSB7XG4gICAgICAgIGlmICghaW1wb3J0ZWRCb3ggfHwgbG9jYWxJZGVudGlmaWVyTmFtZSAhPT0gbm9kZS5uYW1lLm5hbWUpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgT2JqZWN0LmtleXMobm9kZS5hdHRyaWJ1dGVzKS5zb21lKChhdHRyS2V5KSA9PiB7XG4gICAgICAgICAgY29uc3QgYXR0ciA9IG5vZGUuYXR0cmlidXRlc1thdHRyS2V5XTtcbiAgICAgICAgICBjb25zdCBtYXRjaGVkID0gYXR0ci5uYW1lICYmIGF0dHIubmFtZS5uYW1lID09PSAnZGFuZ2Vyb3VzbHlTZXRJbmxpbmVTdHlsZSc7XG4gICAgICAgICAgaWYgKG1hdGNoZWQpIHtcbiAgICAgICAgICAgIC8vIElmIHdlIGhhdmUgc3R5bGUgcHJvcGVydGllcyBoZXJlLCB0aGlzIGlzIGFuIG9iamVjdCBkZWNsYXJlZCBpbmxpbmVcbiAgICAgICAgICAgIGxldCBzdHlsZVByb3BlcnRpZXMgPSBnZXRJbmxpbmVEZWZpbmVkU3R5bGVzKGF0dHIpO1xuICAgICAgICAgICAgLy8gTm90IGRlY2xhcmVkIGlubGluZT8gQ2hlY2sgdG8gc2VlIGlmIHRoZXJlJ3MgYSB2YXJpYWJsZSBtYXRjaGluZyB0aGUgbmFtZSBkZWZpbmVkXG4gICAgICAgICAgICBpZiAoIXN0eWxlUHJvcGVydGllcyAmJiBhdHRyLnZhbHVlLmV4cHJlc3Npb24ubmFtZSkge1xuICAgICAgICAgICAgICBjb25zdCBzY29wZSA9IGNvbnRleHQuZ2V0U2NvcGUobm9kZSk7XG4gICAgICAgICAgICAgIC8vIExvb2sgaW4gbG9jYWwgc2NvcGUgZm9yIHZhcmlhYmxlIHJlZmVyZW5jZVxuICAgICAgICAgICAgICBjb25zdCByZWYgPSBzY29wZS5yZWZlcmVuY2VzLmZpbmQoXG4gICAgICAgICAgICAgICAgKHJlZmVyZW5jZSkgPT4gcmVmZXJlbmNlLmlkZW50aWZpZXIubmFtZSA9PT0gYXR0ci52YWx1ZS5leHByZXNzaW9uLm5hbWUsXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIGlmIChyZWYpIHtcbiAgICAgICAgICAgICAgICBzdHlsZVByb3BlcnRpZXMgPSBnZXRWYXJpYWJsZURlZmluZWRTdHlsZXMocmVmKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHN0eWxlUHJvcGVydGllcykge1xuICAgICAgICAgICAgICBjb25zdCBlcnJvck1lc3NhZ2VzID0gc3R5bGVQcm9wZXJ0aWVzXG4gICAgICAgICAgICAgICAgLm1hcCgoeyBrZXksIHR5cGUsIHZhbHVlIH0pID0+IHtcbiAgICAgICAgICAgICAgICAgIC8vIEhhbmRsZSB0aGluZ3MgbGlrZSBzcHJlYWQgcHJvcHNcbiAgICAgICAgICAgICAgICAgIGlmICgha2V5IHx8IHZhbHVlLnZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgbmFtZTogdHlwZSwgdmFsdWU6IG51bGwgfTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIHJldHVybiB7IG5hbWU6IGtleS5uYW1lLCB2YWx1ZTogdmFsdWUudmFsdWUgfTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5yZWR1Y2UobWF0Y2hLZXlFcnJvcnMsIFtdKTtcbiAgICAgICAgICAgICAgaWYgKGVycm9yTWVzc2FnZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgY29udGV4dC5yZXBvcnQoXG4gICAgICAgICAgICAgICAgICBhdHRyLFxuICAgICAgICAgICAgICAgICAgYFVuLW5lZWRlZCBCb3ggZGFuZ2Vyb3VzIHN0eWxlcyBmb3VuZC4gaHR0cHM6Ly9nZXN0YWx0Lm5ldGxpZnkuYXBwL0JveFxcbiR7ZXJyb3JNZXNzYWdlcy5qb2luKFxuICAgICAgICAgICAgICAgICAgICAnXFxuJyxcbiAgICAgICAgICAgICAgICAgICl9YCxcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBtYXRjaGVkO1xuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgfTtcbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHJ1bGU7XG4iLCIvKipcbiAqIEBmaWxlb3ZlcnZpZXcgRGlzYWxsb3cgbWVkaXVtIGZvcm0gZmllbGRzXG4gKiBAYXV0aG9yIENocmlzdGlhbiBWdWVyaW5ncyA8Y3Z1ZXJpbmdzQHBpbnRlcmVzdC5jb20+XG4gKlxuICogSW4gb3JkZXIgdG8gaGF2ZSBjb25zaXN0ZW50IGZvcm0gZmllbGRzIGluIHBpbmJvYXJkLCB3ZSB1cGRhdGUgYWxsIG9mIHRoZWlyIHNpemVzIHRvIGxhcmdlIGFuZCBkaXNhbGxvdyBtZWRpdW1cbiAqL1xuXG4vLyBAZmxvdyBzdHJpY3RcbmNvbnN0IHJ1bGUgPSB7XG4gIG1ldGE6IHtcbiAgICBkb2NzOiB7XG4gICAgICBkZXNjcmlwdGlvbjogJ0Rpc2FsbG93IG1lZGl1bSBmb3JtIGZpZWxkcycsXG4gICAgICByZWNvbW1lbmRlZDogZmFsc2UsXG4gICAgfSxcbiAgICBzY2hlbWE6IFtcbiAgICAgIHtcbiAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgIGFkZGl0aW9uYWxQcm9wZXJ0aWVzOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgXSxcbiAgfSxcblxuICAvLyAkRmxvd0ZpeE1lW3VuY2xlYXItdHlwZV1cbiAgY3JlYXRlKGNvbnRleHQ6IE9iamVjdCk6IE9iamVjdCB7XG4gICAgbGV0IGltcG9ydGVkQ29tcG9uZW50ID0gZmFsc2U7XG4gICAgbGV0IGxvY2FsSWRlbnRpZmllck5hbWU7XG4gICAgY29uc3QgY29tcG9uZW50TmFtZXMgPSBbJ1NlYXJjaEZpZWxkJywgJ1NlbGVjdExpc3QnLCAnVGFicycsICdUZXh0RmllbGQnXTtcblxuICAgIHJldHVybiB7XG4gICAgICBJbXBvcnREZWNsYXJhdGlvbihkZWNsKSB7XG4gICAgICAgIGlmIChkZWNsLnNvdXJjZS52YWx1ZSAhPT0gJ2dlc3RhbHQnKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGltcG9ydGVkQ29tcG9uZW50ID0gZGVjbC5zcGVjaWZpZXJzLnNvbWUoKG5vZGUpID0+IHtcbiAgICAgICAgICBjb25zdCBpc1ZhbGlkQ29tcG9uZW50ID0gY29tcG9uZW50TmFtZXMuaW5jbHVkZXMobm9kZS5pbXBvcnRlZC5uYW1lKTtcbiAgICAgICAgICBpZiAoaXNWYWxpZENvbXBvbmVudCkge1xuICAgICAgICAgICAgbG9jYWxJZGVudGlmaWVyTmFtZSA9IG5vZGUubG9jYWwubmFtZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGlzVmFsaWRDb21wb25lbnQ7XG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICAgIEpTWE9wZW5pbmdFbGVtZW50KG5vZGUpIHtcbiAgICAgICAgaWYgKCFpbXBvcnRlZENvbXBvbmVudCB8fCBsb2NhbElkZW50aWZpZXJOYW1lICE9PSBub2RlLm5hbWUubmFtZSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHNpemVBdHRyaWJ1dGUgPSBPYmplY3QuZW50cmllcyhub2RlLmF0dHJpYnV0ZXMpLmZpbmQoXG4gICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gICAgICAgICAgKFtrZXksIHZhbHVlXSkgPT5cbiAgICAgICAgICAgIC8vICRGbG93Rml4TWVbaW5jb21wYXRpYmxlLXVzZV1cbiAgICAgICAgICAgIHZhbHVlICYmIHZhbHVlLm5hbWUgJiYgdmFsdWUubmFtZS5uYW1lID09PSAnc2l6ZScsXG4gICAgICAgICk7XG5cbiAgICAgICAgLy8gTm8gc2l6ZSBkZWZpbmVkIG9yIHNpemUgaXMgbm90IFwibGdcIlxuICAgICAgICAvLyAkRmxvd0ZpeE1lW2luY29tcGF0aWJsZS11c2VdXG4gICAgICAgIGlmICghc2l6ZUF0dHJpYnV0ZSB8fCBzaXplQXR0cmlidXRlWzFdLnZhbHVlLnZhbHVlID09PSAnbWQnKSB7XG4gICAgICAgICAgY29udGV4dC5yZXBvcnQobm9kZSwgJ0dlc3RhbHQgZm9ybSBmaWVsZHMgc2hvdWxkIGFsd2F5cyBoYXZlIHNpemU9XCJsZ1wiIHNldCBvbiB0aGVtJyk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgfTtcbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHJ1bGU7XG4iLCIvKipcbiAqIEBmaWxlb3ZlcnZpZXcgRGlzYWxsb3cgcm9sZS1saW5rIG9uIEdlc3RhbHQgY29tcG9uZW50c1xuICogQGF1dGhvciBBbGJlcnRvIENhcnJlcmFzIDxhY2FycmVyYXNAcGludGVyZXN0LmNvbT5cbiAqXG4gKiBXZSBkbyBub3QgYWxsb3cgcm9sZT0nbGluaycgb24gQnV0dG9uLCBUYXBBcmVhLCBhbmQgSWNvbkJ1dHRvbi5cbiAqIFBpbmJvYXJkIGFsdGVybmF0aXZlIHdpdGggYWRkaXRpb25hbCBmdW5jdGlvbmFsaXR5cCBtdXN0IGJlIHVzZWQgaW5zdGVhZC5cbiAqL1xuXG4vLyBAZmxvdyBzdHJpY3RcbmNvbnN0IHJ1bGUgPSB7XG4gIG1ldGE6IHtcbiAgICBkb2NzOiB7XG4gICAgICBkZXNjcmlwdGlvbjogJ0Rpc2FsbG93IHJvbGUtbGluayBvbiBHZXN0YWx0IGNvbXBvbmVudHMnLFxuICAgICAgcmVjb21tZW5kZWQ6IGZhbHNlLFxuICAgIH0sXG4gICAgc2NoZW1hOiBbXG4gICAgICB7XG4gICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICBhZGRpdGlvbmFsUHJvcGVydGllczogZmFsc2UsXG4gICAgICB9LFxuICAgIF0sXG4gIH0sXG5cbiAgLy8gJEZsb3dGaXhNZVt1bmNsZWFyLXR5cGVdXG4gIGNyZWF0ZShjb250ZXh0OiBPYmplY3QpOiBPYmplY3Qge1xuICAgIGxldCBpbXBvcnRlZENvbXBvbmVudCA9IGZhbHNlO1xuICAgIGxldCBpbXBvcnRlZE5hbWU7XG5cbiAgICByZXR1cm4ge1xuICAgICAgSW1wb3J0RGVjbGFyYXRpb24oZGVjbCkge1xuICAgICAgICBpZiAoZGVjbC5zb3VyY2UudmFsdWUgIT09ICdnZXN0YWx0Jykge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpbXBvcnRlZENvbXBvbmVudCA9IGRlY2wuc3BlY2lmaWVycy5zb21lKChub2RlKSA9PiB7XG4gICAgICAgICAgaW1wb3J0ZWROYW1lID0gbm9kZS5pbXBvcnRlZC5uYW1lO1xuICAgICAgICAgIHJldHVybiBbJ0J1dHRvbicsICdUYXBBcmVhJywgJ0ljb25CdXR0b24nXS5pbmNsdWRlcyhub2RlLmltcG9ydGVkLm5hbWUpO1xuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICBKU1hPcGVuaW5nRWxlbWVudChub2RlKSB7XG4gICAgICAgIGlmICghaW1wb3J0ZWRDb21wb25lbnQpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBpc1JvbGVMaW5rID0gT2JqZWN0LmVudHJpZXMobm9kZS5hdHRyaWJ1dGVzKS5maW5kKFxuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuICAgICAgICAgIChba2V5LCB2YWx1ZV0pID0+XG4gICAgICAgICAgICB2YWx1ZSAmJlxuICAgICAgICAgICAgdmFsdWUubmFtZSAmJlxuICAgICAgICAgICAgdmFsdWUubmFtZS5uYW1lID09PSAncm9sZScgJiZcbiAgICAgICAgICAgIHZhbHVlLnZhbHVlICYmXG4gICAgICAgICAgICAvLyAkRmxvd0ZpeE1lW2luY29tcGF0aWJsZS11c2VdXG4gICAgICAgICAgICB2YWx1ZS52YWx1ZS52YWx1ZSA9PT0gJ2xpbmsnLFxuICAgICAgICApO1xuXG4gICAgICAgIGlmIChpc1JvbGVMaW5rKSB7XG4gICAgICAgICAgY29udGV4dC5yZXBvcnQoXG4gICAgICAgICAgICBub2RlLFxuICAgICAgICAgICAgYCR7aW1wb3J0ZWROYW1lfSBDb21wb25lbnRzIHdpdGggcm9sZS1saW5rIGFyZSBkaXNhbGxvd2VkIGluIFBpbmJvYXJkLiBQbGVhc2UgdXNlIGFwcC9jb21tb24vcmVhY3QvdWkvJHtpbXBvcnRlZE5hbWV9TGluay5qcyBpbnN0ZWFkLmAsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICB9O1xuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgcnVsZTtcbiIsIi8qKlxuICogQGZpbGVvdmVydmlldyBQcmV2ZW50IHVzaW5nIGlubGluZSBzdHlsZXMgb24gZGl2cyB0aGF0IGNvdWxkIGJlIGdlc3RhbHQgQm94IHByb3BzXG4gKiBAYXV0aG9yIEplbm55IFN0ZWVsZSA8anN0ZWVsZUBwaW50ZXJlc3QuY29tPlxuICpcbiAqIFdlIHByZWZlciB1c2luZyBnZXN0YWx0IEJveCBvdmVyIGRpdnMgd2l0aCBpbmxpbmUgc3R5bGluZyB0byBnZXQgc3R5bGluZyBjb25zaXN0ZW5jeVxuICogYWNyb3NzIHRoZSBhcHAgYW5kIHNoYXJlZCBjc3MgY2xhc3Nlcy4gVGhpcyBsaW50ZXIgY2hlY2tzIGZvciB1c2FnZSBvZiBpbmxpbmUgc3R5bGluZ1xuICogdGhhdCBpcyBhdmFpbGFibGUgYXMgQm94IHByb3BzLlxuICovXG5cbi8vIEBmbG93IHN0cmljdFxuaW1wb3J0IHsgdmFsaWRhdGVCYWNrZ3JvdW5kQ29sb3IsIHZhbGlkYXRlQm9yZGVyLCB2YWxpZGF0ZUJvcmRlclJhZGl1cyB9IGZyb20gJy4vdmFsaWRhdG9ycy5qcyc7XG5cbmZ1bmN0aW9uIGdldElubGluZURlZmluZWRTdHlsZXMoYXR0cikge1xuICByZXR1cm4gYXR0ci52YWx1ZS5leHByZXNzaW9uLnByb3BlcnRpZXMgPyBhdHRyLnZhbHVlLmV4cHJlc3Npb24ucHJvcGVydGllcyA6IG51bGw7XG59XG5cbmZ1bmN0aW9uIGdldFZhcmlhYmxlRGVmaW5lZFN0eWxlcyhyZWYpIHtcbiAgcmV0dXJuIHJlZi5yZXNvbHZlZCAmJlxuICAgIHJlZi5yZXNvbHZlZC5kZWZzICYmXG4gICAgcmVmLnJlc29sdmVkLmRlZnNbMF0gJiZcbiAgICByZWYucmVzb2x2ZWQuZGVmc1swXS5ub2RlICYmXG4gICAgcmVmLnJlc29sdmVkLmRlZnNbMF0ubm9kZS5pbml0ICYmXG4gICAgcmVmLnJlc29sdmVkLmRlZnNbMF0ubm9kZS5pbml0LnByb3BlcnRpZXNcbiAgICA/IHJlZi5yZXNvbHZlZC5kZWZzWzBdLm5vZGUuaW5pdC5wcm9wZXJ0aWVzXG4gICAgOiBudWxsO1xufVxuXG5jb25zdCBydWxlID0ge1xuICBtZXRhOiB7XG4gICAgZG9jczoge1xuICAgICAgZGVzY3JpcHRpb246ICdsaW50ZXIgY2hlY2tzIGZvciB1c2FnZSBvZiBpbmxpbmUgc3R5bGluZyB0aGF0IGlzIGF2YWlsYWJsZSBhcyBCb3ggcHJvcHMnLFxuICAgICAgcmVjb21tZW5kZWQ6IGZhbHNlLFxuICAgIH0sXG4gICAgc2NoZW1hOiBbXG4gICAgICB7XG4gICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICBhZGRpdGlvbmFsUHJvcGVydGllczogZmFsc2UsXG4gICAgICB9LFxuICAgIF0sXG4gIH0sXG5cbiAgLy8gJEZsb3dGaXhNZVt1bmNsZWFyLXR5cGVdXG4gIGNyZWF0ZShjb250ZXh0OiBPYmplY3QpOiBPYmplY3Qge1xuICAgIGZ1bmN0aW9uIG1hdGNoS2V5RXJyb3JzKG1hdGNoZWRFcnJvcnMsIGtleSkge1xuICAgICAgbGV0IG1lc3NhZ2UgPSAnJztcbiAgICAgIHN3aXRjaCAoa2V5Lm5hbWUpIHtcbiAgICAgICAgY2FzZSAnYmFja2dyb3VuZENvbG9yJzpcbiAgICAgICAgICBtZXNzYWdlID0gdmFsaWRhdGVCYWNrZ3JvdW5kQ29sb3Ioa2V5LnZhbHVlKTtcbiAgICAgICAgICBpZiAobWVzc2FnZSkge1xuICAgICAgICAgICAgbWF0Y2hlZEVycm9ycy5wdXNoKG1lc3NhZ2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnYm9yZGVyUmFkaXVzJzpcbiAgICAgICAgICBtZXNzYWdlID0gdmFsaWRhdGVCb3JkZXJSYWRpdXMoa2V5LnZhbHVlKTtcbiAgICAgICAgICBpZiAobWVzc2FnZSkge1xuICAgICAgICAgICAgbWF0Y2hlZEVycm9ycy5wdXNoKG1lc3NhZ2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnYm9yZGVyJzpcbiAgICAgICAgICBtZXNzYWdlID0gdmFsaWRhdGVCb3JkZXIoa2V5LnZhbHVlKTtcbiAgICAgICAgICBpZiAobWVzc2FnZSkge1xuICAgICAgICAgICAgbWF0Y2hlZEVycm9ycy5wdXNoKG1lc3NhZ2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIHJldHVybiBtYXRjaGVkRXJyb3JzLmZpbHRlcigoeCkgPT4geCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIEpTWE9wZW5pbmdFbGVtZW50KG5vZGUpIHtcbiAgICAgICAgaWYgKG5vZGUubmFtZS5uYW1lICE9PSAnZGl2Jykge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBPYmplY3Qua2V5cyhub2RlLmF0dHJpYnV0ZXMpLnNvbWUoKGF0dHJLZXkpID0+IHtcbiAgICAgICAgICBjb25zdCBhdHRyID0gbm9kZS5hdHRyaWJ1dGVzW2F0dHJLZXldO1xuICAgICAgICAgIGNvbnN0IG1hdGNoZWQgPSBhdHRyLm5hbWUgJiYgYXR0ci5uYW1lLm5hbWUgPT09ICdzdHlsZSc7XG4gICAgICAgICAgaWYgKG1hdGNoZWQpIHtcbiAgICAgICAgICAgIC8vIElmIHdlIGhhdmUgc3R5bGUgcHJvcGVydGllcyBoZXJlLCB0aGlzIGlzIGFuIG9iamVjdCBkZWNsYXJlZCBpbmxpbmVcbiAgICAgICAgICAgIGxldCBzdHlsZVByb3BlcnRpZXMgPSBnZXRJbmxpbmVEZWZpbmVkU3R5bGVzKGF0dHIpO1xuICAgICAgICAgICAgLy8gTm90IGRlY2xhcmVkIGlubGluZT8gQ2hlY2sgdG8gc2VlIGlmIHRoZXJlJ3MgYSB2YXJpYWJsZSBtYXRjaGluZyB0aGUgbmFtZSBkZWZpbmVkXG4gICAgICAgICAgICBpZiAoIXN0eWxlUHJvcGVydGllcyAmJiBhdHRyLnZhbHVlLmV4cHJlc3Npb24ubmFtZSkge1xuICAgICAgICAgICAgICBjb25zdCBzY29wZSA9IGNvbnRleHQuZ2V0U2NvcGUobm9kZSk7XG4gICAgICAgICAgICAgIC8vIExvb2sgaW4gbG9jYWwgc2NvcGUgZm9yIHZhcmlhYmxlIHJlZmVyZW5jZVxuICAgICAgICAgICAgICBjb25zdCByZWYgPSBzY29wZS5yZWZlcmVuY2VzLmZpbmQoXG4gICAgICAgICAgICAgICAgKHJlZmVyZW5jZSkgPT4gcmVmZXJlbmNlLmlkZW50aWZpZXIubmFtZSA9PT0gYXR0ci52YWx1ZS5leHByZXNzaW9uLm5hbWUsXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIGlmIChyZWYpIHtcbiAgICAgICAgICAgICAgICBzdHlsZVByb3BlcnRpZXMgPSBnZXRWYXJpYWJsZURlZmluZWRTdHlsZXMocmVmKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHN0eWxlUHJvcGVydGllcykge1xuICAgICAgICAgICAgICBjb25zdCBlcnJvck1lc3NhZ2VzID0gc3R5bGVQcm9wZXJ0aWVzXG4gICAgICAgICAgICAgICAgLm1hcCgoeyBrZXksIHR5cGUsIHZhbHVlIH0pID0+IHtcbiAgICAgICAgICAgICAgICAgIC8vIEhhbmRsZSB0aGluZ3MgbGlrZSBzcHJlYWQgcHJvcHNcbiAgICAgICAgICAgICAgICAgIGlmICgha2V5IHx8IHZhbHVlLnZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgbmFtZTogdHlwZSwgdmFsdWU6IG51bGwgfTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIHJldHVybiB7IG5hbWU6IGtleS5uYW1lLCB2YWx1ZTogdmFsdWUudmFsdWUgfTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5yZWR1Y2UobWF0Y2hLZXlFcnJvcnMsIFtdKTtcbiAgICAgICAgICAgICAgaWYgKGVycm9yTWVzc2FnZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgY29udGV4dC5yZXBvcnQoXG4gICAgICAgICAgICAgICAgICBhdHRyLFxuICAgICAgICAgICAgICAgICAgYFJlcGxhY2UgdGhpcyBkaXYgd2l0aCBhIGdlc3RhbHQgQm94LiBodHRwczovL2dlc3RhbHQubmV0bGlmeS5hcHAvQm94XFxuJHtlcnJvck1lc3NhZ2VzLmpvaW4oXG4gICAgICAgICAgICAgICAgICAgICdcXG4nLFxuICAgICAgICAgICAgICAgICAgKX1gLFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIG1hdGNoZWQ7XG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICB9O1xuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgcnVsZTtcbiIsIi8vIEBmbG93IHN0cmljdFxuaW1wb3J0IGJ1dHRvbkljb25SZXN0cmljdGlvbnMgZnJvbSAnLi9idXR0b24taWNvbi1yZXN0cmljdGlvbnMuanMnO1xuaW1wb3J0IG5vQm94TWFyZ2lubGVmdE1hcmdpbnJpZ2h0IGZyb20gJy4vbm8tYm94LW1hcmdpbmxlZnQtbWFyZ2lucmlnaHQuanMnO1xuaW1wb3J0IG5vRGFuZ2Vyb3VzU3R5bGVEdXBsaWNhdGVzIGZyb20gJy4vbm8tZGFuZ2Vyb3VzLXN0eWxlLWR1cGxpY2F0ZXMuanMnO1xuaW1wb3J0IG5vTWVkaXVtRm9ybWZpZWxkcyBmcm9tICcuL25vLW1lZGl1bS1mb3JtZmllbGRzLmpzJztcbmltcG9ydCBub1JvbGVMaW5rQ29tcG9uZW50cyBmcm9tICcuL25vLXJvbGUtbGluay1jb21wb25lbnRzLmpzJztcbmltcG9ydCBwcmVmZXJCb3ggZnJvbSAnLi9wcmVmZXItYm94LmpzJztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHJ1bGVzOiB7XG4gICAgJ2J1dHRvbi1pY29uLXJlc3RyaWN0aW9ucyc6IGJ1dHRvbkljb25SZXN0cmljdGlvbnMsXG4gICAgJ25vLWJveC1tYXJnaW5sZWZ0LW1hcmdpbnJpZ2h0Jzogbm9Cb3hNYXJnaW5sZWZ0TWFyZ2lucmlnaHQsXG4gICAgJ25vLWRhbmdlcm91cy1zdHlsZS1kdXBsaWNhdGVzJzogbm9EYW5nZXJvdXNTdHlsZUR1cGxpY2F0ZXMsXG4gICAgJ25vLW1lZGl1bS1mb3JtZmllbGRzJzogbm9NZWRpdW1Gb3JtZmllbGRzLFxuICAgICduby1yb2xlLWxpbmstY29tcG9uZW50cyc6IG5vUm9sZUxpbmtDb21wb25lbnRzLFxuICAgICdwcmVmZXItYm94JzogcHJlZmVyQm94LFxuICB9LFxufTtcbiJdLCJuYW1lcyI6WyJydWxlIiwibWV0YSIsImRvY3MiLCJkZXNjcmlwdGlvbiIsInJlY29tbWVuZGVkIiwic2NoZW1hIiwidHlwZSIsImFkZGl0aW9uYWxQcm9wZXJ0aWVzIiwiY3JlYXRlIiwiY29udGV4dCIsImltcG9ydGVkQ29tcG9uZW50IiwibG9jYWxJZGVudGlmaWVyTmFtZSIsImNvbXBvbmVudE5hbWUiLCJnZXRBdHRyaWJ1dGUiLCJub2RlIiwiYXR0cmlidXRlTmFtZSIsIk9iamVjdCIsImVudHJpZXMiLCJhdHRyaWJ1dGVzIiwiZmluZCIsImtleSIsInZhbHVlIiwibmFtZSIsImdldFZhbHVlIiwiYXR0cmlidXRlIiwiSW1wb3J0RGVjbGFyYXRpb24iLCJkZWNsIiwic291cmNlIiwic3BlY2lmaWVycyIsInNvbWUiLCJpc1ZhbGlkQ29tcG9uZW50IiwiaW1wb3J0ZWQiLCJsb2NhbCIsIkpTWE9wZW5pbmdFbGVtZW50IiwiaWNvbkF0dHJpYnV0ZSIsImlzQ29ycmVjdEljb24iLCJjb2xvckF0dHJpYnV0ZSIsImlzQ29ycmVjdENvbG9yIiwic2l6ZUF0dHJpYnV0ZSIsImlzQ29ycmVjdFNpemUiLCJyZXBvcnQiLCJkaXNhbGxvd2VkUHJvcHMiLCJlcnJvck1lc3NhZ2UiLCJpc01hcmdpbkxlZnRSaWdodEF0dHJpYnV0ZSIsImluY2x1ZGVzIiwiZ2VuQm9pbnRMb29rdXAiLCJwcm9wTmFtZSIsInN0YXJ0IiwiZW5kIiwibG9va3VwTWFwIiwiaSIsInB4IiwibXNnIiwicmVjb21tZW5kZWRQcm9wIiwicm91bmRpbmdMb29rdXAiLCJ2YWxpZGF0ZUJhY2tncm91bmRDb2xvciIsInVuZGVmaW5lZCIsInZhbGlkYXRlQm9yZGVyUmFkaXVzIiwidmFsaWRhdGVCb3JkZXIiLCJjbGVhblZhbHVlIiwidG9Mb3dlckNhc2UiLCJzcGxpdCIsInNvcnQiLCJqb2luIiwidmFsaWRhdGVCb3hTaGFkb3ciLCJyZ2JhUmVnZXgiLCJSZWdFeHAiLCJyZ2JhUG9ydGlvbiIsIm1hdGNoIiwiY2xlYW5SZ2JhUG9ydGlvbiIsImxlbmd0aCIsInJlcGxhY2UiLCJwaXhlbFBvcnRpb24iLCJjbGVhblBpeGVsUG9ydGlvbiIsInJnYmFNYXRjaCIsInBpeGVsc01hdGNoIiwiZ2V0SW5saW5lRGVmaW5lZFN0eWxlcyIsImF0dHIiLCJleHByZXNzaW9uIiwicHJvcGVydGllcyIsImdldFZhcmlhYmxlRGVmaW5lZFN0eWxlcyIsInJlZiIsInJlc29sdmVkIiwiZGVmcyIsImluaXQiLCJnZW5PcGFjaXR5TG9va3VwIiwidmFsIiwib3ZlcmZsb3dMb29rdXAiLCJ2aXNpYmxlIiwiaGlkZGVuIiwic2Nyb2xsIiwiYXV0byIsIm9ubHlLZXlzIiwiaXRlbXMiLCJ1bmlxdWVJdGVtcyIsImltcG9ydGVkQm94Iiwib3B0aW9ucyIsImluY2x1ZGVLZXkiLCJtYXJnaW5Mb29rdXAiLCJtYXJnaW5Cb3R0b21Mb29rdXAiLCJtYXJnaW5MZWZ0TG9va3VwIiwibWFyZ2luUmlnaHRMb29rdXAiLCJtYXJnaW5Ub3BMb29rdXAiLCJvcGFjaXR5TG9va3VwIiwicGFkZGluZ0xvb2t1cCIsIm1hdGNoS2V5RXJyb3JzIiwibWF0Y2hlZEVycm9ycyIsIm1lc3NhZ2UiLCJwdXNoIiwiZmlsdGVyIiwieCIsImlzQm94Iiwia2V5cyIsImF0dHJLZXkiLCJtYXRjaGVkIiwic3R5bGVQcm9wZXJ0aWVzIiwic2NvcGUiLCJnZXRTY29wZSIsInJlZmVyZW5jZXMiLCJyZWZlcmVuY2UiLCJpZGVudGlmaWVyIiwiZXJyb3JNZXNzYWdlcyIsIm1hcCIsInJlZHVjZSIsImNvbXBvbmVudE5hbWVzIiwiaW1wb3J0ZWROYW1lIiwiaXNSb2xlTGluayIsIm1vZHVsZSIsImV4cG9ydHMiLCJydWxlcyIsImJ1dHRvbkljb25SZXN0cmljdGlvbnMiLCJub0JveE1hcmdpbmxlZnRNYXJnaW5yaWdodCIsIm5vRGFuZ2Vyb3VzU3R5bGVEdXBsaWNhdGVzIiwibm9NZWRpdW1Gb3JtZmllbGRzIiwibm9Sb2xlTGlua0NvbXBvbmVudHMiLCJwcmVmZXJCb3giXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0EsTUFBTUEsTUFBSSxHQUFHO0FBQ1hDLEVBQUFBLElBQUksRUFBRTtBQUNKQyxJQUFBQSxJQUFJLEVBQUU7QUFDSkMsTUFBQUEsV0FBVyxFQUFFLDBCQURUO0FBRUpDLE1BQUFBLFdBQVcsRUFBRTtBQUZULEtBREY7QUFLSkMsSUFBQUEsTUFBTSxFQUFFLENBQ047QUFDRUMsTUFBQUEsSUFBSSxFQUFFLFFBRFI7QUFFRUMsTUFBQUEsb0JBQW9CLEVBQUU7QUFGeEIsS0FETTtBQUxKLEdBREs7O0FBY1g7QUFDQUMsRUFBQUEsTUFBTSxDQUFDQyxPQUFELEVBQTBCO0FBQzlCLFFBQUlDLGlCQUFpQixHQUFHLEtBQXhCO0FBQ0EsUUFBSUMsbUJBQUo7QUFDQSxVQUFNQyxhQUFhLEdBQUcsUUFBdEI7O0FBRUEsYUFBU0MsWUFBVCxDQUFzQkMsSUFBdEIsRUFBNEJDLGFBQTVCLEVBQTJDO0FBQ3pDLGFBQU9DLE1BQU0sQ0FBQ0MsT0FBUCxDQUFlSCxJQUFJLENBQUNJLFVBQXBCLEVBQWdDQyxJQUFoQztBQUVMLE9BQUMsQ0FBQ0MsR0FBRCxFQUFNQyxLQUFOLENBQUQ7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
