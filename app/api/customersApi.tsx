"use client";

const baseUrl = "http://localhost:3000";

const fetchData = async (endpoint: string) => {
  try {
    const response = await fetch(`${baseUrl}/${endpoint}`);
    const users = await response.json();
    return users;
  } catch (error) {
    console.error(error);
  }
};

export { fetchData };
