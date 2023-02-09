import * as t from "@babel/types";
import chalk from "chalk";
import { MigrationReportFormatter } from "./formatters/types";

export enum MigrationReportItemSeverity {
  info = "info",
  warn = "warn",
  error = "error",
}

enum MigrationReportItemType {
  typeParameterWithVariance = "typeParameterWithVariance",
  objectPropertyWithInternalName = "objectPropertyWithInternalName",
  objectPropertyWithMinusVariance = "objectPropertyWithMinusVariance",
  unsupportedTypeCast = "unsupportedTypeCast",
  usedExistentialAnyUtility = "usedExistentialAnyUtility",
  usedFlowAnyObject = "usedFlowAnyObject",
  usedFlowAnyFunction = "usedFlowAnyFunction",
  usedFlowSubtype = "usedFlowSubtype",
  error = "error",
  unknownFlowType = "unknownFlowType",
  unescapedGreaterThan = "unescapedGreaterThan",
  anyFlowType = "anyFlowType",
  complexFlowType = "complexFlowType",
  importWithExtension = "importWithExtension",
  nonLiteralFlowType = "nonLiteralFlowType",
  untypedStateInitialization = "untypedStateInitialization",
  flowFailToParse = "flowFailToParse",
  foundNonFlowFile = "foundNonFlowFile",
  foundDeclarationFile = "foundDeclarationFile",
  usedJSXSpread = "usedJSXSpread",
  unsupportedComponentProp = "unsupportedComponentProp",
  maybeNeedTypes = "maybeNeedTypes",
  usedWindowAsAnyType = "usedWindowAsAnyType",
  asyncFunctionReturnType = "asyncFunctionReturnType",
  requiredPropInOptionalAssignment = "requiredPropInOptionalAssignment",
  invalidAppProp = "invalidAppProp",
  invalidLibraryProp = "invalidLibraryProp",
  invalidHtmlProp = "invalidHtmlProp",
  invalidArrayPatternType = "invalidArrayPatternType",
  opaqueSuperType = "opaqueSuperType",
  usedObjMap = "usedObjMap",
  foundNoFlowAnnotation = "foundNoFlowAnnotation",
  untypedReduce = "untypedReduce",
  unhandledFlowInputNode = "unhandledFlowInputNode",
  autoImport = "autoImport",
  typeExports = "typeExports",
  migrateSnapFile = "migrateSnapFile",
  disableFlowCheck = "disableFlowCheck",
}

/**
 * A location that also includes the file path.
 */
export interface MigrationReportItem extends t.SourceLocation {
  type: string;
  filePath: string;
  message: string;
  severity: MigrationReportItemSeverity;
}

/**
 * Collects information during the migration and generates a report at the very end. We will have
 * a separate instance for each worker and we’ll merge them together at the end.
 */
class MigrationReporter {
  static mergeReports(reports: Array<MigrationReport>): MigrationReport {
    const lineCount = reports.reduce((acc, report) => {
      return acc + report.lineCount;
    }, 0);

    const totals = reports.reduce(
      (acc, report) => {
        acc.info += report.totals.info;
        acc.warn += report.totals.warn;
        acc.error += report.totals.error;
        return acc;
      },
      {
        info: 0,
        warn: 0,
        error: 0,
      }
    );

    return {
      migrationReportItems: Array.prototype.concat.call(
        [],
        ...reports.map(({ migrationReportItems }) => migrationReportItems)
      ),
      lineCount,
      totals,
    };
  }

  static async logReport(
    report: MigrationReport,
    ...formatters: MigrationReportFormatter[]
  ) {
    for (const formatter of formatters) {
      // eslint-disable-next-line no-await-in-loop
      await formatter(report);
    }
  }

  private readonly migrationReportItems: Array<MigrationReportItem> = [];

  private lineCount = 0;

  private totals: Record<MigrationReportItemSeverity, number> = {
    info: 0,
    warn: 0,
    error: 0,
  };

  public reportLineCount(amount: number) {
    this.lineCount += amount;
  }

  public log(
    type: string,
    severity: MigrationReportItemSeverity,
    filePath: string,
    { start, end }: t.SourceLocation,
    message: string
  ) {
    this.migrationReportItems.push({
      type,
      severity,
      start,
      end,
      message,
      filePath,
    });
    this.totals[severity] += 1;
  }

  typeParameterWithVariance(filePath: string, location: t.SourceLocation) {
    this.log(
      MigrationReportItemType.typeParameterWithVariance,
      MigrationReportItemSeverity.info,
      filePath,
      location,
      "Encountered a parameter to a type with variance (Type<+V>). This type expansion has no TypeScript equivalent and will be dropped."
    );
  }

  objectPropertyWithInternalName(filePath: string, location: t.SourceLocation) {
    this.log(
      MigrationReportItemType.objectPropertyWithInternalName,
      MigrationReportItemSeverity.warn,
      filePath,
      location,
      "Encountered an object property using the Flow internal naming format ({ $Key: string }). This pattern is not supported in TypeScript and should be updated."
    );
  }

  objectPropertyWithMinusVariance(
    filePath: string,
    location: t.SourceLocation
  ) {
    this.log(
      MigrationReportItemType.objectPropertyWithMinusVariance,
      MigrationReportItemSeverity.warn,
      filePath,
      location,
      "Encountered an object property using Flow type variance ({ key: -string }) that cannot be cleanly converted."
    );
  }

  // Only used for debugging
  unsupportedTypeCast(filePath: string, location: t.SourceLocation) {
    this.log(
      MigrationReportItemType.unsupportedTypeCast,
      MigrationReportItemSeverity.info,
      filePath,
      location,
      "Encountered an unsupported type cast"
    );
  }

  usedExistentialAny(filePath: string, location: t.SourceLocation) {
    this.log(
      MigrationReportItemType.usedExistentialAnyUtility,
      MigrationReportItemSeverity.info,
      filePath,
      location,
      "The existential type (*) in Flow is unsound and typechecks as `any`. This will become an `any` in TypeScript unless given a more specific type."
    );
  }

  usedFlowAnyObject(filePath: string, location: t.SourceLocation) {
    this.log(
      MigrationReportItemType.usedFlowAnyObject,
      MigrationReportItemSeverity.info,
      filePath,
      location,
      "The Object type in Flow is deprecated and typechecks as `any`. This will become an `any` in TypeScript unless given a more specific type."
    );
  }

  usedFlowAnyFunction(filePath: string, location: t.SourceLocation) {
    this.log(
      MigrationReportItemType.usedFlowAnyFunction,
      MigrationReportItemSeverity.info,
      filePath,
      location,
      "The Function type in Flow is deprecated and typechecks as `any`. This will become an `any` in TypeScript unless given a more specific type."
    );
  }

  usedFlowSubtype(filePath: string, location: t.SourceLocation) {
    this.log(
      MigrationReportItemType.usedFlowSubtype,
      MigrationReportItemSeverity.info,
      filePath,
      location,
      "The $Subtype and $Supertype utilities in Flow are deprecated and typecheck as `any`. This will become an `any` in TypeScript unless given a more specific type."
    );
  }

  usedJSXSpread(
    filePath: string,
    location: t.SourceLocation | null | undefined
  ) {
    this.log(
      MigrationReportItemType.usedJSXSpread,
      MigrationReportItemSeverity.info,
      filePath,
      location ?? {
        start: { column: 0, line: 0 },
        end: { column: 0, line: 0 },
      },
      `Extra props were spread onto another component. Make sure the component props reflect the combined types of both components.`
    );
  }

  unescapedGreaterThan(filePath: string, location: t.SourceLocation) {
    this.log(
      MigrationReportItemType.unescapedGreaterThan,
      MigrationReportItemSeverity.info,
      filePath,
      location,
      `Encountered an unescaped '>' inside of JSX tags. This will be escaped by the codemod, to avoid a syntax error in TypeScript.`
    );
  }

  error(filePath: string, error: unknown) {
    const message =
      error instanceof Error
        ? `An error occurred ${error.message} \n ${error.stack}`
        : `An error occurred: ${String(error)}`;
    this.log(
      MigrationReportItemType.error,
      MigrationReportItemSeverity.error,
      filePath,
      { start: { column: 0, line: 0 }, end: { column: 0, line: 0 } },
      message
    );
  }

  unknownFlowType(filePath: string, location: t.SourceLocation) {
    this.log(
      MigrationReportItemType.unknownFlowType,
      MigrationReportItemSeverity.info,
      filePath,
      location,
      "Flow reported an unknown type as a parameter for a function. The codemod will leave this parameter as an implicitly typed parameter, but it may produce an error in TypeScript."
    );
  }

  anyFlowType(filePath: string, location: t.SourceLocation) {
    this.log(
      MigrationReportItemType.anyFlowType,
      MigrationReportItemSeverity.info,
      filePath,
      location,
      "Flow reported an implicit any type as a parameter for a function. The codemod will leave this parameter as an implicitly typed parameter, but it may produce an error in TypeScript."
    );
  }

  complexFlowType(filePath: string, location: t.SourceLocation, type: string) {
    this.log(
      MigrationReportItemType.complexFlowType,
      MigrationReportItemSeverity.info,
      filePath,
      location,
      `Flow reported a complex type (${chalk.dim(
        `${type.substring(0, 100)}...`
      )}) as a parameter for a function. The codemod will leave this parameter as implicitly typed, but it may produce an error in TypeScript.`
    );
  }

  importWithExtension(
    filePath: string,
    location: t.SourceLocation,
    source: string
  ) {
    this.log(
      MigrationReportItemType.importWithExtension,
      MigrationReportItemSeverity.warn,
      filePath,
      location,
      `Importing the file (${chalk.dim(
        source
      )}) which contains an explicit file extension. We can attempt to convert this with the '--dropImportExtensions' flag but results may not be perfect.`
    );
  }

  nonLiteralFlowType(filePath: string, location: t.SourceLocation) {
    this.log(
      MigrationReportItemType.nonLiteralFlowType,
      MigrationReportItemSeverity.info,
      filePath,
      location,
      `Encountered an object type (String, Number), instead of a literal type (string, number). This will likely cause a type error in TypeScript, so it will be updated during conversion.`
    );
  }

  untypedStateInitialization(filePath: string, location: t.SourceLocation) {
    this.log(
      MigrationReportItemType.untypedStateInitialization,
      MigrationReportItemSeverity.warn,
      filePath,
      location,
      `Initializing React state to null, undefined, or empty without a type means your state variable is untyped. Flow usually types this as 'empty' and does not check usage, an any will be inserted to keep the same behavior in TS.`
    );
  }

  flowFailToParse(filePath: string, location: t.SourceLocation, err: Error) {
    this.log(
      MigrationReportItemType.flowFailToParse,
      MigrationReportItemSeverity.error,
      filePath,
      location,
      `Failed to load an inferred type from Flow. Is Flow installed and working? Failed with error: ${err.message}\n${err.stack}`
    );
  }

  foundNoFlowAnnotation(filePath: string) {
    this.log(
      MigrationReportItemType.foundNoFlowAnnotation,
      MigrationReportItemSeverity.warn,
      filePath,
      { start: { column: 0, line: 0 }, end: { column: 0, line: 0 } },
      "A file annotated `@noflow` was found. The codemod will replace @noflow with @ts-nocheck, and change the extension to ts. Certain config files or scripts may not run as ts files. Ignore them with --ignore, or run the codemod with --skipNoFlow."
    );
  }

  foundNonFlowfile(filePath: string) {
    this.log(
      MigrationReportItemType.foundNonFlowFile,
      MigrationReportItemSeverity.warn,
      filePath,
      { start: { column: 0, line: 0 }, end: { column: 0, line: 0 } },
      "The codemod skipped this file because it was not annotated with `@flow`."
    );
  }

  foundDeclarationFile(filePath: string) {
    this.log(
      MigrationReportItemType.foundDeclarationFile,
      MigrationReportItemSeverity.warn,
      filePath,
      { start: { column: 0, line: 0 }, end: { column: 0, line: 0 } },
      "The codemod skipped this file because it contains Flow type declarations. Declarations are ignored since they often have issues parsing or conflict with TS declarations."
    );
  }

  unsupportedComponentProp(filePath: string, location: t.SourceLocation) {
    this.log(
      MigrationReportItemType.unsupportedComponentProp,
      MigrationReportItemSeverity.warn,
      filePath,
      location,
      `Unsupported prop supplied to this component.`
    );
  }

  maybeNeedTypes(types: string) {
    this.log(
      MigrationReportItemType.maybeNeedTypes,
      MigrationReportItemSeverity.info,
      "",
      { start: { column: 0, line: 0 }, end: { column: 0, line: 0 } },
      `You may need to add additional type defintions as part of this conversion. Try installing them by running:\`yarn add --dev ${types}\`.`
    );
  }

  usedWindowAsAnyType(filePath: string, location: t.SourceLocation) {
    this.log(
      MigrationReportItemType.usedWindowAsAnyType,
      MigrationReportItemSeverity.info,
      filePath,
      location,
      `Encountered the 'window' namespace being used as a type, which typechecks as 'any'. The codemod will attempt to convert this, but it may become an 'any' in TypeScript unless given a more specific type.`
    );
  }

  asyncFunctionReturnType(
    filePath: string,
    location: t.SourceLocation,
    idName: string
  ) {
    this.log(
      MigrationReportItemType.asyncFunctionReturnType,
      MigrationReportItemSeverity.info,
      filePath,
      location,
      `Return types of async functions must include Promise in TypeScript. Promise<${idName}> will be inserted during conversion.`
    );
  }

  requiredPropInOptionalAssignment(
    filePath: string,
    location: t.SourceLocation
  ) {
    this.log(
      MigrationReportItemType.requiredPropInOptionalAssignment,
      MigrationReportItemSeverity.warn,
      filePath,
      location,
      `The property here is marked as required in the type but is being assigned to an optional value. This will cause a type error in TypeScript.`
    );
  }

  invalidLibraryProp(
    filePath: string,
    line: number,
    migratedComponentPath: string,
    tagName: string,
    propertyName: string
  ) {
    this.log(
      MigrationReportItemType.invalidLibraryProp,
      MigrationReportItemSeverity.warn,
      filePath,
      { start: { line, column: 0 }, end: { line, column: 0 } },
      `The property ${propertyName} does not exist on component ${tagName} which was imported from ${migratedComponentPath}. Please adjust usage to match type definition.`
    );
  }

  invalidAppProp(
    filePath: string,
    line: number,
    migratedComponentPath: string,
    componentName: string,
    propertyName: string
  ) {
    this.log(
      MigrationReportItemType.invalidAppProp,
      MigrationReportItemSeverity.warn,
      filePath,
      { start: { line, column: 0 }, end: { line, column: 0 } },
      `The property ${propertyName} does not exist on local component ${componentName} which was imported from ${migratedComponentPath}, please update the type definition or usage of this component`
    );
  }

  invalidHTMLProp(
    filePath: string,
    line: number,
    tagName: string,
    propertyName: string
  ) {
    this.log(
      MigrationReportItemType.invalidHtmlProp,
      MigrationReportItemSeverity.warn,
      filePath,
      { start: { line, column: 0 }, end: { line, column: 0 } },
      `The property ${propertyName} does not exist on HTML element ${tagName}`
    );
  }

  invalidArrayPatternType(filePath: string, location: t.SourceLocation) {
    this.log(
      MigrationReportItemType.invalidArrayPatternType,
      MigrationReportItemSeverity.info,
      filePath,
      location,
      `Flow does not type check variables declared inside of an array pattern. this type will be removed by the codemod to prevent type errors in TypeScript.`
    );
  }

  opaqueSuperType(filePath: string, location: t.SourceLocation) {
    this.log(
      MigrationReportItemType.opaqueSuperType,
      MigrationReportItemSeverity.warn,
      filePath,
      location,
      `TypeScript does not support Opaque SuperTypes from Flow. This will be cast as the Opaque type and the super type will be dropped`
    );
  }

  usedObjMap(filePath: string, location: t.SourceLocation) {
    this.log(
      MigrationReportItemType.usedObjMap,
      MigrationReportItemSeverity.warn,
      filePath,
      location,
      `TypeScript cannot provide a fully type safe equivalent to $ObjMap<Object, Function>. An included utility type will correctly map static function return types, but may map to unknown for complex generic function return types.
       See https://go/ts-migration-objmap for more information.`
    );
  }

  untypedReduce(filePath: string, location: t.SourceLocation) {
    this.log(
      MigrationReportItemType.untypedReduce,
      MigrationReportItemSeverity.info,
      filePath,
      location,
      "Flow will try to infer the type of the accumulator and the return type of the reducer function. This may cause type errors in TypeScript."
    );
  }

  unhandledFlowInputNode(
    filePath: string,
    location: t.SourceLocation,
    nodeIdentifier: string,
    nodeType: string
  ) {
    this.log(
      MigrationReportItemType.unhandledFlowInputNode,
      MigrationReportItemSeverity.error,
      filePath,
      location,
      `Unrecognized type: '${nodeIdentifier}' of node type '${nodeType}''. This type will be replaced with 'UnknownFlowtype' to help identify it, and should be replaced.`
    );
  }

  autoImport(filePath: string) {
    this.log(
      MigrationReportItemType.autoImport,
      MigrationReportItemSeverity.info,
      filePath,
      { start: { line: 0, column: 0 }, end: { line: 0, column: 0 } },
      `Automatically importing missing types in ${filePath}`
    );
  }

  typeExports(filePath: string, line: number) {
    this.log(
      MigrationReportItemType.typeExports,
      MigrationReportItemSeverity.info,
      filePath,
      { start: { line, column: 0 }, end: { line, column: 0 } },
      `Type was specified as export. This may cause errors in isolatedModules mode and will be replaced with a type-only export.`
    );
  }

  disableFlowCheck(filePath: string, location: t.SourceLocation) {
    this.log(
      MigrationReportItemType.disableFlowCheck,
      MigrationReportItemSeverity.info,
      filePath,
      location,
      "Encountered a place where Flow would have been called to get inferred type, but Flow is disabled. Replacing with `unknown`"
    );
  }

  migrateSnapFile(
    filePath: string,
    originalSnapPath: string,
    newSnapPath: string
  ) {
    this.log(
      MigrationReportItemType.migrateSnapFile,
      MigrationReportItemSeverity.info,
      filePath,
      { start: { line: 0, column: 0 }, end: { line: 0, column: 0 } },
      `Found a snap file for ${filePath} in ${originalSnapPath}. This snap will be migrated to ${newSnapPath}`
    );
  }

  generateReport(): MigrationReport {
    return {
      migrationReportItems: this.migrationReportItems,
      lineCount: this.lineCount,
      totals: this.totals,
    };
  }
}

/**
 * A report on the activities of our migration.
 */
export type MigrationReport = {
  migrationReportItems: Array<MigrationReportItem>;
  lineCount: number;
  totals: Record<MigrationReportItemSeverity, number>;
};

export default MigrationReporter;
