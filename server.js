const express = require('express'),
    app = express(),
<<<<<<< HEAD
    port = process.env.PORT || 3007,
    server = app.listen(port, () => console.log(`Preach It!! ${port}`)),
    { GPU } = require('gpu.js'),
    gpu = new GPU();
=======
    port = process.env.PORT || 3009,
    server = app.listen(port, () => console.log(`Preach It!! ${port}`))
>>>>>>> c23ea6b9efda7d5296c02cfb91b157bc67c719ef
app.use(express.static('public'))