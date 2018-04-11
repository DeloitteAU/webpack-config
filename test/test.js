const assert = require('assert');
const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');
const { exec } = require('child_process');

const cleanDist = () => {
	rimraf.sync(path.join(__dirname, '../packages/demo/dist-custom-dir'));
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
	before(function(done) {
		this.timeout(6000);

		const child = exec('npm run build', {
			cwd: path.resolve(__dirname, '../packages/demo'),
		});
		// child.stdout.pipe(process.stdout);
		child.stderr.pipe(process.stderr);
		child.on('exit', () => {
			done();
		});
	});

	const checkBuild = ({ entry, sourcemap, entryTokens, sourcemapTokens }) => {
		describe(entry, () => {
			const entryPath = path.join(__dirname, '../packages/demo/dist-custom-dir', entry);

			it('should be included in artefact', done => {
				fs.access(entryPath, fs.constants.R_OK, err => {
					assert.strictEqual(err, null);
					done();
				});
			});

			let data;
			before(done => {
				fs.readFile(entryPath, { encoding: 'utf8' }, (err, d) => {
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

			describe('sourcemap', () => {
				const sourcemapPath = path.join(__dirname, '../packages/demo/dist-custom-dir', sourcemap);

				it('should be included in artefact', done => {
					fs.access(sourcemapPath, fs.constants.R_OK, err => {
						assert.strictEqual(err, null);
						done();
					});
				});

				let data;
				before(done => {
					fs.readFile(sourcemapPath, { encoding: 'utf8' }, (err, d) => {
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
	};

	checkBuild({
		entry: 'main.js',
		sourcemap: 'main.js.map',
		entryTokens: ['Bonjour', 'Hola'],
		sourcemapTokens: ['Bonjour', 'Hola'],
	});

	describe('include.js', () => {
		it('should not be included in artefact', done => {
			fs.access(path.join(__dirname, '../packages/demo/dist-custom-dir', 'include.js'), fs.constants.R_OK, err => {
				assert.notEqual(err, null);
				done();
			});
		});
	});

	checkBuild({
		entry: 'main.css',
		sourcemap: 'main.css.map',
		entryTokens: ['background:red', 'text-decoration', ':-ms-input-placeholder{color:gray}'],
		sourcemapTokens: ['$colour: red', 'text-decoration', 'p {'],
	});

	describe('import.css', () => {
		it('should not be included in artefact', done => {
			fs.access(path.join(__dirname, '../packages/demo/dist-custom-dir', 'import.css'), fs.constants.R_OK, err => {
				assert.notEqual(err, null);
				done();
			});
		});
	});
});
