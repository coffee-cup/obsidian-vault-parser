import { getFileName } from "../src/files";

describe("filepaths", () => {
  it("gets filename from filepath", () => {
    expect(getFileName("./hello.md")).toBe("hello");
    expect(getFileName("./foo/bar.md")).toBe("bar");
    expect(getFileName("/hello")).toBe("hello");
    expect(getFileName("/foo/bar")).toBe("bar");
    expect(getFileName("/foo/bar.md")).toBe("bar");
  });
});
