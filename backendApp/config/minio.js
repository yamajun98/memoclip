var Minio = require('minio')

//minioのアクセス情報
var minioClient = new Minio.Client({
    accessKeyId: 'IyYkD22hj2Quh9a4ZrEd',
    secretAccessKey: 'VGcbcivqR4yHGE4ACKCNhWaH0JDAZiqglvPajBqO',
    endPoint: 'play.min.io',
    port: 9001,
    useSSL: true,
  });

// バケットの情報を設定
var bucketName;
var fileNmae;

exports.minioClient = minioClient;