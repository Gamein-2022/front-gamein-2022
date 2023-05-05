/** @type {import('@lingui/conf').LinguiConfig} */
module.exports = {
   locales: ["en", "fa",],
   sourceLocale: "fa",
   catalogs: [{
      path: "src/locales/{locale}/messages",
      include: ["src"]
   }],
   format: "po"
}