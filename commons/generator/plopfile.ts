import { resolve } from "node:path";

import { NodePlopAPI } from "plop";

const ROOT_MONOREPO = resolve("..", "..");

export default function (plop: NodePlopAPI) {
  commonPackage(plop);
}

function commonPackage(plop: NodePlopAPI) {
  plop.setGenerator("common-package", {
    description: "Create a new common package inside `./commons` folder",
    prompts: [
      {
        type: "input",
        name: "packageName",
        message: "What is the name of the package?",
      },
    ],
    actions: [
      {
        type: "add",
        path: resolve(
          ROOT_MONOREPO,
          "commons",
          "{{lowerCase packageName}}",
          "package.json"
        ),
        templateFile: "templates/common-package/package.json.hbs",
      },
      {
        type: "add",
        path: resolve(
          ROOT_MONOREPO,
          "commons",
          "{{lowerCase packageName}}",
          "eslint.config.mjs"
        ),
        templateFile: "templates/common-package/eslint.config.mjs.hbs",
      },
      {
        type: "add",
        path: resolve(
          ROOT_MONOREPO,
          "commons",
          "{{lowerCase packageName}}",
          "jest.config.ts"
        ),
        templateFile: "templates/common-package/jest.config.ts.hbs",
      },
    ],
  });
}
