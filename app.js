const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const app = express();

// 1) Middleware ---------------------------------------------------
app.use(morgan('dev'));

app.use(express.json());

app.use((req, res, next) => {
  console.log('Hello from the middleware');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// 2) Route Handlers ---------------------------------------------------

function getAllTours(req, res) {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
}

function getTour(req, res) {
  const id = req.params.id * 1; // Converto para numero pois ele vem como string
  const tour = tours.find((el) => el.id === id);

  if (!tour) {
    return res.status(404).send({
      status: 'failed',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
}

function createTour(req, res) {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
}

function updateTour(req, res) {
  //Essa função é só pra exemplificar os metodos da requisição, não vai ser implementada agora

  if (req.params.id * 1 > tours.length) {
    return res.status(404).send({
      status: 'failed',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour: '<updated tour here..>',
    },
  });
}

function deleteTour(req, res) {
  //Essa função é só pra exemplificar os metodos da requisição, não vai ser implementada agora

  if (req.params.id * 1 > tours.length) {
    return res.status(404).send({
      status: 'failed',
      message: 'Invalid ID',
    });
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
}

function getAllUsers(req, res) {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined.',
  });
}

function createUser(req, res) {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined.',
  });
}
function getUser(req, res) {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined.',
  });
}
function updateUser(req, res) {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined.',
  });
}
function deleteUser(req, res) {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined.',
  });
}

// 3) Routes ---------------------------------------------------

app.route('/api/v1/tours').get(getAllTours).post(createTour);

app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

app.route('api/v1/users').get(getAllUsers).post(createUser);

app.route('api/v1/users/:id').get(getUser).patch(updateUser).delete(deleteUser);

// 4) Start server ---------------------------------------------------

const port = 3000;
app.listen(port, () => {
  // chamado assim que o server starta
  console.log(`App running on port ${port}...`);
});
