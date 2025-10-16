import React from 'react';
export default function RoadmapOverlay({data,onClose}){
  if(!data) return null;
  return(<div className='overlay'>
    <button onClick={onClose} style={{position:'fixed',top:10,right:20,fontSize:'20px'}}>❌</button>
    <h1 className='gamer-title text-2xl mb-4'>{data.title}</h1>
    <img src={data.gif} alt='' style={{width:'120px'}}/>
    <h3>Steps</h3><ul>{data.steps.map((s,i)=><li key={i}>{s}</li>)}</ul>
    <h3>Tools</h3><ul>{data.tools.map((t,i)=><li key={i}>{t}</li>)}</ul>
    <h3>Resources</h3><ul>{data.resources.map((r,i)=><li key={i}><a href={r} target='_blank'>{r}</a></li>)}</ul>
  </div>);
}