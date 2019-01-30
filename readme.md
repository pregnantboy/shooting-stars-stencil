# Shooting Stars Web Component

## Installing

### Angular

AppModule
```JS
import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, SharedModule],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
```
main.ts
```JS
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { defineCustomElements } from 'test-components/dist/loader';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
defineCustomElements(window);
```

### Vue
```JS
import Vue from 'vue';
import App from './App.vue';
import { defineCustomElements } from 'shooting-stars/dist/loader';

Vue.config.productionTip = false;
Vue.config.ignoredElements = [/test-\w*/];

defineCustomElements(window);

new Vue({
  render: h => h(App)
}).$mount('#app');
```

### React
```JS
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// test-component is the name of our made up Web Component that we have
// published to npm:
import { defineCustomElements } from 'shooting-stars/dist/loader';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
defineCustomElements(window);
```

## Usage

```HTML
<shooting-stars image="./star.png" height="10px" width="10px" min-speed="10" max-speed="50" num="10"></shooting-stars>
```
#### image
Path to image (string)
#### height
height of star (string)
#### width
width of star (string)
#### min-speed
minimum speed (positive integer)
#### max-speed
maximum speed (positive integer)
#### num
number of stars to generate (positive integer)
