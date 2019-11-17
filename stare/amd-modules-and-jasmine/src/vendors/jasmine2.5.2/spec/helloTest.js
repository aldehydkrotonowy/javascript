describe('Person', function(){
	var fakePerson;
	beforeEach(function() {
      fakePerson = new Person();
    });
	it('it calls the sayHello() function', function(){
		spyOn(fakePerson, "sayHello");
		fakePerson.helloSomeone('Norbert');
		expect(fakePerson.sayHello).toHaveBeenCalled();
	});
	it('should be called with Norbert argument', function(){
		spyOn(fakePerson, 'helloSomeone');
		fakePerson.helloSomeone("Norbert");
		expect(fakePerson.helloSomeone).toHaveBeenCalledWith('Norbert');
	});
	it('should not be called with Elephant argument', function(){
		spyOn(fakePerson, 'helloSomeone');
		fakePerson.helloSomeone("Norbert");
		expect(fakePerson.helloSomeone).not.toHaveBeenCalledWith('Elephant');
	});
	it("sayHello() works", function() {
        fakePerson.sayHello = jasmine.createSpy("Say-hello spy");
        fakePerson.helloSomeone("world");
        expect(fakePerson.sayHello).toHaveBeenCalled();
   });
})