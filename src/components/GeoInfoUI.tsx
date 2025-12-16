import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import { type OpenMeteoResponse } from '../types/DashboardTypes';

interface GeoInfoUIProps {
  data: OpenMeteoResponse | null;
  loading: boolean;
  error: string | null;
  selectedCity: string;
}

export default function GeoInfoUI({ data, loading, error, selectedCity }: GeoInfoUIProps) {
  const cityName = selectedCity.charAt(0).toUpperCase() + selectedCity.slice(1);

  const getNowInTimezone = (timeZone?: string) => {
    try {
      if (!timeZone) return '—';
      return new Date().toLocaleString('es-EC', {
        timeZone,
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {

      return new Date().toLocaleString('es-EC');
    }
  };

  return (
    <Card
      sx={{
        height: '100%',
        borderRadius: 3,
        border: '1.5px solid #050505ff', 
        boxShadow: '0px 6px 18px rgba(0, 0, 0, 0.15)',
        transition: 'all 0.25s ease',
        '&:hover': {
          boxShadow: '0px 10px 26px rgba(0, 0, 0, 0.22)',
          transform: 'translateY(-2px)',
        },
      }}
    >

      <CardContent sx={{ height: '100%' }}>
        <Typography
          variant="h6"
          sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, mb: 1 }}
        >
          Información geográfica
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          Ciudad seleccionada: <b>{cityName}</b>
        </Typography>

        <Divider sx={{ mb: 2 }} />

        {loading && (
          <Typography variant="body2" color="text.secondary">
            Cargando información geográfica...
          </Typography>
        )}

        {!loading && (error || !data) && (
          <Typography variant="body2" color="error">
            {error ?? 'No hay datos disponibles.'}
          </Typography>
        )}

        {!loading && !error && data && (
          <Box sx={{ display: 'grid', gap: 0.8 }}>
            <Typography variant="body2">
              <b>Latitud:</b> {data.latitude}
            </Typography>
            <Typography variant="body2">
              <b>Longitud:</b> {data.longitude}
            </Typography>
            <Typography variant="body2">
              <b>Elevación:</b> {data.elevation}
            </Typography>
            <Typography variant="body2">
              <b>Zona horaria:</b> {data.timezone} ({data.timezone_abbreviation})
            </Typography>
            <Typography variant="body2">
              <b>Hora actual:</b> {getNowInTimezone(data.timezone)}
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
