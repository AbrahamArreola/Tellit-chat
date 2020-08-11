process.env.PORT = process.env.PORT || 9000;

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

let urlDB;

if(process.env.NODE_ENV == 'dev'){
    urlDB = 'mongodb://localhost:27017/chatDB';
}
else{
    urlDB = process.env.MONGO_URL;
}

process.env.URL_DB = urlDB;