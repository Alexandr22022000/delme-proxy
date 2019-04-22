const express = require('express'),
    httpProxy = require('http-proxy'),
    cookieParser = require('cookie-parser'),
    cors = require('cors'),

    proxy = httpProxy.createProxyServer({}),
    app = express();

app.use(cookieParser());
app.use(cors());

proxy.on('proxyReq', function(proxyReq, req, res, options) {
    proxyReq.setHeader('Origin', 'https://www.walmart.com');
});

app.use((req, res) => {

    //req.headers.origin = 'https://www.walmart.com';
    console.log(req.headers);

    proxy.web(req, res, {
        target: 'http://localhost:8101',
    });
});

app.listen(8100, () => console.log("Host is started on port 8100"));