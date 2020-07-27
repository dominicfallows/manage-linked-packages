# Manage Linked Packages

List and reset npm and Yarn global linked packages, manually or programmatically in Yarn/npm scripts.

There is no out-of-the-box way to locate or reset packages that have been linked with [npm `link`](https://docs.npmjs.com/cli/link.html) or [Yarn `link`](https://yarnpkg.com/lang/en/docs/cli/link/).

## Contents

- [Use-case example](#use-case-example)
- [Install](#install)
- [Usage](#usage)
- [Uninstall](#uninstall)

## Use-case example

- Image you are developing a local package (PackageA) and you want another local package you are developing (PackageB) to use it, without having to publish packages in development to npm/GitHub, then you use `yarn link` or `npm link` to create a global linked package
- `yarn link` and `npm link` won't let you create/override a global linked package, say, if you needed to change folders where PackageA is located, or have a duplicate folder (for valid reasons). You have to `yarn unlink` or `npm unlink` PackageA first manually
- You have to remember the location of PackageA, which can get difficult on machines with large number of projects

`manage-linked-packages` helps you to manage these packages manually or programmatically in Yarn/npm scripts.

## Install

With npm:

```bash
npm install -g manage-linked-packages
```

With Yarn:

```bash
yarn global add manage-linked-packages
```

## Usage

In your terminal or npm/Yarn script type:

```bash
manage-linked-packages [options]
```

### Options

| Short Syntax           | Long Syntax                           | Description                                                    |
| ---------------------- | ------------------------------------- | -------------------------------------------------------------- |
| `-m <package-manager>` | `--package-manager <package-manager>` | **required:** package manager to manage (`yarn` or `npm`)      |
| `-a <manage-action>`   | `--manage-action <manage-action>`     | **required:** manage action to take (`locate` or `reset`)      |
| `-n <package-name>`    | `--package-name <package-name>`       | **required:** name of global linked yarn/npm package to manage |
| `-V`                   | `--version`                           | output the version number                                      |

| `-h, --help` output usage information

### Examples

#### To locate the Yarn global linked package called `some-package`

```bash
manage-linked-packages -m yarn -a locate -n some-package
```

This returns a success message with the real path of the linked package, for example:

`found: /Users/user1/Projects/some-package`

#### To reset the npm global linked package called `some-package`

```bash
manage-linked-packages -m npm -a reset -n some-package
```

This returns the output of the `yarn unlink` or `npm unlink` command that is performed in the appropriate global folder.

## Uninstall

With npm:

```bash
npm uninstall -g manage-linked-packages
```

With Yarn:

```bash
yarn global remove manage-linked-packages
```
