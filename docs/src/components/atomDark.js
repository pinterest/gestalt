// @flow strict
const atomDark = {
  plain: {
    backgroundColor: '#2a2734',
    color: '#88BBBF',
    lineHeight: 1.4,
    fontSize: 16,
    fontFamily:
      'PragmataPro, "Roboto Mono", Monaco, Consolas, "Courier New", "Courier, monospace !important',
  },
  styles: [
    {
      types: ['cdata', 'comment', 'doctype', 'prolog'],
      style: {
        color: 'hsl(30, 20%, 50%)',
        backgroundColor: '#2a2734',
      },
    },
    {
      types: ['punctuation'],
      style: {
        color: 'rgba(197, 200, 198, 0.7)',
        backgroundColor: '#2a2734',
      },
    },
    {
      types: ['boolean', 'constant', 'keyword', 'number', 'property', 'symbol', 'tag'],
      style: {
        color: 'hsl(350, 40%, 70%)',
        backgroundColor: '#2a2734',
      },
    },
    {
      types: ['selector', 'attr-name', 'string', 'char', 'builtin', 'inserted'],
      style: {
        color: 'hsl(75, 70%, 60%)',
        backgroundColor: '#2a2734',
      },
    },
    {
      types: ['operator', 'entity', 'url', 'string', 'variable'],
      style: {
        color: 'hsl(40, 90%, 60%)',
        backgroundColor: '#2a2734',
      },
    },
    {
      types: ['atrule', 'attr-value', 'keyword'],
      style: {
        color: 'hsl(350, 40%, 70%)',
        backgroundColor: '#2a2734',
      },
    },
    {
      types: ['function'],
      style: {
        color: '#dad085',
        backgroundColor: '#2a2734',
      },
    },
    {
      types: ['regex', 'important'],
      style: {
        color: '#e90',
        backgroundColor: '#2a2734',
      },
    },
    {
      types: ['important', 'bold'],
      style: {
        fontWeight: 'bold',
      },
    },
    {
      types: ['italic'],
      style: {
        fontStyle: 'italic',
      },
    },
    {
      types: ['entity'],
      style: {
        cursor: 'help',
      },
    },
    {
      types: ['deleted'],
      style: {
        color: 'red',
      },
    },
  ],
};

export default atomDark;
