var redisClient = require('ioredis');

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
            connection = redisClient.createClient(6379, 'localhost');
            connection.select(0);
            connection.on('ready',function(){
                cb(connection);
            });
            connection.on('end',function(){
                connection=null;
            });
            connection.on('error',function(){
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


