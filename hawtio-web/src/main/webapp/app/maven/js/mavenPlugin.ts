module Maven {
  var pluginName = 'maven';
  angular.module(pluginName, ['bootstrap', 'ngResource', 'datatable', 'tree', 'hawtioCore']).
          config(($routeProvider) => {
            $routeProvider.
                    when('/maven/search', {templateUrl: 'app/maven/html/search.html'}).
                    when('/maven/advancedSearch', {templateUrl: 'app/maven/html/advancedSearch.html'}).
                    when('/maven/artifact/:group/:artifact/:version/:classifier/:packaging', {templateUrl: 'app/maven/html/artifact.html'}).
                    when('/maven/artifact/:group/:artifact/:version', {templateUrl: 'app/maven/html/artifact.html'}).
                    when('/maven/dependencies/:group/:artifact/:version/:classifier/:packaging', {templateUrl: 'app/maven/html/dependencies.html'}).
                    when('/maven/dependencies/:group/:artifact/:version', {templateUrl: 'app/maven/html/dependencies.html'}).
                    when('/maven/versions/:group/:artifact/:classifier/:packaging', {templateUrl: 'app/maven/html/versions.html'}).
                    when('/maven/view/:group/:artifact/:version/:classifier/:packaging', {templateUrl: 'app/maven/html/view.html'});
          }).
          run(($location:ng.ILocationService, workspace:Workspace, viewRegistry, jolokia, localStorage, layoutFull) => {

            viewRegistry['maven'] = "app/maven/html/layoutMaven.html";

            workspace.topLevelTabs.push({
              content: "Maven",
              title: "Search maven repositories for artifacts",
              isValid: (workspace: Workspace) => Maven.getMavenIndexerMBean(workspace),
              href: () => "#/maven/search",
              isActive: (workspace: Workspace) => workspace.isLinkActive("/maven")
            });
          });

  hawtioPluginLoader.addModule(pluginName);
}
