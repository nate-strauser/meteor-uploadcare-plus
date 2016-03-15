Package.describe({
  name:"natestrauser:uploadcare-plus",
  summary: "uploadcare script packaged for Meteor with helpers and utilities",
  version: "2.8.0",
  git: "https://github.com/nate-strauser/meteor-uploadcare-plus.git"
});

Package.on_use(function (api) {
  api.versionsFrom("1.0");
  api.use([
    'underscore',
    'ui']
  , 'client');

  api.add_files(['client.js'],'client');
  api.export('loadUploadcare', 'client');
});
