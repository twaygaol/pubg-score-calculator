'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function TeamPage() {
  const { data: session } = useSession();
  const [teams, setTeams] = useState([]);
  const [newTeamName, setNewTeamName] = useState('');
  const [newSchool, setNewSchool] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Fetch initial teams data from local storage
    const storedTeams = JSON.parse(localStorage.getItem('teams')) || [];
    setTeams(storedTeams);
  }, []);

  const handleAddTeam = () => {
    const newTeam = { name: newTeamName, school: newSchool };
    const updatedTeams = [...teams, newTeam];
    setTeams(updatedTeams);
    localStorage.setItem('teams', JSON.stringify(updatedTeams));
    setNewTeamName('');
    setNewSchool('');
    setShowModal(false);
  };

  const handleDeleteTeam = (index) => {
    const updatedTeams = teams.filter((_, i) => i !== index);
    setTeams(updatedTeams);
    localStorage.setItem('teams', JSON.stringify(updatedTeams));
  };

  if (!session) {
    return <p>You are not signed in. Please <Link href="/">sign in</Link>.</p>;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <main className="flex-1 p-6">
      <header className="w-full bg-blue-500 text-white py-4 px-8 flex justify-between items-center">
        <h1 className="text-xl font-bold">Team Pubg Mobile</h1>
        <Link href="/dashboard">
          <h1 className="bg-gray-500 px-4 py-2 rounded text-white hover:bg-gray-700">Back to Dashboard</h1>
        </Link>
      </header>
      <section className="bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Manage Teams</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mb-4"
        >
          Add Team
        </button>
        <div className="w-full max-w-4xl overflow-x-auto">
          <table className="min-w-6xl w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">No</th>
                <th className="py-2 px-4 border-b">Team Name</th>
                <th className="py-2 px-4 border-b">School</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody className='text-center'>
              {teams.map((team, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b">{index + 1}</td>
                  <td className="py-2 px-4 border-b">{team.name}</td>
                  <td className="py-2 px-4 border-b">{team.school}</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => handleDeleteTeam(index)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Add New Team</h2>
              <input
                type="text"
                placeholder="Team Name"
                value={newTeamName}
                onChange={(e) => setNewTeamName(e.target.value)}
                className="border p-2 mb-4 w-full"
              />
              <input
                type="text"
                placeholder="School"
                value={newSchool}
                onChange={(e) => setNewSchool(e.target.value)}
                className="border p-2 mb-4 w-full"
              />
              <div className="flex justify-end">
                <button
                  onClick={handleAddTeam}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mr-2"
                >
                  Add
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
        </section>
      </main>
    </div>
  );
}
