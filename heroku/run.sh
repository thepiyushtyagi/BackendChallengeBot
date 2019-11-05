wget http://mirror.centos.org/centos/6/os/x86_64/Packages/yum-3.2.29-81.el6.centos.noarch.rpm &&
rpm -ivh yum-3.2.29-81.el6.centos.noarch.rpm &&
yum check-update &&
yum update &&
yum install -y sudo &&
sudo apt-get update &&
sudo apt-get install build-essential &&
sudo apt-get install tcl8.5 &&
wget http://download.redis.io/redis-stable.tar.gz &&
tar xvzf redis-stable.tar.gz &&
cd redis-stable &&
make &&
make test &&
sudo make install &&
redis-server --daemonize yes &&
redis-cli PING