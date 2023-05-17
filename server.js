const express = require('express');
const app = express();

app.use(express.static('./dist/'));

app.get('*', (req, res) => {
    res.sendFile(`./quejas-frontend/dist/index.html`); // load the single view file (angular will handle the page changes on the front-end)
});
app.listen(process.env.PORT || 8080);