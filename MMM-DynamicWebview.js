/* global Module */
const config = require('../../config/config');

Module.register('MMM-DynamicWebview', {
	// Default module config.
	defaults: {
		updateInterval: 0.5 * 60 * 1000,
		getURL: () => "http://magicmirror.builders/",
		// see: https://electronjs.org/docs/api/webview-tag
		attributes: {
			style: {
				display: 'flex',
				width: '100%',
				height: '600px',
			},
			autosize: {
				minwidth: '100%',
				minheight: '100%',
			},
		},
	},
	resume: function() {
		var self = this;
		self.intervalId = setInterval(() => self.updateDom(), self.config.updateInterval);
	},
	suspend: function() {
		const intervalId = this.intervalId;
		this.intervalId = null;
		if (intervalId) clearInterval(intervalId);
	},
	start: function() {
		var self = this;
		Log.log(`Starting Dynamic module: ${self.name} ${self.identifier}`);
		self.intervalId = setInterval(() => self.updateDom(), self.config.updateInterval);
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
			if (attributes.nodeintegration) webview.setAttribute('nodeintegration', '');
			if (attributes.plugins) webview.setAttribute('plugins', '');
			if (attributes.preload) webview.setAttribute('preload', attributes.preload);
			if (attributes.httpreferrer) webview.setAttribute('httpreferrer', attributes.httpreferrer);
			if (attributes.useragent) webview.setAttribute('useragent', attributes.useragent);
			if (attributes.disablewebsecurity) webview.setAttribute('disablewebsecurity', '');
			if (attributes.partition) webview.setAttribute('partition', attributes.partition);
			if (attributes.allowpopups) webview.setAttribute('allowpopups', '');
			if (attributes.webpreferences) webview.setAttribute('webpreferences', attributes.webpreferences);
			if (attributes.enableblinkfeatures) webview.setAttribute('enableblinkfeatures', attributes.enableblinkfeatures);
			if (attributes.disableblinkfeatures) webview.setAttribute('disableblinkfeatures', attributes.disableblinkfeatures);
		}
		Log.log(`${self.name} ${self.identifier} Webview: ${webview.toString()}`);
		return webview;
	},
});

