const express = require('express');
const cors = require('cors');
const app = express();
const doctorsRoute = require('./routes/doctor');

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/doctors', doctorsRoute);

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
