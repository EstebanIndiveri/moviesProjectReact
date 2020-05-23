import React,{useState,useEffect} from 'react';
import{Row,Col,Input} from'antd';
import {WithRouter, withRouter} from 'react-router-dom';
import queryString from 'query-string';
import MovieCatalog from '../../components/MovieCatalog';
import Footer from '../../components/Footer';
import {URL_API,API_KEY} from '../../utils/constants'
//sass
import './search.scss';


function Search (props){
    const{location,history}=props;
    const[movieList,setMovieList]=useState([]);
    const [searchValue, setSearchValue]=useState('');
    useEffect(()=>{
        (async()=>{
            const searchValue=queryString.parseUrl(location.search);
            const{s}=searchValue.query;
            const response=await fetch(`${URL_API}/search/movie?api_key=${API_KEY}&language=es-ES&query=${s}&page=1`);
            const movies=await response.json();
           setMovieList(movies)
           if(s===''||s===undefined || !s){
               return null;
           }
           setSearchValue(s);
        })()
    },[location.search])

    const onChangeSearch=e=>{
        const urlParams=queryString.parse(location.search);
        urlParams.s=e.target.value;
        history.push(`?${queryString.stringify(urlParams)}`);
        setSearchValue(e.target.value);
    };

    const validator=()=>{
        if(searchValue==='' || searchValue===undefined || !searchValue || searchValue==='undefined' || searchValue===null){
            return (null);
        }else
        return(
            movieList.results&&(
                <Row>
                    <Col
                    span={24} style={{display:"contents"}}
                    >
                        <MovieCatalog movies={movieList}/>
                    </Col>
                </Row>
            )
        );
    }
    console.log(searchValue);
    return ( 
        <Row>
            <Col
            span={12}
            offset={6}
            className="search"
            >
                <h1>¡Busca una pelicula!</h1>
                <Input 
                value={searchValue} 
                onChange={onChangeSearch}
                />
            </Col>
                     {validator()}

            {/* {movieList.results&&(
                <Row>
                    <Col
                    span={24} style={{display:"contents"}}
                    >
                        <MovieCatalog movies={movieList}/>
                    </Col>
                </Row>
            )
            } */}
            <Col
            span={24}
            >
                <Footer/>
            </Col>
        </Row>
     );
}

export default withRouter(Search)