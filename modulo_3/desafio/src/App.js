import React, {useState} from 'react';
import Header from './components/Header';
import Form from './components/Form';
import Installments from './components/Installments';

export default function App() {

  const [formData, setFormData] = useState(null);

  const handleFormChange = (formData) => {
    setFormData(formData);
  }

  return (
    <div className="container">
      <Header />
      <Form onFormChange={handleFormChange} />
      <Installments formData={formData} />
    </div>
  );
}
