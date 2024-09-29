#!/usr/bin/env make

# You should be able to override your envionment variables
# However, you need to add the callback domain in Auth0 as well
# https://manage.auth0.com/dashboard/us/dev-kxtt0pvs/applications/ZdNeT2zUCxvZTVWNTXsfnrCpRLJX31ce/settings
export S3_BUCKET_NAME ?= crm-jr.cyberlark.com.au
export CRM_API_URL ?= https://api-crm-dev.cyberlark.com.au

.PHONY: start
start: 
	@npm install
	@npm run dev

.PHONY: build
build: 
	@npm install
	@npm run build

.PHONY: test
test: 
	@npm run test

.PHONY: deploy
deploy:
	aws s3 cp --recursive ./dist s3://${S3_BUCKET_NAME}/

.PHONY: clean
clean: 
	rm -rf ./node_modules
	rm -rf ./dist

.PHONY: lint_fix
lint_fix:
	@npm run lint:fix
