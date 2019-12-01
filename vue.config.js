var PrerenderSpaPlugin = require("prerender-spa-plugin")
var path = require("path")

module.exports = {
  lintOnSave: process.env.NODE_ENV !== "production",
  chainWebpack: config => {
    if (process.env.NODE_ENV !== "production") config.module.rule("eslint").use("eslint-loader").options({fix: true})
    config.resolve.alias
      .set("@", path.resolve(__dirname, "src"))
      .set("@components", path.resolve(__dirname, "src/components"))
      .set("@views", path.resolve(__dirname, "src/views"))
      .set("@router", path.resolve(__dirname, "src/router"))
      .set("@store", path.resolve(__dirname, "src/store"))
      .set("@constants", path.resolve(__dirname, "src/constants"))
      .set("@lib", path.resolve(__dirname, "src/lib"))
      .set("@assets", path.resolve(__dirname, "src/assets"))
      .set("@styles", path.resolve(__dirname, "src/styles"))
      .set("@i18n", path.resolve(__dirname, "src/i18n"))
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === "production") {
      return {
        plugins: [
          new PrerenderSpaPlugin(
            path.resolve(__dirname, "dist"),
            [ "/", "/donate", "/contact", "/terms", "/privacy"],
            {
                // options
            }
          ),
        ],
      }
    } else {
      return {
      }
    }
  }
}
