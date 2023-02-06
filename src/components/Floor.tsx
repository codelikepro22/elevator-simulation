import { Box, IconButton, Stack } from '@mui/material';
import { LAST_FLOOR } from '../constants/elevator';

type Props = {
  floorNo: number;
};

const Floor = ({ floorNo }: Props) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Stack>
        <IconButton disabled={floorNo === LAST_FLOOR}>
          <Box
            sx={{
              width: 0,
              height: 0,
              borderLeft: '10px solid transparent',
              borderRight: '10px solid transparent',
              borderBottom: '15px solid black',
              opacity: floorNo === LAST_FLOOR ? '0.26' : '1',
            }}
          ></Box>
        </IconButton>
        <IconButton disabled={floorNo === 0}>
          <Box
            sx={{
              width: 0,
              height: 0,
              borderLeft: '10px solid transparent',
              borderRight: '10px solid transparent',
              borderTop: '15px solid black',
              opacity: floorNo === 0 ? '0.26' : '1',
            }}
          ></Box>
        </IconButton>
      </Stack>
      <Box
        sx={{
          width: 90,
          height: 90,
          backgroundColor: '#4D4D68',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '2rem',
          borderRadius: 4,
        }}
      >
        {floorNo}
      </Box>
    </Box>
  );
};

export default Floor;
