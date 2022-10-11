export const additional = {
	currentPage: 1,
	totalItemCount: 0,
	totalPage: 1,
	search: '',
	pageSizes: [10, 20, 50, 100],
};

export const dateRange = [
	{
		name: 'weekly',
		time: '86400',
	},
	{
		name: 'monthly',
		time: '2592000',
	},
	{
		name: 'quarterly',
		time: '10368000',
	},
	{
		name: 'yearly',
		time: '31536000',
	},
];
export const paymentType = {
	1: 'Cash',
	2: 'Stripe',
	3: 'Other',
};
export const bookingStatus = {
	0: 'In process',
	1: 'Accepted',
	2: 'Cancel',
	3: 'Complete',
};
