"use client";
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Button, Modal, Form } from 'react-bootstrap';

const fetchVocabList = (name) => {
  if (typeof window !== 'undefined') {
    const vocabKey = `vocabList_${name}`;
    const storedVocabList = JSON.parse(localStorage.getItem(vocabKey));
    return storedVocabList || [];
  }
  return [];
};

const CardInfoPage = () => {
  const pathname = usePathname();
  const router = useRouter();
  const name = pathname.split('/').pop();
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [enteredVocab, setEnteredVocab] = useState('');
  const [enteredDef, setEnteredDef] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [vocabList, setVocabList] = useState([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const initialVocabList = fetchVocabList(name);
      setVocabList(initialVocabList);
    }
  }, [name]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const vocabKey = `vocabList_${name}`;
      localStorage.setItem(vocabKey, JSON.stringify(vocabList));
    }
  }, [vocabList, name]);

  const handleClose = () => {
    setShowModal(false);
    setEnteredVocab('');
    setEnteredDef('');
  };

  const handleShow = () => setShowModal(true);

  const handleEditClose = () => {
    setShowEditModal(false);
    setEnteredVocab('');
    setEnteredDef('');
  };

  const handleEditShow = (index) => {
    setEditIndex(index);
    setEnteredVocab(vocabList[index][0]);
    setEnteredDef(vocabList[index][1]);
    setShowEditModal(true);
  };

  const handleVocab = (e) => setEnteredVocab(e.target.value);
  const handleDef = (e) => setEnteredDef(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newSet = [enteredVocab, enteredDef];
    const updatedVocabList = [...vocabList, newSet];
    setVocabList(updatedVocabList);

    if (typeof window !== 'undefined') {
      const vocabKey = `vocabList_${name}`;
      localStorage.setItem(vocabKey, JSON.stringify(updatedVocabList));
    }

    handleClose();
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const updatedVocabList = vocabList.map((item, index) => {
      if (index === editIndex) {
        return [enteredVocab, enteredDef];
      }
      return item;
    });
    setVocabList(updatedVocabList);
    setEditIndex(null);
    handleEditClose();
  };

  const handleDelete = (index) => {
    const updatedVocabList = vocabList.filter((_, i) => i !== index);
    setVocabList(updatedVocabList);
  };

  return (
    <div>
      <Button
        variant="secondary"
        onClick={() => router.push('/')}
        className="mb-4"
        style={{ marginLeft: '10px', marginTop: '10px' }}
      >
        Back to Home
      </Button>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Card</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="vocabInput">
              <Form.Label>Vocabulary:</Form.Label>
              <Form.Control
                type="text"
                value={enteredVocab}
                onChange={handleVocab}
                required
              />
            </Form.Group>
            <Form.Group controlId="defInput">
              <Form.Label>Definition:</Form.Label>
              <Form.Control
                as="textarea"
                style={{ height: '100px' }}
                value={enteredDef}
                onChange={handleDef}
                required
              />
            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>Cancel</Button>
              <Button variant="primary" type="submit">Submit</Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showEditModal} onHide={handleEditClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Card</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditSubmit}>
            <Form.Group controlId="editVocabInput">
              <Form.Label>Vocabulary:</Form.Label>
              <Form.Control
                type="text"
                value={enteredVocab}
                onChange={handleVocab}
                required
              />
            </Form.Group>
            <Form.Group controlId="editDefInput">
              <Form.Label>Definition:</Form.Label>
              <Form.Control
                as="textarea"
                style={{ height: '100px' }}
                value={enteredDef}
                onChange={handleDef}
                required
              />
            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleEditClose}>Cancel</Button>
              <Button variant="primary" type="submit">Submit</Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>

      <div>
        <ul>
          {vocabList.length > 0 ? (
            vocabList.map((vocab, index) => (
              <div className="card bg-light mb-3" style={{ maxWidth: "90rem" }} key={index}>
                <div className="
