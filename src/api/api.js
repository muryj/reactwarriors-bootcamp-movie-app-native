import queryString from "query-string";

export const API_URL = "https://api.themoviedb.org/3";

export const API_KEY_3 = "bfa75e91c5cda1d779e8278820b69bd8";

export const API_KEY_4 =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZmE3NWU5MWM1Y2RhMWQ3NzllODI3ODgyMGI2OWJkOCIsInN1YiI6IjViZjNlYWQ2OTI1MTQxNWNjNDA4ZDM5YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DbtCepBrnTouEdMwZknPyD04iUceWQmStD1vy28Trq8";

export const fetchApi = (url, options = {}) => {
  return new Promise((resolve, reject) => {
    fetch(url, options)
      .then(response => {
        if (response.status < 400) {
          return response.json();
        } else {
          console.log("ERROR");
          throw response;
        }
      })
      .then(data => {
        resolve(data);
      })
      .catch(response => {
        response.json().then(error => {
          reject(error);
        });
      });
  });
};

export default class CallApi {
  static get(url, options = {}) {
    const { params = {} } = options;
    const queryStringParams = {
      api_key: API_KEY_3,
      ...params
    };

    //url = /discover/movie?
    // params = {
    //   language: "ru-RU",
    //   sort_by: sort_by,
    //   page: page,
    //   primary_release_year: primary_release_year
    // }

    return fetchApi(`${API_URL}${url}?${queryString.stringify(queryStringParams)}`, {
      mode: "cors",
      headers: {
        "Content-type": "application/json"
      }
    });
  }
  static post(url, options = {}) {
    const { params = {}, body = {} } = options;
    const queryStringParams = {
      api_key: API_KEY_3,
      ...params
    };

    return fetchApi(`${API_URL}${url}?${queryString.stringify(queryStringParams)}`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(body)
    });
  }
  static delete(url, options = {}) {
    const { params = {}, body = {} } = options;
    const queryStringParams = {
      api_key: API_KEY_3,
      ...params
    };
    return fetchApi(`${API_URL}${url}?${queryString.stringify(queryStringParams)}`, {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(body)
    });
  }
}
