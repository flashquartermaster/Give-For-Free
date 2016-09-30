describe('HomeCtrl Unit Tests:', function () {

    beforeEach( module('starter') );

    var $controller, $rootScope;

    beforeEach( inject( function( _$controller_, _$rootScope_ ){
        $controller = _$controller_;
        $rootScope = _$rootScope_;
    }));

    describe('Suite: $scope.firstname:', function(){

        var $scope, sut;

        beforeEach(function() {
            $scope = $rootScope.$new();
            sut = $controller('HomeCtrl', { $scope: $scope });
        });

        it('should have a first name variable', function() {
            expect( $scope.firstname ).toBeDefined();

        });

        it('first name variable should be empty', function() {
            expect( $scope.firstname ).toEqual( '' );
        });

    });

});