import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

export default function FooterUI() {
  return (
    <Card
      sx={{
        mt: 4,
        borderRadius: 3,
        border: '1px solid #E3F2FD',
        boxShadow: '0px 4px 12px rgba(0,0,0,0.08)',
      }}
    >
      <CardContent>
        <Typography
          variant="h6"
          sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, mb: 1 }}
        >
          Información adicional
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <Box sx={{ display: 'grid', gap: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Los datos meteorológicos presentados en este dashboard son obtenidos mediante la
            <b> API Open-Meteo</b>, una plataforma de acceso libre que proporciona información
            climática en tiempo real y pronósticos horarios sin necesidad de autenticación.
          </Typography>

          <Typography variant="body2" color="text.secondary">
            El proyecto fue desarrollado utilizando <b>React</b> como librería principal para
            la construcción de interfaces de usuario basadas en componentes, permitiendo una
            gestión eficiente del estado y la renderización dinámica de la información.
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Para el diseño visual y la estructura del dashboard se empleó
            <b> Material UI (MUI)</b>, facilitando la creación de una interfaz moderna,
            responsiva y consistente con buenas prácticas de diseño.
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
