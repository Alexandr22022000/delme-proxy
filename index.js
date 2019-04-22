const express = require('express'),
    httpProxy = require('http-proxy'),
    cookieParser = require('cookie-parser'),
    cors = require('cors'),

    proxy = httpProxy.createProxyServer({}),
    app = express();

app.use(cookieParser());
app.use(cors());

app.use((req, res) => {

    console.log(req.headers);

    proxy.web(req, res, {
        target: 'http://localhost:8101',
    });
});

app.listen(8100, () => console.log("Host is started on port 8100"));