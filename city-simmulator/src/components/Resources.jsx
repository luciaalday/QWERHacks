import { useState, useEffect } from 'react';

export default function Resources({ results, role, setRole }) {
  const [adviceData, setAdviceData] = useState(null);

  useEffect(() => {
    if (!results?.current) return;

    // Fetch role-specific advice and links from backend
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
        setAdviceData(data);
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
        {adviceData && (
          <div>
            <p>
              {adviceData.advice}
            </p>
          </div>
        )}
    </div>

    <div className='left col' style={{ marginTop: '20px' }}>
      <h3>Recommended resources</h3>
      {adviceData?.category && (
        <div>
          <p>Check out these links to get involved!</p>
          <p style={{fontSize:'small'}}><i>Note these may be UCLA specific links</i></p>
            {adviceData.links && adviceData.links.map((link, idx) => (
              <a style={{textAlign:'left', fontSize:'small'}} key={idx} href={link.split(' (')[0]} target="_blank" rel="noopener noreferrer">{link}</a>
            ))}
        </div>
      )}
    </div>
    </>
  );
}