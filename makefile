.PHONY: build
default: clean build

clean-hard:
	git clean -f -d -X
	git clean -f -d

clean:
	find . \
		-maxdepth 1 \
		! -name src \
		! -name .npmignore \
		! -name .gitignore \
		! -name package.json \
		! -name tsconfig.json \
		! -name tslint.json \
		! -name jest.config.js \
		! -name jest-setup.ts \
		! -name yarn.lock \
		! -name node_modules \
		! -name .git \
		! -name makefile \
		! -name . \
		! -name .. \
		-exec rm -r -f '{}' +

build:
	npx tsc

watch:
	npx tsc --watch

test:
	npx jest --passWithNoTests  --coverage /src

test-watch:
	npx jest --watch --passWithNoTests /src

lint:
	npx tslint "src/**/*.{ts,tsx}"

lint-fix:
	npx tslint --fix "src/**/*.{ts,tsx}"
