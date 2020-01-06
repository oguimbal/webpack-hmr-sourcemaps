# Purpose

**NB: Only use this plugin when serving a NodeJS app from Webpack HMR**

When using webpack HMR, if you want source maps, you have two options:

- `devtool: 'source-map'` or equivalent => takes a long time to recompile (when watching changes)
- `devtool: 'eval-source-maps'` or equivalent => broken stacktraces, wrong files in maps.


This plugin solves it by replacing the sourcemap plugin and making eval sourcemaps work for real.



# Usage

```
npm i webpack-hmr-sourcemaps -D
```

**DO NOT REGISTER [source-map-support](https://www.npmjs.com/package/source-map-support) when using this plugin.**

```
const webpack = require('webpack');
const HmrEvalSourceMapDevToolPlugin = require('webpack-hmr-sourcemaps');

module.exports = {
    // [...]
    devtool: prod ? 'source-map' : false,
    plugins: [
        ...prod ? [] : [
            new webpack.HotModuleReplacementPlugin(),
            new HmrEvalSourceMapDevToolPlugin({
                columns: true,
                module: true,
            })
        ],
    ]
}
```
