# kong-e2e-tests

## Run Locally

Build the project.
```
npm install
```

Startup the gateway service.
```
npm run server:start
```

Open cypress for developing.
```
npm run cy:open
```

Exec the test case and generate the report.
A report in mochawesome format will be generated under the results folder.
```
npm run cy:run
```

## GitHub CI
A PR targeting to the main branch will trigger the workflow main.yml. The workflow will startup the KongGateway and exec the cypress script gateway.cy.js.