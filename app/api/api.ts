"use client";

import axios from "axios";

const baseUrl = "http://localhost:3000";

const fetchData = async (endpoint: string) => {
  try {
    const response = await axios.get(`${baseUrl}/${endpoint}`);
    const items = await response.data;
    return items;
  } catch (error) {
    console.error(error);
  }
};

const postData = async (endpoint: string, data: object) => {
  try {
    const response = await axios.post(`${baseUrl}/${endpoint}`, data);
    const item = await response.data;
    return item;
  } catch (error) {
    console.error(error);
  }
};

const putData = async (endpoint: string, data: object) => {
  try {
    const response = await axios.put(`${baseUrl}/${endpoint}`, data);
    const item = await response.data;
    return item;
  } catch (error) {
    console.error(error);
  }
};

const deleteData = async (endpoint: string) => {
  try {
    await axios.delete(`${baseUrl}/${endpoint}`);
  } catch (error) {
    console.error(error);
  }
};

export { fetchData, postData, putData, deleteData };
