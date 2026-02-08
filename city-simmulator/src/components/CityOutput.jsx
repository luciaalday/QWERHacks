import { useState, useEffect } from 'react';
import City1 from '../img/Artboard 1.png';
import City2 from '../img/Artboard 2.png';
import City3 from '../img/Artboard 3.png';
import City4 from '../img/Artboard 4.png';

export default function CityOutput({ results }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!results?.timeline) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % results.timeline.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [results?.timeline]);

  // Reset to the beginning whenever a new simulation result arrives
  useEffect(() => {
    if (!results) return;
    const reset = () => {
      setCurrentIndex(0);
    };
    reset();
  }, [results]);

  if (!results) {
    return (
      <div>
        <p>Generate a city to see results</p>
      </div>
    );
  }

  const currentYear = (results.timeline && results.timeline[currentIndex]) || { year: 0, Overall: 0, Livability: 0, Sustainability: 0, Resilience: 0, Equity: 0 };
  const metrics = ['Equity', 'Livability', 'Resilience', 'Sustainability', 'Overall'];

  return (
    <div>
      <h1>UrbanIntel</h1>
      <h4>Balancing Urban Evolution using Predictive Modeling</h4>
      {/* Current Year Display */}
      <div>
        <div>
          <h3>{currentYear.year === 0 ? "Today" : `In ${currentYear.year} years...`}</h3>
        </div>

        {/* Metrics Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1, minmax(0, 1fr))', gap: '16px', marginBottom: '24px' }}>
          {metrics.map((metric) => {
            const value = currentYear[metric];
            const maxValue = 100;
            const percentage = (value / maxValue) * 100;
            
            // Color coding based on value
            let barColor = '#57370d';
            if (percentage > 60) barColor = '#3d8c3d';
            else if (percentage > 30) barColor = '#a49a29';

            return (
              <div key={metric} style={{ textAlign: 'center' }}>
                <div style={{ marginBottom: '8px' }}>
                  <div style={{ fontSize: '24px', fontWeight: 700, color: '#bfd3f0' }}>
                    {value?.toFixed(1) ?? '0.0'}
                  </div>
                  <div style={{ fontSize: '12px', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {metric}
                  </div>
                </div>
                {/* Progress bar */}
                <div style={{ width: '100%', backgroundColor: '#e5e7eb', borderRadius: '9999px', height: '8px' }}>
                  <div
                    style={{
                      backgroundColor: barColor,
                      height: '8px',
                      borderRadius: '9999px',
                      transition: 'all 500ms ease',
                      width: `${Math.max(0, Math.min(100, percentage))}%`
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
        <img
          src={
            currentYear.Overall <= 20
              ? City4
              : currentYear.Overall <= 40
              ? City3
              : currentYear.Overall <= 60
              ? City2
              : City1
          }
          width="100%"
          alt={`City visualization for year ${currentYear.year}`}
          style={{ borderRadius: '8px' }}
        />

        {/* Timeline Progress Dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', marginTop: '24px', flexWrap: 'wrap' }}>
          {results.timeline.map((year, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              style={{
                width: index === currentIndex ? '24px' : '8px',
                height: '8px',
                borderRadius: '9999px',
                backgroundColor: index === currentIndex ? '#2563eb' : '#d1d5db',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 300ms ease',
              }}
              onMouseEnter={(e) => {
                if (index !== currentIndex) {
                  e.target.style.backgroundColor = '#9ca3af';
                }
              }}
              onMouseLeave={(e) => {
                if (index !== currentIndex) {
                  e.target.style.backgroundColor = '#d1d5db';
                }
              }}
              title={`Year ${year.year}`}
              aria-label={`Go to year ${year.year}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}