import React, { useState, useEffect } from 'react';
import { 
  getAnsweredQuestions, 
  getAnsweredQuestionsDetailed, 
  getAnsweredQuestionsMap, 
  debugProgress, 
  clearProgress, 
  cleanupDuplicates 
} from '../utils/progressStorage';

const DebugPage: React.FC = () => {
  const [debugData, setDebugData] = useState<any>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const refresh = () => {
    const data = debugProgress();
    setDebugData(data);
    setRefreshKey(prev => prev + 1);
  };

  useEffect(() => {
    refresh();
  }, [refreshKey]);

  const handleCleanup = () => {
    const result = cleanupDuplicates();
    console.log('Cleanup result:', result);
    refresh();
  };

  const handleClear = () => {
    clearProgress();
    refresh();
  };

  const legacy = getAnsweredQuestions();
  const detailed = getAnsweredQuestionsDetailed();
  const map = getAnsweredQuestionsMap();

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Progress Storage Debug</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <button onClick={refresh} style={{ marginRight: '10px' }}>Refresh</button>
        <button onClick={handleCleanup} style={{ marginRight: '10px' }}>Cleanup Duplicates</button>
        <button onClick={handleClear} style={{ marginRight: '10px' }}>Clear All</button>
      </div>

      <div style={{ display: 'grid', gap: '20px' }}>
        <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
          <h3>Legacy Format</h3>
          <p><strong>Count:</strong> {legacy.length}</p>
          <p><strong>IDs:</strong> {legacy.join(', ')}</p>
        </div>

        <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
          <h3>Detailed Format</h3>
          <p><strong>Count:</strong> {detailed.length}</p>
          <div style={{ maxHeight: '200px', overflow: 'auto' }}>
            {detailed.map((item, i) => (
              <div key={i} style={{ marginBottom: '5px', fontSize: '12px' }}>
                <strong>{item.id}:</strong> "{item.answer}" 
                <span style={{ color: '#666' }}> at {new Date(item.timestamp).toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
          <h3>Generated Map</h3>
          <p><strong>Count:</strong> {Object.keys(map).length}</p>
          <div style={{ maxHeight: '200px', overflow: 'auto' }}>
            {Object.entries(map).map(([id, answer], i) => (
              <div key={i} style={{ marginBottom: '5px', fontSize: '12px' }}>
                <strong>{id}:</strong> "{answer}"
              </div>
            ))}
          </div>
        </div>

        <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
          <h3>Analysis</h3>
          <p><strong>Legacy vs Detailed:</strong> {legacy.length === detailed.length ? '✅ Match' : '❌ Mismatch'}</p>
          <p><strong>Detailed vs Map:</strong> {detailed.length === Object.keys(map).length ? '✅ Match' : '❌ Mismatch'}</p>
          
          {/* Check for duplicates in detailed */}
          {(() => {
            const ids = detailed.map(item => item.id);
            const uniqueIds = Array.from(new Set(ids));
            const duplicates = ids.length - uniqueIds.length;
            return (
              <p><strong>Duplicates in detailed:</strong> {duplicates === 0 ? '✅ None' : `❌ ${duplicates} found`}</p>
            );
          })()}
        </div>
      </div>
    </div>
  );
};

export default DebugPage;
