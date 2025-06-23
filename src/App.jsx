
import React, { useState } from "react";
import { motion } from "framer-motion";

export default function LegalAssistantApp() {
  const [query, setQuery] = useState("");
  const [referenceDoc, setReferenceDoc] = useState(null);
  const [customData, setCustomData] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleDocUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setReferenceDoc(reader.result);
      reader.readAsText(file);
    }
  };

  const runAssistant = () => {
    setLoading(true);
    setTimeout(() => {
      const simulatedDraft = `This is a generated draft based on your reference document and custom data:\n\n---\n\nReference Sample:\n${referenceDoc?.slice(0, 300)}...\n\nCustom Data Used:\n${customData}\n\n[Draft content will appear here based on actual integration with GPT.]`;
      setResponse(simulatedDraft);
      setLoading(false);
    }, 2000);
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
        Legal Assistant for Lawyers in India
      </h1>

      <textarea
        placeholder="Ask a legal question or request a draft (e.g., Draft a rental agreement for Delhi)"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        rows={4}
        style={{ width: '100%', padding: '0.5rem', fontSize: '1rem' }}
      />

      <div style={{ margin: '1rem 0' }}>
        <label><strong>Upload a Reference Document (optional):</strong></label>
        <input type="file" accept=".txt,.docx,.pdf" onChange={handleDocUpload} style={{ display: 'block', marginTop: '0.5rem' }} />
      </div>

      <textarea
        placeholder="Enter custom data for new draft (e.g., Party names, dates, jurisdiction)"
        value={customData}
        onChange={(e) => setCustomData(e.target.value)}
        rows={4}
        style={{ width: '100%', padding: '0.5rem', fontSize: '1rem' }}
      />

      <button
        onClick={runAssistant}
        disabled={loading}
        style={{ marginTop: '1rem', padding: '0.75rem 1rem', fontSize: '1rem', backgroundColor: '#4F46E5', color: '#fff', border: 'none', borderRadius: '4px' }}
      >
        {loading ? "Generating..." : "Run Legal Assistant"}
      </button>

      {response && (
        <motion.div
          style={{ marginTop: '2rem', backgroundColor: '#f9f9f9', padding: '1rem', borderRadius: '8px', whiteSpace: 'pre-wrap' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {response}
        </motion.div>
      )}
    </div>
  );
}
