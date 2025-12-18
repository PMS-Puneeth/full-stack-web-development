
const fs = require('fs');
const https = require('https');

const file = fs.createWriteStream("public/images/hassan.png");
const request = https.get("https://upload.wikimedia.org/wikipedia/commons/e/ed/Hoysaleswara_Temple_at_Halebidu.jpg", function (response) {
    response.pipe(file);
    file.on('finish', function () {
        file.close(() => console.log('Download complete'));
    });
});
