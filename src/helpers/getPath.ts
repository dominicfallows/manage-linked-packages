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

  switch (os) {
    case "darwin":
    case "linux":
      const unixPath = `${homeDir}/.config/yarn/link/${packageName}`;
      if (fs.existsSync(unixPath)) {
        return unixPath;
      }
      return null;

    case "win32":
      let winPath = `${homeDir}\\AppData\\Local\\Yarn\\config\\link`;
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
