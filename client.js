loadUploadcare = function(key, callback) {
  // TODO: Shift arguments to support just callback
  if (typeof uploadcare === "undefined") {
    if (! key && Meteor.settings && Meteor.settings.public &&
        Meteor.settings.public.uploadcare &&
        Meteor.settings.public.uploadcare.publickey) {
      key = Meteor.settings.public.uploadcare.publickey;
    }

    if (key) {
      window.UPLOADCARE_PUBLIC_KEY = key;

      // Functions to run after the script tag has loaded
      var loadCallback = function() {
        if (Object.prototype.toString.call(callback) === "[object Function]") {
          callback();
        }
      };

      // If the script doesn't load
      var errorCallback = function(error) {
        if (typeof console !== "undefined") {
          console.log(error);
        }
      };

      // Generate a script tag
      var script = document.createElement("script");
      script.type = "text/javascript";
      script.src = "https://ucarecdn.com/widget/2.8.0/uploadcare/uploadcare.full.min.js";
      script.onload = loadCallback;
      script.onerror = errorCallback;

      // Load the script tag
      document.getElementsByTagName('head')[0].appendChild(script);
    } else {
      if (typeof console !== "undefined") {
        console.log("uploadcare-plus - tried to load but key not supplied");
      }
    }
  }
};

UI.registerHelper("uploadcareUUIDToImageUrl", function(uuid, operations) {
  var url = "";
  if (uuid){
    var cdn = "https://ucarecdn.com/"
    if (Meteor.settings && Meteor.settings.public &&
        Meteor.settings.public.uploadcare &&
        Meteor.settings.public.uploadcare.cdn) {
      cdn = Meteor.settings.public.uploadcare.cdn;
    }

    url = cdn + uuid + "/";
    if (operations) {
      url += operations;
    }
  }
  return url;
});
