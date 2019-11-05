wget http://download.redis.io/redis-stable.tar.gz &&
tar xvzf redis-stable.tar.gz &&
cd redis-stable &&
make &&
src/redis-server --daemonize yes &&
src/redis-cli PING