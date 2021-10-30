const express = require('express');
const cors = require('cors');

class ExpressLoader {

    static init(app){
        app.use(cors());
        app.use(express.json());
      
        return app;
    }

}

module.exports = {ExpressLoader};