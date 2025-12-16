import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import { type OpenMeteoResponse } from '../types/DashboardTypes';

interface Props {
  data: OpenMeteoResponse | null;
  loading: boolean;
  error: string | null;
}

type Variant = 'orange' | 'blue' | 'purple' | 'green' | 'yellow' | 'sky';

const variantStyle: Record<Variant, { bg: string; shadow: string }> = {
  orange: { bg: 'linear-gradient(135deg, #FF7043, #FF5252)', shadow: '0px 10px 25px rgba(255, 82, 82, 0.35)' },
  blue: { bg: 'linear-gradient(135deg, #29B6F6, #0288D1)', shadow: '0px 10px 25px rgba(2, 136, 209, 0.30)' },
  purple: { bg: 'linear-gradient(135deg, #AB47BC, #7B1FA2)', shadow: '0px 10px 25px rgba(123, 31, 162, 0.30)' },
  green: { bg: 'linear-gradient(135deg, #66BB6A, #43A047)', shadow: '0px 10px 25px rgba(67, 160, 71, 0.30)' },
  yellow: { bg: 'linear-gradient(135deg, #FFCA28, #FFA000)', shadow: '0px 10px 25px rgba(255, 160, 0, 0.30)' },
  sky: { bg: 'linear-gradient(135deg, #42A5F5, #1E88E5)', shadow: '0px 10px 25px rgba(30, 136, 229, 0.28)' },
};

function IndicatorCard({
  title,
  value,
  unit,
  icon,
  variant,
}: {
  title: string;
  value: string;
  unit?: string;
  footer?: string;
  icon?: string;
  variant: Variant;
}) {
  const style = variantStyle[variant];

  return (
    <Card
      sx={{
        minHeight: 190,
        height: '100%',
        borderRadius: 3,
        color: 'white',
        background: style.bg,
        boxShadow: style.shadow,
        overflow: 'hidden', // evita cortes raros en bordes
      }}
    >

      <CardContent
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 1.5,
        }}
      >
        <Typography
          sx={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 700,
            fontSize: 14,
            opacity: 0.95,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {title}
          <span style={{ fontSize: 18 }}>{icon ?? ''}</span>
        </Typography>

        <Box
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1,
            minHeight: 90,
          }}
        >
          <Typography
            sx={{
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 700,
              fontSize: 36,
              lineHeight: 1.1,
              textAlign: 'center',
            }}
          >
            {value}
          </Typography>

          {unit && (
            <Chip
              label={unit}
              size="small"
              sx={{
                mt: 1,
                bgcolor: 'rgba(255,255,255,0.22)',
                color: 'white',
                fontWeight: 600,
                borderRadius: 2,
              }}
            />
          )}
        </Box>
      </CardContent>
    </Card>
  );
}

export default function IndicatorsKeyUI({ data, loading, error }: Props) {
  
  if (loading) return <Typography>Cargando indicadores...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!data) return <Typography>No hay datos disponibles.</Typography>;

  const t = data.current.temperature_2m;
  const ta = data.current.apparent_temperature;
  const v = data.current.wind_speed_10m;
  const h = data.current.relative_humidity_2m;

  const windLabel = v < 10 ? 'Suave' : v < 25 ? 'Moderado' : 'Fuerte';
  const humLabel = h < 40 ? 'Baja' : h < 70 ? 'Normal' : 'Alta';

  return (
    <Box>
      <Typography
        variant="h6"
        sx={{ mb: 2, fontFamily: 'Poppins, sans-serif', fontWeight: 800 }}
      >
        Indicadores Clave
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
          gap: 2,
        }}
      >
        {/*Temperatura actual */}
        <IndicatorCard
          title="Temperatura actual"
          value={`${t}`}
          unit={data.current_units.temperature_2m}
          footer="Actual"
          icon="🌡️"
          variant="orange"
        />

        {/*Humedad */}
        <IndicatorCard
          title="Humedad relativa"
          value={`${h}`}
          unit={data.current_units.relative_humidity_2m}
          footer={humLabel}
          icon="💧"
          variant="blue"
        />

        {/*Viento */}
        <IndicatorCard
          title="Velocidad del viento"
          value={`${v}`}
          unit={data.current_units.wind_speed_10m}
          footer={windLabel}
          icon="💨"
          variant="green"
        />

        {/*Sensación térmica */}
        <IndicatorCard
          title="Temperatura aparente"
          value={`${ta}`}
          unit={data.current_units.apparent_temperature}
          footer="Sensación"
          icon="🔥"
          variant="yellow"
        />

        {/*Lluvia */}
        <IndicatorCard
          title="Lluvia"
          value={`${data.current.rain}`}
          unit={data.current_units.rain}
          footer={data.current.rain > 0 ? 'Hay lluvia' : 'Sin lluvia'}
          icon="🌧️"
          variant="purple"
        />

        {/*Precipitación */}
        <IndicatorCard
          title="Precipitación"
          value={`${data.current.precipitation}`}
          unit={data.current_units.precipitation}
          footer={data.current.precipitation > 0 ? 'Con precipitación' : 'Sin precipitación'}
          icon="☔"
          variant="sky"
        />

      </Box>
    </Box>
  );
}
