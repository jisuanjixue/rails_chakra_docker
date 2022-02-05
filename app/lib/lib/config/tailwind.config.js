const plugin = require("tailwindcss/plugin");
module.exports = {
    content: [
        "./app/helpers/**/*.rb",
        "./app/javascript/**/*",
        "./app/views/**/*",
    ],
    plugins: [
        plugin(({ addVariant, e }) => {
            addVariant("sidebar-expanded", ({ modifySelectors, separator }) => {
                modifySelectors(({ className }) => `.sidebar-expanded .${e(`sidebar-expanded${separator}${className}`)}`);
            });
        }),
    ],
};
//# sourceMappingURL=tailwind.config.js.map
//# sourceMappingURL=tailwind.config.js.map