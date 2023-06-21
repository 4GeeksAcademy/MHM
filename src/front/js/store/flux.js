const axios = require('axios');
const getState = ({ getStore, getActions, setStore }) => {

	return {
		store: {
			token: null,
			cf_url: 'https://3000-4geeksacademy-mhm-xwbjejb9wmj.ws-us100.gitpod.io',
			cb_url: 'https://3001-4geeksacademy-mhm-xwbjejb9wmj.ws-us100.gitpod.io',
			condition: [],
			video: [],
		},
		actions: {
			// Use getActions to call a function within a function
			getCondition: async () => {
				axios.get('https://api.nhs.uk/conditions/', {
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
					const response = await axios.post(url, data, {
						headers: {
							"Content-type": "application/json",
							"Assess-Control-Allow_Origin": "*"
						},
					});

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
							"Content-Type": "application/json",
							"Access-Control-Allow-Origin": "*",
						},
					});

					if (response.status !== 200) {
						alert("There has been an error");
						return false;
					}

					const responseData = response.data;
					sessionStorage.setItem("token", responseData.access_token);
					responseData.favorites.forEach(f => {
						f.item = f.item.replace(/'/g, '"');
						f.item = JSON.parse(f.item);
					});

					setStore({ token: responseData.access_token, favorites: responseData.favorites, user_name: responseData.user_name });
					return true;
				} catch (error) {
					console.error(error);
				}
			},
		}
	};
};

export default getState
