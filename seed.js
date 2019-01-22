const {db, Vegetable, Gardener, Plot} = require('./models');


const VegetableData = [
  {
    name: 'tomato',
    color: 'green',
    planted_on: '2018-10-15',
  },
  {
    name: 'eggplant',
    color: 'aubergine',
    planted_on: '2018-04-01',
  },
  {
    name: 'basil',
    color: 'green',
    planted_on: '2018-06-06',
  },
  {
    name: 'courgette',
    color: 'green',
    planted_on: '2018-05-18',
  }
]

const GardenerData = [
  {
    name: 'Julia',
    age: 25,
  },
  {
    name: 'Stef',
    age: 29,
  }
]

const PlotData = [
  {
    size: 10,
    shaded: true,
  },
  {
    size: 15,
    shaded: false,
  }
]


db.sync({ force: true })
  .then(() => {
    console.log('Database synced!');
    const promiseForVegetable = Vegetable.bulkCreate(VegetableData, {returning: true})
    const promiseForGardener = Gardener.bulkCreate(GardenerData, {returning: true})
    const promiseForPlot = Plot.bulkCreate(PlotData, {returning: true})

    return Promise.all([promiseForVegetable, promiseForGardener, promiseForPlot])
  })
  .catch(err => {
    console.log(`The error is: ${err}`);
  })
  .finally(() => {
    db.close();
  });
