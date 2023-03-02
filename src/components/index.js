const com = require.context('./', false, /\.vue$/)
export default {
  install (app) {
    com.keys().forEach(val => {
      const component = com(val).default
      app.component(component.name, component)
    })
  }
}
