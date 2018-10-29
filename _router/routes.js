import Route from 'vue-routisan'
//import masterIblog from '@imagina/qblog/_layouts/master'

/*VIEWS*/
import master from 'src/layouts/master'
import blank from 'src/layouts/blank'

/*=============== Layouts ===========================*/
//name of layouts
let layouts = {
  masterIblog : 'master'
}

let layout = {} //Object with components for layouts
for (var lyt in layouts){//Define whether to load layout from project or module
  try{layout[lyt] = require('src/layouts/@imagina/qblog/_layouts/'+layouts[lyt])}
  catch {layout[lyt] = require('@imagina/qblog/_layouts/'+layouts[lyt])}
}


/*=============== Routes ===========================*/
/*IBLOG*/
Route.view('/:slugCategory', master)
  .children(() => {
    Route.view('/', layout.masterIblog.default)
    Route.view('/:slugPost', layout.masterIblog.default)
  })

export default Route.all()
