module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "prettier", // Ensures Prettier rules override ESLint rules where necessary
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: [
    "react",
    "react-hooks",
    "prettier", // Adds Prettier plugin for ESLint
  ],
  rules: {
    "react/jsx-uses-react": "warn",
    "react/react-in-jsx-scope": "warn",
    "react/prop-types": "warn",
    "prettier/prettier": ["error", { endOfLine: "auto" }], // Ensures Prettier issues are treated as ESLint errors
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
