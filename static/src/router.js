import RecipeRoute from './routes/recipe';

class Router {
  constructor (props) {
    this.routes = {};
    this.activeRoute = null;
    this.defaultRoute = null;
  }

  getActiveRoute () {
    return this.activeRoute;
  }

  initApplication () {
    let routeInfo = this.readURL();
    this.activateRoute(routeInfo);
  }

  activateRoute (routeInfo) {
    this.activeRoute = routeInfo.route;
    this.activeRoute.activate(routeInfo.params, routeInfo.queryParams);
  }

  readURL () {
    return this.parseURL('/');
  }

  parseURL (url) {
    let queryParams = {};

    // Returns the route and params based on URL;
    for (let matchUrl in this.routes) {
      // TOOD: Turn this into more clever matching
      if (url === matchUrl) {
        return {
          route: this.routes[matchUrl],
          params: {},
          queryParams
        };
      }
    }

    if (this.defaultRoute) {
      console.log(`Default Route being used instead`);
      return {
        route: this.defaultRoute,
        params: {},
        queryParams
      };
    } else {
      console.error(`No Route matched URL ${url} and the was no default route provided`);
    }
  }

  transitionTo (url) {
    let targetRoute = parseURL(url);

    let cleaningPromise = this.activeRoute.cleanUp();
    if (cleaningPromise) {
      cleaningPromise.then(() => {
        activateRoute(targetRoute);
      });
    } else {
      activateRoute(targetRoute);
    }
  }
  
  addRoute (path, route) {
    this.routes[path] = route;
  }
}

let router = new Router();

router.addRoute("/", new RecipeRoute());

export default router;
