FROM ubuntu:latest
MAINTAINER KangMin,Kwon "kmkwon94@gmail.com"
RUN apt-get update
RUN apt-get install -y python3 python3-pip python3-dev build-essential g++ libssl-dev libpcre3 libpcre3-dev git wget
RUN git clone https://github.com/guelfoweb/peframe
RUN wget https://file-examples.com/wp-content/uploads/2017/02/file_example_XLS_1000.xls
RUN wget https://ppss.kr/wp-content/uploads/2019/10/2-5-540x301.jpg
WORKDIR /peframe
RUN ["chmod","+x", "/peframe/install.sh"]
RUN ["bash", "install.sh"]
RUN ["python3", "setup.py", "install"]
WORKDIR peframe
EXPOSE 80
#CMD ["python3", "peframecli.py", "/file_example_XLS_1000.xls", "-i"]

