const assert = require('assert');
const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');
const { exec } = require('child_process');

const cleanDist = () => {
	rimraf.sync(path.join(__dirname, '../../packages/demo/dist-custom-dir'));
	rimraf.sync(path.join(__dirname, '../../packages/demo-vuejs/dist'));
};

cleanDist();

const checkBuild = ({ entryPath, entryShouldContain, entryShouldNotContain}) => {
	describe(entryPath, () => {
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

		entryShouldContain.forEach(token => {
			it(`should contain text "${token}"`, () => {
				assert.notStrictEqual(data.indexOf(token), -1);
			});
		});

		entryShouldNotContain.forEach(token => {
			it(`should not contain text "${token}"`, () => {
				assert.strictEqual(data.indexOf(token), -1);
			});
		});
	});
};

// Match array against array of regexes
const matchArray = (a, b) => {
	assert.strictEqual(a.length, b.length);
	a.forEach((val, i) => {
		assert.strictEqual(b[i].test(val), true, `"${val}" did not match regex ${String(b[i])}`);
	});
};

describe('Demo build', () => {
	before(function(done) {
		// Mocha tests have a default max duration of 2 seconds, but the build can take longer
		this.timeout(60000);

		const child = exec('npm run build', {
			cwd: path.resolve(__dirname, '../../packages/demo'),
		});
		// child.stdout.pipe(process.stdout);
		child.stderr.pipe(process.stderr);
		child.on('exit', () => {
			done();
		});
	});

	checkBuild({
		entryPath: path.join(__dirname, '../../packages/demo/dist-custom-dir/main.bundle.js'),
		entryShouldContain: ['Bonjour', 'Hola', 'Here is some CSS in JS', 'Here is some SCSS in JS', '.js-scss-scss'],
		entryShouldNotContain: ['This comment should be removed by build process', '.scss-scss-scss'],
	});

	describe('script.js-import.js', () => {
		it('should not be included in artefact', done => {
			fs.access(path.join(__dirname, '../../packages/demo/dist-custom-dir', 'script.js-import.js'), fs.constants.R_OK, err => {
				assert.notEqual(err, null);
				done();
			});
		});
	});

	checkBuild({
		entryPath: path.join(__dirname, '../../packages/demo/dist-custom-dir/main.css'),
		entryShouldContain: ['background:red', 'text-decoration', ':-ms-input-placeholder{color:#000}', '.scss-scss-scss', '.plain-css-file', '.css-css', '-ms-flex-positive'],
		entryShouldNotContain: ['Here is some CSS in JS', 'Here is some SCSS in JS', '.js-scss-scss'],
	});

	describe('style.scss-import.scss', () => {
		it('should not be included in artefact', done => {
			fs.access(path.join(__dirname, '../../packages/demo/dist-custom-dir/style.scss-import.scss'), fs.constants.R_OK, err => {
				assert.notEqual(err, null);
				done();
			});
		});
	});

});

describe('Vue.js demo build', () => {
	before(function(done) {
		// Mocha tests have a default max duration of 2 seconds, but the build can take longer
		this.timeout(60000);

		const child = exec('npm run build', {
			cwd: path.resolve(__dirname, '../../packages/demo-vuejs'),
		});
		// child.stdout.pipe(process.stdout);
		child.stderr.pipe(process.stderr);
		child.on('exit', () => {
			done();
		});
	});

	checkBuild({
		entryPath: path.join(__dirname, '../../packages/demo-vuejs/dist/main.bundle.js'),
		entryShouldContain: ['Welcome to Your Vue.js App', 'Here is some CSS in Vue.js', 'Avenir', '.vue-scss', '.vue-scss-scss'],
		entryShouldNotContain: ['This should be extracted into a CSS file.'],
	});

	checkBuild({
		entryPath: path.join(__dirname, '../../packages/demo-vuejs/dist/main.css'),
		entryShouldContain: ['background:red', 'This should be extracted into a CSS file.'],
		entryShouldNotContain: ['Avenir', '.vue-scss', '.vue-scss-scss'],
	});
});
