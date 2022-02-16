export default function transformer(file, api, options) {
  const { a = 1, b = 1 } = options;
  console.log(a, b);
  // Boilerplate to get the file source we'll look at
  const j = api.jscodeshift;
  const src = j(file.source);

  return src.toSource({ quote: 'single' });
}
