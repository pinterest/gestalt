/*

# Setup

    jscodeshift --transform ~/src/gestalt/scripts/stats.js --parser flow --dry ~/src/my-repo | grep "^\- " | cut -c 4- > ~/Desktop/gestalt-stats.csv


# What % of components calls are Gestalt components?

    cat ~/Desktop/gestalt-stats.csv | grep -v "tests" | grep ",true," | wc -l
    cat ~/Desktop/gestalt-stats.csv | grep -v "tests" | wc -l


# What % of files import Gestalt?

    comm -12 <(cat ~/Desktop/gestalt-stats.csv | grep -v "tests" | grep ",true,"  | cut -f 1 -d , | sort | uniq) <(cat ~/Desktop/gestalt-stats.csv | grep -v "tests" | grep ",false,"  | cut -f 1 -d , | sort | uniq) | wc -l
    cat ~/Desktop/gestalt-stats.csv | grep -v "tests" | sort | cut -f 1 -d , | uniq | wc -l


# Top 20 most used components

$ cat ~/Desktop/gestalt-stats.csv.csv | grep -v "tests" | cut -f 3 -d , | sort | uniq -c | sort | tail -r -n 20

*/
export default function transformer(file, api) {
  const j = api.jscodeshift;
  const p = file.path;
  const src = j(file.source);
  const localIdentifierNames = {};

  src.find(j.ImportDeclaration).forEach(path => {
    const decl = path.node;
    if (decl.source.value !== 'gestalt') {
      return;
    }
    decl.specifiers.forEach(node => {
      localIdentifierNames[node.local.name] = node.imported.name;
    });
  });

  src.find(j.JSXOpeningElement).forEach(path => {
    const { node } = path;
    const { name } = node.name;
    const isInGestalt = Object.prototype.hasOwnProperty.call(
      localIdentifierNames,
      name
    );
    // Why add the "- " here? Otherwise it get caught up in the jscodeshift
    // output and it's something unique to grep for later
    // eslint-disable-next-line no-console
    console.log(
      `- ${[p, isInGestalt, localIdentifierNames[name] || name].join(',')}`
    );
  });
}
