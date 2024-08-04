'use client'; // This ensures that the component is a Client Component

import { useSession, signOut } from 'next-auth/react';
import SignInForm from '../login/page';
import Link from 'next/link';
import Sidebar from '@/components/home/sidebar';
import { useState, useEffect } from 'react';

const Dashboard = () => {
  const { data: session, status } = useSession();
  const [cumulativePoints, setCumulativePoints] = useState([]);

  useEffect(() => {
    // Fetch bracket data from local storage
    const storedPoints = JSON.parse(localStorage.getItem('points')) || [];

    // Function to calculate cumulative points
    const getCumulativePoints = () => {
      const teamTotals = {};

      storedPoints.forEach(({ teamName, match, kills, totalPoints }) => {
        if (!teamTotals[teamName]) {
          teamTotals[teamName] = { totalPoints: 0, totalKills: 0, matchDetails: [] };
        }
        teamTotals[teamName].totalPoints += totalPoints;
        teamTotals[teamName].totalKills += parseInt(kills, 10);
        teamTotals[teamName].matchDetails.push({ match, kills, totalPoints });
      });

      const sortedTeams = Object.entries(teamTotals)
        .map(([teamName, { totalPoints, totalKills, matchDetails }]) => ({
          teamName,
          totalPoints,
          totalKills,
          matchDetails,
        }))
        .sort((a, b) => b.totalPoints - a.totalPoints);

      return sortedTeams.map((team, index) => ({
        ...team,
        rank: index + 1,
      }));
    };

    setCumulativePoints(getCumulativePoints());
  }, []);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session) {
    return (
      <div>
        <SignInForm />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <main className="flex-1 p-6">
        <header className="flex justify-between p-4 rounded-xl bg-blue-400 items-center mb-4">
          <h1 className="text-3xl text-center justify-center font-semibold">WELCOME PEKAN E-SPORT</h1>
          {/* <button
            onClick={() => signOut()}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Sign Out
          </button> */}
        </header>
        <section className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-bold mb-4">OVERALL RANGKINGS PUBG MOBILE</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead className='bg-gray-600 text-white'>
                <tr>
                  <th className="py-2 px-4 border-b">Rank</th>
                  <th className="py-2 px-4 border-b">Team Name</th>
                  <th className="py-2 px-4 border-b">Match Details</th>
                  <th className="py-2 px-4 border-b">Total Kills</th>
                  <th className="py-2 px-4 border-b">Total Points</th>
                </tr>
              </thead>
              <tbody className='text-center'>
                {cumulativePoints.map((team, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border-b">{team.rank}</td>
                    <td className="py-2 px-4 border-b">{team.teamName}</td>
                    <td className="py-2 px-4 border-b">
                      {team.matchDetails.map((detail, i) => (
                        <div key={i}>
                          <span>{detail.match} - Kills: {detail.kills}, Points: {detail.totalPoints}</span>
                        </div>
                      ))}
                    </td>
                    <td className="py-2 px-4 border-b">{team.totalKills}</td>
                    <td className="py-2 px-4 border-b">{team.totalPoints}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <footer className=" justify-between items-center mb-4">
          <h1 className="text-xl mb-4 font-semibold">Note :</h1>
          <table className="">
              <thead className='bg-gray-600 text-white'>
                <tr>
                  <th className="py-1 px-2 border-b">Rank</th>
                  <th className="py-1 px-2 border-b">Point</th>
                </tr>
              </thead>
              <tbody className='text-center'>
               <tr>
                <td className="py-1 px-2 border-b">1</td>
                <td className="py-1 px-2 border-b">10 point</td>
               </tr>
               <tr>
                <td className="py-1 px-2 border-b">2</td>
                <td className="py-1 px-2 border-b">6 point</td>
               </tr>
               <tr>
                <td className="py-1 px-2 border-b">3</td>
                <td className="py-1 px-2 border-b">5 point</td>
               </tr>
               <tr>
                <td className="py-1 px-2 border-b">4</td>
                <td className="py-1 px-2 border-b">4 point</td>
               </tr>
               <tr>
                <td className="py-1 px-2 border-b">5</td>
                <td className="py-1 px-2 border-b">3 point</td>
               </tr>
               <tr>
                <td className="py-1 px-2 border-b">6</td>
                <td className="py-1 px-2 border-b">2 point</td>
               </tr>
               <tr>
                <td className="py-1 px-2 border-b">7-8</td>
                <td className="py-1 px-2 border-b">1 point</td>
               </tr>
               <tr>
                <td className="py-1 px-2 border-b">9-16</td>
                <td className="py-1 px-2 border-b">0 point</td>
               </tr>
              </tbody>
            </table>
        </footer>
      </main>
    </div>
  );
};

export default Dashboard;
