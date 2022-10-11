export const quillModules = {
	toolbar: [
		['bold', 'italic', 'underline', 'strike', 'blockquote'],
		[
			{ list: 'ordered' },
			{ list: 'bullet' },
			{ indent: '-1' },
			{ indent: '+1' },
		],
		['link', 'image'],
		['clean'],
	],
};

export const initialState = {
	name: '',
	email: '',
	password: '',
	profile: '',
	phone: '',
	description: '',
};

export const quillFormats = [
	'header',
	'bold',
	'italic',
	'underline',
	'strike',
	'blockquote',
	'list',
	'bullet',
	'indent',
	'link',
	'image',
];
export const additional = {
	currentPage: 1,
	totalItemCount: 0,
	totalPage: 1,
	search: '',
	pageSizes: [10, 20, 50, 100],
};
