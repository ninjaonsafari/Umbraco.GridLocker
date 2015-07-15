angular.module("umbraco").controller("Umbraco.GridLocker",
	function ($scope, assetsService, $http, $timeout, editorState, $rootScope, authResource) {
		var stylesheet = "/App_Plugins/Umbraco.GridLocker/assets/Umbraco.GridLocker.css",
			editorAlias = "GridLocker",
			allowedUsers = ["admin"];

		// check if the propertyeditor gridlocker is on that contenttype
		function verifyLock()
		{
			if (editorState != null && editorState.current != null) {
				for (var i in editorState.current.tabs) {
					var tab = editorState.current.tabs[i];
					for (var j in tab.properties) {
						var property = tab.properties[j]
						if (property != null && property.editor != null && property.editor === editorAlias) {
							authResource.getCurrentUser().then(function (user) {
								if (allowedUsers.indexOf(user.name) == -1) {
									lockGrid();
								}
							});
						}
					}
				}
			}
		}

		function lockGrid() {
			$('<link href="' + stylesheet + '" rel="stylesheet" type="text/css" id="GridLocker" />').appendTo("head");
		}

		function unlockGrid() {
			$('#GridLocker').remove();
		}

		// if we are leaving the node, the locker will be removed to unlock the others
		$rootScope.$on('$viewContentLoaded', function () {
			unlockGrid();
		});

		console.log($scope.model.config)

		if ($scope.model.config && $scope.model.config.allowedUsers && $scope.model.config.allowedUsers != "") {
			allowedUsers = $scope.model.config.allowedUsers;
		}

		// unlock anyway
		verifyLock();
		unlockGrid();
});