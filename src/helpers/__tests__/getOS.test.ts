import getOS from "../getOS";

describe("test platform detection", () => {
  let originalPlatform = process.platform;

  beforeAll(() => {
    originalPlatform = process.platform;
  });

  it(`passes if process.platform is macOS (darwin)`, () => {
    try {
      Object.defineProperty(process, "platform", {
        value: "darwin"
      });
      const os = getOS();
      expect(os).toBe("darwin");

    } catch (err) {
      console.log(err);
    }
  });

  it(`passes if process.platform is Linux (linux)`, () => {
    try {
      Object.defineProperty(process, "platform", {
        value: "linux"
      });
      const os = getOS();
      expect(os).toBe("linux");

    } catch (err) {
      console.log(err);
    }
  });

  it(`passes if process.platform is Windows (win32)`, () => {
    try {
      Object.defineProperty(process, "platform", {
        value: "win32"
      });
      const os = getOS();
      expect(os).toBe("win32");

    } catch (err) {
      console.log(err);
    }
  });

  it(`fail if process.platform not valid ("MockOS")`, () => {
    try {
      Object.defineProperty(process, "platform", {
        value: "MockOS"
      });
      const os = getOS();
      console.log(`Detected OS as ${os}`);
    } catch (err) {
      expect(err.message).toBe(`Sorry, currently we don't support the "MockOS" platform`);
    }
  });

  afterAll(() => {
    Object.defineProperty(process, "platform", {
      value: originalPlatform
    });
  });
});
