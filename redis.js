var redisClient = require('ioredis');
let redisHost = process.env.redisHost;
let redisPort = process.env.redisPort;
module.exports = (function () {
    var connection = null;
    function connect(cb){
        try{
            if(!connection)
                return setConnection(cb);
            cb(connection);
        }catch(err){
            cb(null);
        }
    }
    function setConnection(cb){
        try{
            connection = redisClient.createClient(redisPort, redisHost);
            connection.select(0);
            connection.on('ready',function(){
                console.log("connection setup done");
                cb(connection);
            });
            connection.on('end',function(){
                console.log("connection ended");
                connection=null;
            });
            connection.on('error',function(err){
                console.log("connection error", err);
                connection=null;
            });
        }catch(err){
            cb(null);
        }
    }


    return {
        set: function(key,value,cb){
            try{
                connect(function(connection){
                    connection.set(key,value,function(err,value){
                        if(err){
                            cb(err);
                        }else
                            cb(null,value);
                    });

                });
            }catch(err){
                cb(err);
            }
        },
        sAdd:function(key,val,cb){
            try{
                connect(function(connection){
                    connection.sadd(key,val,function(err,reply){
                        if(err){
                            cb(err);
                        }else
                            cb(null,reply);
                    });

                });
            }
            catch(err){
                cb(err);
            }
        },
        sMembers:function(key,cb){
            try{
                connect(function(connection){
                    connection.smembers(key,function(err,data){
                        if(err){
                            cb(err);
                        }else
                            cb(null,data);
                    });

                });
            }
            catch(err){
                cb(err);
            }
        },
        keys:function(key,cb){
            try{
                connect(function(connection){
                    connection.keys(key,function(err,data){
                        if(err){
                            cb(err);
                        }else
                            cb(null,data);
                    });

                });
            }
            catch(err){
                cb(err);
            }
        }
    };
})();


