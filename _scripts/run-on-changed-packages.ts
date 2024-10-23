import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";

const diffChangedFiles = execSync("git diff --name-only HEAD^..HEAD", {
  encoding: "utf8",
}).split("\n");

const changedPackageNames = diffChangedFiles
  .map((path) => {
    const [workspace, packageFolder] = path.split("/");

    if (!["apps", "commons"].includes(workspace)) return null;

    return `${workspace}/${packageFolder}/package.json`;
  })
  .filter(Boolean)
  .filter(
    (pathToPackageJSON, index, arr) => arr.indexOf(pathToPackageJSON) === index
  )
  .reduce((_changedPackageNames, pathToPackageJSON) => {
    if (pathToPackageJSON) {
      const packageJSON = JSON.parse(
        readFileSync(pathToPackageJSON, {
          encoding: "utf8",
        })
      );

      const packageName = packageJSON.name;
      return [..._changedPackageNames, packageName];
    }

    return _changedPackageNames;
  }, [] as string[]);

const workspacesFlags = changedPackageNames
  .map((packageName) => `--workspace=${packageName}`)
  .join(" ");

if (workspacesFlags) {
  const command = process.argv.at(-1);
  const commandToRun = `${command} ${workspacesFlags}`;

  execSync(commandToRun, {
    stdio: "inherit",
  });
} else {
  console.log("Nothing has changed");
}
