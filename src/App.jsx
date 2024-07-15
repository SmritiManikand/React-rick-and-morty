import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(28);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCharacters = async () => {
      setError(null);
      try {
        const response = await axios.get(`https://rickandmortyapi.com/api/character?page=${page}`);
        setCharacters(response.data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchCharacters();
  }, [page]);

  return (
    <Container className="container-center">
      <h1 className="text-center my-4 text-white fw-bold">Rick and Morty Characters</h1>
      {error ? (
        <Alert variant="danger">
          An error occurred while fetching data: {error}
        </Alert>
      ) : (
        <>
          <Row className="card-container">
            {characters.results && characters.results.map((character) => (
              <Col key={character.id} sm={12} md={6} className="mb-4">
                <Card className="character-card">
                  <Row noGutters>
                    <Col md={4}>
                      <Card.Img variant="top" src={character.image} alt={character.name} />
                    </Col>
                    <Col md={8}>
                      <Card.Body>
                        <Card.Title>{character.name}</Card.Title>
                        <Card.Text>{character.status} - {character.species}</Card.Text>
                        <Card.Text className='text-white-50'>Last seen on</Card.Text>
                        <Card.Text>{character.location.name}</Card.Text>
                      </Card.Body>
                    </Col>
                  </Row>
                </Card>
              </Col>
            ))}
          </Row>
          <div className="d-flex justify-content-between my-4">
            <Button
              onClick={() => setPage((old) => Math.max(old - 1, 1))}
              disabled={page === 1}
              variant='secondary'
              className='btn btn-lg fw-bold text-white'
            >
              Previous
            </Button>
            <span>Page {page}</span>
            <Button
              onClick={() => setPage((old) => (characters.info && characters.info.next ? old + 1 : old))}
              disabled={!(characters.info && characters.info.next)}
              variant='secondary'
              className='btn btn-lg fw-bold text-white'
            >
              Next
            </Button>
          </div>
        </>
      )}
    </Container>
  );
};

export default App;