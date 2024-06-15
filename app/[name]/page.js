"use client"
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Button, Modal, Form } from 'react-bootstrap';


const fetchVocabList = (name) => {
  const vocabKey = `vocabList_${name}`;
  const storedVocabList = JSON.parse(localStorage.getItem(vocabKey));
  return storedVocabList || [];
};

const SetPage = () => {
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
    const initialVocabList = fetchVocabList(name);
    setVocabList(initialVocabList);
  }, [name]);

  useEffect(() => {
    const vocabKey = `vocabList_${name}`;
    if (vocabList.length > 0) {
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
    const updatedVocabList = [newSet, ...vocabList];
    setVocabList(updatedVocabList);
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
        style={{ marginLeft: '20px', marginTop: '20px' }}
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
              />
            </Form.Group>
            <Form.Group controlId="defInput">
              <Form.Label>Definition:</Form.Label>
              <Form.Control
                as="textarea"
                style={{ height: '100px' }}
                value={enteredDef}
                onChange={handleDef}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancel</Button>
          <Button variant="primary" onClick={handleSubmit}>Submit</Button>
        </Modal.Footer>
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
              />
            </Form.Group>
            <Form.Group controlId="editDefInput">
              <Form.Label>Definition:</Form.Label>
              <Form.Control
                as="textarea"
                style={{ height: '100px' }}
                value={enteredDef}
                onChange={handleDef}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleEditClose}>Cancel</Button>
          <Button variant="primary" onClick={handleEditSubmit}>Submit</Button>
        </Modal.Footer>
      </Modal>

      <div>
        <ul>
          {vocabList.length > 0 ? (
            vocabList.map((vocab, index) => (
              <div className="card bg-light mb-3" style={{ maxWidth: "90rem" }} key={index}>
                <div className="card-body">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3>{vocab[0]}</h3>
                    <div>
                      <Button variant="warning" onClick={() => handleEditShow(index)} style={{ marginRight: '10px' }}>Edit</Button>
                      <Button variant="danger" onClick={() => handleDelete(index)}>Delete</Button>
                    </div>
                  </div>
                  <p className="card-text">{vocab[1]}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="card bg-light mb-3" style={{ maxWidth: "90rem", height: '300px' }}>
              <div className="card-body">
                <p className="card-text" style={{ textAlign: 'center', paddingTop: '100px' }}>
                  Press "add card" to get started
                </p>
              </div>
            </div>
          )}
        </ul>
      </div>
      <div style={{ textAlign: 'center', marginBottom: '70px' }}>
        <Button variant="primary" onClick={handleShow} style={{ width: '500px', height: '75px', marginTop: '20px', fontSize: '20px' }}>
          Add Card
        </Button>
      </div>
      
    </div>
    
  );
};

export default SetPage;
