export default () => {
  switch (process.platform) {
    case "darwin":
    case "linux":
    case "win32":
      return process.platform;
    default:
      throw new Error(`Sorry, currently we don't support the "${process.platform}" platform`);
  }
};
