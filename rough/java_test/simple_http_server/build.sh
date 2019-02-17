rm -rf classes/com/
find -name "*.java" > sources.txt
javac -classpath jars/* -d classes @sources.txt
