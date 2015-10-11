(function ( ) {
	var movie = angular.module( "moviereviewer" , [ ] );

	movie
		.directive( "fetchMovies" , [
			"$http",
			"$rootScope",
			function directive ( $http , $rootScope ) {
				return {
					"restrict": "A",
					"scope": true,					
					"link": function onLink ( scope , element , attributeSet ) {
						scope.movies = [ ];

						scope.fetchAllMovies = function fetchAllMovies ( ) {
							$http.get( "http://cords-movie-reviewer.herokuapp.com/api/movies/all" )
							.success( function ( response ) {
								response = response.map( function ( each ) {
									each.image_url = "http://cords-movie-reviewer.herokuapp.com" + each.image_url;
									return each;
								} );
								scope.movies = response;
								console.log(scope.movies);								
							} );
						};

						scope.showMovie = function showMovie( movie ) {
							$rootScope.$broadcast( "show-movie-detail" , movie );
						};

						scope.fetchAllMovies( );
					}
				}
			}
		] );

	movie
		.directive( "movieShow" , [
			function directive ( ) {
				return {
					"restrict": "A",
					"scope": true,
					"link": function onLink ( scope , element , attributeSet ) {

						scope.movieDetail = { };

						scope.$on( "show-movie-detail" , 
							function ( evt , data ) {																
								scope.movieDetail = data;								
							} );
					}
				}
			}
		] );
} )( );

