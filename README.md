First step create an docker ignore file
name as .dockerignore
in that file add these things

Create docker ignore file	
node_modules	
dist	
.git	
.gitignore	
Dockerfile	
README.md	

then create Dockerfile in vscode
in vscode nmae the file as Dockerfile
in that file add these things

Create Dockerfile	
FROM node:18	
WORKDIR /app	
COPY package*.json ./	
RUN npm install	
COPY . .	
EXPOSE 3000	
CMD ["npm", "run", "dev", "--", "--host"]	

then => in the command prompt
build the docker image => docker build -t web_react .

after create image change the image as container
in command prompt go to file path then change as container
docker run -p 3000:3000 --name=react_container web_react

then run the port in localhost
localhost:3000
