import React from 'react';
export default function RoadmapCard({data,onClick}){
  return(<div className='card hover:cursor-pointer' onClick={()=>onClick(data)}>
    <img src={data.gif} alt={data.title} style={{width:'100px',height:'80px'}}/>
    <h3 className='font-bold text-lg'>{data.title}</h3>
  </div>);
}