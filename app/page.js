"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button, Modal, Form, Card, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const HomePage = () => {
  const [packetName, setPacketName] = useState('');
  const [description, setDescription] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentEditIndex, setCurrentEditIndex] = useState(null);
  const [nameList, setNameList] = useState([]);
  const [descriptionList, setDescriptionList] = useState({});

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedNameList = JSON.parse(localStorage.getItem('nameList')) || [];
      const storedDescriptionList = JSON.parse(localStorage.getItem('descriptionList')) || {};
      setNameList(storedNameList);
      setDescriptionList(storedDescriptionList);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('nameList', JSON.stringify(nameList));
      localStorage.setItem('descriptionList', JSON.stringify(descriptionList));
    }
  }, [nameList, descriptionList]);

  const handleClose = () => {
    setShowModal(false);
    setPacketName('');
    setDescription('');
    setEditMode(false);
    setCurrentEditIndex(null);
  };

  const handleShow = () => setShowModal(true);

  const handleInput = (e) => setPacketName(e.target.value);
  const handleDescription = (e) => setDescription(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode && currentEditIndex !== null) {
      const updatedNameList = [...nameList];
      const updatedDescriptionList = { ...descriptionList };
      const oldPacketName = updatedNameList[currentEditIndex];
      updatedNameList[currentEditIndex] = packetName;
      updatedDescriptionList[packetName] = description;
      delete updatedDescriptionList[oldPacketName];
      setNameList(updatedNameList);
      setDescriptionList(updatedDescriptionList);
    } else {
      setNameList([...nameList, packetName]);
      setDescriptionList({ ...descriptionList, [packetName]: description });
      if (typeof window !== 'undefined') {
        localStorage.setItem(`vocabList_${packetName}`, JSON.stringify([]));
      }
    }
    setPacketName('');
    setDescription('');
    handleClose();
  };

  const handleDelete = (name) => {
    const updatedNameList = nameList.filter((setName) => setName !== name);
    setNameList(updatedNameList);
    const updatedDescriptionList = { ...descriptionList };
    delete updatedDescriptionList[name];
    setDescriptionList(updatedDescriptionList);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(`vocabList_${name}`);
    }
  };

  const handleEdit = (index) => {
    setPacketName(nameList[index]);
    setDescription(descriptionList[nameList[index]]);
    setCurrentEditIndex(index);
    setEditMode(true);
    setShowModal(true);
  };

  return (
    <Container>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editMode ? 'Edit Set' : 'Add Set'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Set Name</Form.Label>
              <Form.Control
                type="text"
                value={packetName}
                onChange={handleInput}
                placeholder="Enter set name"
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                value={description}
                onChange={handleDescription}
                placeholder="Describe what these flashcards cover"
                style={{ marginTop: '10px' }}
                required
              />
            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>Cancel</Button>
              <Button type="submit" variant="primary" disabled={!packetName || !description}>
                {editMode ? 'Update' : 'Submit'}
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>

      {nameList.length > 0 ? (
        <Row className="card-container">
          {nameList.map((name, index) => (
            <Col key={index} sm={12} md={4} className="mb-4">
              <Card className="h-100 d-flex flex-column">
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="set-title">{name}</Card.Title>
                  <Card.Text className="card-description flex-grow-1">
                    {descriptionList[name]}
                  </Card.Text>
                  <div className="mt-auto d-flex justify-content-between">
                    <div>
                      <Link href={`/${name}`} passHref>
                        <Button variant="info" className="me-2">View Set</Button>
                      </Link>
                      <Button variant="warning" onClick={() => handleEdit(index)}>Edit</Button>
                    </div>
                    <Button variant="danger" onClick={() => handleDelete(name)}>Delete</Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <Row className="justify-content-center mt-5">
          <Col sm={12} md={6} lg={4}>
            <Card className="text-center">
              <Card.Body>
                <Card.Text>Press "Add New Set" to get started.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      <div className="fixed-bottom text-center mb-4">
        <Button className="add-new-set-button" onClick={handleShow}>
          Add New Set
        </Button>
      </div>
    </Container>
  );
};

export default HomePage;
