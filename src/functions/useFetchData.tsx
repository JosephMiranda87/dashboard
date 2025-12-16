import { useEffect, useState } from 'react';
import { type OpenMeteoResponse } from '../types/DashboardTypes';

interface UseFetchDataState {
  data: OpenMeteoResponse | null;
  loading: boolean;
  error: string | null;
}

const CITY_COORDS: Record<string, { latitude: number; longitude: number }> = {
  guayaquil: { latitude: -2.1962, longitude: -79.8862 },
  quito: { latitude: -0.2298, longitude: -78.525 },
  manta: { latitude: -0.9494, longitude: -80.7314 },
  cuenca: { latitude: -2.9005, longitude: -79.0045 },
};

export default function useFetchData(selectedCity: string | null): UseFetchDataState {
  const [data, setData] = useState<OpenMeteoResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const cityKey = selectedCity ?? 'guayaquil';
        const cityConfig = CITY_COORDS[cityKey];
        const URL = `https://api.open-meteo.com/v1/forecast?latitude=${cityConfig.latitude}&longitude=${cityConfig.longitude}&hourly=temperature_2m,wind_speed_10m&current=temperature_2m,wind_speed_10m,relative_humidity_2m,apparent_temperature,rain,precipitation&timezone=auto`;

        const response = await fetch(URL);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const json = (await response.json()) as OpenMeteoResponse;
        setData(json);
      } catch (err) {
        console.error('Error fetching data', err);
        setError('Error al obtener los datos del clima');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCity]);

  return { data, loading, error };
}
