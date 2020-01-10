import React, { useState, useEffect } from 'react';
import { Col, Jumbotron, Button } from 'reactstrap';
import axios from 'axios';

const About = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        (async () => {
            const result = await axios('https://api.tvmaze.com/search/shows?q=snow');
            setData(result.data);
        })();
    }, []);

    return (
        <Col lg='12' >
            <Jumbotron>
                <h1 className='display-3'>About us</h1>
                <p className='lead'>This is a simple hero unit, a simple Jumbotron-style component for calling extra attention to featured content or information.</p>
                <hr className='my-2' />
                <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
                <p className='lead'>
                    <Button color='primary'>Learn More</Button>
                </p>
                <ul>
                    {data.map(item => <li key={item.show.id}>{item.show.name}</li>)}
                </ul>
            </Jumbotron>
        </Col>
    );
}

export default About;