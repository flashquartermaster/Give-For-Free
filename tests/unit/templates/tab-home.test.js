describe('Html template unit tests:', function(){

    beforeEach( module('GFFTemplates') )

    describe('Suite: Home html:', function(){

        var sut;

        beforeEach( inject( function( _$templateCache_, _$compile_, _$rootScope_ ){
            var $templateCache = _$templateCache_;
            var $compile = _$compile_;
            var $rootScope = _$rootScope_;

            var htmlTemplate = $templateCache.get('www/templates/tab-home.html');
            var scope = $rootScope.$new();

            sut = $compile( htmlTemplate )( scope );

            scope.isAvatar = true;
            scope.avatar_url = '';
            scope.firstname = 'TesterFirstName';
            scope.$digest();
        }));

        it('should have header', function(){
            expect( sut.find('h2').text() ).toContain( 'TesterFirstName' );
        });

        it('should have body text', function(){
            var bodyText = sut.find('div')[0].querySelectorAll('#bodyText');
            expect( bodyText[0] ).toBeDefined();
            //expect( bodyText[0].outerHTML ).toContain('Some Text');
        });

        it('should have a link to our website', function(){
            expect( sut.find('a')[0].outerHTML ).toContain('http://www.giveforfreeonline.org');
        });

        it('should have a link to our facebook', function(){
            expect( sut.find('a')[1].outerHTML ).toContain('https://www.facebook.com/Give-For-Free-643061692510804/');
        });

        it('should have a link to our twitter', function(){
            expect( sut.find('a')[2].outerHTML ).toContain('https://twitter.com/_giveforfree_');
        });

        it('should have a link to our support email', function(){
            expect( sut.find('a')[3].outerHTML ).toContain('mailto:support@giveforfreeonline.org');
        });

        it('should have a button to log out', function(){
            var logOutButton = sut.find('button')[0].querySelectorAll('#signOutButton');
            expect( logOutButton ).toBeDefined();
        });

    });

});