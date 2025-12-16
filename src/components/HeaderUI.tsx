import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function HeaderUI() {
  return (
    <Box
      sx={{
        width: '100%',
        py: 4,
        px: 2,
        borderRadius: 2,
        background: 'linear-gradient(135deg, #0D47A1 0%, #1976D2 60%, #4FC3F7 100%)',
        boxShadow: '0px 8px 20px rgba(0,0,0,0.25)',
        textAlign: 'center',
      }}
    >
      <Typography
        variant="h3"
        component="h1"
        sx={{
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 700,
          color: '#FFFFFF',
          letterSpacing: '0.05em',
        }}
      >
        Dashboard del Clima
      </Typography>

      <Typography
        variant="subtitle1"
        sx={{
          mt: 1,
          fontFamily: 'Poppins, sans-serif',
          color: '#E3F2FD',
          opacity: 0.9,
        }}
      >
        Información meteorológica en tiempo real
      </Typography>
    </Box>
  );
}
