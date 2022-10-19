const express = require('express');
const { Server: HttpServer } = require('http');
const { Server: SocketServer } = require('socket.io');

const SQLClient = require('./db/clients/sql.clients');
const dbConfig = require('./db/config');
const initialProducts = require('./db/assets/initialProducts');

const app = express();
const httpServer = new HttpServer(app);
const io = new SocketServer(httpServer);
const PORT = 8080 || process.env.PORT;
const productsDB = new SQLClient(dbConfig.mariaDb, 'products');
const messagesDB = new SQLClient(dbConfig.sqlite, 'messages');

(async () => {
  try {
    await productsDB.createTable();
    const products = await productsDB.getAll();
    if (products.length === 0) {
      await productsDB.save(initialProducts);
    }
  } catch (error) {
    console.log(error);
  } finally {
    // productsDB.disconnect();
  }
})();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

// Listen
httpServer.listen(PORT, () => {
  console.log('Server running on port', PORT);
});

// Socket events
io.on('connection', async (socket) => {
  console.log('nuevo cliente conectado');
  console.log(socket.id);

  const messages = [];
  socket.emit('messages', [...messages]);

  socket.on('new-message', (data) => {
    messages.push(data);
    io.emit('messages', messages);
  });

  const products = await productsDB.getAll();
  socket.emit('products', products);

  socket.on('new-product', async (data) => {
    await productsDB.save(data);
    const updatedProducts = await productsDB.getAll();
    io.emit('products', updatedProducts);
  });
});

// Routes
app.get('/', async (req, res) => {
  res.render('index.html');
});
