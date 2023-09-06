// AddPlayerForm.js
import React, { useState } from 'react';

function AddPlayerForm() {
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [status, setStatus] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async e => {
    e.preventDefault();

    try {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('breed', breed);
        formData.append('status', status);
        formData.append('image', image); // Make sure 'image' matches the API's expected field name
  
        const response = await fetch('https://fsa-puppy-bowl.herokuapp.com/api/2302-acc-pt-web-pt-b/players/', {
          method: 'POST',
          body: formData,
        });

      if (response.ok) {
        // Handle success, e.g., show a success message or redirect
        console.log('Player added successfully');
      } else {
        // Handle error, e.g., show an error message
        console.error('Error adding player');
      }
    } catch (error) {
      console.error('Error adding player:', error);
    }
  };

  return (
    <div>
      <h2>Add New Player</h2>
      <form onSubmit={handleSubmit}  encType="multipart/form-data">
        <label>
          Name:
          <input type="text" value={name} onChange={e => setName(e.target.value)} />
        </label>
        <br />
        <label>
          Breed:
          <input type="text" value={breed} onChange={e => setBreed(e.target.value)} />
        </label>
        <br />
        <label>
          Status:
          <input type="text" value={status} onChange={e => setStatus(e.target.value)} />
        </label>
        <br />
        <label>
            Image: <input type="file" value={image} onChange={e => setImage(e.target.value)}/>
        </label>
        <br />
        <button type="submit">Add Player</button>
      </form>
    </div>
  );
}

export default AddPlayerForm;
