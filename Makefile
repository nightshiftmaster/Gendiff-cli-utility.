install: install-deps

lint:
	  npx eslint .

install-deps:
	  npm ci

test:
	  npm test

test-coverage:
	  npm test -- --coverage --coverageProvider=v8