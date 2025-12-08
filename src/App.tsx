import './App.css'

import { Grid } from '@mui/material';
import HeaderUI from './components/HeaderUI';
import AlertUI from './components/AlertUI';
import SelectorUI from './components/SelectorUI';
import IndicatorUI from './components/IndicatorUI';
import useFetchData from './functions/useFetchData';

function App() {
  const { data, loading, error } = useFetchData();

  const getDescription = (value?: number, unit?: string) => {
    if (loading) return 'Cargando...';
    if (error) return 'Error al cargar datos';
    if (value === undefined || unit === undefined) return 'Sin datos';
    return `${value} ${unit}`;
  };

  return (
    <Grid container spacing={5} justifyContent="center" alignItems="center">

      {/* Encabezado */}
      <Grid size={12}>
        <HeaderUI />
      </Grid>

      {/* Alertas */}
      <Grid size={12}>
        <AlertUI description={error ?? 'No se preveen lluvias'} />
      </Grid>

      {/* Selector */}
      <Grid size={{ xs: 12, md: 3 }}>
        <SelectorUI />
      </Grid>

      {/* Indicadores */}
      <Grid container size={{ xs: 12, md: 9 }} >

        {/* Temperatura (2m) */}
        <Grid container size={{ xs: 12, md: 3 }}>
          <IndicatorUI
            title="Temperatura (2m)"
            description={getDescription(
              data?.current.temperature_2m,
              data?.current_units.temperature_2m
            )}
          />
        </Grid>

        {/* Temperatura Aparente */}
        <Grid container size={{ xs: 12, md: 3 }}>
          <IndicatorUI
            title="Temperatura Aparente"
            description={getDescription(
              data?.current.apparent_temperature,
              data?.current_units.apparent_temperature
            )}
          />
        </Grid>

        {/* Velocidad del Viento */}
        <Grid container size={{ xs: 12, md: 3 }}>
          <IndicatorUI
            title="Velocidad del viento"
            description={getDescription(
              data?.current.wind_speed_10m,
              data?.current_units.wind_speed_10m
            )}
          />
        </Grid>

        {/* Humedad Relativa */}
        <Grid container size={{ xs: 12, md: 3 }}>
          <IndicatorUI
            title="Humedad relativa"
            description={getDescription(
              data?.current.relative_humidity_2m,
              data?.current_units.relative_humidity_2m
            )}
          />
        </Grid>
      </Grid>

       {/* Gráfico */}
      <Grid size={{ xs: 12, md: 6 }}
        sx={{ display: { xs: "none", md: "block" } }} >
        Elemento: Gráfico</Grid>

      {/* Tabla */}
      <Grid size={{ xs: 12, md: 6 }}
        sx={{ display: { xs: "none", md: "block" } }}
      >Elemento: Tabla</Grid>

      {/* Información adicional */}
      <Grid size={{ xs: 12, md: 12 }}>Elemento: Información adicional</Grid>

    </Grid>
  );
}

export default App;
