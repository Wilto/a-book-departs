import { processBook } from '@eatonfyi/dq';
await processBook('books/javascript-for-web-designers.epub', { 
	root: '.',
	data: '_data',
	chapters: '_src/chapter',
	images: '_src/chapter/image',
});