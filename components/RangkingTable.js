const RankingTable = ({ rankings }) => {
    return (
      <table>
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
          {rankings.map((team, index) => (
            <tr key={index}>
              <td>{team.rank}</td>
              <td>{team.team}</td>
              <td>{team.match}</td>
              <td>{team.elimination}</td>
              <td>{team.point}</td>
              <td>{team.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  
  export default RankingTable;