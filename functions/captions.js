'use strict'

module.exports = function cap_plugin( md ) {
	md.renderer.rules.image = ( tokens, idx, options, env, self ) => {
		if( tokens[idx].attrs[2] ) {
			let attrs   = tokens[idx].attrs,
				caption = attrs[2][1],
				src     = attrs[0][1],
				alt     = tokens[idx].content,
				id      = 'id-' + ( performance.now().toString() ).replace(/\./gi, '');

			return `<figure><img src="${ src }" alt="${ alt }" id="${ id}"><figcaption aria-describedby="${ id }">${ caption }</figcaption></figure>`;
		}
	}
};