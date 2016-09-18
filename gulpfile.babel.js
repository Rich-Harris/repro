import gulp from "gulp";
import {rollup} from "rollup";
import nodeResolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import babel from "rollup-plugin-babel";
import replace from "rollup-plugin-replace";

const root = "app/";
const output = "build/";
const paths = {
	root: root,
	output: output,
 	html: root + "*.html",
	scriptEntry: root + "scripts/index.js",
	scriptOutput: output + "scripts/index.js",
	scripts: root + "scripts/**/*.js"
};

let cache;
gulp.task("scripts", function()
{
	let plugins = [
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
	];

	return rollup({
		entry: paths.scriptEntry,
		plugins: plugins,
		cache: cache
	}).then(b => {
		b.write({
			format: "iife",
			sourceMap: true,
			dest: paths.scriptOutput
		});

		cache = b;
	});
});

gulp.task("html", function()
{
	return gulp.src(paths.html)
		.pipe(gulp.dest(paths.output));
});

gulp.task("watch", gulp.series(function watchFiles(done)
{
	gulp.watch(paths.html, gulp.series("html"));
	gulp.watch(paths.scripts, gulp.series("scripts"));
	done();
}));

gulp.task("default", gulp.series(["html", "scripts", "watch"]))
