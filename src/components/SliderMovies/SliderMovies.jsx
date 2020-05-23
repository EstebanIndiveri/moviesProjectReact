import React from 'react';
import {Carousel,Button} from 'antd';
import {Link} from 'react-router-dom';
import './SliderMovies.scss';
import Loading from '../Loading';

const SliderMovies = ({movies}) => {
    const {loading,result}=movies;
    
    if(loading || !result){
        return <Loading/>
    }
    const {results}=result;

    return (  
       <Carousel
       autoplay
       effect="fade"
       draggable="true"
       className="slider-movies"
       accessibility="true"
       >
           {results.map(movie=>(
               <Movie
               key={movie.id}
               movie={movie}
               />
           ))}
       </Carousel>
    );
}
 
export default SliderMovies;

function Movie({movie}){
    const{id,backdrop_path,title,overview}=movie
     const backdropPath=`https://image.tmdb.org/t/p/original${backdrop_path}`;
    return(
        <div 
        className="slider-movies__movie" 
        style={{backgroundImage:`url('${backdropPath}')`}}
        >
            <div
            className="slider-movies__movie-info"
            >
                <div>
                <h2>{title}</h2>
                {overview?<p>{(overview).slice(0,200)}...</p>:null}
                
                <Link to={`/movie/${id}`}>
                    <Button
                    type="primary"
                    >Ver más</Button>
                </Link>
                </div>
            </div>
        </div>
    )
}