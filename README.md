# image-collage-front

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Error
when tried to build-
```
npm run build
```
```
at FSReqCallback.oncomplete (node:fs:188:23) {
  opensslErrorStack: [ 'error:03000086:digital envelope routines::initialization error' ],
  library: 'digital envelope routines',
  reason: 'unsupported',
  code: 'ERR_OSSL_EVP_UNSUPPORTED'
}
```
solved by executing the following on project directory-
```
export NODE_OPTIONS=--openssl-legacy-provider
```
