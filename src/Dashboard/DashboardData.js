import * as React from 'react';
import Button from '@mui/material/Button';
import GetAppIcon from '@mui/icons-material/GetApp';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { DataCard } from './DataCard';
import ForumIcon from '@mui/icons-material/Forum';
import LinearProgress from '@mui/material/LinearProgress';
import { GraphCard } from './GraphCard';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const graphArray=[
    {
        title:'Earnings Overview',
        chartType:'Line',
        data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
            datasets: [
              {
                label: "First dataset",
                data: [0,10000,5000,15000,10000,20000,15000,25000,20000,30000,25000,40000],
                fill: true,
                backgroundColor: "lightblue",
                borderColor: "blue",
              }
            ]
          },
           options: {
             maintainAspectRatio:false,
             scales:{
               x:{
                 grid:{
                   display:true,
                   drawBorder: true,
                  drawOnChartArea: true,
                  drawTicks:true,
                 }
               },
               y:{
                grid:{
                  display:true
                }
              }
             }
           }
    },
    {
        title:'Revenue Sources',
        chartType:'Doughnut',
        data: {
            labels: ['Direct','Social','Referral'],
            datasets: [
              {
                label: '# of Votes',
                data: [55,30,15],
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)'
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)'
                ],
                borderWidth: 1,

              }
            ]
          },
          options: {
            maintainAspectRatio:false
          }
    },
    {
        title:'Project',
        chartType:'Progress Bar',
        data: [{value:20,
                name:"Server Migration"
                },
                {value:40,
                 name:"Sales Tracking"
                },
                {value:60,
                 name:"Customer Database"
                },
                {value:80,
                 name:"Payout Details"
                },
                {value:100,
                name:"Account Setup"
                }]
    }
];


const innerTheme = createTheme({
  palette: {
    primary: {
      main: '#0097a7',
    },
  },
});

function DashboardData(){
  const val=graphArray[0].data.datasets[0].data;
    const [mEarnings,setMEarnings]=React.useState(0);
    const [aEarnings,setAEarnings]=React.useState(0);
    const [progressValue,setProgress]=React.useState(0);
    React.useEffect(()=>{
      setMEarnings(val[val.length-1]);
      setAEarnings(val.reduce((a,b)=>a+b));
      setProgress(50);
    },[val]);
    const dataCardInfo=[
        {
            title:"EARNINGS(MONTHLY)",
            data:`$${mEarnings}`,
            icon:<CalendarTodayIcon fontSize="large" color='disabled'/>,
            color:'blue'
        },
        {
            title:"EARNINGS(ANNUAL)",
            data:`$${aEarnings}`,
            icon:<AttachMoneyIcon fontSize="large" color='disabled'/>,
            color:'green'
        },
        {
            title:"TASKS",
            data:`${progressValue}%`,
            icon:<AssignmentIcon fontSize="large" color='disabled'/>,
            color:'#0097a7'
        },
        {
            title:"PENDING REQUESTS",
            data:18,
            icon:<ForumIcon fontSize="large" color='disabled'/>,
            color:'#f6c23e'
        }
    ];
    return(<div>
           <div className='heading'>
            <div style={{float:"left"}}>
           <h1>Dashboard</h1>
           </div>
           <div style={{float:"right"}}>
           <Button variant="contained" startIcon={<GetAppIcon/>}>
              Generate Report
             </Button>
             </div>
             </div>
             <div className='grid-one'>
            <ThemeProvider theme={innerTheme}>
            {dataCardInfo.map((value,index)=>index!==2?<DataCard value={value} key={index}/>:<DataCard value={value} progressBar={ <LinearProgress variant="determinate" value={progressValue} style={{width:'50%'}}/>} key={index}/>)}
            </ThemeProvider>
            </div> <br/>
            <div className='grid-two'>
            {graphArray.map((graph,index)=><GraphCard value={graph} key={index}/>)}
            </div>
        </div>
    );
}

export {DashboardData};