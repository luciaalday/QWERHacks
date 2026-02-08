import { useState, useEffect } from 'react';

export default function Resources({ results }) {
  const [role, setRole] = useState('general');

  useEffect(() => {
    if (!results?.timeline) return;

  }, [results?.timeline]);

  if (!results) {
    return (
      <div style={{ padding: '24px', background: 'linear-gradient(135deg, #f1f5f9 0%, #fef3c7 100%)', borderRadius: '8px', minHeight: '500px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '24px', color: '#1f2937' }}>Resources & Analysis</h2>
        <p style={{ color: '#6b7280', fontSize: '14px' }}>Generate a city to see analysis results and recommendations</p>
      </div>
    );
  }

  const currentYear = results.timeline[0];

  return (
    <div>
      <h3>What can I do as a...</h3>
      <select for="role-select" onChange={(e) => setRole(e.target.value)}>
        <option>Student</option>
        <option>City Resident</option>
        <option>Business Owner</option>
        <option>Public Official</option>
      </select>

        {/* Recommendation/Advice */}
        {currentYear.advice && (
          <div style={{ 
            backgroundColor: '#fffbeb', 
            borderLeft: '4px solid #f59e0b',
            padding: '16px',
            borderRadius: '6px',
            marginBottom: '16px'
          }}>
            <p style={{ fontSize: '14px', color: '#78350f', margin: 0 }}>
              {currentYear.advice}
            </p>
          </div>
        )}
    </div>
  );
}