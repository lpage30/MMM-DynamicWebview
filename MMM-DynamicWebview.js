/* global Module */
const config = require('../../config/config');
const MODULE_PREFIX_NAME = 'MMM-DynamicWebview';

const mmmWebview = {
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

	start: function () {
		var self = this;
		Log.log(`Starting Dynamic module: ${self.name} ${self.identifier}`);
		setInterval( function () { 
			self.updateDom(1000);
			}, self.config.updateInterval);
	},
	resume: function() {
		var self = this;
		Log.log(`Resuming Dynamic module ${self.name} ${self.identifier}`);
		return this.getDom();
	},

	// Override dom generator.
	getDom: function() {
		var self = this;
		Log.log(`getDom Dynamic module ${self.name} ${self.identifier}`);
		var webview = document.createElement("webview");
		webview.setAttribute('src', self.config.getURL());
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
		Log.log(`${self.name} ${self.identifier} Webview: ${webview.toString()}`);
		return webview;
	},
};
Module.register(MODULE_NAME, mmmWebview);
