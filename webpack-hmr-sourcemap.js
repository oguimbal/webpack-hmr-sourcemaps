const HmrEvalSourceMapDevToolModuleTemplatePlugin = require("./webpack-hmr-sourcemap-plugin");
const SourceMapDevToolModuleOptionsPlugin = require("webpack/lib/SourceMapDevToolModuleOptionsPlugin");
const BannerPlugin = require("webpack/lib/BannerPlugin");


class HmrEvalSourceMapDevToolPlugin {
	constructor(options) {
		if (arguments.length > 1) {
			throw new Error(
				"EvalSourceMapDevToolPlugin only takes one argument (pass an options object)"
			);
		}
		if (typeof options === "string") {
			options = {
				append: options
			};
		}
		if (!options) options = {};
		this.options = options;
	}

	apply(compiler) {
		const options = this.options;
		compiler.hooks.compilation.tap(
			"EvalSourceMapDevToolPlugin",
			compilation => {
				new SourceMapDevToolModuleOptionsPlugin(options).apply(compilation);
				new HmrEvalSourceMapDevToolModuleTemplatePlugin(
					compilation,
					options
				).apply(compilation.moduleTemplates.javascript);
			}
		);
		// add banner
		new BannerPlugin({
			raw: true,
			entryOnly: true,
			banner: `
(function() {
	const sourceSupport = require('@oguimbal/source-map-support');
	const repo = {};
	global.__mapWebpackHmrSource__ = function(fp, content) {
		repo[fp] = content;
		sourceSupport.emptyCache();
	}
	sourceSupport.install({
		retrieveFile: x => repo[x],
	});
})();`,
		}).apply(compiler);
	}
}

module.exports = HmrEvalSourceMapDevToolPlugin;
