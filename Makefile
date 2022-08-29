install: install-deps

lint:
	  npx eslint .

install-deps:
	  npm ci

test:
	  npm test

publish:
	  npm publish --dry-run

test-coverage:
	  npm test -- --coverage --coverageProvider=v8