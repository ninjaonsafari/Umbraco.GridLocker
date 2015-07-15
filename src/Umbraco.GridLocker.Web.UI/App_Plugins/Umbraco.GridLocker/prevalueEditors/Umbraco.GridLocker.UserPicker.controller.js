angular.module("umbraco").controller("Umbraco.GridLocker.UserPicker",
	function ($scope, entityResource) {
		$scope.users = [];
		$scope.checked = [];
		entityResource.getAll("User").then(function (data) {
			$scope.users = data;
		});

		$scope.checked = $scope.model.value;

		$scope.toggle = function (value) {
			var index = $scope.checked.indexOf(value);

			if (index == -1) {
				$scope.checked.push(value);
			} else {
				$scope.checked.splice(index, 1);
			}

			$scope.model.value = $scope.checked;
		}

	});