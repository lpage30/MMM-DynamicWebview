Module.register('MMM-DynamicWebview', {
	// Default module config.
	defaults: {
		updateInterval: 30 * 1000,
		getURL: () => "http://magicmirror.builders/",
		// see: https://electronjs.org/docs/api/webview-tag
	},
	resume: function() {
		var self = this;
		self.updateDom();
		if (self.config.updateInterval) {
			self.intervalId = setInterval(() => self.updateDom(), self.config.updateInterval);
		}
	},
	suspend: function() {
		const intervalId = this.intervalId;
		this.intervalId = null;
		if (intervalId) clearInterval(intervalId);
	},
	start: function() {
		var self = this;
		Log.log(`Starting Dynamic module: ${self.name} ${self.identifier}`);
		self.updateDom();
		if (self.config.updateInterval) {
			self.intervalId = setInterval(() => self.updateDom(), self.config.updateInterval);
		}
	},
		// Override dom generator.
	getDom: function() {
		var self = this;
		Log.log(`getDom Dynamic module ${self.name} ${self.identifier}`);
		var webview = document.createElement("webview");
		webview.setAttribute('src', self.config.getURL());
		if (self.config.attributes) {
			const { attributes } = self.config;
			if (attributes.style) {
				if (attributes.style.display) webview.style.display = attributes.style.display;
				if (attributes.style.width) webview.style.width = attributes.style.width; 
				if (attributes.style.height) webview.style.height = attributes.style.height; 
			}
			if (attributes.autosize) {
				webview.setAttribute('autosize', '');
				webview.setAttribute('minwidth', attributes.autosize.minwidth);
				webview.setAttribute('minheight', attributes.autosize.minheight);
			}
			if (attributes.webpreferences) webview.setAttribute('webpreferences', attributes.webpreferences);
		}
		Log.log(`${self.name} ${self.identifier} Webview: ${webview.outerHTML}`);
		return webview;
	},
});

