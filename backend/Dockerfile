#Start from linux os that has node version 18 installed
FROM node:18

#install package manager pnpm globally
RUN npm install -g pnpm

#Tell docker where to pull all the files
#Could be anywhere and docker would make one for you
WORKDIR /app

#copy all the stuff into docker image,cause docker can't access files in our os
COPY package.json .
COPY pnpm-lock.yaml .

#after copy over the package, we need to install all the dependecies
RUN pnpm install

#docker only rebuild thing that we've changes,
# we seperate package with our source code
#so it won't rebuild everything when we changes source code

#then copy over the other source code
COPY . .

#tell docker which port we'll be running on
EXPOSE 8080

ENV ADDRESS=0.0.0.0 PORT=8080 DB_HOST=postgres DB_PORT=5432 DB_NAME=doggr DB_USER=doggr DB_PASS=doggr

RUN pnpm build


#pass build time, starts at run time
CMD ["pnpm","startProd"]
