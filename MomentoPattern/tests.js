test('creating a momento', function() {
	var momento = new Momento("test");
	equal(momento.getSavedState(), "test");
});

test('setting first state', function() {
	var originator = new Originator();
	originator.set("first state");
	var momento = originator.saveToMomento();
	equal(momento.getSavedState(), "first state");
});

test('setting second state', function() {
	var originator = new Originator();
	originator.set("first state");
	originator.set("second state");
	var momento = originator.saveToMomento();
	equal(momento.getSavedState(), "second state");
});

test('restore state from momento', function() {
	var originator = new Originator();
	originator.set("initial state");
	originator.restoreFromMomento(new Momento("momento state"));
	var newState = originator.saveToMomento();
	equal(newState.getSavedState(), "momento state");
});

test('care taker stores first state', function() {
	var originator = new Originator();
	var caretaker = new Caretaker();
	originator.set("first state");
	caretaker.add(originator.saveToMomento());
	originator.restoreFromMomento(caretaker.get(0));
	equal(originator.saveToMomento().getSavedState(), "first state");
});

test('care taker restores second state', function() {
	var originator = new Originator();
	var caretaker = new Caretaker();
	originator.set("first state");
	originator.set("second state");
	caretaker.add(originator.saveToMomento());
	originator.set("third state");
	originator.restoreFromMomento(caretaker.get(0));

	var momento = originator.saveToMomento();
	equal(momento.getSavedState(), "second state");
});

function Caretaker() {
	this.momentoList = new Array();
	this.add = function(momento) {
		this.momentoList.push(momento);
	}
	
	this.get = function(index) {
		return this.momentoList[index];
	}
}

function Momento(state) {
	this.stateToSave = state;

	this.getSavedState = function() {
		return this.stateToSave;
	}
}

function Originator() {
	this.state = "";
	this.set = function(state) {
		this.state = state;
	}

	this.restoreFromMomento = function(momento) {
		this.state = momento.getSavedState();
	}

	this.saveToMomento = function() {
		return new Momento(this.state);
	}
}

