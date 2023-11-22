const axios = require('axios');

const githubApi = async (username, token) => {
  try {
    const response = await axios.get(`https://api.github.com/users/${username}/repos`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const repositories = response.data.map(repo => repo.name);
    return repositories;
  } catch (error) {
    throw error;
  }
};

module.exports = githubApi;
