const express = require('express'),
    app = express(),
    port = process.env.PORT || 3007,
    server = app.listen(port, () => console.log(`Preach It!! ${port}`)),
    { GPU } = require('gpu.js'),
    gpu = new GPU();
app.use(express.static('public'))