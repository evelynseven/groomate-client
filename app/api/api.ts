"use client";

import axios from "axios";

const baseUrl =
  process.env.NODE_ENV == "production" ? "/api" : "http://localhost:3000";

const fetchData = async (endpoint: string) => {
  const accessToken = sessionStorage.getItem("access_token");

  try {
    const response = await axios.get(`${baseUrl}/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const items = await response.data;
    return items;
  } catch (error) {
    console.error(error);
  }
};

const postData = async (endpoint: string, data: object) => {
  const accessToken = sessionStorage.getItem("access_token");

  if (accessToken) {
    try {
      const response = await axios.post(`${baseUrl}/${endpoint}`, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const item = await response.data;
      return item;
    } catch (error) {
      console.error(error);
    }
  }

  try {
    const response = await axios.post(`${baseUrl}/${endpoint}`, data);
    const item = await response.data;
    return item;
  } catch (error) {
    console.error(error);
  }
};

const putData = async (endpoint: string, data?: object) => {
  const accessToken = sessionStorage.getItem("access_token");

  try {
    const response = await axios.put(`${baseUrl}/${endpoint}`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const item = await response.data;
    return item;
  } catch (error) {
    console.error(error);
  }
};

const deleteData = async (endpoint: string) => {
  const accessToken = sessionStorage.getItem("access_token");

  try {
    await axios.delete(`${baseUrl}/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

export { fetchData, postData, putData, deleteData };
