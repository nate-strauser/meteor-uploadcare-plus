UploadCarePlus = {};

// Private
UploadCarePlus._getPublicKey = function() {
  if (! (Meteor.settings && Meteor.settings.public &&
         Meteor.settings.public.uploadcare)) {
    if (typeof console !== "undefined") {
      console.log("uploadcare-plus - You need at least to create public settings");
    }
  } else {
    if (Meteor.settings.public.uploadcare.publickey) {
      return Meteor.settings.public.uploadcare.publickey;
    } else if (Meteor.settings.public.uploadcare.public_key) {
      return Meteor.settings.public.uploadcare.public_key;
    } else {
      if (typeof console !== "undefined") {
        console.log("uploadcare-plus - No public key supplied");
      }
    }
  }
}

// Private
UploadCarePlus._setInitParams = function(public_key) {
  window.UPLOADCARE_PUBLIC_KEY = public_key;

  settings = Meteor.settings.public.uploadcare;
  for (var property in settings) {
    if (property == 'public_key' || property == 'publickey') {
      continue;
    }
    if (settings.hasOwnProperty(property)) {
      window["UPLOADCARE_" + property.toUpperCase()] = settings[property];
    }
  }
}

// Public
UploadCarePlus.load = function(public_key, callback) {
  // TODO: Shift arguments to support just callback
  if (typeof window.uploadcare === "undefined") {
    if (! public_key) {
      public_key = this._getPublicKey();
    } else {
      check(public_key, String);
    }

    if (public_key) {
      this._setInitParams(public_key);

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
      script.src = "https://ucarecdn.com/widget/2.9.0/uploadcare/uploadcare.full.min.js";
      script.onload = loadCallback;
      script.onerror = errorCallback;

      // Load the script tag
      document.getElementsByTagName('head')[0].appendChild(script);
    }
  }
};

// Public (deprecated)
loadUploadcare = function(key, callback) {
  console.log("uploadcare-plus - loadUploadcare is deprecated. " +
              "Use UploadCarePlus.load instead")
  UploadCarePlus.load(key, callback);
}

// Public
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
    if (typeof operations === 'string' && operations != "") {
      url += operations;
    }
  }
  return url;
});
