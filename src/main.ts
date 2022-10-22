import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import urql from '@urql/vue'
import {
  dedupExchange,
  fetchExchange,
  makeOperation,
} from '@urql/vue'
import { authExchange } from '@urql/exchange-auth'
import { cacheExchange } from '@urql/exchange-graphcache'
import './assets/main.css'

const app = createApp(App)

app.use(urql, {
  url: 'https://swapi-graphql.netlify.app/.netlify/functions/index',
  exchanges: [
    dedupExchange,
    cacheExchange(),
    authExchange({
      async getAuth({ authState }) {
        if (!authState) {
          console.log('here')
          return {}
        }

        console.log('Fetching new token')
      },
      addAuthToOperation({ operation }) {
        const fetchOptions =
          typeof operation.context.fetchOptions === 'function'
            ? operation.context.fetchOptions()
            : operation.context.fetchOptions || {}

        return makeOperation(operation.kind, operation, {
          ...operation.context,
          fetchOptions: {
            ...fetchOptions,
            headers: {
              ...fetchOptions.headers,
              Authorization: `Bearer test`,
            },
          },
        })
      },
      willAuthError() {
        console.log('willAuthError called')

        return true
      },
    }),
    fetchExchange,
  ],

})
app.use(router)

app.mount('#app')
