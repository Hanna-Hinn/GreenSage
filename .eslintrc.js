module.exports = {
  env: {
    browser: true,
    es2021: true, // You can also use 'es6' or specify the exact ECMAScript version
  },
  extends: [
    "eslint:recommended", // Uses the recommended rules from ESLint
    "plugin:react/recommended", // Uses the recommended rules from eslint-plugin-react
    "plugin:react-hooks/recommended", // Enforces rules of Hooks
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
    ecmaVersion: "latest", // Allows for the use of modern ECMAScript features
    sourceType: "module", // Allows for the use of imports
  },
  plugins: [
    "react", // Enables eslint-plugin-react
    "react-hooks", // Enables eslint-plugin-react-hooks
  ],
  rules: {
    "react/jsx-uses-react": "warn",
    "react/react-in-jsx-scope": "warn",
    "react/prop-types": "warn", 
  },
  settings: {
    react: {
      version: "detect", // Automatically detect the React version
    },
  },
};
