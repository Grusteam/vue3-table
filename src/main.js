import { createApp } from 'vue';
import App from './App.vue';

/*  */
createApp(App).mount('#app');

/* clear console */
if (module.hot) {
  module.hot.accept();

  module.hot.addStatusHandler((status) => {
    if (status === 'prepare') console.clear();
  });
}
