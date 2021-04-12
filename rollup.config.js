import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import css from 'rollup-plugin-css-only';

console.log('process.env.CORDOVA_PLATFORM');
console.log(process.env.CORDOVA_PLATFORM);

const production = !process.env.ROLLUP_WATCH;

const cordovaFolder = 'src-cordova';
let publicFolder = 'public';
let publicBrowserFolder = 'public';
if (process.env.CORDOVA_PLATFORM) {
	publicFolder = `${cordovaFolder}/www`
}
if (process.env.CORDOVA_PLATFORM == 'browser') {
	publicFolder = `${cordovaFolder}/platforms/browser/www`
}

export default {
	input: 'src/main.js',
	output: [{
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: `${publicFolder}/bundle.js`
	}/*,
	{
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: `${publicBrowserFolder}/bundle.js`
	}*/],
	plugins: [
		svelte({
			compilerOptions: {
				// enable run-time checks when not in production
				dev: !production
			}
			// // enable run-time checks when not in production
			// dev: !production,
			// // we'll extract any component CSS out into
			// // a separate file — better for performance
			// css: css => {
			// 	css.write(`${publicFolder}/bundle.css`);
			// 	//css.write(`${publicBrowserFolder}/bundle.css`);
			// }
			// //emitCss: true,
		}),
		// we'll extract any component CSS out into
		// a separate file - better for performance
		css({ output: `bundle.css` }, { output: `${publicBrowserFolder}/bundle.css` }),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration —
		// consult the documentation for details:
		// https://github.com/rollup/rollup-plugin-commonjs
		resolve({ browser: true }),
		commonjs(),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production && livereload(publicFolder),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser()
	],
	watch: {
		clearScreen: false
	}
};
