import { LineChart } from '@mui/x-charts/LineChart';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import useFetchData from '../functions/useFetchData';

export default function ChartUI() {
  const { data, loading, error } = useFetchData();

  if (loading) {
    return (
      <Box sx={{ height: 120, display: 'flex', alignItems: 'center' }}>
        Cargando gráfico...
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ height: 120, display: 'flex', alignItems: 'center', color: 'error.main' }}>
        {error}
      </Box>
    );
  }

  if (!data) {
    return (
      <Box sx={{ height: 120, display: 'flex', alignItems: 'center' }}>
        No hay datos disponibles.
      </Box>
    );
  }

  // Tomamos, por ejemplo, las próximas 24 horas para el gráfico
  const labelsAll = data.hourly.time.map((t) => t.substring(11, 16)); // HH:MM
  const tempsAll = data.hourly.temperature_2m;
  const windsAll = data.hourly.wind_speed_10m;

  const maxPoints = 24;
  const labels = labelsAll.slice(0, maxPoints);
  const temps = tempsAll.slice(0, maxPoints);
  const winds = windsAll.slice(0, maxPoints);

  return (
    <>
      <Typography variant="h5" component="div" sx={{ mb: 2 }}>
        Temperatura y velocidad del viento (próximas {labels.length} horas)
      </Typography>
      <LineChart
        height={300}
        series={[
          {
            data: temps,
            label: `Temp (${data.hourly_units.temperature_2m})`,
          },
          {
            data: winds,
            label: `Viento (${data.hourly_units.wind_speed_10m})`,
          },
        ]}
        xAxis={[
          {
            scaleType: 'point',
            data: labels,
          },
        ]}
      />
    </>
  );
}
