const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = 3000;

app.get('/masters/leaderboard', async (req, res) => {
  const options = {
    method: 'GET',
    url: 'https://live-golf-data.p.rapidapi.com/leaderboard',
    params: {
      orgId: '1',
      tournId: '014', // Masters Tournament ID
      year: '2025',
    },
    headers: {
      'x-rapidapi-key': process.env.RAPIDAPI_KEY, // use .env for security
      'x-rapidapi-host': 'live-golf-data.p.rapidapi.com',
    },
  };

  try {
    const response = await axios.request(options);
    const players = response.data.leaderboardRows;

    const leaderboard = players.map(player => ({
      player: `${player.firstName} ${player.lastName}`,
      score: player.total,
    }));

    res.json(leaderboard);
  } catch (error) {
    console.error('Error fetching leaderboard:', error.message);
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
