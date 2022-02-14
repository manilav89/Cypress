FROM cypress/browsers:latest
RUN mkdir /e2e
WORKDIR /e2e
COPY ./package.json . 
COPY ./package-lock.json .
COPY ./cypress.json .
COPY ./cypress.env.json .
COPY ./cypress ./cypress
RUN npm install
RUN $(npm bin)/cypress verify
ENTRYPOINT ["npm","run","cy:run"]