wget http://download.redis.io/redis-stable.tar.gz
tar xvzf redis-stable.tar.gz
cd redis-stable
make
cp src/redis-server /usr/local/bin/
cp src/redis-cli /usr/local/bin/
redis-server