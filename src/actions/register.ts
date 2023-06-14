import axios from 'axios';

import { IAgent } from "../type";
import { API_COUNTRYSTATECITY_ENDPOINT, API_KEY } from "../config";

export const getCities = async () => {
  try {
    const response  = await axios({
      url: API_COUNTRYSTATECITY_ENDPOINT,
      method: 'get',
      headers: {
        'X-CSCAPI-KEY': API_KEY
      }
    });
    if (response) return response.data;
  } catch (err) {
    console.log('CountryStateCities api fetching failed.', err);
  };
};

export const requestNewUserRegister = async (values: IAgent) => {
  try {
    await axios.post('/register', {
      ...values,
      practiceAreas: values.practiceAreas.join(',')
    });
  } catch (err) {
    console.log(err);
  };
};