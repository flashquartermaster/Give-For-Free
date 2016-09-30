describe('Settings Service Unit Tests:', function(){

    beforeEach( module('starter') );

    var sut;

    beforeEach( inject( function( _User_ ){
        sut = _User_;
    }));

    describe('Suite: User Service:', function(){

        it('should exist', function(){
            expect( sut ).toBeDefined();
        });

    });

    describe('Suite: Social users defaults:', function(){

        it('should detect Google login user', function(){
           expect( sut.isGoogleUser() ).toBe( false );
        });

        it('should detect Facebook login user', function(){
            expect( sut.isFacebookUser() ).toBe( false );
        });

        it('should detect Twitter login user', function(){
            expect( sut.isTwitterUser() ).toBe( false );
        });

        it('should detect a social loggin user', function(){
            expect( sut.isSocialUser() ).toBe( false );
        });

    });

});