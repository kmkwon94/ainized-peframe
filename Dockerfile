FROM ubuntu:latest
MAINTAINER KangMin,Kwon "kmkwon94@gmail.com"
RUN apt-get update
RUN apt-get install -y python3 python3-pip python3-dev build-essential g++ libssl-dev libpcre3 libpcre3-dev git wget
RUN apt-get install -y sudo vim

RUN git clone https://github.com/kmkwon94/ainized-peframe.git
RUN wget https://file-examples.com/wp-content/uploads/2017/02/file_example_XLS_1000.xls
RUN wget https://ppss.kr/wp-content/uploads/2019/10/2-5-540x301.jpg

RUN apt-get -y install curl gnupg
RUN curl -sL https://deb.nodesource.com/setup_11.x  | bash -
RUN apt-get -y install nodejs

WORKDIR /workspace
RUN rm -rf node_modules && npm install
COPY package.json ./
RUN npm install

WORKDIR /ainized-peframe
COPY server.js /workspace
RUN ["chmod","+x", "install.sh"]
RUN ["bash", "install.sh"]
RUN ["python3", "setup.py", "install"]
WORKDIR peframe
EXPOSE 80
#CMD ["python3", "peframecli.py", "/file_example_XLS_1000.xls", "-i"]

