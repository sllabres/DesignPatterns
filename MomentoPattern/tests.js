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

	this.saveToMomento = function() {
		return new Momento(this.state);
	}
}
