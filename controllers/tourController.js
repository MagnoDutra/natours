const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

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
};

exports.deleteTour = function (req, res) {
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
};
