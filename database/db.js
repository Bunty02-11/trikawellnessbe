const mongoose = require('mongoose');

mongoose.connect('mongodb://bztech404:UXh44HexRamOVCSC@ac-xf5kuu1-shard-00-00.kxieenj.mongodb.net:27017,ac-xf5kuu1-shard-00-01.kxieenj.mongodb.net:27017,ac-xf5kuu1-shard-00-02.kxieenj.mongodb.net:27017/trika?ssl=true&replicaSet=atlas-ws6uxa-shard-0&authSource=admin&retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error while connecting to the database:', err));
