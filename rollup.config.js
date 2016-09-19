const nodeResolve = require( "rollup-plugin-node-resolve" );
const commonjs = require( "rollup-plugin-commonjs" );
const babel = require( "rollup-plugin-babel" );
const replace = require( "rollup-plugin-replace" );

export default {
	entry: 'app/scripts/index.js',
	dest: 'build/scripts/index.js',
	format: "iife",
	sourceMap: true,
	plugins: [
		nodeResolve({jsnext: true}),
		babel({
			babelrc: false,
			presets: [
				[
					"latest",
					{"es2015": {modules: false}}
				]
			],
			exclude: "node_modules/**"
		}),
		commonjs({
			sourceMap: true
		}),
		replace({
			"process.env.NODE_ENV": `"production"`
		})
	]
};
