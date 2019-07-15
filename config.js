require('dotenv').config();

let CONFIG = {};

CONFIG.app          = process.env.NODE_ENV;
CONFIG.port         = process.env.PORT;
CONFIG.db_dialect   = process.env.DB_DIALECT;
CONFIG.db_host      = process.env.DB_HOST;       
CONFIG.db_port      = process.env.DB_PORT;      
CONFIG.db_name      = process.env.DB_NAME;      
CONFIG.db_user      = process.env.DB_USER;     
CONFIG.db_password  = process.env.DB_PASSWORD;
CONFIG.session_time = process.env.SESS_LIFETIME;
CONFIG.session_name = process.env.SESS_NAME;
CONFIG.session_secret = process.env.SESS_SECRET;

module.exports = CONFIG;