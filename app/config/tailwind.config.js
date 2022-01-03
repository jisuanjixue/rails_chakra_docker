const plugin = require("tailwindcss/plugin");

module.exports = {
  content: [
    "./app/helpers/**/*.rb",
    "./app/javascript/**/*",
    "./app/views/**/*",
  ],
  options: {
    safelist: [/data-theme$/],
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("daisyui"),
    plugin(({ addVariant, e }) => {
      addVariant("sidebar-expanded", ({ modifySelectors, separator }) => {
        modifySelectors(
          ({ className }) =>
            `.sidebar-expanded .${e(
              `sidebar-expanded${separator}${className}`
            )}`
        );
      });
    }),
  ],
  daisyui: {
    styled: true,
    themes: [
      "dark",
      "emerald", // first one will be the default theme
      "forest",
      "synthwave",
    ],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
  },
};
