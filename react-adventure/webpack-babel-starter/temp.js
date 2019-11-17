<% var item, key %>

<% htmlWebpackPlugin.options.appMountIds = htmlWebpackPlugin.options.appMountIds || [] %>
<% htmlWebpackPlugin.options.lang = htmlWebpackPlugin.options.lang || "en" %>
<% htmlWebpackPlugin.options.links = htmlWebpackPlugin.options.links || [] %>
<% htmlWebpackPlugin.options.meta = htmlWebpackPlugin.options.meta || [] %>
<% htmlWebpackPlugin.options.scripts = htmlWebpackPlugin.options.scripts || [] %>

<!DOCTYPE html>
<html lang="<%= htmlWebpackPlugin.options.lang %>" <% if (htmlWebpackPlugin.files.manifest) { %> manifest="<%= htmlWebpackPlugin.files.manifest %>"<% } %>>
  <head>
    <meta charset="utf-8">
    <meta content="ie=edge" http-equiv="x-ua-compatible">

    <% if (htmlWebpackPlugin.options.baseHref) { %>
    <base href="<%= htmlWebpackPlugin.options.baseHref %>">
    <% } %>

    <% if (Array.isArray(htmlWebpackPlugin.options.meta)) { %>
      <% for (item of htmlWebpackPlugin.options.meta) { %>
      <meta<% for (key in item) { %> <%= key %>="<%= item[key] %>"<% } %>>
      <% } %>
    <% } %>

    <title><%= htmlWebpackPlugin.options.title %></title>

    <% if (htmlWebpackPlugin.files.favicon) { %>
    <link href="<%= htmlWebpackPlugin.files.favicon %>" rel="shortcut icon">
    <% } %>

    <% if (htmlWebpackPlugin.options.mobile) { %>
    <meta content="width=device-width, initial-scale=1" name="viewport">
    <% } %>

    <% for (item of htmlWebpackPlugin.options.links) { %>
    <% if (typeof item === 'string' || item instanceof String) { item = { href: item, rel: 'stylesheet' } } %>
  	<link<% for (key in item) { %> <%= key %>="<%= item[key] %>"<% } %>>
    <% } %>

    <% for (key in htmlWebpackPlugin.files.css) { %>
    <% if (htmlWebpackPlugin.files.cssIntegrity) { %>
    <link
      href="<%= htmlWebpackPlugin.files.css[key] %>"
      rel="stylesheet"
      integrity="<%= htmlWebpackPlugin.files.cssIntegrity[key] %>"
      crossorigin="<%= webpackConfig.output.crossOriginLoading %>">
    <% } else { %>
    <link href="<%= htmlWebpackPlugin.files.css[key] %>" rel="stylesheet">
    <% } %>
    <% } %>
    <% if (htmlWebpackPlugin.options.headHtmlSnippet) { %>
      <%= htmlWebpackPlugin.options.headHtmlSnippet %>
    <% } %>
  </head>
  <body>
    <% if (htmlWebpackPlugin.options.unsupportedBrowser) { %>
    <style>.unsupported-browser { display: none; }</style>
    <div class="unsupported-browser">
      Sorry, your browser is not supported. Please upgrade to the latest version or switch your browser to use this
      site. See <a href="http://outdatedbrowser.com/">outdatedbrowser.com</a> for options.
    </div>
    <% } %>
    <% if (htmlWebpackPlugin.options.bodyHtmlSnippet) { %>
      <%= htmlWebpackPlugin.options.bodyHtmlSnippet %>
    <% } %>
    <% if (htmlWebpackPlugin.options.appMountId) { %>
    <div id="<%= htmlWebpackPlugin.options.appMountId %>">	
	
		<% if (htmlWebpackPlugin.options.appMountHtmlSnippet) { %>
		  <%= htmlWebpackPlugin.options.appMountHtmlSnippet %>
		<% } %>
	
	</div>
    <% } %>
    <% for (item of htmlWebpackPlugin.options.appMountIds) { %>
    <div id="<%= item %>"></div>
    <% } %>

    <% if (htmlWebpackPlugin.options.window) { %>
    <script type="text/javascript">
      <% for (key in htmlWebpackPlugin.options.window) { %>
      window['<%= key %>'] = <%= JSON.stringify(htmlWebpackPlugin.options.window[key]) %>;
      <% } %>
    </script>
    <% } %>

    <% if (htmlWebpackPlugin.options.inlineManifestWebpackName) { %>
        <%= htmlWebpackPlugin.files[htmlWebpackPlugin.options.inlineManifestWebpackName] %>
    <% } %>

    <% for (item of htmlWebpackPlugin.options.scripts) { %>
    <% if (typeof item === 'string' || item instanceof String) { item = { src: item, type: 'text/javascript' } } %>
  	<script<% for (key in item) { %> <%= key %>="<%= item[key] %>"<% } %>></script>
    <% } %>

    <% for (key in htmlWebpackPlugin.files.chunks) { %>
    <% if (htmlWebpackPlugin.files.jsIntegrity) { %>
    <script
      src="<%= htmlWebpackPlugin.files.chunks[key].entry %>"
      type="text/javascript"
      integrity="<%= htmlWebpackPlugin.files.jsIntegrity[htmlWebpackPlugin.files.js.indexOf(htmlWebpackPlugin.files.chunks[key].entry)] %>"
      crossorigin="<%= webpackConfig.output.crossOriginLoading %>"></script>
    <% } else { %>
    <script src="<%= htmlWebpackPlugin.files.chunks[key].entry %>" type="text/javascript"></script>
    <% } %>
    <% } %>

    <% if (htmlWebpackPlugin.options.devServer) { %>
    <script src="<%= htmlWebpackPlugin.options.devServer %>/webpack-dev-server.js" type="text/javascript"></script>
    <% } %>

    <% if (htmlWebpackPlugin.options.googleAnalytics) { %>
    <script type="text/javascript">
      window.GoogleAnalyticsObject='ga';window.ga=function(){ga.q.push(arguments)};ga.q=[];ga.l=+new Date;

      <% if (htmlWebpackPlugin.options.googleAnalytics.trackingId) { %>
      ga('create','<%= htmlWebpackPlugin.options.googleAnalytics.trackingId %>','auto');
      <% } else { throw new Error("html-webpack-template requires googleAnalytics.trackingId config"); } %>

      <% if (htmlWebpackPlugin.options.googleAnalytics.pageViewOnLoad) { %>
      ga('send','pageview')
      <% } %>
    </script>
    <script async defer src="https://www.google-analytics.com/analytics.js" type="text/javascript"></script>
    <% } %>
  </body>
</html>
