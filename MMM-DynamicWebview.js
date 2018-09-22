/* global Module */
const config = require('../../config/config');
const MODULE_PREFIX_NAME = 'MMM-DynamicWebview';

const collectUniqueDynamicWebviews = () => {
	const unique = new Set();
	const result = [];

	const modules = ((config || {}).modules) || [];
	modules.forEach((module) => {
		const moduleName = (module || {}).module || '';
		if(moduleName.startsWith(MODULE_PREFIX_NAME) &&
		   !unique.has(moduleName)) {
			unique.add(moduleName);
			result.push(module);
		}
	});
	return result;
};

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
		self = this;
		setInterval( function () { 
			self.updateDom(1000);
			}, this.config.updateInterval);
	},
	resume: function() {
		console.log("Resuming");
		return this.getDom();
	},

	// Override dom generator.
	getDom: function() {
		var webview = document.createElement("webview");
		webview.setAttribute('src', this.config.getURL());
		const { attributes } = this.config;
		if (attributes.id) webview.setAttribute('id', attributes.id);
		if (attributes.name) webview.setAttribute('name', attributes.name);
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
		console.dir(webview);
		return webview;
	},
};
const validateConfigSupportsWebview = () => {
	const configuredNodeIntegration = ((config || {}).electronOptions || {}).nodeIntegration || false
	if (!configuredNodeIntegration) throw new Error('MMM-DynamicWebview will not function when electronOptions.nodeIntegration is false');
}
const dynamicWebviewModules = collectUniqueDynamicWebview();
dynamicWebviewModules.forEach((module, index) => {
	if (index === 0) validateConfigSupportsWebview();
	
	Module.register(module.module, mmmWebview);
});
