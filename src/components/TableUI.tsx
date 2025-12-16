import Box from '@mui/material/Box';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { type OpenMeteoResponse } from '../types/DashboardTypes';

interface TableProps {
  data: OpenMeteoResponse | null;
  loading: boolean;
  error: string | null;
}

function combineArrays(
  arrLabels: string[],
  arrValues1: number[],
  arrValues2: number[]
) {
  return arrLabels.map((label, index) => ({
    id: index,
    label,             
    value1: arrValues1[index], 
    value2: arrValues2[index], 
  }));
}

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'label', headerName: 'Hora', width: 120 },
  { field: 'value1', headerName: 'Temp (°C)', width: 120 },
  { field: 'value2', headerName: 'Viento (km/h)', width: 140 },
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

export default function TableUI({ data, loading, error }: TableProps) {
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

  // Máximo # filas
  const maxRows = 24;
  const labels = data.hourly.time.slice(0, maxRows).map((t) => t.substring(11, 16));
  const temps = data.hourly.temperature_2m.slice(0, maxRows);
  const winds = data.hourly.wind_speed_10m.slice(0, maxRows);

  const rows = combineArrays(labels, temps, winds);

  return (
    <Box sx={{ height: 1000, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 24 },
          },
        }}
        pageSizeOptions={[5, 10, 24]}
        disableRowSelectionOnClick
      />
    </Box>
  );
}
