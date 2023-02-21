const mysql  = require('mysql');
  module.exports = {
    connection:null,
    init:function(){
        this.connection = mysql.createConnection({     
            host     : 'localhost',
            user     : 'root',
            password : 'zhang12..',
            port     : '3506',
            database : 'sakila' 
        })
    },
    connect:function(){
        this.connection.connect();
    },
    close:function(){
        this.connection.end();
    },
    //QUERY查询列表
    query:function(sql){
        let _this = this;
        //处理异步
        let time = new Promise((resolve,reject)=>{
            _this.connection.query(sql,(err, result) => {
                if(err){
                  console.log('[SELECT ERROR] - ',err.message);
                  reject(result);
                }
                resolve(result);
            });
        })
        return time;
    },
  };