// flow-typed signature: d803b725c35a9cd5f73e5abfac273cd1
// flow-typed version: 7ad57fc095/slugify_v1.x.x/flow_>=v0.104.x

declare module "slugify" {
  declare type SlugifyOptions = {
    replacement?: string,
    remove?: ?RegExp,
    lower?: boolean,
    ...
  };
  declare module.exports: {
    (input: string, optionOrReplacement?: string | SlugifyOptions): string,
    extend({ [key: string]: string, ... }): void,
    ...
  };
}
