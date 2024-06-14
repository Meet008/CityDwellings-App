import React, { useState } from "react";
import api from "../api";

const UploadForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [tourFile, setTourFile] = useState(null);

  const handleFileChange = (e) => {
    setTourFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("tourFile", tourFile);

    try {
      const res = await api.post("tours/tours", formData);
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
      </div>
      <div>
        <label>Tour File (ZIP):</label>
        <input type="file" onChange={handleFileChange} required />
      </div>
      <button type="submit">Upload</button>
    </form>
  );
};

export default UploadForm;
