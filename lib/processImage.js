const papercut  = require('papercut');

papercut.configure(() => {
  papercut.set('storage', 'file')
  papercut.set('directory', './public/img/gallery')
  papercut.set('url', './public/img/gallery')
  papercut.set('extension', 'jpg');
});

GalleryUploader = papercut.Schema(function(schema){
  schema.version({
    name: 'thumbnail',
    size: '500x375',
    process: 'crop'
  });

  schema.version({
    name: 'large',
    size: '800x600',
    process: 'resize'
  });
});

module.exports = GalleryUploader;