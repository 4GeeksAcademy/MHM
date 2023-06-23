const axios = require('axios');
const getState = ({ getStore, getActions, setStore }) => {

	return {
		store: {
			token: null,
			cf_url: 'https://r-moore98-ideal-space-engine-66775xw6qvvc46gw-3000.preview.app.github.dev',
			cb_url: 'https://r-moore98-ideal-space-engine-66775xw6qvvc46gw-3001.preview.app.github.dev',
			condition: [],
			video: [],
		},
		actions: {
			// Use getActions to call a function within a function
			getCondition: async () => {
				axios.get('https://www.nhs.uk/mental-health/conditions/INT:{condition_id}', {
					headers: {
						'subscription-key': 'cc1c63174d5347d1ac10dd551d783a2f'
					}
				})
					.then(response => {
						const articles = response.data.articles;
						console.log(articles);
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
