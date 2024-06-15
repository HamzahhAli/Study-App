// pages/index.js
"use client"
import { useState } from 'react';
import Modal from './components/Modal';
import Link from 'next/link'

const Index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [enteredVocab, setEnteredVocab] = useState('');
  const [vocabList, setVocabList] = useState([]);
  const [defList, setDefList] = useState([]);
  const handleVocab = (e) => {
    e.preventDefault();
    setEnteredVocab(e.target.value);
  };

  const [enteredDef, setEnteredDef] = useState('');
  const handleDef = (e) => {
    e.preventDefault();
    setEnteredDef(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const set = [enteredVocab, enteredDef]
    setVocabList([[enteredVocab,':  ', enteredDef], ...vocabList]);
    
    closeModal()
  };

  return (
    <div>
      
      
      <Modal isOpen={isModalOpen} onClose={closeModal} data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo">
        <h2>Add your word</h2>
        
        <div>
      <form>
        <label htmlFor="exampleFormControlInput1" className="form-label">
          Enter vocab:
        </label>
        <input
          onChange={handleVocab}
          style={{ width: '70%' }}
          type="text"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="enter"
        />
        <label htmlFor="exampleFormControlInput1" className="form-label">
          Enter definition:
        </label>
        
          <textarea
          onChange={handleDef}
          style={{ width: '70%', height: '80px', verticalAlign: 'top' }}
          className="form-control"
          placeholder=""
        ></textarea>
        
        <button onClick={handleSubmit} style={{marginRight: '10px'}} >submit</button>
        <button onClick={closeModal}>cancel</button>
      </form>

      
    </div>
      </Modal>
      <div>
        
        <div>
          <h2>Vocab List:</h2>
          <ul>
            {vocabList.map((vocab, index) => (
              <li key={index}>{vocab} </li>
            ))}
            {defList.map((def, index) => (
              <li key={index}>{def}</li>
            ))}
          </ul>
        </div>
      </div>
      <div style={{ textAlign: 'center', marginBottom: '70px' }}>
      <button onClick={openModal} type="button" className='btn btn-outline-secondary' style={{ width: '1000px', height: '150px', marginTop: '20px', fontSize: '30px' }}>Add a card</button>
      </div>
    </div>
    
  );
};

export default Index;
