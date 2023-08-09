const app = require('./app');

const port = 3000;
app.listen(port, () => {
  // chamado assim que o server starta
  console.log(`App running on port ${port}...`);
});
