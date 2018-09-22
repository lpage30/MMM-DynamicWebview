# Module: MMM-DynamicWebview
The use of IFrames had plenty of security issues resulting in it simply not working all the time.  The [webview](https://github.com/electron/electron/blob/master/docs/api/webview-tag.md), however, does not suffer from these problems as it is rendered separately. So you get iframe behavior in a secure way.  
NOTE: you must override `nodeIntegration: true` in the `electronOptions` in your `config.js`.

## Use case examples

### Nest Camera streaming
As of right now, Nest Camera only support streaming to webview when the camera feed is set to public.   When you set it to public, you'll get a live URL and a webview embedded URL (should look like https://video.nest.com/embedded/live/wSbs3mRsOF?autoplay=1). Put that url into the config.url[].  For more info, check out this thread https://nestdevelopers.io/t/is-there-a-way-to-get-nest-camera-streams-in-an-webview/813. 

### D-Link Camera streaming
D-Link cameras streams can be easily embedded into an webview.  Some cameras require a username and password.  You can construct a URL that looks like this http://admin:password@10.0.1.7/mjpeg.cgi and put it in the config.url[]. For mroe info, check out http://forums.dlink.com/index.php?PHPSESSID=ag1ne0jgnnl7uft3s1ssts14p4&topic=59173.0.

### Twitch.tv streaming
Just go to the channel you want and click on share and cut and paste the embed src URL (eg. https://player.twitch.tv/?channel=feedbias_int). For more info, check out https://dev.twitch.tv/docs/v5/guides/embed-video/

### Youtube streaming
Just got to the video you want. Click share and embed and pull out the url and add the autoplay parameter (eg.   https://www.youtube.com/embed/yw_nqzVfxFQ?autoplay=1).  

## Using the module

To use this module, add it to the modules array in the `config/config.js` file:
````javascript
{
	module: 'MMM-DynamicWebview',
	position: 'bottom_bar',	// This can be any of the regions.
	config: {
		updateInterval: 0.5 * 60 * 1000,
		getURL: () => "http://magicmirror.builders/",
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
			nodeintegration: false,
			plugins: false,
			preload: '',
			httpreferrer: '',
			useragent: '',
			disablewebsecurity: false,
			partition: '',
			allowpopups: false,
			webpreferences: '',
			enableblinkfeatures: '',
			disableblinkfeatures: '',
		},
	}
}
````

## Configuration options

The following properties can be configured:


<table width="100%">
		<tr>
			<th>Option</th>
			<th width="100%">Description</th>
		</tr>
		<tr>
			<td><code>updateInterval</code></td>
			<td>the update internal for the webview.<br>
				<br><b>Example for 30 seconds:</b><code>0.5 * 60 * 1000</code>
				<br><b>Default value:</b> <code>"0.5 * 60 * 1000"</code>
			</td>
		</tr>	
		<tr>
			<td><code>getURL</code></td>
			<td>Function that returns the URL used as webview src attribute<br>
				<br><b>Default value:</b> <code>() => "http://magicmirror.builders/"</code>
			</td>
		</tr>		
		<tr>
			<td><code>attributes</code></td>
			<td>See <A href="https://electronjs.org/docs/api/webview-tag">Webview definition</A> for details about these attributes<br>

````javascript
	attributes: {
		name: "mirrorBuilders",
		style: {
			display: 'flex',
			width: '100%',
			height: '600px',
		},
		autosize: {
			minwidth: '100%',
			minheight: '100%',
		},
		nodeintegration: false,
		plugins: false,
		preload: '',
		httpreferrer: '',
		useragent: '',
		disablewebsecurity: false,
		partition: '',
		allowpopups: false,
		webpreferences: '',
		enableblinkfeatures: '',
		disableblinkfeatures: '',
	},
````
All supported attributes are presented above. The names match those used in electron webview element definition. Empty string, false, null or omitted attributes result in that attribute not being set/used.
</td>
</tr>		
</table>
