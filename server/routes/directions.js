// server/routes/directions.js
import express from 'express';
import axios from 'axios';
import Danger from '../models/danger.js';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Geocode using OpenStreetMap Nominatim
const geocode = async (location) => {
  const res = await axios.get('https://nominatim.openstreetmap.org/search', {
    params: {
      q: location,
      format: 'json',
      limit: 1,
    },
  });

  if (res.data.length === 0) {
    throw new Error(`Location "${location}" not found`);
  }

  const { lat, lon } = res.data[0];
  return [parseFloat(lon), parseFloat(lat)];
};

// Fetch route from OpenRouteService
const fetchRoute = async (startCoord, endCoord) => {
  const apiKey = process.env.ORS_API_KEY;
  if (!apiKey) {
    throw new Error('ORS_API_KEY missing in .env');
  }

  const url = 'https://api.openrouteservice.org/v2/directions/foot-walking/geojson';
  const res = await axios.post(
    url,
    {
      coordinates: [startCoord, endCoord],
    },
    {
      headers: {
        Authorization: apiKey,
        'Content-Type': 'application/json',
      },
    }
  );

  return res.data;
};

// Check for nearby dangers (within 100m of any path point)
const checkRouteSafety = async (routeGeoJson) => {
  const pathCoords = routeGeoJson.features[0].geometry.coordinates;
  const dangers = await Danger.find();

  const isSafe = !dangers.some((danger) =>
    pathCoords.some(([lng, lat]) => {
      const dist = getDistanceFromLatLonInKm(lat, lng, danger.latitude, danger.longitude);
      return dist < 0.1; // 100 meters
    })
  );

  return isSafe;
};

// Haversine Formula
const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of Earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const deg2rad = (deg) => (deg * Math.PI) / 180;

router.post('/api/directions', async (req, res) => {
  const { source, destination } = req.body;

  if (!source || !destination) {
    return res.status(400).json({ error: 'Source and destination are required' });
  }

  try {
    const startCoord = await geocode(source);
    const endCoord = await geocode(destination);

    const route = await fetchRoute(startCoord, endCoord);
    const isSafe = await checkRouteSafety(route);

    res.json({ route, isSafe });
  } catch (error) {
    console.error('🛑 Error in /api/directions:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch directions' });
  }
});

export default router;
