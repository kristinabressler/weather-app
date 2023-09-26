import axios from 'axios';

export default axios.create({
  baseURL: 'https://developers.zomato.com/api/v2.1',
  headers: {
    'user-key': process.env.REACT_APP_ZOMATO_API_KEY
  }
});