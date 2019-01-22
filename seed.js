const { db, Vegetable, Gardener, Plot } = require('./models');

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
  },
];

const GardenerData = [
  {
    name: 'Julia',
    age: 25,
  },
  {
    name: 'Stef',
    age: 29,
  },
];

const PlotData = [
  {
    size: 10,
    shaded: true,
  },
  {
    size: 15,
    shaded: false,
  },
];

db.sync({ force: true })
  .then(() => {
    console.log('Database synced!');
    const promiseForVegetable = Vegetable.bulkCreate(VegetableData, {
      returning: true,
    });
    const promiseForGardener = Gardener.bulkCreate(GardenerData, {
      returning: true,
    });
    const promiseForPlot = Plot.bulkCreate(PlotData, { returning: true });

    return Promise.all([
      promiseForVegetable,
      promiseForGardener,
      promiseForPlot,
    ]);
  })

  .then(newRows => {
    const [vegetable, gardener, plot] = newRows;
    const [tomato, eggplant, basil, courgette] = vegetable;
    const [Julia, Stef] = gardener;
    const [plotA, plotB] = plot;

    const promise1 = Julia.setFavorite_vegetable(tomato);
    const promise2 = Stef.setFavorite_vegetable(courgette);
    const promise3 = plotA.setGardener(Julia);
    const promise4 = plotB.setGardener(Stef);
    const promise5 = plotA.setVegetables([tomato, eggplant, basil, courgette]);
    const promise6 = plotB.setVegetables([tomato, basil, courgette]);

    return Promise.all([
      promise1,
      promise2,
      promise3,
      promise4,
      promise5,
      promise6,
    ]);
  })
  .catch(err => {
    console.log(`The error is: ${err}`);
  })
  .finally(() => {
    db.close();
  });
