import Box from '@mui/material/Box';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import useFetchData from '../functions/useFetchData';

function combineArrays(
  arrLabels: Array<string>,
  arrValues1: Array<number>,
  arrValues2: Array<number>
) {
  return arrLabels.map((label, index) => ({
    id: index,
    label: label,
    value1: arrValues1[index],
    value2: arrValues2[index],
  }));
}

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'label',
    headerName: 'Hora',
    width: 150,
  },
  {
    field: 'value1',
    headerName: 'Temp (°C)',
    width: 130,
  },
  {
    field: 'value2',
    headerName: 'Viento (km/h)',
    width: 140,
  },
  {
    field: 'resumen',
    headerName: 'Resumen',
    description: 'No es posible ordenar u ocultar esta columna.',
    sortable: false,
    hideable: false,
    width: 220,
    valueGetter: (_, row) =>
      `${row.label || ''}  T=${row.value1 ?? '-'}  V=${row.value2 ?? '-'}`,
  },
];

export default function TableUI() {
  const { data, loading, error } = useFetchData();

  if (loading) {
    return (
      <Box sx={{ height: 120, display: 'flex', alignItems: 'center' }}>
        Cargando datos horarios...
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

  // Usamos las series horarias de la API (puedes limitar a 24 horas si quieres)
  const labels = data.hourly.time.map((t) => t.substring(11, 16)); // HH:MM
  const temps = data.hourly.temperature_2m;
  const winds = data.hourly.wind_speed_10m;

  const rows = combineArrays(labels, temps, winds);

  return (
    <Box sx={{ height: 350, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[5, 10]}
        disableRowSelectionOnClick
      />
    </Box>
  );
}
