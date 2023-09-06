// // // PlayerDetails.js
// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';


// function PlayerDetails() {
//     const { id } = useParams(); // Access player ID from URL parameter
//     const [playerDetails, setPlayerDetails] = useState({});
//     const [loading, setLoading] = useState(true);
    
//     useEffect(() => {
//         fetch(`https://fsa-puppy-bowl.herokuapp.com/api/2302-acc-pt-web-pt-b/players/${id}`)
//           .then(response => {
//             if (!response.ok) {
//               throw new Error('Network response was not ok');
//             }
//             return response.json();
//           })
//           .then(data => {
//             console.log(data); // Log the detailed player data
//             if (Array.isArray(data.data.player) && data.length > 0) {
//               setPlayerDetails(data.data.player); // Assuming the first element of the array has player details
//             } else {
//               throw new Error('Data is not in the expected format');
//             }
//           })
//           .catch(error => {
//             console.error('Error fetching player details:', error);
//             setLoading(false); // Set loading to false on error
//           })
//           .finally(() => setLoading(false));
//       }, [id]);

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div>
//       <h2>Player Details</h2>
//       <p>Name: {playerDetails.name}</p>
//       <p>Breed: {playerDetails.breed}</p>
//       <p>Status: {playerDetails.status}</p>
//       {/* Display other player details here */}
//     </div>
//   );
// }

// export default PlayerDetails;


// PlayerDetails.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function PlayerDetails() {
  const { id } = useParams();
  const [playerDetails, setPlayerDetails] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://fsa-puppy-bowl.herokuapp.com/api/2302-acc-pt-web-pt-b/players/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(data); // Log the detailed player data

        // Assuming the data structure matches the expected format
        setPlayerDetails(data.data.player); 

        // If the data structure is different, you might need to access the nested data differently
        // setPlayerDetails({
        //   name: data.name,
        //   owner: data.owner,
        //   team: data.team,
        //   // Add other properties as needed
        // });

      })
      .catch(error => {
        console.error('Error fetching player details:', error);
        setLoading(false); // Set loading to false on error
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Player Details</h2>
      <p>ID: {playerDetails.id}</p>
      <p>Name: {playerDetails.name}</p>
      <p>Breed: {playerDetails.breed}</p>
      <p>Status: {playerDetails.status}</p>
      <p>Created: {playerDetails.createdAt}</p>
      <p>Updated: {playerDetails.updatedAt}</p>
      <p>Team: {playerDetails.teamId}</p>
      <p>Cohort: {playerDetails.cohortId}</p>
    </div>
  );
}

export default PlayerDetails;
