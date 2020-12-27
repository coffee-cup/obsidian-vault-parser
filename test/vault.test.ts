import path from "path";
import { readVault, parseWikiLinks } from "../src/index";

describe("vault", () => {
  it("parse vault", async () => {
    const vaultPath = path.resolve(__dirname, "../test-vault");
    const vault = await readVault(vaultPath);

    console.log(vault.files.hello);
  });

  it("parses wikilinks", () => {
    expect(parseWikiLinks("hello")).toEqual([]);
    expect(parseWikiLinks("[[hello]]")).toEqual(["hello"]);
    expect(parseWikiLinks("hello [[world]]")).toEqual(["world"]);
    expect(parseWikiLinks("foo [[hello-world-123]] bar")).toEqual([
      "hello-world-123",
    ]);

    expect(
      parseWikiLinks(`
Hello [[world]] this is a test

Woot [[woot]].
    `)
    ).toEqual(["world", "woot"]);
  });
});
