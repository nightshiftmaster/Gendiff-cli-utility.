install: 
      install-deps

lint:
      npx eslint .

install-deps:
	  npm ci

test:
	  npm test

install: 
	  npm install

test-coverage:
	  npm test -- --coverage --coverageProvider=v8