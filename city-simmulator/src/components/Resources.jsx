import { useState, useEffect } from 'react';

export default function Resources({ results }) {
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
      <div style={{ padding: '24px', background: 'linear-gradient(135deg, #f1f5f9 0%, #fef3c7 100%)', borderRadius: '8px', minHeight: '500px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '24px', color: '#1f2937' }}>Resources & Analysis</h2>
        <p style={{ color: '#6b7280', fontSize: '14px' }}>Generate a city to see analysis results and recommendations</p>
      </div>
    );
  }

  const currentYear = results.timeline[currentIndex];
  const metrics = ['Livability', 'Sustainability', 'Resilience', 'Equity'];

  return (
    <div style={{ padding: '24px', background: 'linear-gradient(135deg, #f1f5f9 0%, #fef3c7 100%)', borderRadius: '8px' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '24px', color: '#1f2937' }}>Resources & Analysis</h2>

      {/* Current Year Analysis */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', padding: '24px', marginBottom: '24px' }}>
        <div style={{ marginBottom: '16px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#374151', marginBottom: '8px' }}>
            Year {currentYear.year} Analysis
          </h3>
          <div style={{ fontSize: '12px', color: '#6b7280' }}>
            {currentIndex + 1} / {results.timeline.length}
          </div>
        </div>

        {/* Metrics Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '16px', marginBottom: '24px' }}>
          {metrics.map((metric) => {
            const value = currentYear[metric];
            const maxValue = 100;
            const percentage = (value / maxValue) * 100;
            
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
              <strong>💡 Recommendation:</strong> {currentYear.advice}
            </p>
          </div>
        )}

        {/* Timeline Navigation */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', marginTop: '24px', flexWrap: 'wrap' }}>
          {results.timeline.map((year, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              style={{
                width: index === currentIndex ? '24px' : '8px',
                height: '8px',
                borderRadius: '9999px',
                backgroundColor: index === currentIndex ? '#f59e0b' : '#d1d5db',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 300ms ease',
              }}
              title={`Year ${year.year}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}