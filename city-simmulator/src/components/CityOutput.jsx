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

  if (!results) {
    return (
      <div>
        <h2>City Output</h2>
        <p>Generate a city to see results</p>
      </div>
    );
  }

  const currentYear = results.timeline[currentIndex];
  const metrics = ['Equity', 'Livability', 'Resilience', 'Sustainability', 'Overall'];

  return (
    <div style={{ padding: '24px', background: 'linear-gradient(135deg, #f1f5f9 0%, #f0f9ff 100%)', borderRadius: '8px' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '24px', color: '#1f2937' }}>City Output</h2>

      {/* Current Year Display */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', padding: '24px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#374151' }}>
            Year {currentYear.year}
          </h3>
        </div>

        {/* Metrics Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '16px', marginBottom: '24px' }}>
          {metrics.map((metric) => {
            const value = currentYear[metric];
            const maxValue = 100;
            const percentage = (value / maxValue) * 100;
            
            // Color coding based on value
            let barColor = '#ef4444';
            if (percentage > 60) barColor = '#22c55e';
            else if (percentage > 30) barColor = '#eab308';

            return (
              <div key={metric} style={{ textAlign: 'center' }}>
                <div style={{ marginBottom: '8px' }}>
                  <div style={{ fontSize: '24px', fontWeight: 700, color: '#1f2937' }}>
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
            currentYear.Overall <= 25
              ? City4
              : currentYear.Overall <= 50
              ? City3
              : currentYear.Overall <= 75
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