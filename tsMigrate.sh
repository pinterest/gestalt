#!/bin/bash

function flow_to_ts_codemod {
  echo "[Flow-to-TS Codemod] starting..."
  cd ~/code/flow-to-typescript-codemod/ || exit
  yarn typescriptify convert --skipNoFlow --write --delete --path ~/code/gestalt/packages/eslint-plugin-gestalt/src/ ~/code/gestalt/packages/stylelint-plugin-gestalt/src/ --format csv --output /tmp/ts-migration-report.csv
  cd - || exit
  echo "Codemod complete"
  echo "Committing changes..."
  git add . && git commit -m '[TSMigrate Autocommit] Flow-to-TS codemod'
  echo "Changes committed"
  grep 'foundDeclarationFile,warn,' /tmp/ts-migration-report.csv && exit 1
  echo "[Flow-to-TS Codemod] completed"
}

function prettier {
  echo "[Prettier] starting..."
  yarn prettier --loglevel error --write ~/code/gestalt/packages/eslint-plugin-gestalt/src/ ~/code/gestalt/packages/stylelint-plugin-gestalt/src/ || exit 1
  echo "Committing changes..."
  git add . && git commit -m '[TSMigrate Autocommit] Prettier'
  echo "Changes committed"
  echo "[Prettier] completed"
}

function suppress_ts_errors {
  echo "[Supress TS Errors] starting..."
  cd ~/code/flow-to-typescript-codemod/ || exit
  NODE_OPTIONS=--max-old-space-size=16384 yarn typescriptify fix --autoSuppressErrors --config ~/code/gestalt/tsconfig.json --generateReport --output /tmp/ts-error-report.csv -p ~/code/gestalt/packages/eslint-plugin-gestalt/src/ ~/code/gestalt/packages/stylelint-plugin-gestalt/src/
  cd - || exit
  echo "Committing changes..."
  git add . && git commit -m '[TSMigrate Autocommit] Suppress TypeScript errors'
  echo "[Supress TS Errors] completed"
}

function eslint_autofix {
  echo "[ESLint Autofix] starting..."
  yarn eslint --fix
  echo "Committing changes..."
  git add . && git commit -m '[TSMigrate Autocommit] yarn eslint --fix'
  echo "Changes committed"
  echo "[ESLint Autofix] completed"
}

function run_ts_migration {
  echo "Running TS Migration..."
  flow_to_ts_codemod
  prettier
  suppress_ts_errors
  prettier
  eslint_autofix
  prettier
  echo "TS Migration complete! Look up the final cherry-picks in origin/ts and cherry pick them."
}

run_ts_migration
