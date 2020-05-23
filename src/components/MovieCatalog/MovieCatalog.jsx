import React from 'react'
import{Col, Card} from 'antd';
import {Link}from 'react-router-dom';
import './MovieCatalog.scss';
import { EyeOutlined } from '@ant-design/icons';

const MovieCatalog = (props) => {
    const{movies:{results}}=props;

    return results.map(movie=>(
        <Col span={6} key={movie.id} className="movie-catalog">
            <MovieCard movie={movie}/>
        </Col>

    ))

}
 
export default MovieCatalog;

function MovieCard(props){
    const {movie:{id,title,poster_path}}=props;
    const{Meta}=Card;
    const posterPath=`https://image.tmdb.org/t/p/w500/${poster_path}`;
    return(
        <Link to={`/movie/${id}`}>
            <Card
            hoverable
            style={{width:240, display:"inline-block"}}
            cover={<img alt={title} src={posterPath}/>}
            actions={[<EyeOutlined />]}
            >
                <Meta title={title}/>
            </Card>
        </Link>
    )
}