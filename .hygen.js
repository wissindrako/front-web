// eslint-disable-next-line @typescript-eslint/no-require-imports
const inflection = require("inflection");

// Plurals the English rules get wrong (e.g. Spanish names):
// HYGEN_PLURALS='{"publicacion":"Publicaciones"}' npm run generate:resource
// Patched on the shared inflection module, which hygen's h.inflection is.
const plurals = JSON.parse(process.env.HYGEN_PLURALS || "{}");
const singulars = Object.fromEntries(
  Object.entries(plurals).map(([singular, plural]) => [
    plural.toLowerCase(),
    singular,
  ])
);
const sameCase = (word, like) =>
  like[0] === like[0].toUpperCase()
    ? word[0].toUpperCase() + word.slice(1)
    : word[0].toLowerCase() + word.slice(1);
const { pluralize, singularize } = inflection;
inflection.pluralize = (str, plural) => {
  const custom = plurals[str.toLowerCase()];
  return plural ?? (custom ? sameCase(custom, str) : pluralize(str));
};
inflection.singularize = (str, singular) => {
  const custom = singulars[str.toLowerCase()];
  return singular ?? (custom ? sameCase(custom, str) : singularize(str));
};

module.exports = {
  templates: `${__dirname}/.hygen`,
  helpers: {
    pascalName: (name) => inflection.camelize(inflection.underscore(name)),
    pascalPluralName: (name) =>
      inflection.camelize(inflection.underscore(inflection.pluralize(name))),
  },
};
