import './App.css'

import { useState } from 'react';
import { Grid } from '@mui/material';
import HeaderUI from './components/HeaderUI';
import AlertUI from './components/AlertUI';
import SelectorUI from './components/SelectorUI';
import IndicatorUI from './components/IndicatorUI';
import useFetchData from './functions/useFetchData';
import TableUI from './components/TableUI';
import ChartUI from './components/ChartUI';
import GeoInfoUI from './components/GeoInfoUI';
import IndicatorsKeyUI from './components/IndicatorsKeyUI';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import FooterUI from './components/FooterUI';


function App() {
  const [selectedCity, setSelectedCity] = useState<string>("guayaquil");
  const { data, loading, error } = useFetchData(selectedCity);

  return (

    <Grid container spacing={5} justifyContent="center" alignItems="center">

      {/* Encabezado */}
      <Grid size={12}>
        <HeaderUI />
      </Grid>


      {/* Alertas */}
      <Grid size={12}>
        {/* <AlertUI description={error ?? 'No se preveen lluvias'} /> */}
      </Grid>

      {/* Selector */}
      <Grid container spacing={2} size={{ xs: 12, md: 6 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <SelectorUI onOptionSelect={setSelectedCity} />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <GeoInfoUI
            data={data}
            loading={loading}
            error={error}
            selectedCity={selectedCity}
          />
        </Grid>
      </Grid>


      {/* Indicadores */}
      <Grid size={{ xs: 12, md: 9 }}>
        <IndicatorsKeyUI data={data} loading={loading} error={error} />
      </Grid>


      {/* Separador + Título de Gráfico */}
      <Grid size={{ xs: 12 }}
      sx={{ display: { xs: "none", md: "block" } }}>
        <Box sx={{ mt: 2 }}>
          <Typography
            variant="h5"
            sx={{
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 800,
              mb: 1,
            }}
          >
            Análisis por horas
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Evolución de temperatura y viento en las próximas horas.
          </Typography>

          <Divider />
        </Box>
      </Grid>

      {/* Gráfico */}
      <Grid size={{ xs: 12, md: 8}}
        sx={{ display: { xs: "none", md: "block" } }} >
        <ChartUI data={data} loading={loading} error={error} />
      </Grid>

      {/* Tabla */}
      <Grid size={{ xs: 12, md:7}}
        sx={{ display: { xs: "none", md: "block" } }}>
        <Box sx={{
          maxWidth: 900,
          mx: 'auto',
        }}
        >
          <Typography
            variant="h6"
            sx={{
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 800,
              mb: 1,
            }}
          >
            Detalle de datos horarios
          </Typography>
          <Divider sx={{ mb: 2 }} />
        </Box>

        <TableUI data={data} loading={loading} error={error} />
      </Grid>

      {/* Información adicional */}
      <Grid size={{ xs: 12, md: 12 }}>
        <FooterUI />
        </Grid>

    </Grid>

  );
}

export default App;
