// components/RankingTable.js

const RankingTable = ({ rankings }) => {
    return (
      <table border="1" style={{ width: '100%', textAlign: 'left', marginTop: '20px' }}>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Team</th>
            <th>Match</th>
            <th>Elimination</th>
            <th>Point</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {rankings.map((ranking, index) => (
            <tr key={index}>
              <td>{ranking.rank}</td>
              <td>{ranking.team}</td>
              <td>{ranking.match}</td>
              <td>{ranking.elimination}</td>
              <td>{ranking.point}</td>
              <td>{ranking.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  
  export default RankingTable;
  