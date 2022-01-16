import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Line,Doughnut } from 'react-chartjs-2';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
} from 'chart.js';
import { createTheme, ThemeProvider } from '@mui/material/styles';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
);

const innerTheme = createTheme({
  palette: {
    info: {
      main: '#0097a7',
    },
  },
  components: {
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          height: '20px',
        },
      },
    },
  }
});

const headerTheme = createTheme({
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          fontSize:'16px',
          fontWeight:'bold'
        },
      },
    },
  }
});
function ProgressBar({value,name}){
     return <div>
      <Box sx={{ display: 'flex',paddingBottom:'8px' }}>
      <Box sx={{ width: '100%',textAlign:'left'}}>
      <Typography variant="body2" color="text.secondary" sx={{fontWeight:'bold'}}>{name}</Typography>
      </Box>
      <Box sx={{ minWidth: 32 }}>
        <Typography variant="body2" color="text.secondary" sx={{fontWeight:'bold',float:'right'}}>{value===100?'Complete!':`${Math.round(value)}%`}</Typography>
      </Box>
       </Box>
       <ThemeProvider theme={innerTheme}>
        {name==="Server Migration"?<LinearProgress variant="determinate" value={value} color='error' className='progress-graph-card' />:name==="Sales Tracking"?<LinearProgress variant="determinate" value={value} color='warning' className='progress-graph-card' />:name==="Customer Database"?<LinearProgress variant="determinate" value={value} color='primary' className='progress-graph-card'/>:name==="Account Setup"?<LinearProgress variant="determinate" value={value} color='success' className='progress-graph-card'/>:<LinearProgress variant="determinate" value={value} color='info' className='progress-graph-card' />}
       </ThemeProvider>
       </div>
}
function GraphCard({value}){ 
  const {title,chartType,data,options}=value;
  return <Card sx={{minWidth:"auto"}}>
    <ThemeProvider theme={headerTheme}>
    <CardHeader
      action={
        <IconButton aria-label="settings">
          <MoreVertIcon color='disabled' />
        </IconButton>
      }
      title={title}
      sx={{
        backgroundColor:'#f8f9fc',
        color:'#4e73df',
        textAlign:'left'
      }}
    />
    </ThemeProvider>
    <CardContent>
       {chartType==='Line'?<div className="linear-graph-card"><Line data={data} options={options}/></div>:chartType==='Doughnut'?<div className="doughnut-graph-card"><Doughnut data={data} options={options}/> </div>: <div className="progress-graph">{data.map(({value,name},index)=><ProgressBar key={index} value={value} name={name}/>)}</div>}
    </CardContent>
  </Card>
}

export {GraphCard};