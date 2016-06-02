Package.describe({
  name:"natestrauser:uploadcare-plus",
  summary: "uploadcare script packaged for Meteor with helpers and utilities",
  version: "2.9.0",
  git: "https://github.com/nate-strauser/meteor-uploadcare-plus.git"
});

Package.on_use(function(api) {
  api.versionsFrom("1.0");
  api.use(["check", "ui"], "client");
  api.add_files(["client.js"], "client");
  api.export(["loadUploadcare", "UploadCarePlus"], "client");
});

Package.on_test(function(api) {
  api.use(["check", "tinytest", "ui"], "client");
  api.use("natestrauser:uploadcare-plus");
  api.add_files("tests/uploadcare-tests.js", "client");
});
