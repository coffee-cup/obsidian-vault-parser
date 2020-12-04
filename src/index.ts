import glob from "glob-promise";

export const sum = (a: number, b: number) => {
  if ("development" === process.env.NODE_ENV) {
    console.log("boop");
  }
  return a + b;
};

export const readVault = async (path: string) => {
  const files = await glob(`${path}/**/*.md`);
  console.log(files);
};
