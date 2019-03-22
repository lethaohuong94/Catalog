module.exports = {
  "parser": "babel-eslint",
  "env": {
    "browser": true,
    "node": true,
    "jquery": true,
    "jest": true
  },
  "extends": "airbnb",
  "rules": {
    "space-before-function-paren": 0,
    "react/prefer-stateless-function": 0,
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "linebreak-style": 0,
    "global-require": 0,
    "eol-last": 0,
    "comma-dangle": ["error", "always-multiline"],
    "spaced-comment": 0,
    "react/require-default-props": 0,
    "react/forbid-prop-types": 0,
    "jsx-a11y/label-has-for": 0,
    "jsx-a11y/anchor-is-valid": 0,
    "jsx-a11y/href-no-hash": 0,
    "jsx-a11y/interactive-supports-focus": 0,
    "jsx-a11y/click-events-have-key-events": 0,
    "jsx-a11y/mouse-events-have-key-events": 0,
    "jsx-a11y/no-static-element-interactions": 0,
    "react/no-did-mount-set-state": 0,
    "max-len": 0,
    "react/jsx-no-bind": 0,
    "class-methods-use-this" :0,
    "react/prop-types": 0,
    "no-unused-expressions": 0,
    "radix": 0,
    "object-curly-newline": 0,
    "no-console": 0,
    "import/no-unresolved": 0,
    "import/no-named-as-default": 0,
    "import/no-extraneous-dependencies": 0,
    "import/extensions": 0,
    "prefer-destructuring": 0,
    "no-multi-assign": 0,
    "function-paren-newline": 0,
    "react/no-unescaped-entities": 0,
    "no-debugger": 0,
    "no-shadow": 0,
    "no-plusplus": 0,
    "camelcase": 0,
    "react/sort-comp": [
      1,
      {
    "order": [
      "type-annotations",
      "static-methods",
      "lifecycle",
      "everything-else",
      "render"
    ]
      }
    ]
  },
  "globals": {
    "zE": true,
    "log": true,
    "logToQueue": true,
    "jsdom": true
  }
}
