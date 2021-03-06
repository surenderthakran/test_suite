GO_PROJECT_NAME := gomind_runner

# Go rules
go_format:
	@echo "\n....Formatting $(GO_PROJECT_NAME)'s go files...."
	gofmt -w $(GOPATH)/src/$(GO_PROJECT_NAME)

go_prep_install:
	@echo "\n....Preparing installation environment for $(GO_PROJECT_NAME)...."
	mkdir -p $(GOPATH)/bin $(GOPATH)/pkg
	go get github.com/cespare/reflex

go_dep_install:
	@echo "\n....Installing dependencies for $(GO_PROJECT_NAME)...."
	go get -t -v ./...

go_install:
	@echo "\n....Compiling $(GO_PROJECT_NAME)...."
	go install $(GO_PROJECT_NAME)

go_test:
	@echo "\n....Running tests for $(GO_PROJECT_NAME)...."
	go test -v ./src/$(GO_PROJECT_NAME)/...

go_run:
	@echo "\n....Running $(GO_PROJECT_NAME)...."
	$(GOPATH)/bin/$(GO_PROJECT_NAME)


# Project rules
install:
	$(MAKE) go_prep_install
	$(MAKE) go_dep_install
	$(MAKE) go_install

run:
	reflex -r '\.go$\' -s make restart

restart:
	@$(MAKE) go_format
	@$(MAKE) go_install
	@$(MAKE) go_test
	@$(MAKE) go_run

.PHONY: go_format go_prep_install go_dep_install go_install go_run install run restart
