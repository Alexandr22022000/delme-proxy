const express = require('express'),
    httpProxy = require('http-proxy'),

    proxy = httpProxy.createProxyServer({}),
    app = express();

app.use((req, res) => {
    proxy.web(req, res, {
        target: 'http://redstar-systems.com',
    });
});

app.listen(8101, () => console.log("Host is started on port 8101"));