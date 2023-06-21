const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      token: null,
      cf_url: 'https://3000-nchang007-fullstartwars-kwutb4wefk5.ws-us89.gitpod.io',
      cb_url: 'https://3001-nchang007-fullstartwars-kwutb4wefk5.ws-us89.gitpod.io',
      characters: [],
      planets: [],
      starships: [],
      created: [],
      favorites: [],
      user_name: null,
    },
    actions: {
      loadData: () => {
        fetch("https://swapi.dev/api/people")
          .then((res) => res.json())
          .then((data) => {
            setStore({ characters: data.results });
          })
          .catch((error) => {
            console.log(error);
          });

        fetch("https://swapi.dev/api/planets")
          .then((res) => res.json())
          .then((data) => {
            setStore({ planets: data.results });
          })
          .catch((error) => {
            console.log(error);
          });

        fetch("https://swapi.dev/api/starships")
          .then((res) => res.json())
          .then((data) => {
            setStore({ starships: data.results });
          })
          .catch((error) => {
            console.log(error);
          });

        fetch(cb_url + "/api/characters")
          .then((res) => res.json())
          .then((data) => {
            setStore({ created: data.data });
          })
          .catch((error) => {
            console.log(error);
          });
        const cb_url = getStore().cb_url
        //this is to update the favorites when the user logs in
        const token = sessionStorage.getItem("token");
        if (token) {
          const opts = {
            headers: {
              Authorization: "Bearer " + token
            },
           // method: "POST"
          };
          fetch(cb_url + "/api/getfavorites",opts)
            .then((res) => res.json())
            .then((data) => {
              setStore({ favorites: data.favorites });
            })
            .catch((error) => {
              console.log(error);
            });
        }
      },
      getCharacter: (idx) => {
        const characters = getStore().characters;
        return characters[idx];
      },
      getPlanet: (idx) => {
        const planets = getStore().planets;
        return planets[idx];
      },
      getStarship: (idx) => {
        const starships = getStore().starships;
        return starships[idx];
      },
      getCreated: (idx) => {
        const created = getStore().created;
        return created[idx];
      },

      syncTokenFromSessionStore: () => {
        const token = sessionStorage.getItem("token");
        if (token && token != "" && token != undefined)
          setStore({ token: token });
      },

      logout: () => {
        const cf_url = getStore().cf_url
        const token = sessionStorage.removeItem("token");
        setStore({ token: null });
        window.location.href = cf_url + "/";
      },

      login: async (email, password) => {
        const cb_url = getStore().cb_url
        const opts = {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        };
        try {
          const res = await fetch(cb_url + "/api/login", opts);
          if (res.status !== 200) {
            alert("there has been an error");
            return false;
          }
          const data = await res.json();
          sessionStorage.setItem("token", data.access_token);
          data.favorites.forEach(f => {
            //was returning an error bc it didnt like the single quotes so the line below turns the single into double quotes 
            f.item = f.item.replace(/'/g, '"')
            f.item = JSON.parse(f.item)
          })
          setStore({ token: data.access_token, favorites: data.favorites, user_name: data.user_name });
          return true;
        } catch (error) {console.error(error)}
      },

      createUser: async (name, email, password) => {
        const cb_url = getStore().cb_url
        const cf_url = getStore().cf_url
        const opts = {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            name: name,
            email: email,
            password: password,
          }),
        };
        try {
          const res = await fetch(cb_url + "/api/createUser", opts);
          if (res.status !== 200) {
            alert("there has been an error");
            return false;
          }
          const data = await res.json();
          // console.log(data);
          if (data.status == "true") {
            //redirect to login
            window.location.href = cf_url + "/login" 
          }
          return true;
        } catch (error) {console.error(error);}
      },

      addFavorite: (item) => {
        const cb_url = getStore().cb_url
        let f = getStore().favorites;
        let t = getStore().token;
        if (sessionStorage.getItem("token")) {
          const opts = {
            headers: {
              Authorization: "Bearer " + t,
			        'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(item),
          };
          fetch(cb_url + "/api/favorites", opts)
            .then((response) => response.json())
            .then((data) => {
              if(data.msg == "ok") {
                f.push(item);
                setStore({ favorites: f });
              }
            })
            .catch((error) => {console.log(error);});
        }
      },
      removeFavorite: (item) => {
        const cb_url = getStore().cb_url
        let f = getStore().favorites;
        let t = getStore().token;
        if (sessionStorage.getItem("token")) {
          const opts = {
            headers: {
              Authorization: "Bearer " + t,
			        'Content-Type': 'application/json'
            },
            method: "DELETE",
            body: JSON.stringify(item),
          };
          fetch(cb_url + "/api/deletefav", opts)
            .then((response) => response.json())
            .then((data) => {
              if(data.msg == "ok") {
                f.forEach((el, i) => {
                  if (el.id === item.id && el.type === item.type) {
                    f.splice(i, 1);
                  }
                });
                setStore({ favorites: f });
              }
            })
            .catch((error) => {console.log(error);});
        }
      },



    },
  };
};

export default getState;