# ------------------------------------------------------------------------------
# (C) Copyright 2021 Hewlett Packard Enterprise Development LP
# ------------------------------------------------------------------------------

MAKEFILE_PATH := $(abspath $(lastword $(MAKEFILE_LIST)))

## help: Output this message and exit
.PHONY: help
help:
	@fgrep -h '##' $(MAKEFILE_LIST) | fgrep -v fgrep | column -t -s ':' | sed -e 's/## //'

## clean: Remove node_modules and build artifacts
.PHONY: clean
clean:
	npm run clean

## node_modules: install dependencies
node_modules: package.json package-lock.json
	@echo "Installing dependencies..."
	npm ci

## scan: run the project scanners
.PHONY: scan
scan: trivy npm-audit

## trivy: run trivy vulnerablilty scan
.PHONY: trivy
trivy:
	trivy fs --exit-code 0 --severity UNKNOWN,LOW,MEDIUM --no-progress --skip-dirs tests,node_modules .
	trivy fs --exit-code 1 --severity HIGH,CRITICAL --no-progress --skip-dirs tests,node_modules .

## npm-audit: audit production depenencies for vulnerabilities
.PHONY: npm-audit
npm-audit: # node_modules
	npm audit --production

.PHONY: npm-audit-fix
npm-audit-fix:
	npm audit fix

## format: check code format
.PHONY: format-check
format-check:
	@echo "Running format..."
	npm run format:check

## test-unit: run unit tests
.PHONY: test-unit
test-unit: # node_modules
	npm run test

## build: build the component
.PHONY: build
build: # node_modules
	npm run build

## deploy-storybook: deploy the storybook to github pages
.PHONY: deploy-storybook
deploy-storybook:
	npm run deploy

## publish: publish the component
.PHONY: publish
publish:
	npm publish
