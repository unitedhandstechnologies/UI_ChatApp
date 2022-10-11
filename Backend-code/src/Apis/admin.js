import axios from 'utils/handleAxios';

export const Adminlogin = ({ email, password }) => {
	return axios.post(`/login`, {
		email,
		password,
	});
};

export const dashBoard = () => {
	return axios.get(`/dashboard`);
};
export const packageList = () => {
	return axios.get('/package-list');
};
export const updatePackagePrice = (data) => {
	return axios.put('/package-list', data);
};
export const users = (page = 1, limit = 10, q = '') => {
	return axios.get('/users', {
		params: {
			page,
			limit,
			q,
		},
	});
};
export const consultationData = (page = 1, limit = 10, q = '', status = '') => {
	return axios.get('/consultation', {
		params: {
			page,
			limit,
			q,
			status,
		},
	});
};

export const advisorList = (page = 1, limit = 10, q = '', status = '') => {
	return axios.get('/advisors', {
		params: {
			page,
			limit,
			q,
			status,
		},
	});
};

export const appInfo = () => {
	return axios.get(`/app-info`);
};
export const getSpecialties = (page = 1, limit = 1000, q = '') => {
	return axios.get('/specialties', {
		params: {
			page,
			limit,
			q,
		},
	});
};

export const updateAppInfo = (data) => {
	return axios.put(`/app-info`, data);
};

export const addUser = (data) => {
	const form = new FormData();
	form.append('name', data.name);
	form.append('email', data.email);
	form.append('password', data.password);
	form.append('profile', data.profile);
	form.append('phone', data.phone);
	form.append('userType', 0);
	form.append('status', 1);
	return axios.post(`/users`, form);
};
export const addAdvisorInfo = (data) => {
	return axios.post('/advisors', data);
};

export const getUserInfo = (id) => {
	return axios.get(`/user-info/${id}`);
};
export const getProviderInfo = (id) => {
	return axios.get(`/provider-info/${id}`);
};
export const updateDocumentStatus = ({ status, userId }) =>
	axios.put('/update-document', { userId, status });

export const getAppSettings = () => axios.get('/app-settings');
export const getWithDrawRequest = (page = 1, limit = 10, q = '', status) =>
	axios.get('/withdraw-request', {
		params: {
			page,
			limit,
			q,
			status,
		},
	});

export const editUserData = (data) => {
	const form = new FormData();
	form.append('id', data.id);
	form.append('name', data.name);
	form.append('email', data.email);
	form.append('password', data.password);
	form.append('profile', data.profile);
	form.append('phone', data.phone);
	return axios.put(`/users`, form);
};
export const editAdvisorsData = (data) => {
	return axios.put(`/advisors`, data);
};
export const updateProfile = (data) => {
	const form = new FormData();
	form.append('first_name', data.first_name);
	form.append('last_name', data.last_name);
	form.append('password', data.password);
	form.append('email', data.email);
	form.append('token', data.token);
	form.append('profile', data.image);
	form.append('id', data.id);
	return axios.post(`/admin-profile`, form);
};

export const updateUser = (data) => {
	return axios.put(`/users`, data);
};
export const addUserPoints = (data) => {
	return axios.post(`/add-user-point`, data);
};

export const updateAllStatus = (data) => {
	return axios.put(`/update-status`, data);
};
export const sendPush = (data) => {
	return axios.put(`/send-push`, data);
};
export const updateSetting = (data) => {
	return axios.put(`/app-settings`, data);
};
export const cancelSubscription = (data) => {
	return axios.post(`/cancel-subscription`, data);
};

export const deleteUser = (data) => {
	return axios.delete(
		`/users`,
		{ data },
		{
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
		}
	);
};
