const { eleventyImageTransformPlugin } = require("@11ty/eleventy-img");
const markdownIt = require('markdown-it');
const dumpFilter = require("@jamshop/eleventy-filter-dump");
const markdownCaption = require('./functions/captions');
const path = require('path')
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
	}).use(markdownCaption));

	eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
		extensions: "html",
		formats: ["avif", "webp", "jpeg"],
		// widths: ["auto"],
		defaultAttributes: {
			loading: "lazy",
			decoding: "async",
		},
	});

	eleventyConfig.addCollection("chapters", function (collectionApi) {
		return collectionApi.getFilteredByTag("chapter");
	});

	eleventyConfig.addPassthroughCopy("_src/_assets/");
	eleventyConfig.addFilter(
		'cssmin',
		code => new CleanCSS({}).minify(code).styles
	);
	eleventyConfig.addFilter('markdown', markdownString => md.render( markdownString ) );

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
