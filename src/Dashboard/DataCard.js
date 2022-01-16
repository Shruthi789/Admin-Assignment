import Card from '@mui/material/Card';


function DataCard({value,progressBar}){
    const {title,data,icon,color}=value;
    return ( <Card sx={{minWidth:290}}>
        <div style={{display:"flex",alignItems:"center", justifyContent:"space-evenly",borderLeft:`4px solid ${color}`}}>
         <div className="data-card-style">
          <h5 style={{color:color,marginBottom:'0px'}}>{title}</h5>
          <h2 style={{marginTop:'0px'}}>{data}</h2>
         </div>
         {progressBar? progressBar:""}
         <div>{icon}</div>        
        </div>
      </Card>)
      ;
}

export {DataCard};