import React, { Fragment } from 'react';
import {Row,Col} from 'antd'
import useFetch from '../hooks/useFetch';
import SliderMovies from '../components/SliderMovies';
import {URL_API,API_KEY} from '../utils/constants';
import MovieList from '../components/MovieList';
import Footer from '../components/Footer';
const Home = () => {
    const newMovies=useFetch(`${URL_API}/movie/now_playing?api_key=${API_KEY}&language=es-Es&page=1`);
    const popularMovies=useFetch(`${URL_API}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
    const topRatedMovies=useFetch(`${URL_API}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`);

    return ( 
        <Fragment>
            <SliderMovies
            movies={newMovies}
            />
            <Row>
                <Col 
                span={12}
                >
                <MovieList
                movies={popularMovies}
                title="Peliculas Populares"
                />
                </Col>
                <Col
                span={12}
                >
                <MovieList 
                title="Top mejores Peliculas"
                movies={topRatedMovies}
                />
                </Col>
            </Row>
            <Footer/>
        </Fragment>
     );
}
 
export default Home;