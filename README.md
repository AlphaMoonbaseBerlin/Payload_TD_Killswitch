# Killswitch
A simple, lightweigh solution to keep track and control of your deployments. 
Might be a base for further development.

## Deployment
Can be deployed using raw NPM or Docker
### npm
Set ```PAYOAD_SECRET``` env-variable.
```npm install```
```npm run build```
```npm run start```
Can be accessed via port 3000 on /admin

### docker
Set ```PAYOAD_SECRET``` env-variable on OS-level or in the docker-compose.yaml
run ```docker-compose up```

## Operation
Login via /admin and create an installation. Generate an API-Key.
Place the Killswitch.tox from /TD/Modules/Release in your project and set Backend URL and API-Key.
Use the callbacks to handle the specific case.
