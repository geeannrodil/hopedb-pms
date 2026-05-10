# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# 1. Make sure you have the latest code from your team
git checkout dev
git pull origin dev

# 2. Create a new feature branch for your first task
git checkout -b feat/db-initial-schema

# 3. Add your new SQL file to the staging area
git add db/migrations/01-initial-schema.sql

# 4. Commit the changes with a clear, descriptive message
git commit -m "db: add initial schema, tables, and soft-delete columns"

# 5. Push this new branch up to GitHub
git push -u origin feat/db-initial-schema
