const axios = require('axios');
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			cf_url: 'https://3000-4geeksacademy-mhm-wimp591pss4.ws-us101.gitpod.io',
			cb_url: 'https://3001-4geeksacademy-mhm-wimp591pss4.ws-us101.gitpod.io',
			condition: [],
			video: [],
		},
		actions: {
			// Use getActions to call a function within a function
			getCondition: async (condition) => {
				axios.get(`https://api.nhs.uk/mental-health/conditions/${condition}`, {
					headers: {
						'subscription-key': process.env.NHS_API_KEY,
						'subscription-key': process.env.NHS_API_KEY_SECONDARY

					}
				})
					.then(response => {
						setStore({ condition: response.data })
					})
					.catch(error => {
						console.error(error);
						console.log({ error: 'Internal server error' });
					});
			},

			getVideo: async () => {
				const search = req.query.search;
				axios
					.get('https://www.googleapis.com/youtube/v3/search', {
						params: {
							q: search,
							key: 'AIzaSyC2PlQqnTpfW5zcRsMGVabvkg31tZQesao'
						}
					})
					.then(response => {
						const videoId = response.data.items[0].id.videoId;
						console.log({ videoId });
					})
					.catch(error => {
						console.error(error);
						console.log({ error: 'Internal server error' });
					});
			},

			createUser: async (email, password) => {
				const cb_url = getStore().cb_url;
				const cf_url = getStore().cf_url;
				const url = cb_url + "/api/signup";
				const data = {
					email: email,
					password: password,
				};
				try {
					const response = await axios.post(url, data)

					if (response.status !== 200) {
						alert("There has been an error");
						return false;
					}

					const responseData = response.data;

					if (responseData.status === "true") {
						window.location.href = cf_url + "/home"
					}

					return true;
				} catch (error) {
					console.error(error);
				}
			},

			login: async (email, password) => {
				const cb_url = getStore().cb_url;
				const url = cb_url + "/api/login";
				const data = {
					email: email,
					password: password,
				};

				try {
					const response = await axios.post(url, data, {
						headers: {
							"Content-Type": "application/json"
						},
					});

					if (response.status !== 200) {
						alert("There has been an error");
						return false;
					}

					const responseData = response.data;
					sessionStorage.setItem("token", responseData.access_token);

					setStore({ token: responseData.access_token, favorites: responseData.favorites, user_name: responseData.user_name });
					return true;
				} catch (error) {
					console.error(error);
				}
			},
			logout: async (email, password) => {
				const cf_url = getStore.cf_url
				const token = sessionStorage.removeItem("token");
				setStore({ token: null });
				window.location.href = "/";
			},
		}
	};
};

export default getState