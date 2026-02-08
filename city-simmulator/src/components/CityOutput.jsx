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
  const metrics = ['Equity', 'Livability', 'Resilience', 'Sustainability'];

  return (
    <div>
      {/* Current Year Display */}
      <div>
        <div>
          <h3>{currentYear.year === 0 ? "Today" : `In ${currentYear.year} years...`}</h3>
        </div>

        {/* Metrics Grid: each metric is a single row (name | progress bar | score) */}
        <div>
          {metrics.map((metric) => {
            const raw = currentYear[metric];
            const valueNum = Number(raw) || 0;
            const percentage = Math.max(0, Math.min(100, (valueNum / 100) * 100));

            let barColor = '#e87047';
            if (percentage > 80) barColor = '#549d36';
            else if (percentage > 60) barColor = '#cfc539';
            else if (percentage > 40) barColor = '#eeb94f';
            else if (percentage > 20) barColor = '#ee983c';

            return (
              <div key={metric} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <div style={{ width: '120px', fontSize: '12px', color: '#aeb5c4', textTransform: 'uppercase' }}>{metric}</div>

                <div style={{ flex: 1 }}>
                  <div style={{ width: '100%', backgroundColor: '#e5e7eb', borderRadius: '9999px', height: '10px' }}>
                    <div
                      style={{
                        backgroundColor: barColor,
                        height: '10px',
                        borderRadius: '9999px',
                        transition: 'width 500ms ease',
                        width: `${percentage}%`
                      }}
                    />
                  </div>
                </div>

                <div style={{ width: '64px', textAlign: 'right', fontSize: '14px', fontWeight: 700, color: barColor }}>{valueNum.toFixed(1)}</div>
              </div>
            );
          })}
        </div>

        {/* Overall metric as its own div for separate styling */}
        <div id="overall-metric">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '20px', fontWeight: 700, color: '#bac7f1' }}>Overall</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '28px', fontWeight: 800, color: '#bac7f1' }}>{(Number(currentYear.Overall) || 0).toFixed(1)}</div>
              <div style={{ width: '200px', marginTop: '8px' }}>
                <div style={{ width: '100%', backgroundColor: '#e5e7eb', borderRadius: '9999px', height: '12px' }}>
                  <div style={{ backgroundColor: '#756bd7', height: '12px', borderRadius: '9999px', width: `${Math.max(0, Math.min(100, (Number(currentYear.Overall)||0)))}%` }} />
                </div>
              </div>
            </div>
          </div>
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
                backgroundColor: index === currentIndex ? '#736bbd' : '#d1d5db',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 300ms ease',
              }}
              onMouseEnter={(e) => {
                if (index !== currentIndex) {
                  e.target.style.backgroundColor = '#9d9ac9';
                }
              }}
              onMouseLeave={(e) => {
                if (index !== currentIndex) {
                  e.target.style.backgroundColor = '#d2d1db';
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