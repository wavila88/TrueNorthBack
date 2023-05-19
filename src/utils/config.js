const config = {
  port: process.env.PORT || 3001,
  sqlConection: {
    user: process.env.SQL_USER || 'sql9619488' ,
    password:process.env.SQL_PASSWORD || 'Xkm3frQs7G',
    server: process.env.SQL_HOST || 'sql9.freesqldatabase.com',
    database: process.env.SQL_DATABASE || 'sql9619488' ,
  }

}

module.exports = config;