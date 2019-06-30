import axios from 'axios';

export default class BaseApi {
    constructor(config = {useMocks: false}) {
        this.request = this.request(config);
        this.getMethod = this.getMethod.bind(this);
        this.postMethod = this.postMethod.bind(this);
        this.config = config;
    }

    request = config => {
        return axios.create({
            baseURL: 'https://intense-mountain-65807.herokuapp.com/'
        })
    }

    getMethod = (url, params) => {
        return this.request
          .get(url, {params})
          .then(response => {
            return response.data;
          })
          .catch(error => {
            throw error;
          });
      };
    
    postMethod = (url, payload) => {
        return this.request
        .post(url, payload)
        .then(response => {
            return response.data
        })
        .catch(error => {
            throw error;
        })
    }
}
