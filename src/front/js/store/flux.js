const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			condition: []
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

			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
					const data = await resp.json();
					setStore({ message: data.message });
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error);
				}
			},
		}
	};
};
