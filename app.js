const fs = require('fs');
const express = require('express');

const app = express();

app.use(express.json());

// app.get('/', (req, res) => {
//   res
//     .status(200)
//     .json({ message: 'Hello from the server side!', app: 'Magnao' });
// });

// app.post('/', (req, res) => {
//   res.send('You can post to this endpoint...');
// });

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

app.get('/api/v1/tours', (req, res)=>{
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours
    }
  });
});

app.get('/api/v1/tours/:id', (req, res)=>{
  const id = req.params.id * 1; // Converto para numero pois ele vem como string
  const tour = tours.find(el => el.id === id);

  if(!tour) {
    return res.status(404).send({
      status: "failed",
      message: "Invalid ID"
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour
    }
  });
});

app.post('/api/v1/tours', (req,res)=>{
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({id: newId}, req.body);

  tours.push(newTour);
  fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
    res.status(201).json({
      status: "success",
      data: {
        tour: newTour
      }
    });
  });
});

app.patch('/api/v1/tours/:id', (req, res) => {
  //Essa função é só pra exemplificar os metodos da requisição, não vai ser implementada agora

  if(req.params.id * 1 > tours.length) {
    return res.status(404).send({
      status: "failed",
      message: "Invalid ID"
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      tour: '<updated tour here..>',
    }
  });
});

app.delete('/api/v1/tours/:id', (req, res) => {
  //Essa função é só pra exemplificar os metodos da requisição, não vai ser implementada agora

  if(req.params.id * 1 > tours.length) {
    return res.status(404).send({
      status: "failed",
      message: "Invalid ID"
    });
  }

  res.status(204).json({
    status: "success",
    data: null
  });
});

const port = 3000;
app.listen(port, () => {
  // chamado assim que o server starta
  console.log(`App running on port ${port}...`);
});
