1. Clone the project
2. Run `npm ci` to install the dependencies (a node_modules folder will be created)
3. Run `npm run dev` to start the development server

Installs in the project:
1. Run `npm i --save @fortawesome/fontawesome-svg-core` to install fontawesome
2. Run `npm install --save @fortawesome/free-solid-svg-icons` to install fontawesome
3. Run `npm install --save @fortawesome/react-fontawesome` to install fontawesome
4. Run `npm install formik --save` to install formik
5. Run `npm install yup --save` to install yup
6. Run `npm install react-confetti` to install confetti
7. Run `npm i --save-dev @types/canvas-confetti` to install types for confetti

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
