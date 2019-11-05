wget http://download.redis.io/redis-stable.tar.gz &&
tar xvzf redis-stable.tar.gz &&
cd redis-stable &&
make &&
src/redis-server --port 6333  --daemonize yes &&
src/redis-cli -p 6333 PING