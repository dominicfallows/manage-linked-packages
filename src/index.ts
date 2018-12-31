import { execSync } from "child_process";
import program from "commander";
import fs from "fs";

import * as packageJson from "../package.json";
import getPath from "./helpers/getPath";
import { errorText, foundText, notFoundText } from "./helpers/handleText";

const packageVersion = (packageJson as any).version;

export interface IMainProps {
  packageManager: "yarn" | "npm";
  action: "locate" | "reset";
  packageName: string;
}

export const Main = ({ packageManager, action, packageName }: IMainProps): void => {
  if (typeof packageManager === "undefined" || typeof action === "undefined" || typeof packageName === "undefined") {
    if (typeof packageManager === "undefined") {
      console.error(
        errorText("no package manager given, please pass with `-m <package-manager>` or use --help for help")
      );
    }

    if (typeof action === "undefined") {
      console.error(errorText("no manage action given, please pass with `-a <manage-action>` or use --help for help"));
    }

    if (typeof packageName === "undefined") {
      console.error(errorText("no package name given, please pass with `-n <package-name>` or use --help for help"));
    }
    process.exit(1);
  }

  const path = getPath(packageManager, packageName);

  if (typeof path !== "string") {
    console.log(notFoundText(`${packageName} in global ${packageManager} linked packages`));
    process.exit(1);
  }

  if (typeof path === "string" && action === "locate") {
    console.log(foundText(fs.realpathSync(path)));
    process.exit(0);
  }

  if (typeof path === "string" && action === "reset") {
    try {
      process.chdir(path);
      execSync(`${packageManager} unlink`, { stdio: "inherit" });
      process.exit(0);
    } catch (err) {
      console.log(errorText(err));
      process.exit(1);
    }
  }

  console.log(errorText("got to the end without doing anything"));
  process.exit(1);
};

program
  .version(packageVersion)
  .option(
    "-m --package-manager <package-manager>",
    "required: package manager to manage (`yarn` or `npm`)",
    /^(yarn|npm)$/i
  )
  .option(
    "-a --manage-action <manage-action>",
    "required: manage action to take (`locate` or `reset`)",
    /^(locate|reset)$/i
  )
  .option("-n --package-name <package-name>", "required: name of global linked yarn/npm package to manage")
  .action(props => {
    Main({
      action: props.manageAction,
      packageManager: props.packageManager,
      packageName: props.packageName
    });
  })
  .parse(process.argv);
