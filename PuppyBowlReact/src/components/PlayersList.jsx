// import React, { useState, useEffect } from 'react';

// function PlayerList() {
//   const [players, setPlayers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetch('https://fsa-puppy-bowl.herokuapp.com/api/2302-acc-pt-web-pt-b/players')
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         return response.json();
//       })
//       .then(data => {
//         console.log(data); // Log the data to see the structure
//         if (Array.isArray(data.players)) {
//           setPlayers(data.data.players);
//         } else {
//           throw new Error('Data is not in the expected format');
//         }
//       })
//       .catch(error => {
//         console.error('Error fetching data:', error);
//         setError(error);
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }, []);

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     return <p>Error fetching data: {error.message}</p>;
//   }

//   return (
//     <div>
//       <h2>Player List</h2>
//       <ul>
//         {players.map(player => (
//           <li key={player.id}>{player.name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default PlayerList;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';


// import { fetchPlayers } from '../API/index'

const COHORTNAME = "2302-acc-pt-web-pt-b";
const APIURL = `https://fsa-puppy-bowl.herokuapp.com/api/${COHORTNAME}`;

const AllPlayers = () => {
  const [players, setPlayers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  console.log("Players: ", players);

  useEffect(() => {
    const fetchAllPlayers = async () => {
      try {
        // const result = await fetchPlayers();
        const response = await axios.get(`${APIURL}/players`);
        const result = await response.data.data.players;
        // console.log(result);
        setPlayers(result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAllPlayers();
  }, []);

  const filteredPlayers = players.filter(player =>
    player.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = e => {
    setSearchQuery(e.target.value);
  };
  const handleDelete = async (id, owner) => {
    if (owner !== 'YourUserName') {
      // Add your own logic here to restrict deletion based on ownership
      console.error("You can only delete players you've added.");
      return;
    }

    try {
      const response = await fetch(`https://fsa-puppy-bowl.herokuapp.com/api/2302-acc-pt-web-pt-b/players/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        // Handle success, e.g., remove the player from the local state
        setPlayers(prevPlayers => prevPlayers.filter(player => player.id !== id));
        console.log('Player deleted successfully');
      } else {
        // Handle error, e.g., show an error message
        console.error('Error deleting player');
      }
    } catch (error) {
      console.error('Error deleting player:', error);
    }
  };

  return (
    <>
    <div id="page-body">
    <div>
      <h2>Player List</h2>  
    </div>
      <div id="players-container">
      <input
        type="text"
        placeholder="Search by name"
        value={searchQuery}
        onChange={handleSearch}
      />
      {/* <ul> */}
        {filteredPlayers.map(player => (
          <p key={player.id}>
          {player.name}
          {player.owner === 'YourUserName' && ( // Replace 'YourUserName' with the actual username
            <button onClick={() => handleDelete(player.id, player.owner)}>Delete</button>
          )}
          </p>
        ))}
      {/* </ul> */}
        <div id="all-players-wrapper">
          
          {players.map((player) => (
            <div key={player.id}>
              <h4>{player.name}</h4>
              <p>{player.breed}</p>
              <img src={player.imageUrl} alt="${player.name}" width={200} />
              <p><Link to={`/players/${player.id}`}>See Details</Link></p>
              
            </div>
          ))}
        </div>
      </div>
      </div>
    </>
  );
};

export default AllPlayers;