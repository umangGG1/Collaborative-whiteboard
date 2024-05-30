import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useParams } from 'react-router-dom';
import Home from './pages/homepage';
import CreateJoinWhiteboard from './pages/whiteboard/CreateJoinWhiteboard';
import Whiteboard from './pages/whiteboard/Whiteboard';

const App: React.FC = () => {
  const [whiteboardId, setWhiteboardId] = useState<string>('');
  const [userName, setUserName] = useState<string>('');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route 
          path="/create-join" 
          element={<CreateJoinWhiteboard setWhiteboardId={setWhiteboardId} setUserName={setUserName} />} 
        />
        <Route 
          path="/whiteboard/:id" 
          element={<WhiteboardWrapper />} 
        />
      </Routes>
    </Router>
  );
};

const WhiteboardWrapper: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const storedUserName = localStorage.getItem('userName');
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  if (!id || !userName) {
    return <Navigate to={`/whiteboard/${id}`} />;
  }

  return <Whiteboard whiteboardId={id} userName={userName} />;
};

export default App;
