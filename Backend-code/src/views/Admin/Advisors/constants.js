export const additional = {
	currentPage: 1,
	totalItemCount: 0,
	totalPage: 1,
	search: '',
	pageSizes: [10, 20, 50, 100],
};
export const gender = {
	1: 'Male',
	2: 'Female',
	3: 'Other',
};

export const initialState = {
	name: '',
	email: '',
	password: '',
	aboutUs: '',
	specialties: [],
	confirmPassword: '',
};
export const editState = {
	name: '',
	email: '',
	aboutUs: '',
	specialties: [],
};
export const ageRange = [
	'1-10',
	'10-20',
	'20-30',
	'30-40',
	'40-50',
	'50-60',
	'60-100',
];

export const tabs = [
	{
		key: 'usersDetails',
		name: 'Provider Details',
	},

	{
		key: 'documents',
		name: 'Documents',
	},
	{
		key: 'services',
		name: 'Services',
	},
	{
		key: 'bookings',
		name: 'Bookings',
	},
];
