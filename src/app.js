const express = require('express');
const productRoutes = require('./routes/products');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', productRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
