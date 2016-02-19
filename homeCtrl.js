
app.controller('homeCtrl', function( $scope, profileService, friendService) {
	$scope.editing = false;

	$scope.saveProfile = function(profile) {
		profileService.saveProfile(profile);
		$scope.editing = false;
	}
	
	$scope.checkForProfile = function() {
		var profileId = JSON.parse(localStorage.getItem('profileId'));

		if (profileId) {
			profileService.checkForProfile(profileId.profileId)
				.then(function(profile) {
					$scope.myProfile = profile.data;
					friendService.findFriendsFriends(profile.data);
				})
				.catch(function(err) {
					console.error(err);
				});
		}
	}
	
	$scope.checkForProfile();
	
	$scope.deleteProfile = function() {
		profileService.deleteProfile()
			.then(function(deletedProfile) {
				localStorage.removeItem('profileId');
				$scope.myProfile = {};
			})
			.catch(function( err ) {
				console.error(err);
			});
	}

	

	$scope.sortOptions = [{
		  display: 'Ascending',
		  value: false
	},
	{
		  display: 'Descending'
		, value: true
	}
	];
	
	$scope.findFriends = function(query) {
		friendService.findFriends($scope.myProfile._id, query).then(function(profileResponse) {
			console.log(profileResponse.data);
			$scope.potentialFriends = profileResponse.data;
		})
	};
	$scope.addFriends = function(friendId) {
		
		friendService.addFriend($scope.myProfile._id, friendId).then(function(response){
			console.log(response.data);
			$scope.checkForProfile();
		});
	};
	
	$scope.removeFriend = function(friendId) {
		console.log(friendId)
		friendService.removeFriend($scope.myProfile._id, friendId).then(function(response){
			console.log(response.data);
			$scope.checkForProfile();
		})
	};
	
	

	
});