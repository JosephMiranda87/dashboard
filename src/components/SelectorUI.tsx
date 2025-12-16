import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import { useEffect, useState } from 'react';

interface SelectorProps {
  onOptionSelect: (option: string) => void;
}

export default function SelectorUI({ onOptionSelect }: SelectorProps) {
  const [cityInput, setCityInput] = useState('guayaquil');

  useEffect(() => {
    onOptionSelect('guayaquil');
  }, []);

  const handleChange = (event: SelectChangeEvent<string>) => {
    const selectedValue = event.target.value;
    setCityInput(selectedValue);
    onOptionSelect(selectedValue);
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
          sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, mb: 2 }}
        >
          Selección de ciudad
        </Typography>

        <FormControl fullWidth>
          <InputLabel id="city-select-label">Ciudad</InputLabel>
          <Select
            labelId="city-select-label"
            id="city-simple-select"
            label="Ciudad"
            onChange={handleChange}
            value={cityInput}
          >
            <MenuItem value={'guayaquil'}>Guayaquil</MenuItem>
            <MenuItem value={'quito'}>Quito</MenuItem>
            <MenuItem value={'manta'}>Manta</MenuItem>
            <MenuItem value={'cuenca'}>Cuenca</MenuItem>
          </Select>
        </FormControl>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          Mostrando clima para: <b style={{ textTransform: 'capitalize'}}>{cityInput}</b>
        </Typography>
      </CardContent>
    </Card>
  );
}
