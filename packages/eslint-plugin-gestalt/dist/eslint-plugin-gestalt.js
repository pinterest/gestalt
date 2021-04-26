(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}((function () { 'use strict';

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

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXNsaW50LXBsdWdpbi1nZXN0YWx0LmpzIiwic291cmNlcyI6WyIuLi9zcmMvYnV0dG9uLWljb24tcmVzdHJpY3Rpb25zLmpzIiwiLi4vc3JjL25vLWJveC1tYXJnaW5sZWZ0LW1hcmdpbnJpZ2h0LmpzIiwiLi4vc3JjL3ZhbGlkYXRvcnMuanMiLCIuLi9zcmMvbm8tZGFuZ2Vyb3VzLXN0eWxlLWR1cGxpY2F0ZXMuanMiLCIuLi9zcmMvbm8tbWVkaXVtLWZvcm1maWVsZHMuanMiLCIuLi9zcmMvbm8tcm9sZS1saW5rLWNvbXBvbmVudHMuanMiLCIuLi9zcmMvcHJlZmVyLWJveC5qcyIsIi4uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBmaWxlb3ZlcnZpZXcgUmVxdWlyZSBzcGVjaWZpYyBwcm9wcyB3aGVuIHVzaW5nIGFuIGljb24gd2l0aCBCdXR0b25cbiAqIEBhdXRob3IgUnlhbiBKYW1lcyA8cmphbWVzQHBpbnRlcmVzdC5jb20+XG4gKlxuICogR2VzdGFsdCBpcyBtb3JlIHBlcm1pc3NpdmUgdGhhbiBQRFMgcmVjb21tZW5kcyBpbiBhZGRpbmcgaWNvbnMgdG8gQnV0dG9ucy5cbiAqIEJ1dHRvbnMgdXNpbmcgaWNvbkVuZCBtdXN0IHVzZTpcbiAqIC0gaWNvbiBcImFycm93LWRvd25cIlxuICogLSBjb2xvciBcIndoaXRlXCJcbiAqIC0gc2l6ZSBcImxnXCJcbiAqL1xuXG4vLyBAZmxvdyBzdHJpY3RcbmNvbnN0IHJ1bGUgPSB7XG4gIG1ldGE6IHtcbiAgICBkb2NzOiB7XG4gICAgICBkZXNjcmlwdGlvbjogJ0J1dHRvbiBpY29uIHJlc3RyaWN0aW9ucycsXG4gICAgICByZWNvbW1lbmRlZDogZmFsc2UsXG4gICAgfSxcbiAgICBzY2hlbWE6IFtcbiAgICAgIHtcbiAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgIGFkZGl0aW9uYWxQcm9wZXJ0aWVzOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgXSxcbiAgfSxcblxuICAvLyAkRmxvd0ZpeE1lW3VuY2xlYXItdHlwZV1cbiAgY3JlYXRlKGNvbnRleHQ6IE9iamVjdCk6IE9iamVjdCB7XG4gICAgbGV0IGltcG9ydGVkQ29tcG9uZW50ID0gZmFsc2U7XG4gICAgbGV0IGxvY2FsSWRlbnRpZmllck5hbWU7XG4gICAgY29uc3QgY29tcG9uZW50TmFtZSA9ICdCdXR0b24nO1xuXG4gICAgZnVuY3Rpb24gZ2V0QXR0cmlidXRlKG5vZGUsIGF0dHJpYnV0ZU5hbWUpIHtcbiAgICAgIHJldHVybiBPYmplY3QuZW50cmllcyhub2RlLmF0dHJpYnV0ZXMpLmZpbmQoXG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuICAgICAgICAoW2tleSwgdmFsdWVdKSA9PlxuICAgICAgICAgIC8vICRGbG93Rml4TWVbaW5jb21wYXRpYmxlLXVzZV1cbiAgICAgICAgICB2YWx1ZSAmJiB2YWx1ZS5uYW1lICYmIHZhbHVlLm5hbWUubmFtZSA9PT0gYXR0cmlidXRlTmFtZSxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0VmFsdWUoYXR0cmlidXRlKSB7XG4gICAgICAvLyAkRmxvd0ZpeE1lW2luY29tcGF0aWJsZS11c2VdXG4gICAgICByZXR1cm4gYXR0cmlidXRlID8gYXR0cmlidXRlWzFdLnZhbHVlLnZhbHVlIDogbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgSW1wb3J0RGVjbGFyYXRpb24oZGVjbCkge1xuICAgICAgICBpZiAoZGVjbC5zb3VyY2UudmFsdWUgIT09ICdnZXN0YWx0Jykge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpbXBvcnRlZENvbXBvbmVudCA9IGRlY2wuc3BlY2lmaWVycy5zb21lKChub2RlKSA9PiB7XG4gICAgICAgICAgY29uc3QgaXNWYWxpZENvbXBvbmVudCA9IG5vZGUuaW1wb3J0ZWQubmFtZSA9PT0gY29tcG9uZW50TmFtZTtcbiAgICAgICAgICBpZiAoaXNWYWxpZENvbXBvbmVudCkge1xuICAgICAgICAgICAgbG9jYWxJZGVudGlmaWVyTmFtZSA9IG5vZGUubG9jYWwubmFtZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGlzVmFsaWRDb21wb25lbnQ7XG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICAgIEpTWE9wZW5pbmdFbGVtZW50KG5vZGUpIHtcbiAgICAgICAgaWYgKCFpbXBvcnRlZENvbXBvbmVudCB8fCBsb2NhbElkZW50aWZpZXJOYW1lICE9PSBub2RlLm5hbWUubmFtZSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGljb25BdHRyaWJ1dGUgPSBnZXRBdHRyaWJ1dGUobm9kZSwgJ2ljb25FbmQnKTtcbiAgICAgICAgY29uc3QgaXNDb3JyZWN0SWNvbiA9IGdldFZhbHVlKGljb25BdHRyaWJ1dGUpID09PSAnYXJyb3ctZG93bic7XG5cbiAgICAgICAgLy8gTm90IHVzaW5nIGljb25FbmQsIGVhcmx5IHJldHVyblxuICAgICAgICBpZiAoIWljb25BdHRyaWJ1dGUpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjb2xvckF0dHJpYnV0ZSA9IGdldEF0dHJpYnV0ZShub2RlLCAnY29sb3InKTtcbiAgICAgICAgY29uc3QgaXNDb3JyZWN0Q29sb3IgPSBnZXRWYWx1ZShjb2xvckF0dHJpYnV0ZSkgPT09ICd3aGl0ZSc7XG5cbiAgICAgICAgY29uc3Qgc2l6ZUF0dHJpYnV0ZSA9IGdldEF0dHJpYnV0ZShub2RlLCAnc2l6ZScpO1xuICAgICAgICBjb25zdCBpc0NvcnJlY3RTaXplID0gZ2V0VmFsdWUoc2l6ZUF0dHJpYnV0ZSkgPT09ICdsZyc7XG5cbiAgICAgICAgLy8gTm90IHVzaW5nIGNvcnJlY3QgcHJvcHNcbiAgICAgICAgaWYgKCFpc0NvcnJlY3RDb2xvciB8fCAhaXNDb3JyZWN0SWNvbiB8fCAhaXNDb3JyZWN0U2l6ZSkge1xuICAgICAgICAgIGNvbnRleHQucmVwb3J0KFxuICAgICAgICAgICAgbm9kZSxcbiAgICAgICAgICAgICdCdXR0b25zIHVzaW5nIGljb25FbmQgbXVzdCB1c2UgXCJhcnJvdy1kb3duXCIsIGNvbG9yIFwid2hpdGVcIiwgYW5kIHNpemUgXCJsZ1wiJyxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgIH07XG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBydWxlO1xuIiwiLyoqXG4gKiBAZmlsZW92ZXJ2aWV3IERpc2FsbG93IG1hcmdpbkxlZnQvbWFyZ2luUmlnaHQgb24gQm94XG4gKiBAYXV0aG9yIFZpbmNlbnQgVGlhbiA8dmluY2VudEBwaW50ZXJlc3QuY29tPlxuICpcbiAqIEluIG9yZGVyIHRvIGhhdmUgY29uc2lzdGVudCB1c2FnZSBvZiBtYXJnaW5MZWZ0L21hcmdpblJpZ2h0IG9uIEJveCBpbiBwaW5ib2FyZCxcbiAqIHdlIHVwZGF0ZSBhbGwgb2YgdGhlbSB0byBtYXJnaW5TdGFydC9tYXJnaW5FbmRcbiAqL1xuXG4vLyBAZmxvdyBzdHJpY3RcbmNvbnN0IGRpc2FsbG93ZWRQcm9wcyA9IFtcbiAgJ21hcmdpbkxlZnQnLFxuICAnc21NYXJnaW5MZWZ0JyxcbiAgJ21kTWFyZ2luTGVmdCcsXG4gICdsZ01hcmdpbkxlZnQnLFxuICAnbWFyZ2luUmlnaHQnLFxuICAnc21NYXJnaW5SaWdodCcsXG4gICdtZE1hcmdpblJpZ2h0JyxcbiAgJ2xnTWFyZ2luUmlnaHQnLFxuXTtcblxuZXhwb3J0IGNvbnN0IGVycm9yTWVzc2FnZSA9XG4gICdtYXJnaW5MZWZ0L21hcmdpblJpZ2h0IGhhdmUgYmVlbiBkZXByZWNhdGVkLiBQbGVhc2UgdXNlIG1hcmdpblN0YXJ0L21hcmdpbkVuZCB0byBzdXBwb3J0IFJpZ2h0LXRvLUxlZnQgKFJUTClcXG5odHRwczovL2dlc3RhbHQubmV0bGlmeS5hcHAvQm94JztcblxuY29uc3QgcnVsZSA9IHtcbiAgbWV0YToge1xuICAgIGRvY3M6IHtcbiAgICAgIGRlc2NyaXB0aW9uOlxuICAgICAgICAnRW5mb3JjZSB1c2FnZSBvZiBSaWdodC10by1MZWZ0IChSVEwpLWNvbXBsaWFudCBtYXJnaW5TdGFydC9tYXJnaW5FbmQgb3ZlciBtYXJnaW5MZWZ0L21hcmdpblJpZ2h0JyxcbiAgICAgIHJlY29tbWVuZGVkOiBmYWxzZSxcbiAgICB9LFxuICAgIHNjaGVtYTogW1xuICAgICAge1xuICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgYWRkaXRpb25hbFByb3BlcnRpZXM6IGZhbHNlLFxuICAgICAgfSxcbiAgICBdLFxuICB9LFxuXG4gIC8vICRGbG93Rml4TWVbdW5jbGVhci10eXBlXVxuICBjcmVhdGUoY29udGV4dDogT2JqZWN0KTogT2JqZWN0IHtcbiAgICBsZXQgaW1wb3J0ZWRDb21wb25lbnQgPSBmYWxzZTtcblxuICAgIHJldHVybiB7XG4gICAgICBJbXBvcnREZWNsYXJhdGlvbihkZWNsKSB7XG4gICAgICAgIGlmIChkZWNsLnNvdXJjZS52YWx1ZSAhPT0gJ2dlc3RhbHQnKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGltcG9ydGVkQ29tcG9uZW50ID0gZGVjbC5zcGVjaWZpZXJzLnNvbWUoKG5vZGUpID0+IHtcbiAgICAgICAgICByZXR1cm4gbm9kZS5pbXBvcnRlZC5uYW1lID09PSAnQm94JztcbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICAgSlNYT3BlbmluZ0VsZW1lbnQobm9kZSkge1xuICAgICAgICBpZiAoIWltcG9ydGVkQ29tcG9uZW50KSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgaXNNYXJnaW5MZWZ0UmlnaHRBdHRyaWJ1dGUgPSBPYmplY3QuZW50cmllcyhcbiAgICAgICAgICBub2RlLmF0dHJpYnV0ZXMsXG4gICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gICAgICAgICkuZmluZCgoW2tleSwgdmFsdWVdKSA9PlxuICAgICAgICAgIGRpc2FsbG93ZWRQcm9wcy5pbmNsdWRlcyhcbiAgICAgICAgICAgIC8vICRGbG93Rml4TWVbaW5jb21wYXRpYmxlLXVzZV1cbiAgICAgICAgICAgIHZhbHVlICYmIHZhbHVlLm5hbWUgJiYgdmFsdWUubmFtZS5uYW1lLFxuICAgICAgICAgICksXG4gICAgICAgICk7XG5cbiAgICAgICAgLy8gTm8gbWFyZ2luTGVmdCBvciBtYXJnaW5SaWdodCBhdHRyaWJ1dGVzIG9uIEJveFxuICAgICAgICBpZiAoaXNNYXJnaW5MZWZ0UmlnaHRBdHRyaWJ1dGUpIHtcbiAgICAgICAgICBjb250ZXh0LnJlcG9ydChub2RlLCBlcnJvck1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgIH07XG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBydWxlO1xuIiwiLy8gQGZsb3cgc3RyaWN0XG5leHBvcnQgZnVuY3Rpb24gZ2VuQm9pbnRMb29rdXAoXG4gIHByb3BOYW1lOiBzdHJpbmcsXG4gIHN0YXJ0OiBudW1iZXIsXG4gIGVuZDogbnVtYmVyID0gMTIsXG4pOiB7fCBbc3RyaW5nIHwgbnVtYmVyXTogc3RyaW5nIHx9IHtcbiAgY29uc3QgbG9va3VwTWFwID0ge307XG4gIGZvciAobGV0IGkgPSBzdGFydDsgaSA8PSBlbmQ7IGkgKz0gMSkge1xuICAgIGNvbnN0IHB4ID0gaSAqIDQ7XG4gICAgbGV0IG1zZyA9IGAgIFVzZSBwcm9wIFxcYCR7cHJvcE5hbWV9PXske2l9fVxcYCBpbnN0ZWFkYDtcbiAgICAvLyBTcGVjaWFsIGNhc2UgZm9yIG1hcmdpbkxlZnQgYW5kIG1hcmdpblJpZ2h0XG4gICAgaWYgKFsnbWFyZ2luTGVmdCcsICdtYXJnaW5SaWdodCddLmluY2x1ZGVzKHByb3BOYW1lKSkge1xuICAgICAgY29uc3QgcmVjb21tZW5kZWRQcm9wID0gcHJvcE5hbWUgPT09ICdtYXJnaW5MZWZ0JyA/ICdtYXJnaW5TdGFydCcgOiAnbWFyZ2luRW5kJztcbiAgICAgIG1zZyA9IGAgIFVzZSBwcm9wIFxcYCR7cmVjb21tZW5kZWRQcm9wfT17JHtpfX1cXGAgaW5zdGVhZGA7XG4gICAgfVxuICAgIGxvb2t1cE1hcFtweF0gPSBtc2c7XG4gICAgbG9va3VwTWFwW2Ake3B4fXB4YF0gPSBtc2c7XG4gIH1cbiAgcmV0dXJuIGxvb2t1cE1hcDtcbn1cblxuY29uc3Qgcm91bmRpbmdMb29rdXAgPSBnZW5Cb2ludExvb2t1cCgncm91bmRpbmcnLCAwLCA4KTtcblxuZXhwb3J0IGNvbnN0IHZhbGlkYXRlQmFja2dyb3VuZENvbG9yID0gKHZhbHVlOiBzdHJpbmcpOiA/c3RyaW5nID0+IHtcbiAgaWYgKHZhbHVlID09PSAnI2U2MDAyMycpIHtcbiAgICByZXR1cm4gJyAgVXNlIHByb3AgYGNvbG9yPVwicmVkXCJgIGluc3RlYWQnO1xuICB9XG4gIGlmICh2YWx1ZSA9PT0gJ3doaXRlJyB8fCB2YWx1ZSA9PT0gJyNmZmYnIHx8IHZhbHVlID09PSAnI2ZmZmZmZicpIHtcbiAgICByZXR1cm4gJyAgVXNlIHByb3AgYGNvbG9yPVwid2hpdGVcImAgaW5zdGVhZCc7XG4gIH1cbiAgaWYgKHZhbHVlID09PSAnI2VmZWZlZicpIHtcbiAgICByZXR1cm4gJyAgVXNlIHByb3AgYGNvbG9yPVwibGlnaHRHcmF5XCJgIGluc3RlYWQnO1xuICB9XG4gIGlmICh2YWx1ZSA9PT0gJyM3Njc2NzYnKSB7XG4gICAgcmV0dXJuICcgIFVzZSBwcm9wIGBjb2xvcj1cImdyYXlcImAgaW5zdGVhZCc7XG4gIH1cbiAgaWYgKHZhbHVlID09PSAnIzMzMycgfHwgdmFsdWUgPT09ICcjMzMzMzMzJykge1xuICAgIHJldHVybiAnICBVc2UgcHJvcCBgY29sb3I9XCJkYXJrR3JheVwiYCBpbnN0ZWFkJztcbiAgfVxuICBpZiAodmFsdWUgPT09ICcjMGZhNTczJykge1xuICAgIHJldHVybiAnICBVc2UgcHJvcCBgY29sb3I9XCJncmVlblwiYCBpbnN0ZWFkJztcbiAgfVxuICBpZiAodmFsdWUgPT09ICcjMGE2OTU1Jykge1xuICAgIHJldHVybiAnICBVc2UgcHJvcCBgY29sb3I9XCJwaW5lXCJgIGluc3RlYWQnO1xuICB9XG4gIGlmICh2YWx1ZSA9PT0gJyMzNjRhNGMnKSB7XG4gICAgcmV0dXJuICcgIFVzZSBwcm9wIGBjb2xvcj1cIm9saXZlXCJgIGluc3RlYWQnO1xuICB9XG4gIGlmICh2YWx1ZSA9PT0gJyMwMDc0ZTgnKSB7XG4gICAgcmV0dXJuICcgIFVzZSBwcm9wIGBjb2xvcj1cImJsdWVcImAgaW5zdGVhZCc7XG4gIH1cbiAgaWYgKHZhbHVlID09PSAnIzAwNGI5MScpIHtcbiAgICByZXR1cm4gJyAgVXNlIHByb3AgYGNvbG9yPVwibmF2eVwiYCBpbnN0ZWFkJztcbiAgfVxuICBpZiAodmFsdWUgPT09ICcjMTMzYTVlJykge1xuICAgIHJldHVybiAnICBVc2UgcHJvcCBgY29sb3I9XCJtaWRuaWdodFwiYCBpbnN0ZWFkJztcbiAgfVxuICBpZiAodmFsdWUgPT09ICcjYjQ2OWViJykge1xuICAgIHJldHVybiAnICBVc2UgcHJvcCBgY29sb3I9XCJwdXJwbGVcImAgaW5zdGVhZCc7XG4gIH1cbiAgaWYgKHZhbHVlID09PSAnIzgwNDZhNScpIHtcbiAgICByZXR1cm4gJyAgVXNlIHByb3AgYGNvbG9yPVwib3JjaGlkXCJgIGluc3RlYWQnO1xuICB9XG4gIGlmICh2YWx1ZSA9PT0gJyM1YjI2NzcnKSB7XG4gICAgcmV0dXJuICcgIFVzZSBwcm9wIGBjb2xvcj1cImVnZ3BsYW50XCJgIGluc3RlYWQnO1xuICB9XG4gIGlmICh2YWx1ZSA9PT0gJyM2ZTBmM2MnKSB7XG4gICAgcmV0dXJuICcgIFVzZSBwcm9wIGBjb2xvcj1cIm1hcm9vblwiYCBpbnN0ZWFkJztcbiAgfVxuICBpZiAodmFsdWUgPT09ICcjZjEzNTM1Jykge1xuICAgIHJldHVybiAnICBVc2UgcHJvcCBgY29sb3I9XCJ3YXRlcm1lbG9uXCJgIGluc3RlYWQnO1xuICB9XG4gIGlmICh2YWx1ZSA9PT0gJyNlMzc4MGMnKSB7XG4gICAgcmV0dXJuICcgIFVzZSBwcm9wIGBjb2xvcj1cIm9yYW5nZVwiYCBpbnN0ZWFkJztcbiAgfVxuICBpZiAodmFsdWUgPT09ICd0cmFuc3BhcmVudCcpIHtcbiAgICByZXR1cm4gJyAgVXNlIHByb3AgYGNvbG9yPVwidHJhbnNwYXJlbnRcImAgaW5zdGVhZCc7XG4gIH1cbiAgaWYgKHZhbHVlID09PSAncmdiYSg1MSw1MSw1MSwuOCknKSB7XG4gICAgcmV0dXJuICcgIFVzZSBwcm9wIGBjb2xvcj1cInRyYW5zcGFyZW50RGFya0dyYXlcImAgaW5zdGVhZCc7XG4gIH1cbiAgaWYgKHZhbHVlID09PSAnI2UyZTJlMicpIHtcbiAgICByZXR1cm4gJyAgVXNlIHByb3AgYGNvbG9yPVwibGlnaHRXYXNoXCJgIGluc3RlYWQnO1xuICB9XG4gIGlmICh2YWx1ZSA9PT0gJyNkYWRhZGEnKSB7XG4gICAgcmV0dXJuICcgIFVzZSBwcm9wIGBjb2xvcj1cImRhcmtXYXNoXCJgIGluc3RlYWQnO1xuICB9XG4gIHJldHVybiB1bmRlZmluZWQ7XG59O1xuXG5leHBvcnQgY29uc3QgdmFsaWRhdGVCb3JkZXJSYWRpdXMgPSAodmFsdWU6IHN0cmluZyk6IG51bWJlciB8IHN0cmluZyA9PiB7XG4gIGlmICh2YWx1ZSA9PT0gJzUwJScpIHtcbiAgICByZXR1cm4gJyAgVXNlIHByb3AgYHJvdW5kaW5nPVwiY2lyY2xlXCJgIGluc3RlYWQnO1xuICB9XG4gIGlmICh2YWx1ZSA9PT0gJzk5OXB4Jykge1xuICAgIHJldHVybiAnICBVc2UgcHJvcCBgcm91bmRpbmc9XCJwaWxsXCJgIGluc3RlYWQnO1xuICB9XG4gIHJldHVybiByb3VuZGluZ0xvb2t1cFt2YWx1ZV07XG59O1xuXG5leHBvcnQgY29uc3QgdmFsaWRhdGVCb3JkZXIgPSAodmFsdWU6IHN0cmluZyk6ID9zdHJpbmcgPT4ge1xuICAvLyBJZiB0aGUgdmFsdWUgaXMgYSBzdHJpbmc6XG4gIC8vIDEpIGNvbnZlcnQgZXZlcnl0aGluZyB0byBsb3dlckNhc2UgKGNzcyBpcyBjYXNlLWluc2Vuc2l0aXZlKVxuICAvLyAyKSBzb3J0IHRoZSB2YWx1ZXMgc2luY2Ugc29tZSBmb3VuZCB1c2VzIGhhdmUgdGhlIHdyb25nIG9yZGVyXG4gIGNvbnN0IGNsZWFuVmFsdWUgPVxuICAgIHZhbHVlICYmIHZhbHVlLnRvTG93ZXJDYXNlID8gdmFsdWUudG9Mb3dlckNhc2UoKS5zcGxpdCgnICcpLnNvcnQoKS5qb2luKCcgJykgOiB2YWx1ZTtcbiAgaWYgKFxuICAgIGNsZWFuVmFsdWUgPT09ICcjZWZlZmVmIDFweCBzb2xpZCcgfHxcbiAgICBjbGVhblZhbHVlID09PSAnI2VlZSAxcHggc29saWQnIHx8XG4gICAgY2xlYW5WYWx1ZSA9PT0gJzFweCBsaWdodGdyYXkgc29saWQnXG4gICkge1xuICAgIHJldHVybiAnICBVc2UgcHJvcCBgYm9yZGVyU3R5bGU9XCJzbVwiYCBpbnN0ZWFkJztcbiAgfVxuICBpZiAoXG4gICAgY2xlYW5WYWx1ZSA9PT0gJyNlZmVmZWYgMnB4IHNvbGlkJyB8fFxuICAgIGNsZWFuVmFsdWUgPT09ICcjZWVlIDJweCBzb2xpZCcgfHxcbiAgICBjbGVhblZhbHVlID09PSAnMnB4IGxpZ2h0Z3JheSBzb2xpZCdcbiAgKSB7XG4gICAgcmV0dXJuICcgIFVzZSBwcm9wIGBib3JkZXJTdHlsZT1cImxnXCJgIGluc3RlYWQnO1xuICB9XG4gIHJldHVybiB1bmRlZmluZWQ7XG59O1xuXG5leHBvcnQgY29uc3QgdmFsaWRhdGVCb3hTaGFkb3cgPSAodmFsdWU6IHN0cmluZyk6ID9zdHJpbmcgPT4ge1xuICAvLyBJZiB0aGUgdmFsdWUgaXMgYSBzdHJpbmc6XG4gIC8vIDEpIHN0cmlwIG91dCB0aGUgcmdiYSBwb3J0aW9uXG4gIC8vIDIpIGNvbnZlcnQgdGhlIHBpeGVsIHBvcnRpb24gdG8gb25seSBudW1iZXJzXG4gIC8vIDMpIElmIGJvdGggcGllY2VzIG1hdGNoLCByZWNvbW1lbmQgYm9yZGVyU3R5bGU9XCJzaGFkb3dcIlxuXG4gIGNvbnN0IHJnYmFSZWdleCA9IG5ldyBSZWdFeHAoXG4gICAgL3JnYmFcXChcXHMqKC0/XFxkK3wtP1xcZCpcXC5cXGQrKD89JSkpKCU/KVxccyosXFxzKigtP1xcZCt8LT9cXGQqXFwuXFxkKyg/PSUpKShcXDIpXFxzKixcXHMqKC0/XFxkK3wtP1xcZCpcXC5cXGQrKD89JSkpKFxcMilcXHMqLFxccyooLT9cXGQrfC0/XFxkKi5cXGQrKVxccypcXCkvLFxuICAgICdnJyxcbiAgKTtcbiAgY29uc3QgcmdiYVBvcnRpb24gPSB2YWx1ZS5tYXRjaChyZ2JhUmVnZXgpO1xuICBjb25zdCBjbGVhblJnYmFQb3J0aW9uID1cbiAgICByZ2JhUG9ydGlvbiAmJiByZ2JhUG9ydGlvbi5sZW5ndGggPiAwID8gcmdiYVBvcnRpb25bMF0ucmVwbGFjZSgvIC9nLCAnJykgOiB1bmRlZmluZWQ7XG5cbiAgY29uc3QgcGl4ZWxQb3J0aW9uID0gdmFsdWUucmVwbGFjZShyZ2JhUmVnZXgsICcnKTtcbiAgY29uc3QgY2xlYW5QaXhlbFBvcnRpb24gPSBwaXhlbFBvcnRpb24ucmVwbGFjZSgvcHgvZywgJycpLnJlcGxhY2UoLyAvZywgJycpO1xuXG4gIGxldCByZ2JhTWF0Y2ggPSBmYWxzZTtcbiAgbGV0IHBpeGVsc01hdGNoID0gZmFsc2U7XG4gIGlmIChjbGVhblJnYmFQb3J0aW9uICYmIFsncmdiYSgwLDAsMCwwLjEpJywgJ3JnYmEoMCwwLDAsLjEpJ10uaW5jbHVkZXMoY2xlYW5SZ2JhUG9ydGlvbikpIHtcbiAgICByZ2JhTWF0Y2ggPSB0cnVlO1xuICB9XG4gIGlmIChbJzAwOCcsICcwMDgwJ10uaW5jbHVkZXMoY2xlYW5QaXhlbFBvcnRpb24pKSB7XG4gICAgcGl4ZWxzTWF0Y2ggPSB0cnVlO1xuICB9XG5cbiAgaWYgKHJnYmFNYXRjaCAmJiBwaXhlbHNNYXRjaCkge1xuICAgIHJldHVybiAnICBVc2UgcHJvcCBgYm9yZGVyU3R5bGU9XCJzaGFkb3dcImAgaW5zdGVhZCc7XG4gIH1cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn07XG4iLCIvKipcbiAqIEBmaWxlb3ZlcnZpZXcgUHJldmVudCB1c2luZyBkYW5nZXJvdXNseVNldElubGluZVN0eWxlIG9uIEJveCBmb3IgcHJvcHMgdGhhdCBhcmUgYWxyZWFkeSBkaXJlY3RseSBpbXBsZW1lbnRlZFxuICogQGF1dGhvciBKZW5ueSBTdGVlbGUgPGpzdGVlbGVAcGludGVyZXN0LmNvbT5cbiAqXG4gKiBCb3ggc3VwcG9ydHMgc29tZSBwcm9wcyBhbHJlYWR5IHRoYXQgYXJlIG5vdCB3aWRlbHkga25vd24gYW5kIGluc3RlYWQgYXJlIGJlaW5nXG4gKiBpbXBsZW1lbnRlZCB3aXRoIGRhbmdlcm91c2x5U2V0SW5saW5lU3R5bGUuIFRoaXMgbGludGVyIGNoZWNrcyBmb3IgdXNhZ2Ugb2YgYWxyZWFkeVxuICogYXZhaWxhYmxlIHByb3BzIGFzIGRhbmdlcm91cyBzdHlsZXMgYW5kIHN1Z2dlc3RzIHRoZSBhbHRlcm5hdGl2ZVxuICovXG5cbi8vIEBmbG93IHN0cmljdFxuaW1wb3J0IHtcbiAgZ2VuQm9pbnRMb29rdXAsXG4gIHZhbGlkYXRlQmFja2dyb3VuZENvbG9yLFxuICB2YWxpZGF0ZUJvcmRlcixcbiAgdmFsaWRhdGVCb3JkZXJSYWRpdXMsXG4gIHZhbGlkYXRlQm94U2hhZG93LFxufSBmcm9tICcuL3ZhbGlkYXRvcnMuanMnO1xuXG5mdW5jdGlvbiBnZXRJbmxpbmVEZWZpbmVkU3R5bGVzKGF0dHIpIHtcbiAgcmV0dXJuIGF0dHIudmFsdWUuZXhwcmVzc2lvbiAmJlxuICAgIGF0dHIudmFsdWUuZXhwcmVzc2lvbi5wcm9wZXJ0aWVzICYmXG4gICAgYXR0ci52YWx1ZS5leHByZXNzaW9uLnByb3BlcnRpZXNbMF0gJiZcbiAgICBhdHRyLnZhbHVlLmV4cHJlc3Npb24ucHJvcGVydGllc1swXS5rZXkubmFtZSA9PT0gJ19fc3R5bGUnXG4gICAgPyBhdHRyLnZhbHVlLmV4cHJlc3Npb24ucHJvcGVydGllc1swXS52YWx1ZS5wcm9wZXJ0aWVzXG4gICAgOiBudWxsO1xufVxuXG5mdW5jdGlvbiBnZXRWYXJpYWJsZURlZmluZWRTdHlsZXMocmVmKSB7XG4gIHJldHVybiByZWYucmVzb2x2ZWQgJiZcbiAgICByZWYucmVzb2x2ZWQuZGVmcyAmJlxuICAgIHJlZi5yZXNvbHZlZC5kZWZzWzBdICYmXG4gICAgcmVmLnJlc29sdmVkLmRlZnNbMF0ubm9kZSAmJlxuICAgIHJlZi5yZXNvbHZlZC5kZWZzWzBdLm5vZGUuaW5pdCAmJlxuICAgIHJlZi5yZXNvbHZlZC5kZWZzWzBdLm5vZGUuaW5pdC5wcm9wZXJ0aWVzICYmXG4gICAgcmVmLnJlc29sdmVkLmRlZnNbMF0ubm9kZS5pbml0LnByb3BlcnRpZXNbMF0gJiZcbiAgICByZWYucmVzb2x2ZWQuZGVmc1swXS5ub2RlLmluaXQucHJvcGVydGllc1swXS5rZXkubmFtZSA9PT0gJ19fc3R5bGUnXG4gICAgPyByZWYucmVzb2x2ZWQuZGVmc1swXS5ub2RlLmluaXQucHJvcGVydGllc1swXS52YWx1ZS5wcm9wZXJ0aWVzXG4gICAgOiBudWxsO1xufVxuXG5mdW5jdGlvbiBnZW5PcGFjaXR5TG9va3VwKCkge1xuICBjb25zdCBsb29rdXBNYXAgPSB7fTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPD0gMTA7IGkgKz0gMSkge1xuICAgIGNvbnN0IHZhbCA9IGkgLyAxMDsgLy8gV2h5IG5vdCBpbmNyZW1lbnQgaSBieSAwLjE/IEZsb2F0c1xuICAgIGNvbnN0IG1zZyA9IGAgIFVzZSBwcm9wIFxcYG9wYWNpdHk9eyR7dmFsfX1cXGAgaW5zdGVhZGA7XG4gICAgbG9va3VwTWFwW3ZhbF0gPSBtc2c7XG4gICAgbG9va3VwTWFwW2Ake3ZhbH1gXSA9IG1zZztcbiAgfVxuICByZXR1cm4gbG9va3VwTWFwO1xufVxuXG5jb25zdCBvdmVyZmxvd0xvb2t1cCA9IHtcbiAgdmlzaWJsZTogJyAgVXNlIHByb3AgYG92ZXJmbG93PVwidmlzaWJsZVwiYCBpbnN0ZWFkJyxcbiAgaGlkZGVuOiAnICBVc2UgcHJvcCBgb3ZlcmZsb3c9XCJoaWRkZW5cImAgaW5zdGVhZCcsXG4gIHNjcm9sbDogJyAgVXNlIHByb3AgYG92ZXJmbG93PVwic2Nyb2xsXCJgIGluc3RlYWQnLFxuICBhdXRvOiAnICBVc2UgcHJvcCBgb3ZlcmZsb3c9XCJhdXRvXCJgIGluc3RlYWQnLFxufTtcblxuY29uc3QgcnVsZSA9IHtcbiAgbWV0YToge1xuICAgIGRvY3M6IHtcbiAgICAgIGRlc2NyaXB0aW9uOlxuICAgICAgICAnUHJldmVudCB1c2luZyBkYW5nZXJvdXNseVNldElubGluZVN0eWxlIG9uIEJveCBmb3IgcHJvcHMgdGhhdCBhcmUgYWxyZWFkeSBkaXJlY3RseSBpbXBsZW1lbnRlZCcsXG4gICAgICByZWNvbW1lbmRlZDogZmFsc2UsXG4gICAgfSxcbiAgICBzY2hlbWE6IFtcbiAgICAgIHtcbiAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICBvbmx5S2V5czoge1xuICAgICAgICAgICAgdHlwZTogJ2FycmF5JyxcbiAgICAgICAgICAgIGl0ZW1zOiB7IHR5cGU6ICdzdHJpbmcnIH0sXG4gICAgICAgICAgICB1bmlxdWVJdGVtczogdHJ1ZSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBhZGRpdGlvbmFsUHJvcGVydGllczogZmFsc2UsXG4gICAgICB9LFxuICAgIF0sXG4gIH0sXG5cbiAgLy8gJEZsb3dGaXhNZVt1bmNsZWFyLXR5cGVdXG4gIGNyZWF0ZShjb250ZXh0OiBPYmplY3QpOiBPYmplY3Qge1xuICAgIGxldCBpbXBvcnRlZEJveCA9IGZhbHNlO1xuICAgIGxldCBsb2NhbElkZW50aWZpZXJOYW1lID0gJ0JveCc7XG4gICAgY29uc3QgeyBvbmx5S2V5cyB9ID0gY29udGV4dC5vcHRpb25zWzBdIHx8IHt9O1xuXG4gICAgZnVuY3Rpb24gaW5jbHVkZUtleShrZXkpIHtcbiAgICAgIHJldHVybiAhb25seUtleXMgfHwgb25seUtleXMuaW5jbHVkZXMoa2V5KTtcbiAgICB9XG5cbiAgICBjb25zdCBtYXJnaW5Mb29rdXAgPSBnZW5Cb2ludExvb2t1cCgnbWFyZ2luJywgLTEyKTtcbiAgICBjb25zdCBtYXJnaW5Cb3R0b21Mb29rdXAgPSBnZW5Cb2ludExvb2t1cCgnbWFyZ2luQm90dG9tJywgLTEyKTtcbiAgICBjb25zdCBtYXJnaW5MZWZ0TG9va3VwID0gZ2VuQm9pbnRMb29rdXAoJ21hcmdpbkxlZnQnLCAtMTIpO1xuICAgIGNvbnN0IG1hcmdpblJpZ2h0TG9va3VwID0gZ2VuQm9pbnRMb29rdXAoJ21hcmdpblJpZ2h0JywgLTEyKTtcbiAgICBjb25zdCBtYXJnaW5Ub3BMb29rdXAgPSBnZW5Cb2ludExvb2t1cCgnbWFyZ2luVG9wJywgLTEyKTtcblxuICAgIGNvbnN0IG9wYWNpdHlMb29rdXAgPSBnZW5PcGFjaXR5TG9va3VwKCk7XG5cbiAgICBjb25zdCBwYWRkaW5nTG9va3VwID0gZ2VuQm9pbnRMb29rdXAoJ3BhZGRpbmcnLCAwKTtcblxuICAgIGZ1bmN0aW9uIG1hdGNoS2V5RXJyb3JzKG1hdGNoZWRFcnJvcnMsIGtleSkge1xuICAgICAgc3dpdGNoIChrZXkubmFtZSkge1xuICAgICAgICBjYXNlICdiYWNrZ3JvdW5kQ29sb3InOlxuICAgICAgICAgIGlmIChpbmNsdWRlS2V5KCdiYWNrZ3JvdW5kQ29sb3InKSkge1xuICAgICAgICAgICAgY29uc3QgbWVzc2FnZSA9IHZhbGlkYXRlQmFja2dyb3VuZENvbG9yKGtleS52YWx1ZSk7XG4gICAgICAgICAgICBpZiAobWVzc2FnZSkge1xuICAgICAgICAgICAgICBtYXRjaGVkRXJyb3JzLnB1c2gobWVzc2FnZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdib3JkZXJSYWRpdXMnOlxuICAgICAgICAgIGlmIChpbmNsdWRlS2V5KCdib3JkZXJSYWRpdXMnKSkge1xuICAgICAgICAgICAgY29uc3QgbWVzc2FnZSA9IHZhbGlkYXRlQm9yZGVyUmFkaXVzKGtleS52YWx1ZSk7XG4gICAgICAgICAgICBpZiAobWVzc2FnZSkge1xuICAgICAgICAgICAgICBtYXRjaGVkRXJyb3JzLnB1c2gobWVzc2FnZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdib3JkZXInOlxuICAgICAgICAgIGlmIChpbmNsdWRlS2V5KCdib3JkZXInKSkge1xuICAgICAgICAgICAgY29uc3QgbWVzc2FnZSA9IHZhbGlkYXRlQm9yZGVyKGtleS52YWx1ZSk7XG4gICAgICAgICAgICBpZiAobWVzc2FnZSkge1xuICAgICAgICAgICAgICBtYXRjaGVkRXJyb3JzLnB1c2gobWVzc2FnZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdib3hTaGFkb3cnOlxuICAgICAgICAgIGlmIChpbmNsdWRlS2V5KCdib3hTaGFkb3cnKSkge1xuICAgICAgICAgICAgY29uc3QgbWVzc2FnZSA9IHZhbGlkYXRlQm94U2hhZG93KGtleS52YWx1ZSk7XG4gICAgICAgICAgICBpZiAobWVzc2FnZSkge1xuICAgICAgICAgICAgICBtYXRjaGVkRXJyb3JzLnB1c2gobWVzc2FnZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdib3R0b20nOlxuICAgICAgICAgIGlmICgoaW5jbHVkZUtleSgnYm90dG9tJykgJiYga2V5LnZhbHVlID09PSAnMHB4JykgfHwga2V5LnZhbHVlID09PSAwKSB7XG4gICAgICAgICAgICBtYXRjaGVkRXJyb3JzLnB1c2goXG4gICAgICAgICAgICAgICcgIEluc3RlYWQgb2YgZGFuZ2Vyb3VzbHkgc3R5bGluZyBib3R0b20sIHVzZSB0aGUgXCJib3R0b21cIiBib29sZWFuIHByb3AnLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2xlZnQnOlxuICAgICAgICAgIGlmICgoaW5jbHVkZUtleSgnbGVmdCcpICYmIGtleS52YWx1ZSA9PT0gJzBweCcpIHx8IGtleS52YWx1ZSA9PT0gMCkge1xuICAgICAgICAgICAgbWF0Y2hlZEVycm9ycy5wdXNoKFxuICAgICAgICAgICAgICAnICBJbnN0ZWFkIG9mIGRhbmdlcm91c2x5IHN0eWxpbmcgbGVmdCwgdXNlIHRoZSBcImxlZnRcIiBib29sZWFuIHByb3AnLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ21hcmdpbic6XG4gICAgICAgICAgaWYgKGluY2x1ZGVLZXkoJ21hcmdpbicpKSB7XG4gICAgICAgICAgICBpZiAoa2V5LnZhbHVlID09PSAnYXV0bycpIHtcbiAgICAgICAgICAgICAgbWF0Y2hlZEVycm9ycy5wdXNoKCcgIFVzZSBwcm9wIGBtYXJnaW49XCJhdXRvXCJgIGluc3RlYWQnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIG1hdGNoZWRFcnJvcnMucHVzaChtYXJnaW5Mb29rdXBba2V5LnZhbHVlXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdtYXJnaW5Cb3R0b20nOlxuICAgICAgICAgIGlmIChpbmNsdWRlS2V5KCdtYXJnaW5Cb3R0b20nKSkge1xuICAgICAgICAgICAgaWYgKGtleS52YWx1ZSA9PT0gJ2F1dG8nKSB7XG4gICAgICAgICAgICAgIG1hdGNoZWRFcnJvcnMucHVzaCgnICBVc2UgcHJvcCBgbWFyZ2luQm90dG9tPVwiYXV0b1wiYCBpbnN0ZWFkJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBtYXRjaGVkRXJyb3JzLnB1c2gobWFyZ2luQm90dG9tTG9va3VwW2tleS52YWx1ZV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnbWFyZ2luTGVmdCc6XG4gICAgICAgICAgaWYgKGluY2x1ZGVLZXkoJ21hcmdpblRvcCcpKSB7XG4gICAgICAgICAgICBpZiAoa2V5LnZhbHVlID09PSAnYXV0bycpIHtcbiAgICAgICAgICAgICAgbWF0Y2hlZEVycm9ycy5wdXNoKCcgIFVzZSBwcm9wIGBtYXJnaW5TdGFydD1cImF1dG9cImAgaW5zdGVhZCcpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgbWF0Y2hlZEVycm9ycy5wdXNoKG1hcmdpbkxlZnRMb29rdXBba2V5LnZhbHVlXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdtYXJnaW5SaWdodCc6XG4gICAgICAgICAgaWYgKGluY2x1ZGVLZXkoJ21hcmdpblJpZ2h0JykpIHtcbiAgICAgICAgICAgIGlmIChrZXkudmFsdWUgPT09ICdhdXRvJykge1xuICAgICAgICAgICAgICBtYXRjaGVkRXJyb3JzLnB1c2goJyAgVXNlIHByb3AgYG1hcmdpbkVuZD1cImF1dG9cImAgaW5zdGVhZCcpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgbWF0Y2hlZEVycm9ycy5wdXNoKG1hcmdpblJpZ2h0TG9va3VwW2tleS52YWx1ZV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnbWFyZ2luVG9wJzpcbiAgICAgICAgICBpZiAoaW5jbHVkZUtleSgnbWFyZ2luVG9wJykpIHtcbiAgICAgICAgICAgIGlmIChrZXkudmFsdWUgPT09ICdhdXRvJykge1xuICAgICAgICAgICAgICBtYXRjaGVkRXJyb3JzLnB1c2goJyAgVXNlIHByb3AgYG1hcmdpblRvcD1cImF1dG9cImAgaW5zdGVhZCcpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgbWF0Y2hlZEVycm9ycy5wdXNoKG1hcmdpblRvcExvb2t1cFtrZXkudmFsdWVdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ21heEhlaWdodCc6XG4gICAgICAgICAgaWYgKGluY2x1ZGVLZXkoJ21heEhlaWdodCcpKSB7XG4gICAgICAgICAgICBtYXRjaGVkRXJyb3JzLnB1c2goXG4gICAgICAgICAgICAgICcgIFVzZSBwcm9wIGBtYXhIZWlnaHQ9e3BpeGVsc31gIG9yIGBtYXhIZWlnaHQ9XCJwZXJjZW50YWdlJVwiYCBpbnN0ZWFkJyxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdtaW5IZWlnaHQnOlxuICAgICAgICAgIGlmIChpbmNsdWRlS2V5KCdtaW5IZWlnaHQnKSkge1xuICAgICAgICAgICAgbWF0Y2hlZEVycm9ycy5wdXNoKFxuICAgICAgICAgICAgICAnICBVc2UgcHJvcCBgbWluSGVpZ2h0PXtwaXhlbHN9YCBvciBgbWluSGVpZ2h0PVwicGVyY2VudGFnZSVcImAgaW5zdGVhZCcsXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnbWF4V2lkdGgnOlxuICAgICAgICAgIGlmIChpbmNsdWRlS2V5KCdtYXhXaWR0aCcpKSB7XG4gICAgICAgICAgICBtYXRjaGVkRXJyb3JzLnB1c2goXG4gICAgICAgICAgICAgICcgIFVzZSBwcm9wIGBtYXhXaWR0aD17cGl4ZWxzfWAgb3IgYG1heFdpZHRoPVwicGVyY2VudGFnZSVcImAgaW5zdGVhZCcsXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnbWluV2lkdGgnOlxuICAgICAgICAgIGlmIChpbmNsdWRlS2V5KCdtaW5XaWR0aCcpKSB7XG4gICAgICAgICAgICBtYXRjaGVkRXJyb3JzLnB1c2goXG4gICAgICAgICAgICAgICcgIFVzZSBwcm9wIGBtaW5XaWR0aD17cGl4ZWxzfWAgb3IgYG1pbldpZHRoPVwicGVyY2VudGFnZSVcImAgaW5zdGVhZCcsXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnb3BhY2l0eSc6XG4gICAgICAgICAgaWYgKGluY2x1ZGVLZXkoJ29wYWNpdHknKSkge1xuICAgICAgICAgICAgbWF0Y2hlZEVycm9ycy5wdXNoKG9wYWNpdHlMb29rdXBba2V5LnZhbHVlXSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdvdmVyZmxvdyc6XG4gICAgICAgICAgaWYgKGluY2x1ZGVLZXkoJ292ZXJmbG93JykpIHtcbiAgICAgICAgICAgIG1hdGNoZWRFcnJvcnMucHVzaChvdmVyZmxvd0xvb2t1cFtrZXkudmFsdWVdKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ292ZXJmbG93LXgnOlxuICAgICAgICAgIGlmIChpbmNsdWRlS2V5KCdvdmVyZmxvdycpKSB7XG4gICAgICAgICAgICBpZiAoa2V5LnZhbHVlID09PSAnc2Nyb2xsJykge1xuICAgICAgICAgICAgICBtYXRjaGVkRXJyb3JzLnB1c2goJyAgVXNlIHByb3AgYG92ZXJmbG93PVwic2Nyb2xsWFwiYCBpbnN0ZWFkJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdvdmVyZmxvdy15JzpcbiAgICAgICAgICBpZiAoaW5jbHVkZUtleSgnb3ZlcmZsb3cnKSkge1xuICAgICAgICAgICAgaWYgKGtleS52YWx1ZSA9PT0gJ3Njcm9sbCcpIHtcbiAgICAgICAgICAgICAgbWF0Y2hlZEVycm9ycy5wdXNoKCcgIFVzZSBwcm9wIGBvdmVyZmxvdz1cInNjcm9sbFlcImAgaW5zdGVhZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAncGFkZGluZyc6XG4gICAgICAgICAgaWYgKGluY2x1ZGVLZXkoJ3BhZGRpbmcnKSkge1xuICAgICAgICAgICAgbWF0Y2hlZEVycm9ycy5wdXNoKHBhZGRpbmdMb29rdXBba2V5LnZhbHVlXSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdwb3NpdGlvbic6XG4gICAgICAgICAgaWYgKGluY2x1ZGVLZXkoJ3Bvc2l0aW9uJykpIHtcbiAgICAgICAgICAgIGlmIChrZXkudmFsdWUgPT09ICdhYnNvbHV0ZScpIHtcbiAgICAgICAgICAgICAgbWF0Y2hlZEVycm9ycy5wdXNoKCcgIFVzZSBwcm9wIGBwb3NpdGlvbj1cImFic29sdXRlXCJgIGluc3RlYWQnKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoa2V5LnZhbHVlID09PSAnc3RhdGljJykge1xuICAgICAgICAgICAgICBtYXRjaGVkRXJyb3JzLnB1c2goJyAgVXNlIHByb3AgYHBvc2l0aW9uPVwic3RhdGljXCJgIGluc3RlYWQnKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoa2V5LnZhbHVlID09PSAncmVsYXRpdmUnKSB7XG4gICAgICAgICAgICAgIG1hdGNoZWRFcnJvcnMucHVzaCgnICBVc2UgcHJvcCBgcG9zaXRpb249XCJyZWxhdGl2ZVwiYCBpbnN0ZWFkJyk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGtleS52YWx1ZSA9PT0gJ2ZpeGVkJykge1xuICAgICAgICAgICAgICBtYXRjaGVkRXJyb3JzLnB1c2goJyAgVXNlIHByb3AgYHBvc2l0aW9uPVwiZml4ZWRcImAgaW5zdGVhZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAncmlnaHQnOlxuICAgICAgICAgIGlmICgoaW5jbHVkZUtleSgncmlnaHQnKSAmJiBrZXkudmFsdWUgPT09ICcwcHgnKSB8fCBrZXkudmFsdWUgPT09IDApIHtcbiAgICAgICAgICAgIG1hdGNoZWRFcnJvcnMucHVzaChcbiAgICAgICAgICAgICAgJyAgSW5zdGVhZCBvZiBkYW5nZXJvdXNseSBzdHlsaW5nIHJpZ2h0LCB1c2UgdGhlIFwicmlnaHRcIiBib29sZWFuIHByb3AnLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3RvcCc6XG4gICAgICAgICAgaWYgKChpbmNsdWRlS2V5KCd0b3AnKSAmJiBrZXkudmFsdWUgPT09ICcwcHgnKSB8fCBrZXkudmFsdWUgPT09IDApIHtcbiAgICAgICAgICAgIG1hdGNoZWRFcnJvcnMucHVzaCgnICBJbnN0ZWFkIG9mIGRhbmdlcm91c2x5IHN0eWxpbmcgdG9wLCB1c2UgdGhlIFwidG9wXCIgYm9vbGVhbiBwcm9wJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG1hdGNoZWRFcnJvcnMuZmlsdGVyKCh4KSA9PiB4KTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgSW1wb3J0RGVjbGFyYXRpb24oZGVjbCkge1xuICAgICAgICBpZiAoZGVjbC5zb3VyY2UudmFsdWUgIT09ICdnZXN0YWx0Jykge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpbXBvcnRlZEJveCA9IGRlY2wuc3BlY2lmaWVycy5zb21lKChub2RlKSA9PiB7XG4gICAgICAgICAgY29uc3QgaXNCb3ggPSBub2RlLmltcG9ydGVkLm5hbWUgPT09ICdCb3gnO1xuICAgICAgICAgIGlmIChpc0JveCkge1xuICAgICAgICAgICAgbG9jYWxJZGVudGlmaWVyTmFtZSA9IG5vZGUubG9jYWwubmFtZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGlzQm94O1xuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICBKU1hPcGVuaW5nRWxlbWVudChub2RlKSB7XG4gICAgICAgIGlmICghaW1wb3J0ZWRCb3ggfHwgbG9jYWxJZGVudGlmaWVyTmFtZSAhPT0gbm9kZS5uYW1lLm5hbWUpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgT2JqZWN0LmtleXMobm9kZS5hdHRyaWJ1dGVzKS5zb21lKChhdHRyS2V5KSA9PiB7XG4gICAgICAgICAgY29uc3QgYXR0ciA9IG5vZGUuYXR0cmlidXRlc1thdHRyS2V5XTtcbiAgICAgICAgICBjb25zdCBtYXRjaGVkID0gYXR0ci5uYW1lICYmIGF0dHIubmFtZS5uYW1lID09PSAnZGFuZ2Vyb3VzbHlTZXRJbmxpbmVTdHlsZSc7XG4gICAgICAgICAgaWYgKG1hdGNoZWQpIHtcbiAgICAgICAgICAgIC8vIElmIHdlIGhhdmUgc3R5bGUgcHJvcGVydGllcyBoZXJlLCB0aGlzIGlzIGFuIG9iamVjdCBkZWNsYXJlZCBpbmxpbmVcbiAgICAgICAgICAgIGxldCBzdHlsZVByb3BlcnRpZXMgPSBnZXRJbmxpbmVEZWZpbmVkU3R5bGVzKGF0dHIpO1xuICAgICAgICAgICAgLy8gTm90IGRlY2xhcmVkIGlubGluZT8gQ2hlY2sgdG8gc2VlIGlmIHRoZXJlJ3MgYSB2YXJpYWJsZSBtYXRjaGluZyB0aGUgbmFtZSBkZWZpbmVkXG4gICAgICAgICAgICBpZiAoIXN0eWxlUHJvcGVydGllcyAmJiBhdHRyLnZhbHVlLmV4cHJlc3Npb24ubmFtZSkge1xuICAgICAgICAgICAgICBjb25zdCBzY29wZSA9IGNvbnRleHQuZ2V0U2NvcGUobm9kZSk7XG4gICAgICAgICAgICAgIC8vIExvb2sgaW4gbG9jYWwgc2NvcGUgZm9yIHZhcmlhYmxlIHJlZmVyZW5jZVxuICAgICAgICAgICAgICBjb25zdCByZWYgPSBzY29wZS5yZWZlcmVuY2VzLmZpbmQoXG4gICAgICAgICAgICAgICAgKHJlZmVyZW5jZSkgPT4gcmVmZXJlbmNlLmlkZW50aWZpZXIubmFtZSA9PT0gYXR0ci52YWx1ZS5leHByZXNzaW9uLm5hbWUsXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIGlmIChyZWYpIHtcbiAgICAgICAgICAgICAgICBzdHlsZVByb3BlcnRpZXMgPSBnZXRWYXJpYWJsZURlZmluZWRTdHlsZXMocmVmKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHN0eWxlUHJvcGVydGllcykge1xuICAgICAgICAgICAgICBjb25zdCBlcnJvck1lc3NhZ2VzID0gc3R5bGVQcm9wZXJ0aWVzXG4gICAgICAgICAgICAgICAgLm1hcCgoeyBrZXksIHR5cGUsIHZhbHVlIH0pID0+IHtcbiAgICAgICAgICAgICAgICAgIC8vIEhhbmRsZSB0aGluZ3MgbGlrZSBzcHJlYWQgcHJvcHNcbiAgICAgICAgICAgICAgICAgIGlmICgha2V5IHx8IHZhbHVlLnZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgbmFtZTogdHlwZSwgdmFsdWU6IG51bGwgfTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIHJldHVybiB7IG5hbWU6IGtleS5uYW1lLCB2YWx1ZTogdmFsdWUudmFsdWUgfTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5yZWR1Y2UobWF0Y2hLZXlFcnJvcnMsIFtdKTtcbiAgICAgICAgICAgICAgaWYgKGVycm9yTWVzc2FnZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgY29udGV4dC5yZXBvcnQoXG4gICAgICAgICAgICAgICAgICBhdHRyLFxuICAgICAgICAgICAgICAgICAgYFVuLW5lZWRlZCBCb3ggZGFuZ2Vyb3VzIHN0eWxlcyBmb3VuZC4gaHR0cHM6Ly9nZXN0YWx0Lm5ldGxpZnkuYXBwL0JveFxcbiR7ZXJyb3JNZXNzYWdlcy5qb2luKFxuICAgICAgICAgICAgICAgICAgICAnXFxuJyxcbiAgICAgICAgICAgICAgICAgICl9YCxcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBtYXRjaGVkO1xuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgfTtcbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHJ1bGU7XG4iLCIvKipcbiAqIEBmaWxlb3ZlcnZpZXcgRGlzYWxsb3cgbWVkaXVtIGZvcm0gZmllbGRzXG4gKiBAYXV0aG9yIENocmlzdGlhbiBWdWVyaW5ncyA8Y3Z1ZXJpbmdzQHBpbnRlcmVzdC5jb20+XG4gKlxuICogSW4gb3JkZXIgdG8gaGF2ZSBjb25zaXN0ZW50IGZvcm0gZmllbGRzIGluIHBpbmJvYXJkLCB3ZSB1cGRhdGUgYWxsIG9mIHRoZWlyIHNpemVzIHRvIGxhcmdlIGFuZCBkaXNhbGxvdyBtZWRpdW1cbiAqL1xuXG4vLyBAZmxvdyBzdHJpY3RcbmNvbnN0IHJ1bGUgPSB7XG4gIG1ldGE6IHtcbiAgICBkb2NzOiB7XG4gICAgICBkZXNjcmlwdGlvbjogJ0Rpc2FsbG93IG1lZGl1bSBmb3JtIGZpZWxkcycsXG4gICAgICByZWNvbW1lbmRlZDogZmFsc2UsXG4gICAgfSxcbiAgICBzY2hlbWE6IFtcbiAgICAgIHtcbiAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgIGFkZGl0aW9uYWxQcm9wZXJ0aWVzOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgXSxcbiAgfSxcblxuICAvLyAkRmxvd0ZpeE1lW3VuY2xlYXItdHlwZV1cbiAgY3JlYXRlKGNvbnRleHQ6IE9iamVjdCk6IE9iamVjdCB7XG4gICAgbGV0IGltcG9ydGVkQ29tcG9uZW50ID0gZmFsc2U7XG4gICAgbGV0IGxvY2FsSWRlbnRpZmllck5hbWU7XG4gICAgY29uc3QgY29tcG9uZW50TmFtZXMgPSBbJ1NlYXJjaEZpZWxkJywgJ1NlbGVjdExpc3QnLCAnVGFicycsICdUZXh0RmllbGQnXTtcblxuICAgIHJldHVybiB7XG4gICAgICBJbXBvcnREZWNsYXJhdGlvbihkZWNsKSB7XG4gICAgICAgIGlmIChkZWNsLnNvdXJjZS52YWx1ZSAhPT0gJ2dlc3RhbHQnKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGltcG9ydGVkQ29tcG9uZW50ID0gZGVjbC5zcGVjaWZpZXJzLnNvbWUoKG5vZGUpID0+IHtcbiAgICAgICAgICBjb25zdCBpc1ZhbGlkQ29tcG9uZW50ID0gY29tcG9uZW50TmFtZXMuaW5jbHVkZXMobm9kZS5pbXBvcnRlZC5uYW1lKTtcbiAgICAgICAgICBpZiAoaXNWYWxpZENvbXBvbmVudCkge1xuICAgICAgICAgICAgbG9jYWxJZGVudGlmaWVyTmFtZSA9IG5vZGUubG9jYWwubmFtZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGlzVmFsaWRDb21wb25lbnQ7XG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICAgIEpTWE9wZW5pbmdFbGVtZW50KG5vZGUpIHtcbiAgICAgICAgaWYgKCFpbXBvcnRlZENvbXBvbmVudCB8fCBsb2NhbElkZW50aWZpZXJOYW1lICE9PSBub2RlLm5hbWUubmFtZSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHNpemVBdHRyaWJ1dGUgPSBPYmplY3QuZW50cmllcyhub2RlLmF0dHJpYnV0ZXMpLmZpbmQoXG4gICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gICAgICAgICAgKFtrZXksIHZhbHVlXSkgPT5cbiAgICAgICAgICAgIC8vICRGbG93Rml4TWVbaW5jb21wYXRpYmxlLXVzZV1cbiAgICAgICAgICAgIHZhbHVlICYmIHZhbHVlLm5hbWUgJiYgdmFsdWUubmFtZS5uYW1lID09PSAnc2l6ZScsXG4gICAgICAgICk7XG5cbiAgICAgICAgLy8gTm8gc2l6ZSBkZWZpbmVkIG9yIHNpemUgaXMgbm90IFwibGdcIlxuICAgICAgICAvLyAkRmxvd0ZpeE1lW2luY29tcGF0aWJsZS11c2VdXG4gICAgICAgIGlmICghc2l6ZUF0dHJpYnV0ZSB8fCBzaXplQXR0cmlidXRlWzFdLnZhbHVlLnZhbHVlID09PSAnbWQnKSB7XG4gICAgICAgICAgY29udGV4dC5yZXBvcnQobm9kZSwgJ0dlc3RhbHQgZm9ybSBmaWVsZHMgc2hvdWxkIGFsd2F5cyBoYXZlIHNpemU9XCJsZ1wiIHNldCBvbiB0aGVtJyk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgfTtcbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHJ1bGU7XG4iLCIvKipcbiAqIEBmaWxlb3ZlcnZpZXcgRGlzYWxsb3cgcm9sZS1saW5rIG9uIEdlc3RhbHQgY29tcG9uZW50c1xuICogQGF1dGhvciBBbGJlcnRvIENhcnJlcmFzIDxhY2FycmVyYXNAcGludGVyZXN0LmNvbT5cbiAqXG4gKiBXZSBkbyBub3QgYWxsb3cgcm9sZT0nbGluaycgb24gQnV0dG9uLCBUYXBBcmVhLCBhbmQgSWNvbkJ1dHRvbi5cbiAqIFBpbmJvYXJkIGFsdGVybmF0aXZlIHdpdGggYWRkaXRpb25hbCBmdW5jdGlvbmFsaXR5cCBtdXN0IGJlIHVzZWQgaW5zdGVhZC5cbiAqL1xuXG4vLyBAZmxvdyBzdHJpY3RcbmNvbnN0IHJ1bGUgPSB7XG4gIG1ldGE6IHtcbiAgICBkb2NzOiB7XG4gICAgICBkZXNjcmlwdGlvbjogJ0Rpc2FsbG93IHJvbGUtbGluayBvbiBHZXN0YWx0IGNvbXBvbmVudHMnLFxuICAgICAgcmVjb21tZW5kZWQ6IGZhbHNlLFxuICAgIH0sXG4gICAgc2NoZW1hOiBbXG4gICAgICB7XG4gICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICBhZGRpdGlvbmFsUHJvcGVydGllczogZmFsc2UsXG4gICAgICB9LFxuICAgIF0sXG4gIH0sXG5cbiAgLy8gJEZsb3dGaXhNZVt1bmNsZWFyLXR5cGVdXG4gIGNyZWF0ZShjb250ZXh0OiBPYmplY3QpOiBPYmplY3Qge1xuICAgIGxldCBpbXBvcnRlZENvbXBvbmVudCA9IGZhbHNlO1xuICAgIGxldCBpbXBvcnRlZE5hbWU7XG5cbiAgICByZXR1cm4ge1xuICAgICAgSW1wb3J0RGVjbGFyYXRpb24oZGVjbCkge1xuICAgICAgICBpZiAoZGVjbC5zb3VyY2UudmFsdWUgIT09ICdnZXN0YWx0Jykge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpbXBvcnRlZENvbXBvbmVudCA9IGRlY2wuc3BlY2lmaWVycy5zb21lKChub2RlKSA9PiB7XG4gICAgICAgICAgaW1wb3J0ZWROYW1lID0gbm9kZS5pbXBvcnRlZC5uYW1lO1xuICAgICAgICAgIHJldHVybiBbJ0J1dHRvbicsICdUYXBBcmVhJywgJ0ljb25CdXR0b24nXS5pbmNsdWRlcyhub2RlLmltcG9ydGVkLm5hbWUpO1xuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICBKU1hPcGVuaW5nRWxlbWVudChub2RlKSB7XG4gICAgICAgIGlmICghaW1wb3J0ZWRDb21wb25lbnQpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBpc1JvbGVMaW5rID0gT2JqZWN0LmVudHJpZXMobm9kZS5hdHRyaWJ1dGVzKS5maW5kKFxuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuICAgICAgICAgIChba2V5LCB2YWx1ZV0pID0+XG4gICAgICAgICAgICB2YWx1ZSAmJlxuICAgICAgICAgICAgdmFsdWUubmFtZSAmJlxuICAgICAgICAgICAgdmFsdWUubmFtZS5uYW1lID09PSAncm9sZScgJiZcbiAgICAgICAgICAgIHZhbHVlLnZhbHVlICYmXG4gICAgICAgICAgICAvLyAkRmxvd0ZpeE1lW2luY29tcGF0aWJsZS11c2VdXG4gICAgICAgICAgICB2YWx1ZS52YWx1ZS52YWx1ZSA9PT0gJ2xpbmsnLFxuICAgICAgICApO1xuXG4gICAgICAgIGlmIChpc1JvbGVMaW5rKSB7XG4gICAgICAgICAgY29udGV4dC5yZXBvcnQoXG4gICAgICAgICAgICBub2RlLFxuICAgICAgICAgICAgYCR7aW1wb3J0ZWROYW1lfSBDb21wb25lbnRzIHdpdGggcm9sZS1saW5rIGFyZSBkaXNhbGxvd2VkIGluIFBpbmJvYXJkLiBQbGVhc2UgdXNlIGFwcC9jb21tb24vcmVhY3QvdWkvJHtpbXBvcnRlZE5hbWV9TGluay5qcyBpbnN0ZWFkLmAsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICB9O1xuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgcnVsZTtcbiIsIi8qKlxuICogQGZpbGVvdmVydmlldyBQcmV2ZW50IHVzaW5nIGlubGluZSBzdHlsZXMgb24gZGl2cyB0aGF0IGNvdWxkIGJlIGdlc3RhbHQgQm94IHByb3BzXG4gKiBAYXV0aG9yIEplbm55IFN0ZWVsZSA8anN0ZWVsZUBwaW50ZXJlc3QuY29tPlxuICpcbiAqIFdlIHByZWZlciB1c2luZyBnZXN0YWx0IEJveCBvdmVyIGRpdnMgd2l0aCBpbmxpbmUgc3R5bGluZyB0byBnZXQgc3R5bGluZyBjb25zaXN0ZW5jeVxuICogYWNyb3NzIHRoZSBhcHAgYW5kIHNoYXJlZCBjc3MgY2xhc3Nlcy4gVGhpcyBsaW50ZXIgY2hlY2tzIGZvciB1c2FnZSBvZiBpbmxpbmUgc3R5bGluZ1xuICogdGhhdCBpcyBhdmFpbGFibGUgYXMgQm94IHByb3BzLlxuICovXG5cbi8vIEBmbG93IHN0cmljdFxuaW1wb3J0IHsgdmFsaWRhdGVCYWNrZ3JvdW5kQ29sb3IsIHZhbGlkYXRlQm9yZGVyLCB2YWxpZGF0ZUJvcmRlclJhZGl1cyB9IGZyb20gJy4vdmFsaWRhdG9ycy5qcyc7XG5cbmZ1bmN0aW9uIGdldElubGluZURlZmluZWRTdHlsZXMoYXR0cikge1xuICByZXR1cm4gYXR0ci52YWx1ZS5leHByZXNzaW9uLnByb3BlcnRpZXMgPyBhdHRyLnZhbHVlLmV4cHJlc3Npb24ucHJvcGVydGllcyA6IG51bGw7XG59XG5cbmZ1bmN0aW9uIGdldFZhcmlhYmxlRGVmaW5lZFN0eWxlcyhyZWYpIHtcbiAgcmV0dXJuIHJlZi5yZXNvbHZlZCAmJlxuICAgIHJlZi5yZXNvbHZlZC5kZWZzICYmXG4gICAgcmVmLnJlc29sdmVkLmRlZnNbMF0gJiZcbiAgICByZWYucmVzb2x2ZWQuZGVmc1swXS5ub2RlICYmXG4gICAgcmVmLnJlc29sdmVkLmRlZnNbMF0ubm9kZS5pbml0ICYmXG4gICAgcmVmLnJlc29sdmVkLmRlZnNbMF0ubm9kZS5pbml0LnByb3BlcnRpZXNcbiAgICA/IHJlZi5yZXNvbHZlZC5kZWZzWzBdLm5vZGUuaW5pdC5wcm9wZXJ0aWVzXG4gICAgOiBudWxsO1xufVxuXG5jb25zdCBydWxlID0ge1xuICBtZXRhOiB7XG4gICAgZG9jczoge1xuICAgICAgZGVzY3JpcHRpb246ICdsaW50ZXIgY2hlY2tzIGZvciB1c2FnZSBvZiBpbmxpbmUgc3R5bGluZyB0aGF0IGlzIGF2YWlsYWJsZSBhcyBCb3ggcHJvcHMnLFxuICAgICAgcmVjb21tZW5kZWQ6IGZhbHNlLFxuICAgIH0sXG4gICAgc2NoZW1hOiBbXG4gICAgICB7XG4gICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICBhZGRpdGlvbmFsUHJvcGVydGllczogZmFsc2UsXG4gICAgICB9LFxuICAgIF0sXG4gIH0sXG5cbiAgLy8gJEZsb3dGaXhNZVt1bmNsZWFyLXR5cGVdXG4gIGNyZWF0ZShjb250ZXh0OiBPYmplY3QpOiBPYmplY3Qge1xuICAgIGZ1bmN0aW9uIG1hdGNoS2V5RXJyb3JzKG1hdGNoZWRFcnJvcnMsIGtleSkge1xuICAgICAgbGV0IG1lc3NhZ2UgPSAnJztcbiAgICAgIHN3aXRjaCAoa2V5Lm5hbWUpIHtcbiAgICAgICAgY2FzZSAnYmFja2dyb3VuZENvbG9yJzpcbiAgICAgICAgICBtZXNzYWdlID0gdmFsaWRhdGVCYWNrZ3JvdW5kQ29sb3Ioa2V5LnZhbHVlKTtcbiAgICAgICAgICBpZiAobWVzc2FnZSkge1xuICAgICAgICAgICAgbWF0Y2hlZEVycm9ycy5wdXNoKG1lc3NhZ2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnYm9yZGVyUmFkaXVzJzpcbiAgICAgICAgICBtZXNzYWdlID0gdmFsaWRhdGVCb3JkZXJSYWRpdXMoa2V5LnZhbHVlKTtcbiAgICAgICAgICBpZiAobWVzc2FnZSkge1xuICAgICAgICAgICAgbWF0Y2hlZEVycm9ycy5wdXNoKG1lc3NhZ2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnYm9yZGVyJzpcbiAgICAgICAgICBtZXNzYWdlID0gdmFsaWRhdGVCb3JkZXIoa2V5LnZhbHVlKTtcbiAgICAgICAgICBpZiAobWVzc2FnZSkge1xuICAgICAgICAgICAgbWF0Y2hlZEVycm9ycy5wdXNoKG1lc3NhZ2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIHJldHVybiBtYXRjaGVkRXJyb3JzLmZpbHRlcigoeCkgPT4geCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIEpTWE9wZW5pbmdFbGVtZW50KG5vZGUpIHtcbiAgICAgICAgaWYgKG5vZGUubmFtZS5uYW1lICE9PSAnZGl2Jykge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBPYmplY3Qua2V5cyhub2RlLmF0dHJpYnV0ZXMpLnNvbWUoKGF0dHJLZXkpID0+IHtcbiAgICAgICAgICBjb25zdCBhdHRyID0gbm9kZS5hdHRyaWJ1dGVzW2F0dHJLZXldO1xuICAgICAgICAgIGNvbnN0IG1hdGNoZWQgPSBhdHRyLm5hbWUgJiYgYXR0ci5uYW1lLm5hbWUgPT09ICdzdHlsZSc7XG4gICAgICAgICAgaWYgKG1hdGNoZWQpIHtcbiAgICAgICAgICAgIC8vIElmIHdlIGhhdmUgc3R5bGUgcHJvcGVydGllcyBoZXJlLCB0aGlzIGlzIGFuIG9iamVjdCBkZWNsYXJlZCBpbmxpbmVcbiAgICAgICAgICAgIGxldCBzdHlsZVByb3BlcnRpZXMgPSBnZXRJbmxpbmVEZWZpbmVkU3R5bGVzKGF0dHIpO1xuICAgICAgICAgICAgLy8gTm90IGRlY2xhcmVkIGlubGluZT8gQ2hlY2sgdG8gc2VlIGlmIHRoZXJlJ3MgYSB2YXJpYWJsZSBtYXRjaGluZyB0aGUgbmFtZSBkZWZpbmVkXG4gICAgICAgICAgICBpZiAoIXN0eWxlUHJvcGVydGllcyAmJiBhdHRyLnZhbHVlLmV4cHJlc3Npb24ubmFtZSkge1xuICAgICAgICAgICAgICBjb25zdCBzY29wZSA9IGNvbnRleHQuZ2V0U2NvcGUobm9kZSk7XG4gICAgICAgICAgICAgIC8vIExvb2sgaW4gbG9jYWwgc2NvcGUgZm9yIHZhcmlhYmxlIHJlZmVyZW5jZVxuICAgICAgICAgICAgICBjb25zdCByZWYgPSBzY29wZS5yZWZlcmVuY2VzLmZpbmQoXG4gICAgICAgICAgICAgICAgKHJlZmVyZW5jZSkgPT4gcmVmZXJlbmNlLmlkZW50aWZpZXIubmFtZSA9PT0gYXR0ci52YWx1ZS5leHByZXNzaW9uLm5hbWUsXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIGlmIChyZWYpIHtcbiAgICAgICAgICAgICAgICBzdHlsZVByb3BlcnRpZXMgPSBnZXRWYXJpYWJsZURlZmluZWRTdHlsZXMocmVmKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHN0eWxlUHJvcGVydGllcykge1xuICAgICAgICAgICAgICBjb25zdCBlcnJvck1lc3NhZ2VzID0gc3R5bGVQcm9wZXJ0aWVzXG4gICAgICAgICAgICAgICAgLm1hcCgoeyBrZXksIHR5cGUsIHZhbHVlIH0pID0+IHtcbiAgICAgICAgICAgICAgICAgIC8vIEhhbmRsZSB0aGluZ3MgbGlrZSBzcHJlYWQgcHJvcHNcbiAgICAgICAgICAgICAgICAgIGlmICgha2V5IHx8IHZhbHVlLnZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgbmFtZTogdHlwZSwgdmFsdWU6IG51bGwgfTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIHJldHVybiB7IG5hbWU6IGtleS5uYW1lLCB2YWx1ZTogdmFsdWUudmFsdWUgfTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5yZWR1Y2UobWF0Y2hLZXlFcnJvcnMsIFtdKTtcbiAgICAgICAgICAgICAgaWYgKGVycm9yTWVzc2FnZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgY29udGV4dC5yZXBvcnQoXG4gICAgICAgICAgICAgICAgICBhdHRyLFxuICAgICAgICAgICAgICAgICAgYFJlcGxhY2UgdGhpcyBkaXYgd2l0aCBhIGdlc3RhbHQgQm94LiBodHRwczovL2dlc3RhbHQubmV0bGlmeS5hcHAvQm94XFxuJHtlcnJvck1lc3NhZ2VzLmpvaW4oXG4gICAgICAgICAgICAgICAgICAgICdcXG4nLFxuICAgICAgICAgICAgICAgICAgKX1gLFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIG1hdGNoZWQ7XG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICB9O1xuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgcnVsZTtcbiIsIi8vIEBmbG93IHN0cmljdFxuaW1wb3J0IGJ1dHRvbkljb25SZXN0cmljdGlvbnMgZnJvbSAnLi9idXR0b24taWNvbi1yZXN0cmljdGlvbnMuanMnO1xuaW1wb3J0IG5vQm94TWFyZ2lubGVmdE1hcmdpbnJpZ2h0IGZyb20gJy4vbm8tYm94LW1hcmdpbmxlZnQtbWFyZ2lucmlnaHQuanMnO1xuaW1wb3J0IG5vRGFuZ2Vyb3VzU3R5bGVEdXBsaWNhdGVzIGZyb20gJy4vbm8tZGFuZ2Vyb3VzLXN0eWxlLWR1cGxpY2F0ZXMuanMnO1xuaW1wb3J0IG5vTWVkaXVtRm9ybWZpZWxkcyBmcm9tICcuL25vLW1lZGl1bS1mb3JtZmllbGRzLmpzJztcbmltcG9ydCBub1JvbGVMaW5rQ29tcG9uZW50cyBmcm9tICcuL25vLXJvbGUtbGluay1jb21wb25lbnRzLmpzJztcbmltcG9ydCBwcmVmZXJCb3ggZnJvbSAnLi9wcmVmZXItYm94LmpzJztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHJ1bGVzOiB7XG4gICAgJ2J1dHRvbi1pY29uLXJlc3RyaWN0aW9ucyc6IGJ1dHRvbkljb25SZXN0cmljdGlvbnMsXG4gICAgJ25vLWJveC1tYXJnaW5sZWZ0LW1hcmdpbnJpZ2h0Jzogbm9Cb3hNYXJnaW5sZWZ0TWFyZ2lucmlnaHQsXG4gICAgJ25vLWRhbmdlcm91cy1zdHlsZS1kdXBsaWNhdGVzJzogbm9EYW5nZXJvdXNTdHlsZUR1cGxpY2F0ZXMsXG4gICAgJ25vLW1lZGl1bS1mb3JtZmllbGRzJzogbm9NZWRpdW1Gb3JtZmllbGRzLFxuICAgICduby1yb2xlLWxpbmstY29tcG9uZW50cyc6IG5vUm9sZUxpbmtDb21wb25lbnRzLFxuICAgICdwcmVmZXItYm94JzogcHJlZmVyQm94LFxuICB9LFxufTtcbiJdLCJuYW1lcyI6WyJydWxlIiwibWV0YSIsImRvY3MiLCJkZXNjcmlwdGlvbiIsInJlY29tbWVuZGVkIiwic2NoZW1hIiwidHlwZSIsImFkZGl0aW9uYWxQcm9wZXJ0aWVzIiwiY3JlYXRlIiwiY29udGV4dCIsImltcG9ydGVkQ29tcG9uZW50IiwibG9jYWxJZGVudGlmaWVyTmFtZSIsImNvbXBvbmVudE5hbWUiLCJnZXRBdHRyaWJ1dGUiLCJub2RlIiwiYXR0cmlidXRlTmFtZSIsIk9iamVjdCIsImVudHJpZXMiLCJhdHRyaWJ1dGVzIiwiZmluZCIsImtleSIsInZhbHVlIiwibmFtZSIsImdldFZhbHVlIiwiYXR0cmlidXRlIiwiSW1wb3J0RGVjbGFyYXRpb24iLCJkZWNsIiwic291cmNlIiwic3BlY2lmaWVycyIsInNvbWUiLCJpc1ZhbGlkQ29tcG9uZW50IiwiaW1wb3J0ZWQiLCJsb2NhbCIsIkpTWE9wZW5pbmdFbGVtZW50IiwiaWNvbkF0dHJpYnV0ZSIsImlzQ29ycmVjdEljb24iLCJjb2xvckF0dHJpYnV0ZSIsImlzQ29ycmVjdENvbG9yIiwic2l6ZUF0dHJpYnV0ZSIsImlzQ29ycmVjdFNpemUiLCJyZXBvcnQiLCJkaXNhbGxvd2VkUHJvcHMiLCJlcnJvck1lc3NhZ2UiLCJpc01hcmdpbkxlZnRSaWdodEF0dHJpYnV0ZSIsImluY2x1ZGVzIiwiZ2VuQm9pbnRMb29rdXAiLCJwcm9wTmFtZSIsInN0YXJ0IiwiZW5kIiwibG9va3VwTWFwIiwiaSIsInB4IiwibXNnIiwicmVjb21tZW5kZWRQcm9wIiwicm91bmRpbmdMb29rdXAiLCJ2YWxpZGF0ZUJhY2tncm91bmRDb2xvciIsInVuZGVmaW5lZCIsInZhbGlkYXRlQm9yZGVyUmFkaXVzIiwidmFsaWRhdGVCb3JkZXIiLCJjbGVhblZhbHVlIiwidG9Mb3dlckNhc2UiLCJzcGxpdCIsInNvcnQiLCJqb2luIiwidmFsaWRhdGVCb3hTaGFkb3ciLCJyZ2JhUmVnZXgiLCJSZWdFeHAiLCJyZ2JhUG9ydGlvbiIsIm1hdGNoIiwiY2xlYW5SZ2JhUG9ydGlvbiIsImxlbmd0aCIsInJlcGxhY2UiLCJwaXhlbFBvcnRpb24iLCJjbGVhblBpeGVsUG9ydGlvbiIsInJnYmFNYXRjaCIsInBpeGVsc01hdGNoIiwiZ2V0SW5saW5lRGVmaW5lZFN0eWxlcyIsImF0dHIiLCJleHByZXNzaW9uIiwicHJvcGVydGllcyIsImdldFZhcmlhYmxlRGVmaW5lZFN0eWxlcyIsInJlZiIsInJlc29sdmVkIiwiZGVmcyIsImluaXQiLCJnZW5PcGFjaXR5TG9va3VwIiwidmFsIiwib3ZlcmZsb3dMb29rdXAiLCJ2aXNpYmxlIiwiaGlkZGVuIiwic2Nyb2xsIiwiYXV0byIsIm9ubHlLZXlzIiwiaXRlbXMiLCJ1bmlxdWVJdGVtcyIsImltcG9ydGVkQm94Iiwib3B0aW9ucyIsImluY2x1ZGVLZXkiLCJtYXJnaW5Mb29rdXAiLCJtYXJnaW5Cb3R0b21Mb29rdXAiLCJtYXJnaW5MZWZ0TG9va3VwIiwibWFyZ2luUmlnaHRMb29rdXAiLCJtYXJnaW5Ub3BMb29rdXAiLCJvcGFjaXR5TG9va3VwIiwicGFkZGluZ0xvb2t1cCIsIm1hdGNoS2V5RXJyb3JzIiwibWF0Y2hlZEVycm9ycyIsIm1lc3NhZ2UiLCJwdXNoIiwiZmlsdGVyIiwieCIsImlzQm94Iiwia2V5cyIsImF0dHJLZXkiLCJtYXRjaGVkIiwic3R5bGVQcm9wZXJ0aWVzIiwic2NvcGUiLCJnZXRTY29wZSIsInJlZmVyZW5jZXMiLCJyZWZlcmVuY2UiLCJpZGVudGlmaWVyIiwiZXJyb3JNZXNzYWdlcyIsIm1hcCIsInJlZHVjZSIsImNvbXBvbmVudE5hbWVzIiwiaW1wb3J0ZWROYW1lIiwiaXNSb2xlTGluayIsIm1vZHVsZSIsImV4cG9ydHMiLCJydWxlcyIsImJ1dHRvbkljb25SZXN0cmljdGlvbnMiLCJub0JveE1hcmdpbmxlZnRNYXJnaW5yaWdodCIsIm5vRGFuZ2Vyb3VzU3R5bGVEdXBsaWNhdGVzIiwibm9NZWRpdW1Gb3JtZmllbGRzIiwibm9Sb2xlTGlua0NvbXBvbmVudHMiLCJwcmVmZXJCb3giXSwibWFwcGluZ3MiOiI7Ozs7O0VBQUE7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFHQSxNQUFNQSxNQUFJLEdBQUc7RUFDWEMsRUFBQUEsSUFBSSxFQUFFO0VBQ0pDLElBQUFBLElBQUksRUFBRTtFQUNKQyxNQUFBQSxXQUFXLEVBQUUsMEJBRFQ7RUFFSkMsTUFBQUEsV0FBVyxFQUFFO0VBRlQsS0FERjtFQUtKQyxJQUFBQSxNQUFNLEVBQUUsQ0FDTjtFQUNFQyxNQUFBQSxJQUFJLEVBQUUsUUFEUjtFQUVFQyxNQUFBQSxvQkFBb0IsRUFBRTtFQUZ4QixLQURNO0VBTEosR0FESzs7RUFjWDtFQUNBQyxFQUFBQSxNQUFNLENBQUNDLE9BQUQsRUFBMEI7RUFDOUIsUUFBSUMsaUJBQWlCLEdBQUcsS0FBeEI7RUFDQSxRQUFJQyxtQkFBSjtFQUNBLFVBQU1DLGFBQWEsR0FBRyxRQUF0Qjs7RUFFQSxhQUFTQyxZQUFULENBQXNCQyxJQUF0QixFQUE0QkMsYUFBNUIsRUFBMkM7RUFDekMsYUFBT0MsTUFBTSxDQUFDQyxPQUFQLENBQWVILElBQUksQ0FBQ0ksVUFBcEIsRUFBZ0NDLElBQWhDO0VBRUwsT0FBQyxDQUFDQyxHQUFELEVBQU1DLEtBQU4sQ0FB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
