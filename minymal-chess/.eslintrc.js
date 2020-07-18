module.exports = {
    "extends": [
        "airbnb-base",
        "plugin:react/recommended",
        "plugin:cypress/recommended"
    ],
    "parser": "babel-eslint",
    "rules": {
        "indent": ["error", 4],
        "comma-dangle": ["error", "never"],
        "quotes": ["error", "single", { "avoidEscape": true }],
        "jsx-quotes": ["error", "prefer-single"],
        "react/jsx-no-literals": ["error"],
        "react/jsx-indent" : ["error", 4],
        "react/jsx-indent-props": ["error", 4],
        "max-lines": ["error", 80]
    },
    "env": {
        "browser": true,
        "jest": true
    }
};