const express = require('express');
const main = require('./config/db');
const cors = require('cors');
const bodyParser = require('body-parser');
const PORT = 5000;

app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

main().catch((err) => console.log(err));

app.use('/api/polls', require('./routes/polls'));
app.use('/user/api', require('./routes/userRoute'));
app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));
