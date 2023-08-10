const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'failed',
      message: 'You have to give a name and price!',
    });
  }
  next();
};

exports.checkID = (req, res, next, val) => {
  console.log(`Id: ${val}`);
  if (req.params.id * 1 >= tours.length) {
    return res.status(404).json({
      status: 'failed',
      message: 'Invalid ID',
    });
  }
  next();
};

exports.getAllTours = function (req, res) {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
};

exports.getTour = function (req, res) {
  const id = req.params.id * 1; // Converto para numero pois ele vem como string
  const tour = tours.find((el) => el.id === id);

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

exports.createTour = function (req, res) {
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
};

exports.updateTour = function (req, res) {
  //Essa função é só pra exemplificar os metodos da requisição, não vai ser implementada agora

  res.status(200).json({
    status: 'success',
    data: {
      tour: '<updated tour here..>',
    },
  });
};

exports.deleteTour = function (req, res) {
  //Essa função é só pra exemplificar os metodos da requisição, não vai ser implementada agora

  res.status(204).json({
    status: 'success',
    data: null,
  });
};
