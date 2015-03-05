Package.describe({
  name:"natestrauser:uploadcare-plus",
  summary: "uploadcare script packaged for Meteor with helpers and utilities",
  version: "2.0.2",
  git: "https://github.com/nate-strauser/meteor-uploadcare-plus.git"
});

Package.on_use(function (api) {
  api.versionsFrom("METEOR@0.9.0");
  api.use([
    'underscore',
    'templating',
    'handlebars']
  , 'client');

  api.add_files(['client.js'],'client');
  api.export('loadUploadcare', 'client');
});
