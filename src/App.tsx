import React, { useState } from 'react';
import './App.css';
import api from './apiHelper'

function createState (stateChanged: (s: {}) => void) {
  const state = {
    changed () { stateChanged({}) },
    userId: '',
    password: '',

    async submitLogin () {
      try {
        const response = await api['/login']({ userId: state.userId, password: state.password })
        alert(`Token: ${response.token}`)
      } catch (err) { alert(String(err)) }
    },
  }
  return state
}

export default function () {
  const [, stateChanged] = useState({})
  const [state] = useState(() => createState(stateChanged))
  return (
    <div className="App">
      <div><input value={state.userId || ''} onChange={(e) => { state.userId = e.target.value; state.changed() }} type="text" /></div>
      <div><input value={state.password || ''} onChange={(e) => { state.password = e.target.value; state.changed() }} type="password" /></div>
      <div><button onClick={state.submitLogin}>Enter</button></div>
    </div>
  );
}
