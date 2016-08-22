// modules
const uglifyjs   = require("uglify-js");
const path 	     = require('path');
const Handlebars = require('handlebars');
const fs         = require('fs');
const sass 		 = require('node-sass');
const modernizr  = require("modernizr");

// build assets
const assets = {
	videos: [],
	title: 'Eton Messy'
};

// render src
const template   = Handlebars.compile(fs.readFileSync( path.join('src', 'index.hbs'), 'utf8' ), { noEscape: true });
const javascript = uglifyjs.minify(path.join(__dirname, 'src', 'js', 'main.js'));
const styles 	 = sass.renderSync({ file: path.join('src', 'scss', 'main.scss'), outputStyle: 'compressed' });

Handlebars.registerHelper('videoSource', (videos)=> {
	return videos.map((video) => {
		return `<source src="${video.filename}" type="${video.type}" />`
	});
});

const renderedTemplate = template(assets);

// save files
fs.writeFileSync(path.join('public', 'styles.css'), styles);
fs.writeFileSync(path.join('public', 'main.js'), javascript.code);
fs.writeFileSync(path.join('public', 'index.html'), renderedTemplate);

console.log('Files Rendered');