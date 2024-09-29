#!/usr/bin/env make

.PHONY: build_frontend
build_frontend:
	$(MAKE) -C Frontend build

.PHONY: build
build: build_frontend 

.PHONY: deploy_frontend
deploy_frontend:
	$(MAKE) -C Frontend deploy

.PHONY: release
release: build_frontend deploy_frontend

.PHONY: clean
clean: 
	$(MAKE) -C Frontend clean

.PHONY: swagger
swagger:
	cd Docs/Swagger && npm run build && npm run start
