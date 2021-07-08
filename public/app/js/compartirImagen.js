console.log('funciona')

import domtoimage from 'dom-to-image';

domtoimage.toJpeg(document.getElementById('btnShare'), { quality: 0.95 })
    .then(function (dataUrl) {
        var link = document.createElement('a');
        link.download = 'my-image-name.jpeg';
        link.href = dataUrl;
        link.click();
    });

