const ordersRoutes = (app, fs) => {
  // variables
  const dataPath = './data/orders.json';
  var lodash = require("lodash");

  app.post('/orders/create', (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
      if (err) {
        throw err;
      }
      const pedidos = JSON.parse(data);
      const novoPedido = JSON.parse(JSON.stringify(req.body));
      pedidos.orders.push(novoPedido);
      
      fs.writeFile(dataPath, JSON.stringify(pedidos, null, 2), 'utf8', err => {
        if (err) {
          throw err;
        }
        res.status(200).send('new order created');
      });      
    });
  });

  // READ
  app.get('/orders/:status', (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
      if (err) {
        throw err;
      }
      const busca = req.params['status'];
      const pedidos = JSON.parse(data);
      var retorno = lodash.filter(pedidos.orders, {"status": busca});

      res.send(retorno);
    });
  });

  app.post('/orders/update', (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
      if (err) {
        throw err;
      }
      const pedidoAlterado = JSON.parse(JSON.stringify(req.body));
      const pedidos = JSON.parse(data);

      var index = pedidos.orders.map(function(x) {return x["order-number"]; }).indexOf(pedidoAlterado["order-number"]);
      if (index == -1){
        res.status(404).send('order not found');
        return;
      }
      pedidos.orders[index].status = pedidoAlterado.status;

      console.log(pedidos.orders[index]);

      fs.writeFile(dataPath, JSON.stringify(pedidos, null, 2), 'utf8', err => {
        if (err) {
          throw err;
        }
        res.status(200).send('order updated');
      });    
    });
  });

};

module.exports = ordersRoutes;