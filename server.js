const express = require('express');

const routes = require('./routes');


const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(routes)


app.listen(PORT, () => {
    console.log(`API server is now on port ${PORT}`);
});
