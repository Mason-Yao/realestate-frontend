## Project setup

```
npm install
```

## Connect to DEV env backend

need to run the following command to set environment variables in local.
DEV env:

```
export CRM_API_URL=https://api-crm-dev.cyberlark.com.au
```

## Set Google Map API Key

Get your api key from https://developers.google.com/maps/documentation/javascript/get-api-key

```
export VITE_APP_GMAP_API_KEY=your_api_key
```

### Compiles and hot-reloads for development

```
npm run dev
```

### Compiles and minifies for production

```
npm run build
```

### Format code

```
npm run format
```

### Template CSS guides

See [Configuration Reference](https://tailwindcss.com/).

### Husky Install and pre-commit hook

See reference from https://typicode.github.io/husky/ for husky

See reference from https://github.com/okonet/lint-staged for lint-staged

```
npm run precommit
```
