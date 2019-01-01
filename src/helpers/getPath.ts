import { execSync } from "child_process";
import fs from "fs";
import { homedir } from "os";

import getOS from "./getOS";

export default (packageManager: "yarn" | "npm", packageName: string): string | null => {
  const os = getOS();
  const homeDir = homedir();
  const packageNameParts = packageName.split("/");

  if (packageManager === "npm") {
    return require("global-modules-path").getPath(packageName);
  }

  let linkFolderPath: string | null = null;

  try {
    const yarnConfigCurrentBuffer = execSync("yarn config current");

    let yarnConfigCurrentStr: string = yarnConfigCurrentBuffer.toString();
    yarnConfigCurrentStr = yarnConfigCurrentStr.substring(
      yarnConfigCurrentStr.indexOf("{"),
      yarnConfigCurrentStr.lastIndexOf("}") + 1
    );

    const yarnConfigCurrent = JSON.parse(yarnConfigCurrentStr);
    if (typeof yarnConfigCurrent.linkFolder === "string") {
      linkFolderPath = yarnConfigCurrent.linkFolder;
    }
  } catch (err) {
    // do nothing
  }

  switch (os) {
    case "darwin":
    case "linux":
      const unixPath =
        linkFolderPath !== null ? `${linkFolderPath}/${packageName}` : `${homeDir}/.config/yarn/link/${packageName}`;
      if (fs.existsSync(unixPath)) {
        return unixPath;
      }
      return null;

    case "win32":
      let winPath =
        linkFolderPath !== null
          ? `${linkFolderPath}`
          : `${homeDir}\\AppData\\Local\\Yarn\\Data\\link`;
      packageNameParts.forEach((part: string) => {
        winPath = `${winPath}\\${part}`;
      });
      if (fs.existsSync(winPath)) {
        return winPath;
      }
      return null;

    default:
      return null;
  }
};
