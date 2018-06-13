// flow-typed signature: c62dcf75e9b2f9492a20488282fa00e5
// flow-typed version: <<STUB>>/danger_v3.1.7/flow_v0.71.0

/**
 * Fails a build, outputting a specific reason for failing into a HTML table.
 */
declare function fail(message: string, file?: string, line?: number): void;

/**
 * Adds raw markdown into the Danger comment, under the table
 */
declare function markdown(message: string, file?: string, line?: number): void;

/**
 * Adds a message to the Danger table, the only difference between this and
 * warn is the emoji which shows in the table.
 */
declare function message(message: string, file?: string, line?: number): void;

/**
 * Highlights low-priority issues, but does not fail the build. Message is
 * shown inside a HTML table.
 */
declare function warn(message: string, file?: string, line?: number): void;

/**
 * The data that Danger will provide so that you can build rules.
 */
declare var danger: any;
