// components/InputForm.js

import { useState } from 'react';

const InputForm = ({ onCalculate }) => {
  const [teamName, setTeamName] = useState('');
  const [kills, setKills] = useState(0);
  const [position, setPosition] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    onCalculate(teamName, kills, position);
    setTeamName('');
    setKills(0);
    setPosition(1);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Team Name:</label>
        <input 
          type="text" 
          value={teamName} 
          onChange={(e) => setTeamName(e.target.value)} 
          required
        />
      </div>
      <div>
        <label>Kills:</label>
        <input 
          type="number" 
          value={kills} 
          onChange={(e) => setKills(parseInt(e.target.value))} 
          required
        />
      </div>
      <div>
        <label>Position:</label>
        <input 
          type="number" 
          value={position} 
          onChange={(e) => setPosition(parseInt(e.target.value))} 
          required
        />
      </div>
      <button type="submit">Calculate</button>
    </form>
  );
};

export default InputForm;
