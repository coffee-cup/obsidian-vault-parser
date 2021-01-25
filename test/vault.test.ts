import path from "path";
import { getFileName, parseWikiLinks } from "../src/files";
import { readVault } from "../src/index";

describe("vault", () => {
  it("parse vault", async () => {
    const vaultPath = path.resolve(__dirname, "../test-vault");
    const vault = await readVault(vaultPath);

    expect(vault.files.hello.links).toEqual(["world", "projects"]);
    expect(vault.files.hello.backLinks).toEqual(["index", "world"]);

    expect(vault).toMatchSnapshot();
  });

  it("removes unpublished files from vault", async () => {
    const vaultPath = path.resolve(__dirname, "../test-vault");
    const vault = await readVault(vaultPath, {
      isPublished: f => !!f.frontMatter.published,
    });

    expect(vault.files.hello.links).toEqual(["projects"]);
    expect(vault.files.hello.backLinks).toEqual(["index"]);
  });
});

describe("files", () => {
  it("gets filename from filepath", () => {
    expect(getFileName("./hello.md")).toBe("hello");
    expect(getFileName("./foo/bar.md")).toBe("bar");
    expect(getFileName("/hello")).toBe("hello");
    expect(getFileName("/foo/bar")).toBe("bar");
    expect(getFileName("/foo/bar.md")).toBe("bar");
    expect(getFileName("/foo/hello world.md")).toBe("hello world");
    expect(getFileName("/foo/foo-bar.md")).toBe("foo-bar");
  });

  it("parses wikilinks", () => {
    expect(parseWikiLinks("hello")).toEqual([]);
    expect(parseWikiLinks("[[hello]]")).toEqual(["hello"]);
    expect(parseWikiLinks("hello [[world]]")).toEqual(["world"]);
    expect(parseWikiLinks("foo [[hello-world-123]] bar")).toEqual([
      "hello-world-123",
    ]);
    expect(parseWikiLinks("[[hello world]]")).toEqual(["hello world"]);

    expect(
      parseWikiLinks(`
Hello [[world]] this is a test

Woot [[woot]].
    `),
    ).toEqual(["world", "woot"]);

    // Aliases
    expect(parseWikiLinks(`[[hello|alias]]`)).toEqual(["hello"]);
    expect(parseWikiLinks(`[[hello|alias]] [[world]]`)).toEqual([
      "hello",
      "world",
    ]);
    expect(parseWikiLinks(`[[hello|another alias]]`)).toEqual(["hello"]);
  });
});
