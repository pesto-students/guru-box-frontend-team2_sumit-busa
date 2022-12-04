import axios from 'axios';
import { parseCookies } from 'nookies';

import type { NextPageContext } from 'next';
import type { AxiosRequestHeaders } from 'axios';

//const context = ${parseCookies(context)}
const strapi = axios.create({
  baseURL: 'https://penn-pal-backend.herokuapp.com/api',
  timeout: 1000,
  /*headers : {
    Authorization: `Bearer ${parseCookies(context).jwt}`,
  }*/
});

export const createHeaders = (
  context: NextPageContext
): AxiosRequestHeaders => ({
  Authorization: `Bearer ${parseCookies(context).jwt}`,
});

export default strapi;