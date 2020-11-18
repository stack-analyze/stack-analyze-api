const whois = require('whois')
const express = require('express');

const app = express();

app.get('/', (req, res) => {
	whois.lookup('windowsminios.org', (err, data) => {
		const info = data.split('\r\n').slice(0,8)
		res.json( err || info)
	})
})

app.listen(3000, () => console.log('api on port', 3000));