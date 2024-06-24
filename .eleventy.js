const { eleventyImageTransformPlugin } = require("@11ty/eleventy-img");
const markdownIt = require('markdown-it');
const markdownItCaption = require('./util/caption');
const dumpFilter = require("@jamshop/eleventy-filter-dump");
const path = require('path');
const sass = require('sass');
const CleanCSS = require('clean-css');
const md = require('markdown-it')({
	html: false,
	breaks: true
});

module.exports = function(eleventyConfig) {
	eleventyConfig.addFilter("dump", dumpFilter);

	eleventyConfig.setLibrary('md', markdownIt({
		html: true,
		breaks: true,
		linkify: true
	}).use( markdownItCaption));

	eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
		extensions: "html",
		formats: ["avif", "webp", "jpeg"],
		// widths: ["auto"],
		defaultAttributes: {
			loading: "lazy",
			decoding: "async",
		},
	});

	eleventyConfig.addPassthroughCopy("_src/_assets/");
	eleventyConfig.addFilter(
		'cssmin',
		code => sass.compileString( code/*, {style: "compressed"}*/).css
	);
	eleventyConfig.addFilter('markdown', markdownString => md.render( markdownString ) );

	eleventyConfig.addPassthroughCopy("admin/");


	return {
		templateFormats: [
			"md",
			"njk",
			"html"
		],

		pathPrefix: "/",
		markdownTemplateEngine: "njk",
		htmlTemplateEngine: "njk",
		dataTemplateEngine: "njk",
		passthroughFileCopy: true,
		dir: {
			input: "_src",
			includes: "_templates",
			data: "_data",
			output: "_site"
		}
	};
};
