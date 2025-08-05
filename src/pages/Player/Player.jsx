import React, { useEffect, useState } from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'

const Player = () => {

  const {id} = useParams()
  const navigate = useNavigate();


  const [apiData, setApiData] = useState({
    name:'',
    key:'',
    published_at:"",
    typeod:''
  })

  useEffect(()=>{
    const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZGY4Y2QwNmJkYmIzMDZkZTAyMTM5MjQ0YzI0NTYyMiIsIm5iZiI6MTc1NDI3NDc4Mi4zNjMwMDAyLCJzdWIiOiI2ODkwMWJkZTU3ODc4MWFhZmZhNDY1MjkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.ls0np1ixl7AREg1Ob62RFuOEF47Y4zFNYu2_62f3tZY'
  }
};

fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
  .then(res => res.json())
  .then(res =>{return setApiData(res.results[0])})
  .catch(err => console.error(err));




  },[])




  
  return (
    <div className='player'>
      <img onClick={()=>navigate(-2)} src={back_arrow_icon} alt="" />
      <iframe width='90%' height='90%' src={`https://www.youtube.com/embed/${apiData.key}`} frameBorder="0"
      title='trailer' allowFullScreen></iframe>
      <div className='player-info'>
        <p>{apiData.published_at.slice(0,10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>

    </div>
  )
}

export default Player