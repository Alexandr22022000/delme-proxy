const express = require('express'),
    httpProxy = require('http-proxy'),

    proxy = httpProxy.createProxyServer({}),
    app = express();

app.use((req, res) => {
    proxy.web(req, res, {
        target: 'http://localhost:8101',
    });
});

app.listen(8100, () => console.log("Host is started on port 8100"));