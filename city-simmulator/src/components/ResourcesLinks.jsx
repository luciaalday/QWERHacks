export default function ResourcesLinks({ adviceData }) {
  if (!adviceData?.category) {
    return null;
  }

  return (
    <div style={{ width: '100%', marginTop: '24px', padding: '16px', background: '#f9fafb', borderRadius: '8px' }}>
      <h3>Recommended resources</h3>
      <p>Check out these links to get involved!</p>
      <p style={{ fontSize: 'small' }}><i>Note these may be UCLA specific links</i></p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {adviceData.links && adviceData.links.map((link, idx) => (
          <a
            key={idx}
            style={{ fontSize: 'small', color: '#2563eb', textDecoration: 'none' }}
            href={link.split(' (')[0]}
            target="_blank"
            rel="noopener noreferrer"
          >
            {link}
          </a>
        ))}
      </div>
    </div>
  );
}
