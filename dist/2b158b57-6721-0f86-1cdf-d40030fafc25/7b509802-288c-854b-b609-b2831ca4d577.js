app.run(['$rootScope', 'authResource', 'dataTypeResource', '$q', 'eventsService', '$routeParams', 'contentResource', function ($rootScope, authResource, dataTypeResource, $q, eventsService, $routeParams, contentResource) {
	var nodeId;

	$rootScope.$on('$viewContentLoaded', function () {
		if ($routeParams.section === "content" && $routeParams.id) {
			nodeId = $routeParams.id;
			contentResource.getById(nodeId).then(function (current) {
				$("#brickwall-grid-locker").remove();
				if (current.contentTypeAlias === "Frontpage") {
					authResource.getCurrentUser().then(function (user) {
						if (user.userType != "admin") {
							$("<style id='brickwall-grid-locker' type='text/css'> .templates-preview, .cell-tools-add, .cell-tools, .row-tools, .row-tools-add{ display:none !important; }</style>").appendTo("head");
						}
					});
				}
			});
		} else {
			//console.log("wrong section")
		}
	});
}]);