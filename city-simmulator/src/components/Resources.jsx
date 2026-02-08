import { useState, useEffect } from 'react';

export default function Resources({ results, role, setRole }) {
  const [roleAdvice, setRoleAdvice] = useState('');

  useEffect(() => {
    if (!results?.current) return;

    // Fetch role-specific advice from backend
    const fetchAdvice = async () => {
      try {
        const res = await fetch('http://localhost:5000/get-role-advice', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            scores: results.current,
            role: role
          })
        });

        if (!res.ok) {
          console.error('Failed to fetch role advice', res.statusText);
          return;
        }

        const data = await res.json();
        setRoleAdvice(data.advice);
      } catch (err) {
        console.error('Error fetching role advice:', err);
      }
    };

    fetchAdvice();
  }, [results, role]);

  if (!results) {
    return (
      <div className='left col'>
        <h2>Resources</h2>
        <p>Generate a city to see analysis results and recommendations</p>
      </div>
    );
  }

  return (
    <>
    <div className='left col' style={{marginBottom:'20px'}}>
      <h3>What can I do as a...</h3>
      <select id="role-select" value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="Student">Student</option>
        <option value="General City Resident">City Resident</option>
        <option value="Business Owner">Business Owner</option>
        <option value="Public Official">Public Official</option>
      </select>
    </div>
    <div className='left col'>
        {/* Recommendation/Advice */}
        {roleAdvice && (
          <div>
            <p>
              {roleAdvice}
            </p>
          </div>
        )}
    </div>

    <div className='left col' style={{ marginTop: '20px' }}>
      <h3>Recommended resources</h3>
      {results?.current && (() => {
        const scores = results.current;
        const categories = ["Livability", "Sustainability", "Resilience", "Equity"];
        // find the lowest scoring category
        const smallest = categories.reduce((minCat, cat) => (scores[cat] < scores[minCat] ? cat : minCat), categories[0]);

        const resourcesMap = {
          "Livability": [
            { title: 'Community Organizing Guide', url: 'https://www.mobilisationlab.org' },
            { title: 'Parks and Recreation Resources', url: 'https://www.nrpa.org' }
          ],
          "Sustainability": [
            { title: 'EPA - Sustainable Management', url: 'https://www.epa.gov/sustainability' },
            { title: 'ICLEI - Local Sustainability', url: 'https://iclei.org' }
          ],
          "Resilience": [
            { title: 'FEMA - Ready', url: 'https://www.ready.gov' },
            { title: 'UNDRR - Disaster Risk Reduction', url: 'https://www.undrr.org' }
          ],
          "Equity": [
            { title: 'Urban Institute - Equity Resources', url: 'https://www.urban.org' },
            { title: 'PolicyLink - Equity Tools', url: 'https://www.policylink.org' }
          ]
        };

        const list = resourcesMap[smallest] || [];

        return (
          <div>
            <p style={{ color: '#6b7280' }}>Your city scores lowest in <strong>{smallest}</strong>. Here are some resources to get started:</p>
            <ul style={{ paddingLeft: '18px' }}>
              {list.map((r) => (
                <li key={r.url} style={{ marginBottom: '8px' }}>
                  <a href={r.url} target="_blank" rel="noopener noreferrer">{r.title}</a>
                </li>
              ))}
            </ul>
          </div>
        );
      })()}
    </div>
    </>
  );
}