# gomind_runner

To run with `docker-compose`:
```
docker-compose up
```

To run without `docker-compose`:
```
docker build -t gomind_runner .
docker run --rm -it -d -v $(pwd)/src/gomind_runner:/workspace/src/gomind_runner -p 18550:18550 --name=gomind_runner_1 gomind_runner
```
