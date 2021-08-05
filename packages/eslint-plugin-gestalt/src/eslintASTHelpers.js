// @flow strict

// $FlowFixMe[unclear-type]
type GenericType = Object;

/* =================  HELPERS =================
 */

/* ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓  getPropertiesFromVariable ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
This function returns the properties  of a variable (variableNode).
Examples:
const a = { key: "value"} >> returns nodes containing information (key: "value")
*/
type GetPropertiesFromVariable = ({|
  variableNode: GenericType,
|}) => GenericType;

export const getPropertiesFromVariable: GetPropertiesFromVariable = ({ variableNode }) =>
  variableNode?.resolved?.defs[0]?.node?.init?.properties;

/* ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓  retrieveKeyValuesFromVariable ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
This function returns an array of objects containing the data for each key/value in the variable object.
Examples:
const a = { color: "red"} >> returns [{ key: "color", value: "red", isValueTypeLiteral: true }]
const a = { width: 20} >> returns [{ key: "width", value: 20, isValueTypeLiteral: true }]
const a = { onClick: () => {}} >> returns [{ key: "onClick", value: "() => {}", isValueTypeLiteral: false }]
*/

type KeyValuesType = {|
  key: string,
  value: string | number,
  isValueTypeLiteral: boolean,
|};

type RetrieveKeyValuesFromVariableType = ({|
  context: GenericType,
  variableNode: GenericType,
|}) => $ReadOnlyArray<?KeyValuesType>;

export const retrieveKeyValuesFromVariable: RetrieveKeyValuesFromVariableType = ({
  context,
  variableNode,
}) => {
  const properties = getPropertiesFromVariable({ variableNode });
  return properties
    ? properties.map((prop) => {
        const isLiteral = prop.value.type === 'Literal';
        return {
          key: prop.key.name,
          value: isLiteral ? prop.value.value : context.getSourceCode().getText(prop.value),
          isValueTypeLiteral: isLiteral,
        };
      })
    : [];
};

/* ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓  buildValueString ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
This function returns a string of literal value formatted as a prop value.
Examples:
{ key: "color", value: "red", isValueTypeLiteral: true } >> "red"
{ key: "width", value: 20, isValueTypeLiteral: true } >> "{20}"
*/

type BuildLiteralValueStringType = ({|
  value: string | number,
|}) => string;

export const buildLiteralValueString: BuildLiteralValueStringType = ({ value }) =>
  typeof value === 'number' ? `{${value}}` : `"${value}"`;

/* ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓  buildPropsFromKeyValues ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
This function returns key/values formatted as component props.
Examples:
{ key: "color", value: "red", isValueTypeLiteral: true } >> color="red"
{ key: "width", value: 20, isValueTypeLiteral: true } >> width={20}
{ key: "onClick", value: "() => {}", isValueTypeLiteral: false } >> onClick={() => {}}
*/

type BuildPropsFromKeyValuesType = ({|
  keyValues: GenericType,
|}) => string;

export const buildPropsFromKeyValues: BuildPropsFromKeyValuesType = ({ keyValues }) => {
  const newKeyValues = [...keyValues];
  const stringProps = newKeyValues
    .sort((a, b) => {
      if (a.key < b.key) return -1;
      if (a.key > b.key) return 1;
      return 0;
    })
    .map(
      (pair) =>
        `${pair.key}=${
          pair.isValueTypeLiteral
            ? buildLiteralValueString({ value: pair.value })
            : `{${pair.value}}`
        }`,
    )
    .join(' ');

  return stringProps;
};

/* ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓  buildPropsFromKeyValuesVariable ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
This function returns key/values formatted as component props.
Examples:
[{ key: "color", value: "red", isValueTypeLiteral: true }, { key: "width", value: 20, isValueTypeLiteral: true }] >> 'color="red" width={20}'
*/
type BuildPropsFromKeyValuesVariableType = ({|
  context: GenericType,
  variableNode: GenericType,
|}) => string;

export const buildPropsFromKeyValuesVariable: BuildPropsFromKeyValuesVariableType = ({
  context,
  variableNode,
}) => {
  const keyValues = retrieveKeyValuesFromVariable({
    context,
    variableNode,
  });

  return buildPropsFromKeyValues({ keyValues });
};

/* ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓  getComponenFromAttribute ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
This function returns the component containing the attribute's node (nodeAttribute).
Examples:
<div {...props} /> >> returns div node for the spread props attribute
*/
type GetComponentFromAttributeType = ({| nodeAttribute: GenericType |}) => GenericType;

export const getComponenFromAttribute: GetComponentFromAttributeType = ({ nodeAttribute }) =>
  nodeAttribute.parent;

/* ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓  getComponentNameFromAttribute ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
This function returns the component's name containing the attribute's node (nodeAttribute).
Examples:
<div {...props} /> >> returns div for the spread props attribute
*/
type GetVariableNodeInScopeFromNameType = ({|
  context: GenericType,
  nodeElement: GenericType,
  name: string,
|}) => GenericType;

export const getVariableNodeInScopeFromName: GetVariableNodeInScopeFromNameType = ({
  context,
  nodeElement,
  name,
}) => {
  const scope = context.getScope(nodeElement);
  // Look in local scope for variable reference
  const variableNode = scope.references.find((reference) => reference.identifier.name === name);
  return variableNode;
};

/* ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓  getComponentNameFromAttribute ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
This function returns the component's name containing the attribute's node (nodeAttribute).
Examples:
<div {...props} /> >> returns div for the spread props attribute
*/
type GetComponentNameFromAttributeType = ({| nodeAttribute: GenericType |}) => string;

export const getComponentNameFromAttribute: GetComponentNameFromAttributeType = ({
  nodeAttribute,
}) => nodeAttribute.parent.name.name;

/* ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓  hasImport ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
This function checks is a given node (importNode) contains a given import path (path), and returns true if so.
Examples:
import { Box } from 'gestalt' >> path="gestalt"
import { Box } from 'app/box' >> path="app/box"
*/
type HasImportType = ({| importNode: GenericType, path: string |}) => boolean;

export const hasImport: HasImportType = ({ importNode, path }) => {
  const importName = importNode.source ? importNode.source.value : null;
  return importName === path;
};

/* ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓  updateGestaltImportFixer ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
This function returns an array of arrays containing the named imports ([imported name, local or aliased name]) from a node (importNode).
*/
type GetNamedImportsComponentsType = ({| importNode: GenericType |}) => $ReadOnlyArray<
  $ReadOnlyArray<string>,
>;

export const getNamedImportsComponents: GetNamedImportsComponentsType = ({ importNode }) => {
  const namedImports = importNode.specifiers.map((node) => [node.imported.name, node?.local?.name]);
  return namedImports;
};

/* ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓  isTag ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
This function checks is a given node (elementNode) contains a given tag (tagName), and returns true if so.
Examples:
<div /> >> if tagName="div" returns true
<div /> >> if tagName="button" returns false
*/
type IsTagType = ({| elementNode: GenericType, tagName: string |}) => boolean;

export const isTag: IsTagType = ({ elementNode, tagName }) => elementNode?.name?.name === tagName;

/* ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓  hasLonelyAttribute ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
This function checks is a given tag (tagName) in a node (elementNode) contains only a single attribute (attribute), and returns true if so.
Examples:
<div ref={} /> >> if attribute="ref" returns true
<div ref={} style={} /> >> if attribute="ref" returns false
*/
type HasLonelyAttributeType = ({|
  elementNode: GenericType,
  tagName: string,
  attribute: string,
|}) => boolean;

export const hasLonelyAttribute: HasLonelyAttributeType = ({ elementNode, tagName, attribute }) => {
  return (
    isTag({ elementNode, tagName }) &&
    elementNode.attributes.length === 1 &&
    elementNode.attributes[0].name &&
    elementNode.attributes[0].name.name === attribute
  );
};

/* =================  FIXERS =================
Fixers are the functions executed in the fix method inside context.report
*/

/* ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓  updateGestaltImportFixer ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
This function updates the imports to include the new Gestalt component if needed. If there's no previous Gestalt import, it's preprended at the top of the file. It mantains aliased imports.
*/
type InsertGestaltImportTopFileFixerType = ({|
  context: GenericType,
  fixer: GenericType,
  gestaltImportNode: GenericType,
  gestaltName: string,
  programNode: GenericType,
|}) => GenericType;

export const updateGestaltImportFixer: InsertGestaltImportTopFileFixerType = ({
  fixer,
  gestaltImportNode,
  gestaltName,
  programNode,
}) => {
  // default fix: add new Gestalt import on top of the file
  let importFixers = fixer.insertTextBefore(
    programNode,
    `import { ${gestaltName} } from 'gestalt';\n`,
  );
  // if Gestalt is already imported: add new component if missing
  if (gestaltImportNode) {
    const namedImportsComponents = getNamedImportsComponents({
      importNode: gestaltImportNode,
    });

    const importsComponentsArray = [...namedImportsComponents];
    if (!namedImportsComponents.map((cmp) => cmp[0]).includes(gestaltName)) {
      importsComponentsArray.push([gestaltName, gestaltName]);
    }

    const sortedImports = importsComponentsArray
      .map((cmp) => {
        if (cmp[0] === cmp[1]) {
          // import and local names match
          return cmp[0];
        }
        // import and local names don't match, keep alias
        return `${cmp[0]} as ${cmp[1]}`;
      })
      .sort()
      .join(', ');

    importFixers = fixer.replaceText(
      gestaltImportNode,
      `import { ${sortedImports} } from 'gestalt';`,
    );
  }
  return importFixers;
};

/* ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓  renameTagFixer ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
This function renames a given tag name inside a node: `tagName` is replaced with `gestaltName`
Examples:
<div></div> >> if tagName="div" & gestaltName="Box" returns <Box></Box>
<div /> >> if tagName="div" & gestaltName="Box" returns true <Box />
*/
type RenameTagFixerType = ({|
  context: GenericType,
  elementNode: GenericType,
  fixer: GenericType,
  gestaltName: string,
  tagName: string,
|}) => GenericType;

export const renameTagFixer: RenameTagFixerType = ({
  context,
  elementNode,
  fixer,
  gestaltName,
  tagName,
}) => {
  return [elementNode.openingElement, elementNode.closingElement]
    .map((node) =>
      node
        ? fixer.replaceText(
            node,
            context.getSourceCode().getText(node).replace(tagName, gestaltName),
          )
        : false,
    )
    .filter((fix) => fix);
};
