module.exports = {
  plugins: [
    {
      name: "preset-default", // params: {
      //   overrides: {
      //     // customize options for plugins included in preset
      //     builtinPluginName: {
      //       optionName: 'optionValue',
      //     },
      //     // or disable plugins
      //     anotherBuiltinPlugin: false,
      //   },
      // },
    }, // Enable builtin plugin not included in preset
    "sortAttrs", // Enable and configure builtin plugin not included in preset
    // {
    //   name: 'manyBuiltInPlugin',
    //   params: {
    //     optionName: 'value',
    //   },
    // },
  ],
};