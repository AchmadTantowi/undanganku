import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import CreateInvitation from './pages/CreateInvitation'
import InvitationView from './pages/InvitationView'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateInvitation />} />
        <Route path="/invitation" element={<InvitationView />} />
      </Routes>
    </Router>
  )
}

export default App
