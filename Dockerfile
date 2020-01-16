FROM ubuntu:latest
MAINTAINER KangMin,Kwon "kmkwon94@gmail.com"
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \ 
    python3-dev \ 
    build-essential \ 
    g++ \ 
    libssl-dev \ 
    libpcre3 \
    libpcre3-dev \ 
    git \ 
    wget \
    sudo \
    vim \
    curl \
    swig \
    gnupg

RUN curl -sL https://deb.nodesource.com/setup_11.x  | bash -
RUN apt-get install -y nodejs
#RUN git clone https://github.com/kmkwon94/ainized-peframe.git

WORKDIR /workspace
RUN rm -rf node_modules && npm install
COPY package.json ./
COPY requirements.txt ./
RUN npm install
RUN ["npm", "install", "-g", "supervisor"]
RUN ["npm", "install", "-g", "cors"]
RUN ["python3", "-m", "pip", "install", "-r", "requirements.txt"]

RUN wget https://file-examples.com/wp-content/uploads/2017/02/file_example_XLS_1000.xls \
    https://ppss.kr/wp-content/uploads/2019/10/2-5-540x301.jpg

WORKDIR /ainized-peframe
COPY . /ainized-peframe
COPY server.js /workspace

WORKDIR /workspace
EXPOSE 80
CMD ["supervisor", "server.js"]
