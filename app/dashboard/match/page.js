'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function MatchPage() {
  const { data: session } = useSession();
  const [matches, setMatches] = useState([]);
  const [newMatchName, setNewMatchName] = useState('');
  const [newMap, setNewMap] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Fetch initial matches data from local storage
    const storedMatches = JSON.parse(localStorage.getItem('matches')) || [];
    setMatches(storedMatches);
  }, []);

  const handleAddMatch = () => {
    const newMatch = { name: newMatchName, map: newMap };
    const updatedMatches = [...matches, newMatch];
    setMatches(updatedMatches);
    localStorage.setItem('matches', JSON.stringify(updatedMatches));
    setNewMatchName('');
    setNewMap('');
    setShowModal(false);
  };

  const handleDeleteMatch = (index) => {
    const updatedMatches = matches.filter((_, i) => i !== index);
    setMatches(updatedMatches);
    localStorage.setItem('matches', JSON.stringify(updatedMatches));
  };

  if (!session) {
    return <p>You are not signed in. Please <Link href="/">sign in</Link>.</p>;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <main className="flex-1 p-6">
      <header className="w-full bg-blue-500 text-white py-4 px-8 flex justify-between items-center">
        <h1 className="text-xl font-bold">Match Pubg Mobile</h1>
        <Link href="/dashboard">
          <h1 className="bg-gray-500 px-4 py-2 rounded text-white hover:bg-gray-700">Back to Dashboard</h1>
        </Link>
      </header>
      <section className="bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Manage Matches</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mb-4"
        >
          Add Match
        </button>
        <div className="w-full max-w-4xl overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Match</th>
                <th className="py-2 px-4 border-b">Map Match</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody className='text-center'>
              {matches.map((match, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b">{match.name}</td>
                  <td className="py-2 px-4 border-b">{match.map}</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => handleDeleteMatch(index)}
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
              <h2 className="text-xl font-bold mb-4">Add New Match</h2>
              <input
                type="text"
                placeholder="Match Name"
                value={newMatchName}
                onChange={(e) => setNewMatchName(e.target.value)}
                className="border p-2 mb-4 w-full"
              />
              <input
                type="text"
                placeholder="Map"
                value={newMap}
                onChange={(e) => setNewMap(e.target.value)}
                className="border p-2 mb-4 w-full"
              />
              <div className="flex justify-end">
                <button
                  onClick={handleAddMatch}
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
