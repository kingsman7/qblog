##Module Qblog
Module qblog
#

###Routes
- ###Usage
  In src/router/index.js
  
  ```js
  ...
    export default function () {
      /*Add here in order how do you want routes*/
      routes = require('./routes').default
      routes = require('@imagina/qblog/_router/routes').default //Add this line
  ...
  ```
