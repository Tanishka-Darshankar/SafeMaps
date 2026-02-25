export async function geocodeArea(areaName) {
  const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(areaName)}`);
  const data = await response.json();

  if (!data || data.length === 0) {
    throw new Error(`No results found for ${areaName}`);
  }

  const { lat, lon } = data[0];
  return [parseFloat(lat), parseFloat(lon)];
}
