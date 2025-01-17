const fs = require("fs");
const path = require("path");
const sass = require("sass");

/**
 *
 * @param {String} src
 * @param {String} output
 */
const compile = (src, output) => {
  const result = sass.compile(path.resolve(src), {
    style: "expanded",
    verbose: true,
  });

  fs.writeFileSync(path.resolve(output), result.css);
};

compile("src/global.scss", "lib/global.css");

/**
 * Get all components from atoms, moleucules and organisms
 * @returns Array of objects
 */
const getComponents = () => {
  let allComponents = [];

  const types = ["atoms", "molecules", "organisms"];

  types.forEach((type) => {
    const allFiles = fs.readdirSync(`src/${type}`).map((file) => ({
      src: `src/${type}/${file}`,
      output: `lib/${file.slice(0, -5)}.css`,
    }));
    allComponents = [...allComponents, ...allFiles];
  });
  return allComponents;
};

getComponents().forEach((component) =>
  compile(component.src, component.output)
);
