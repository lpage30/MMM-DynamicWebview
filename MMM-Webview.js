const startIntervalUpdate = (theModule) => {
	if (theModule.config.updateInterval > 0) {
		console.log(`Starting Interval Updates: ${theModule.name}[${theModule.identifier}] every ${theModule.config.updateInterval} ms`);
		theModule.intervalId = setInterval(() => theModule.updateDom(), theModule.config.updateInterval);
	}
};

const stopIntervalUpdate = (theModule) => {
	const intervalId = theModule.intervalId;
	theModule.intervalId = null;
	if (intervalId) {
		clearInterval(intervalId);
		console.log(`Stopped Interval Updates: ${theModule.name}[${theModule.identifier}] every ${theModule.config.updateInterval} ms`);
	}
};

Module.register('MMM-Webview', {
	// Default module config.
	defaults: {
		updateInterval: 0,
		getURL: () => "http://magicmirror.builders/",
	},

	resume: () => {
		this.updateDom();
		startIntervalUpdate(this)
	},

	suspend: () => stopIntervalUpdate(this),

	start: () => {
		console.log(`Start: ${this.name}[${this.identifier}]`);
		this.updateDom();
		startIntervalUpdate(this);
	},
	stop: () => {
		console.log(`Stop: ${this.name}[${this.identifier}]`);
		stopIntervalUpdate(this)
	},

	getDom: function() {
		var webview = document.createElement("webview");
		webview.setAttribute('src', this.config.getURL());
		if (this.config.cssClassname) webview.className = this.config.cssClassname;
		console.log(`getDom: ${this.name}[${this.identifier}]  ${webview.outerHTML}`);
		return webview;
	},
});

