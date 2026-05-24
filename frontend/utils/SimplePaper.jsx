import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

export default function SimplePaper() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          width: 300,
          height: 300,
          border:"2px solid black",
          backgroundColor:"red"
        },
      }}
    >      
      <Paper />
   
    </Box>
  );
}
