app.service('friendService', function($http, $q){
	
	var baseUrl = 'http://connections.devmounta.in/';
	
	this.findFriends = function(userId, query) {
		console.log(query);
		return $http({
			method: 'GET',
			url: baseUrl + 'api/friends/' + userId + '?name=' + query
		})
	}

	this.addFriend = function(userId, friendId) {
		return $http({
			method: 'PUT',
			url: baseUrl + 'api/friends/' + userId,
			data: { friendId: friendId }
		})

		
	}

	this.removeFriend = function(userId, friendId) {
		return $http({
			method: 'PUT',
			url: baseUrl + 'api/friends/remove/' + userId,
			data: {friendId: friendId}
		})
	}

	this.findFriendsFriends = function(profile) {
		var index = 0;
		var deffered = $q.defer();
		
		function getNextFriend() {
			if(profile.friends[index]) {
				$http({
					method: 'GET',
					url: baseUrl + "api/friends-friends/" + profile.friends[index]._id
				}).then(function(friends) {
					profile.friends[index].friends = friends.data;
					index++;
					getNextFriend();
				})
				.catch(function(err) {
					return console.error(err);
				})
			} else {
				deffered.resolve(profile);
				return deffered.promise;
			}
		}
		getNextFriend();
	}
	















});