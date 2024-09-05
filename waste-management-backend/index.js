const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Supabase setup
const supabaseUrl = 'https://kjhyraehzseuijrtrdpr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtqaHlyYWVoenNldWlqcnRyZHByIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ3NzExMzksImV4cCI6MjA0MDM0NzEzOX0.NOJ-mtk6wFnLdikxCtLXN7jH7UIllwh8Js44ru23Zr0';
const supabase = createClient(supabaseUrl, supabaseKey);

// Routes

// Get user data and bin status
app.get('/user/:id', async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .single();

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// Report a full bin
app.post('/report-bin', async (req, res) => {
  const { userId, location } = req.body;
  const { data, error } = await supabase
    .from('bin_reports')
    .insert([{ user_id: userId, location, status: 'reported' }]);

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// Get all reports for admin
app.get('/admin/reports', async (req, res) => {
  const { data, error } = await supabase
    .from('bin_reports')
    .select('*');

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// Update report status (for example, when waste is collected)
app.patch('/admin/reports/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const { data, error } = await supabase
    .from('bin_reports')
    .update({ status })
    .eq('id', id);

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// Update user's points
app.patch('/user/:id/points', async (req, res) => {
  const { id } = req.params;
  const { points } = req.body;
  const { data, error } = await supabase
    .from('users')
    .update({ points })
    .eq('id', id);

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

