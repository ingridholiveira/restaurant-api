const productRoutes = (app, fs) => {
  // variables
  const dataPath = './data/products.json';
  var lodash = require("lodash");

  // READ
  app.get('/products/:busca', (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
      if (err) {
        throw err;
      }

      const busca = req.params['busca'];
      const produtos = JSON.parse(data);
      var retorno = lodash.filter(produtos.products, function (produto){
        return produto.name == busca || produto.code == busca;
      });

      res.send(retorno);
    });
  });
};

module.exports = productRoutes;