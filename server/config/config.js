process.env.PORT = process.env.PORT || 9000;

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

let urlDB, environment;

if(process.env.NODE_ENV == 'dev'){
    urlDB = 'mongodb://localhost:27017/chatDB';
    environment = 'http://localhost:9000';
}
else{
    urlDB = process.env.MONGO_URL;
}

process.env.URL_DB = urlDB;

process.env.ENVIRONMENT = environment;

process.env.SEED = process.env.SEED || "dev-sign";

process.env.TOKEN_EXPIRATION = "5min";