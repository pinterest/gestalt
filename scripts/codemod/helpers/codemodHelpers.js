const isNotGestaltImport = ({ decl }) => decl.source.value !== 'gestalt';
const matchSpecifierImportedName = ({ decl, importedName }) =>
  decl.specifiers.find((node) => node.imported.name === importedName);

export { isNotGestaltImport, matchSpecifierImportedName };
