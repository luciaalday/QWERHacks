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
      <div style={{ padding: '24px', background: 'linear-gradient(135deg, #f1f5f9 0%, #fef3c7 100%)', borderRadius: '8px', minHeight: '500px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '24px', color: '#1f2937' }}>Resources</h2>
        <p style={{ color: '#6b7280', fontSize: '14px' }}>Generate a city to see analysis results and recommendations</p>
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
    </>
  );
}