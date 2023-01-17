FROM node:14-alpine
RUN apk --no-cache add \
    bash \
    g++ \
    ca-certificates \
    lz4-dev \
    musl-dev \
    cyrus-sasl-dev \
    openssl-dev \
    make \
    python3
RUN apk add --no-cache --virtual .build-deps gcc zlib-dev libc-dev bsd-compat-headers py-setuptools
WORKDIR /usr/app
COPY package.json .
ENV PORT=5000
ENV DATABASE_URL=postgres://kchlgwwrmfwmat:5634121db4aeccd169e547eb090f8a5e95b69b5d75f30a677fc7eb64396e2487@ec2-23-23-151-191.compute-1.amazonaws.com:5432/dao0j8udhagb9b
RUN yarn install
COPY . .
EXPOSE 5000
CMD [ "yarn", "start" ]