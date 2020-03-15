module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules": {
        "jsx-a11y/anchor-is-valid": 0,
        "jsx-a11y/no-static-element-interactions": 0,
        "react/no-danger": 0,
        "react/jsx-no-bind": 0,
        "react/no-did-mount-set-state": 0,
        "react/no-array-index-key": 1, // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-array-index-key.md
        "react/forbid-prop-types": 0,
        "react/jsx-closing-tag-location": 0,
        "react/jsx-filename-extension": 0,
        "camelcase": 0,
        "jsx-a11y/no-noninteractive-element-interactions":1,
        "no-script-url":0,
        "react/no-find-dom-node":0,
        "prefer-destructuring": ["error", {
            "VariableDeclarator": {
                "array": false,
                "object": false
            },
            "AssignmentExpression": {
                "array": false,
                "object": false
            }
        }, {
            "enforceForRenamedProperties": false
        }],
        "no-unused-vars": 1,
        "no-continue": 1,
//    "no-debugger": 0,
        "no-console": 0,
        "no-nested-ternary": 1,
        "no-loop-func": 1,
        "no-did-mount-set-state": 0,
        "no-plusplus": 0,
        "import/first": 0,
        "import/no-mutable-exports": 0,
        "prefer-const": 0,
        "no-param-reassign": 0,
        "no-restricted-syntax": 0,
        "import/extensions": "off",
        "import/no-unresolved": "off",
        "max-len": [
            1,
            {
                "code": 400
            }
        ],
        "no-underscore-dangle": 0,
        "linebreak-style": [
            0,
            "error",
            "windows"
        ]
    }
};
