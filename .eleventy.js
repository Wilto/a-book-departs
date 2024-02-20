const Image = require("@11ty/eleventy-img");
const path = require('path')
const CleanCSS = require('clean-css');
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const md = require('markdown-it')({
	html: false,
	breaks: true
});

module.exports = function(eleventyConfig) {
	async function imageShortcode(src, alt, sizes="100vw", cls="") {
		let metadata = await Image(src, {
			formats: ["avif", "webp", "jpeg"],
			widths: [800, 600, 400],
			urlPath: "/img/",
			outputDir: "./_site/img/",
			filenameFormat: function( id, src, width, format, options ) {
				const ext = path.extname( src ),
				name = path.basename( src, ext );

				return `${name}-${width}.${format}`
			}
		});

		let imageAttributes = {
			alt,
			class: cls,
			sizes,
			loading: "lazy"
		};

		return Image.generateHTML(metadata, imageAttributes);
	}

	eleventyConfig.addAsyncShortcode("respimg", imageShortcode);

	eleventyConfig.addCollection("chapters", function(collection) {
		return collection.getAllSorted().filter(function(item) {
			return item.inputPath.match(/^\.\/_src\/chapter\//) !== null;
		}).sort(function(a, b) {
			return b.data.order - a.data.order;
		});
	});

	eleventyConfig.addPassthroughCopy("_src/_assets/");
	eleventyConfig.addPlugin(syntaxHighlight);
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
