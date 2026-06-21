import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import TemplateSelection from './pages/TemplateSelection'
import InvitationEditor from './pages/InvitationEditor'
import InvitationView from './pages/InvitationView'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/templates" element={<TemplateSelection />} />
        <Route path="/editor/:slug" element={<InvitationEditor />} />
        <Route path="/invitation/:slug" element={<InvitationView />} />
        {/* Keep legacy route for backward compatibility / query parameters */}
        <Route path="/invitation" element={<InvitationView />} />
      </Routes>
    </Router>
  )
}

export default App

