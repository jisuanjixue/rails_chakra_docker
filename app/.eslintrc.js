module.exports = {
  env: {
    // window object etc part of browser are made available globally.
    browser: true,
    es6: true,
    commonjs: true,
    node: true,
  },
  /*
   * The order of extending each plugin matters a LOT!!
   * Thus don't change order of items in this array
   * unless you're sure of it.
   */
  extends: [
    "plugin:cypress/recommended",
    "plugin:json/recommended",
    "eslint:recommended",
    "plugin:react/recommended",
    // ensure that you don't add custom rules
    // without taking permission from team leads.
    "prettier",
  ],
  settings: {
    react: {
      version: "detect",
    },
  },
  parserOptions: {
    ecmaVersion: 6,
    ecmaFeatures: {
      tsx: true,
    },
    sourceType: "module",
  },
  parser: "babel-eslint",
  // babel-eslint is deprecated now. This is the latest package.
  plugins: ["react", "prettier", "import", "react-hooks", "promise", "jam3", "unused-imports"],
  rules: {
    // auto-fixable: Respect all Prettier rules and apply it.
    "prettier/prettier": "error",
    // not-auto-fixable: No unused variables allowed.
    "no-unused-vars": "error",
    // not-auto-fixable: No undefined variables allowed.
    "no-undef": "error",
    // not-auto-fixable: Dont use console statements. Use logger which babel will remove during bundling.
    "no-console": "error",
    // not-auto-fixable: require `return` statements to either always or never specify values.
    "consistent-return": "error",
    // auto-fixable: sadly this doesn't support guard clauses yet.
    "padding-line-between-statements": ["error", { blankLine: "always", prev: "if", next: ["if", "return"] }],
    // auto-fixable: Single line statements needn't have any braces. But in all other cases enforce curly braces.
    curly: ["error", "multi-line"],
    // auto-fixable: Remove the else part, if the "if" or "else-if" chain has a return statement
    "no-else-return": "error",
    // not-auto-fixable: Prevent un-sanitized dangerouslySetInnerHTML.
    "jam3/no-sanitizer-with-danger": [
      2,
      {
        wrapperName: ["dompurify", "sanitizer", "sanitize"],
      },
    ],
    // auto-fixable: Requires trailing commas when the last element or property is in a different line than the closing ] or }
    "comma-dangle": [
      "error",
      {
        arrays: "always-multiline",
        objects: "always-multiline",
        imports: "always-multiline",
        exports: "always-multiline",
        functions: "never",
      },
    ],
    // auto-fixable: If a variable is never reassigned, using the const declaration is better.
    "prefer-const": "error",
    // auto-fixable: It is considered good practice to use the type-safe equality operators === and !==.
    eqeqeq: "error",
    // not-auto-fixable: Rule flags optional chaining expressions in positions where short-circuiting to undefined causes throwing a TypeError afterward.
    "no-unsafe-optional-chaining": "error",
    // auto-fixable: Remove all unused imports.
    "unused-imports/no-unused-imports": "error",
    // not-auto-fixable: Prefer a default export if module exports a single name.
    "import/prefer-default-export": "off",
    // not-auto-fixable: Forbid a module from importing a module with a dependency path back to itself.
    "import/no-cycle": ["error", { maxDepth: 1, ignoreExternal: true }],
    // not-auto-fixable: Prevent unnecessary path segments in import and require statements.
    "import/no-useless-path-segments": ["error", { noUselessIndex: true }],
    // not-auto-fixable: Report any invalid exports, i.e. re-export of the same name.
    "import/export": "error",
    // not-auto-fixable: Forbid the use of mutable exports with var or let.
    "import/no-mutable-exports": "error",
    // not-auto-fixable: Ensure all imports appear before other statements.
    "import/first": "error",
    // not-auto-fixable: Ensure all exports appear after other statements.
    "import/exports-last": "error",
    // auto-fixable: Enforce a newline after import statements.
    "import/newline-after-import": ["error", { count: 1 }],
    // not-auto-fixable: Prevent missing props validation in a React component definition.
    "react/prop-types": "off",
    // not-auto-fixable: Detect unescaped HTML entities, which might represent malformed tags.
    "react/no-unescaped-entities": "off",
    // not-auto-fixable: Prevent missing displayName in a React component definition. Useful when using React extensions in browser and checking for component name.
    "react/display-name": "error",
    // not-auto-fixable: Reports when this.state is accessed within setState.
    "react/no-access-state-in-setstate": "error",
    // not-auto-fixable: Prevent usage of dangerous JSX props. Currently jam3 plugin will take care of handling this.
    "react/no-danger": "off",
    "react/react-in-jsx-scope": "off",
    // not-auto-fixable: Report when a DOM element is using both children and dangerouslySetInnerHTML.
    "react/no-danger-with-children": "warn",
    // not-auto-fixable: Prevent definitions of unused prop types.
    "react/no-unused-prop-types": "error",
    // not-auto-fixable: Report missing key props in iterators/collection literals. Important rule!
    "react/jsx-key": "error",
    // not-auto-fixable: Enforce no duplicate props.
    "react/jsx-no-duplicate-props": "error",
    // not-auto-fixable: Disallow undeclared variables in JSX.
    "react/jsx-no-undef": "error",
    // not-auto-fixable: Enforce PascalCase for user-defined JSX components.
    "react/jsx-pascal-case": ["error", { allowNamespace: true }],
    // not-auto-fixable: Prevent React to be incorrectly marked as unused.
    "react/jsx-uses-react": "error",
    // not-auto-fixable: Prevent variables used in JSX to be marked as unused.
    "react/jsx-uses-vars": "error",
    // not-auto-fixable: Ensures https://reactjs.org/docs/hooks-rules.html.
    "react-hooks/rules-of-hooks": "error",
    // not-auto-fixable: Ensures https://reactjs.org/docs/hooks-rules.html - Checks effect dependencies.
    "react-hooks/exhaustive-deps": "warn",
  },
  // Globals can be disabled with the string "off"
  // "writable" to allow the variable to be overwritten or "readonly" to disallow overwriting.
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
    // Makes logger function available everywhere. Else eslint will complaint of undef-var.
    logger: "readonly",
    module: "writable",
  },
  overrides: [
    {
      files: [".eslintrc.js", ".prettierrc.js", "app/assets/**/*", "app/javascript/**/*", "*.json"],
      rules: {
        "import/order": "off",
        "react-hooks/rules-of-hooks": "off",
      },
    },
    {
      files: ["app/javascript/**/*.{js,tsx}"],
      rules: {
        "no-redeclare": "off",
      },
    },
  ],
  // not-auto-fixable: ensure people use async/await promising chaining rather than using "then-catch-finally" statements
  // auto-fixable: avoid calling "new" on a Promise static method like reject, resolve etc
};
