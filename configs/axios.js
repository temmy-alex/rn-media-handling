import Axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ErrorHandler from './error';

const httpClient = Axios.create();

let apiUrl = `${process.env.EXPO_PUBLIC_API_URL}/api/`;

const HttpPost = async (url, data, setting, tempToken) => {
  const accessToken = await AsyncStorage.getItem('accessToken');

  return httpClient
    .post(apiUrl + url, data, {
      headers: {
        Authorization:  tempToken ? `Bearer ${tempToken}` : accessToken ? `Bearer ${accessToken}` : null,
        ...setting
      },
    })
    .then((res) => {
      return res?.data;
    })
    .catch((error) => {
      ErrorHandler(error);
      throw error?.response?.data;
    });
};

const HttpPut = async (url, data, tempToken) => {
  const accessToken = await AsyncStorage.getItem('accessToken');

  return httpClient
    .put(apiUrl + url, data, {
      headers: {
        Authorization: tempToken ? `Bearer ${tempToken}` : accessToken ? `Bearer ${accessToken}` : null,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      ErrorHandler(error);
      throw error?.response.data;
    });
};

const HttpDelete = async (url, tempToken) => {
  const accessToken = await AsyncStorage.getItem('accessToken');

  return httpClient
    .delete(apiUrl + url, {
      headers: {
        Authorization: tempToken ? `Bearer ${tempToken}` : accessToken ? `Bearer ${accessToken}` : null,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      ErrorHandler(error);
      throw error?.response.data;
    });
};

const HttpGet = async (url, tempToken) => {
  const accessToken = await AsyncStorage.getItem('accessToken');
  
  return httpClient
    .get(apiUrl + url, {
      headers: {
        Authorization: tempToken ? `Bearer ${tempToken}` : accessToken ? `Bearer ${accessToken}` : null,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      ErrorHandler(error);
      throw error?.response.data;
    });
};

export { HttpPost, HttpGet, HttpPut, HttpDelete };
