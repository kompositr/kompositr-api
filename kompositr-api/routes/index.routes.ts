import {KompositionRoutes} from "./komposition.routes"

(function() {
    let kompositionRoutes = new KompositionRoutes();
    module.exports = [];
    for (var i = 0; i < kompositionRoutes.routes.length; i++) {
        module.exports.push(kompositionRoutes.routes[i]);
    }
}());