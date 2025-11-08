'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { signInAnonymouslyWithName } from '@/lib/firebase';

export default function TestDbPage() {
  const [status, setStatus] = useState('');
  const [userName, setUserName] = useState('Test User');

  const testSupabase = async () => {
    setStatus('Testing Supabase connection...');
    try {
      const { data, error } = await supabase.from('locations').select('count');
      if (error) throw error;
      setStatus('✅ Supabase connected! Found ' + (data?.length || 0) + ' locations.');
    } catch (error) {
      setStatus('❌ Supabase error: ' + (error as Error).message);
    }
  };

  const testFirebase = async () => {
    setStatus('Testing Firebase authentication...');
    try {
      const user = await signInAnonymouslyWithName(userName);
      setStatus('✅ Firebase connected! User ID: ' + user.uid);
    } catch (error) {
      setStatus('❌ Firebase error: ' + (error as Error).message);
    }
  };

  const addTestLocation = async () => {
    setStatus('Adding test location...');
    try {
      // First sign in
      const user = await signInAnonymouslyWithName(userName);
      
      // Then add location
      const { data, error } = await supabase.from('locations').insert({
        name: 'Test Location - Tokyo',
        address: 'Tokyo, Japan',
        place_id: 'test_' + Date.now(),
        created_by: user.uid,
        created_by_name: userName,
      }).select();

      if (error) throw error;
      setStatus('✅ Location added! ID: ' + data[0].id);
    } catch (error) {
      setStatus('❌ Error: ' + (error as Error).message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">🧪 Backend Test Page</h1>
        
        <div className="bg-white rounded-lg shadow p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Your Name:</label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Enter your name"
            />
          </div>

          <div className="space-y-2">
            <button
              onClick={testSupabase}
              className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              Test Supabase Connection
            </button>
            
            <button
              onClick={testFirebase}
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Test Firebase Auth
            </button>
            
            <button
              onClick={addTestLocation}
              className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
            >
              Add Test Location (Full Test)
            </button>
          </div>

          {status && (
            <div className="mt-4 p-4 bg-gray-100 rounded-lg">
              <p className="font-mono text-sm">{status}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}