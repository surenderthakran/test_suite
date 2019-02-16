docker run --rm -it -v $(pwd)/:/java/ -p 18680:8080 openjdk:8-jdk-alpine sh

javac -d classes src/JavaHTTPServer.java

java -cp classes main.JavaHTTPServer
