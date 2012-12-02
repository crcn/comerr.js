exports.CODES = {


	//http
	401: "Unauthorized",
	402: "Payment Required",
	404: "Not Found",
	403: "Forbidden",
	423: "Locked", //locking user accounts
	429: "Too Many Requests",
	500: "Unknown error",
	501: "Not Implemented", //use this for features not implemented yet

	//custom
	601: "Invalid Input",
	604: "Cannot overwrite"

};

/*exports.create = function(code, message, tags) {

	if(typeof message == "object") {
		tags = message;
		message = null;
	}

	var name = exports.CODES[code];
	var error = new Error(message || name);
	error.name = name;
	error.tags = tags;

	return error;
}*/


Object.keys(exports.CODES).forEach(function(code) {
	var name = exports.CODES[code],
	message  = name,
	className = name.replace(/\s+/, "");

	var Err = exports[className] = function(message, tags) {

		if(typeof message == "object") {
			tags = message;
			message = null;
		}

		Error.call(this, message);

		this.message = ["[", code, "]", (message || name)].join("");
		this.code = code;
		this.tags = tags;
		this.stack = new Error(this.message).stack;
	}

	Err.prototype = new Error();
	Err.prototype.constructor = Err;
	Err.prototype.name = name;
});