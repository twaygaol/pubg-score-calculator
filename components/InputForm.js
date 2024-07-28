import { useState } from 'react';

const InputForm = ({ onCalculate }) => {
  const [kills, setKills] = useState(0);
  const [position, setPosition] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    onCalculate(kills, position);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Kills:</label>
        <input 
          type="number" 
          value={kills} 
          onChange={(e) => setKills(parseInt(e.target.value))} 
        />
      </div>
      <div>
        <label>Position:</label>
        <input 
          type="number" 
          value={position} 
          onChange={(e) => setPosition(parseInt(e.target.value))} 
        />
      </div>
      <button type="submit">Calculate</button>
    </form>
  );
};

export default InputForm;
