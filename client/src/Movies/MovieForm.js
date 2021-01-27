import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

const initialMovie = {
    title: '',
    director: '',
    metascore: '',
    stars: '',
};

const MovieForm = (props) => {
    const { push } = useHistory();
    const [movie, setMovie] = useState(initialMovie);
    const { id } = useParams();
    
    useEffect(() => {
        axios   
            .get(`http://localhost:5000/api/movies/${id}`)
            .then(res => {
                setMovie(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, [id]);

    const updateMovie = () => {
        axios
            .get('http://localhost:5000/api/movies')
            .then(res => {
                console.log(res)
                props.setMovieList(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    };

    const handleChange = event => {
        setMovie({
            ...movie,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = event => {
        event.preventDefault()
        axios
            .put(`http://localhost:5000/api/movies/${id}`, movie)
            .then(res => {
                updateMovie();
            })
            .catch(err => {
                console.log(err);
            });
            push('/');
    }

    return(
        <form onSubmit={handleSubmit}>
        <label>Title</label> <br/>
            <input 
                type='text'
                name='title'
                onChange={handleChange}
                placeholder='Movie Title'
                value={movie.title}
            />

            <br/>
            <br/>
            <label>Director</label> <br/>
            <input
                type='text'
                name='director'
                onChange={handleChange}
                placeholder='Movie Director'
                value={movie.director}
            />
            <br/>
            <br/>
            <label>Metascore</label> <br/>
            <input
                type='text'
                name='metascore'
                onChange={handleChange}
                placeholder='Movie Metascore'
                value={movie.metascore}
            />
            <br/>
            <br/>
            <button>Discard</button>
            <button>Save</button>
        </form>
    )
}

export default MovieForm;