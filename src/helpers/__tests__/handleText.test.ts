import { errorText, foundText, notFoundText, successText } from "../handleText";

describe("test texts get processed with correct prefix", () => {
  it(`errorText is prefixed with "error: "`, () => {
    expect(errorText("test string")).toContain("error: ");
  });

  it(`foundText is prefixed with "found: "`, () => {
    expect(foundText("test string")).toContain("found: ");
  });

  it(`notFoundText is prefixed with "not found: "`, () => {
    expect(notFoundText("test string")).toContain("not found: ");
  });

  it(`successText is prefixed with "success: "`, () => {
    expect(successText("test string")).toContain("success: ");
  });
});
