import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../../api";

const FileViewer = ({ tourId, filename }) => {
  const [fileUrl, setFileUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFileUrl = async () => {
      try {
        const response = await api.get(`tours/tours/${tourId}/${filename}`);
        setFileUrl(response.data.fileUrl);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchFileUrl();
  }, [tourId, filename]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!fileUrl) return null;

  return (
    <div className="file-viewer">
      <h3>Virtual Viewer</h3>
      <iframe
        title="File Viewer"
        src={fileUrl}
        width="100%"
        height="600"
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default FileViewer;
