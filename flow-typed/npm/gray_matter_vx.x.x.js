
// @flow
// gray-matter flow-typed version based on https://github.com/jonschlinkert/gray-matter

declare module 'gray-matter' {

  declare type MatterResponse = {
    data: {
      [string]: string,
    },
    content: string
  };

  declare module.exports: (string:string) => MatterResponse;
}
