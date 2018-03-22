const assert = require('assert');
const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');
const webpack = require('webpack');
const webpackConfig = require('./demo/webpack.config.js');

const cleanDist = () => {
	rimraf.sync(path.join(__dirname, 'demo/dist'));
};
cleanDist();

describe('Array', () => {
	describe('#indexOf()', () => {
		it('should return -1 when the value is not present', () => {
			assert.strictEqual([1,2,3].indexOf(4), -1);
		});
	});
});

describe('Build', () => {
	let stats;

	before(function(done) {
		this.timeout(6000);

		webpack(webpackConfig, (err, s) => {
			if (err) {
				done(err);
			} else {
				stats = s;
				done();
			}
		});
	});

	const checkBuild = ({ entry, sourcemap, entryTokens, sourcemapTokens }) => {
		describe(entry, () => {
			it('should be included in artefact', () => {
				assert.strictEqual(stats.compilation.assets.hasOwnProperty(entry), true);
			});

			describe('loaded file', () => {
				let data;

				before(done => {
					fs.readFile(path.join(__dirname, 'demo/dist', entry), { encoding: 'utf8' }, (err, d) => {
						if (err) {
							done(err);
						} else {
							data = d;
							done();
						}
					});
				});

				entryTokens.forEach(token => {
					it(`should contain text "${token}"`, () => {
						assert.notStrictEqual(data.indexOf(token), -1);
					});
				});
			});

			describe('sourcemap', () => {
				it('should be included in artefact', () => {
					assert.strictEqual(stats.compilation.assets.hasOwnProperty(sourcemap), true);
				});

				describe('loaded file', () => {
					let data;

					before(done => {
						fs.readFile(path.join(__dirname, 'demo/dist', sourcemap), { encoding: 'utf8' }, (err, d) => {
							if (err) {
								done(err);
							} else {
								data = d;
								done();
							}
						});
					});

					sourcemapTokens.forEach(token => {
						it(`should contain text "${token}"`, () => {
							assert.notStrictEqual(data.indexOf(token), -1);
						});
					});
				});
			});
		});
	};

	checkBuild({
		entry: 'main.js',
		sourcemap: 'main.js.map',
		entryTokens: ['Bonjour', 'Hola'],
		sourcemapTokens: ['Bonjour', 'Hola'],
	});

	describe('include.js', () => {
		it('should not be included in artefact', () => {
			assert.strictEqual(stats.compilation.assets.hasOwnProperty('include.js'), false);
		});
	});

	checkBuild({
		entry: 'main.css',
		sourcemap: 'main.css.map',
		entryTokens: ['background:red', 'text-decoration'],
		sourcemapTokens: ['$colour: red', 'text-decoration', 'p {'],
	});

	describe('import.css', () => {
		it('should not be included in artefact', () => {
			assert.strictEqual(stats.compilation.assets.hasOwnProperty('import.css'), false);
		});
	});
});
