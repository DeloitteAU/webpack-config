import './script.js-import.js';
import './script.js-import.css';
import './script.js-import.scss';

/* This comment should be removed by build process */

console.log('Bonjour from script.js BOO');

const pets = ['cat', 'dog', 'bat'];

// Array.prototype.includes requires a polyfill for use in IE
console.log(pets.includes('cat'));
