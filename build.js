const rollup = require('rollup');
const buble = require('rollup-plugin-buble');
const uglify = require('rollup-plugin-uglify');
const filesize = require('rollup-plugin-filesize');

const packageInfo = require('./package.json');

const banner = `/*! ${packageInfo.name} ${packageInfo.version} - Copyright 2017 ${packageInfo.author} - ${packageInfo.homepage} - ${packageInfo.license} */`;

rollup.rollup({
	entry: 'src/js/hotel-datepicker.js',
	plugins: [buble(), filesize()],
	external: [
		'fecha'
	]
}).then(bundle =>
	bundle.write({
		format: 'umd',
		moduleName: 'HotelDatepicker',
		banner,
		dest: 'dist/js/hotel-datepicker.js',
		globals: {
			fecha: 'fecha'
		}
	})
).catch(console.error);

rollup.rollup({
	entry: 'src/js/hotel-datepicker.js',
	plugins: [
		buble(),
		uglify({
			output: {
				comments(node, comment) {
					if (comment.type === 'comment2') {
						return comment.value[0] === '!';
					}
				}
			}
		}),
		filesize()
	],
	external: [
		'fecha'
	]
}).then(bundle =>
	bundle.write({
		format: 'umd',
		moduleName: 'HotelDatepicker',
		banner,
		dest: 'dist/js/hotel-datepicker.min.js',
		globals: {
			fecha: 'fecha'
		}
	})
).catch(console.error);
