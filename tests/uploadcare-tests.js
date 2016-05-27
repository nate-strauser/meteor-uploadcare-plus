Tinytest.add('getPublicKey with no settings', function(test) {
  var result = UCPlus._getPublicKey();
  test.equal(result, undefined);
});

Tinytest.add('getPublicKey with public key settings', function(test) {
  Meteor.settings = {};
  Meteor.settings.public = {};
  Meteor.settings.public.uploadcare = {};
  Meteor.settings.public.uploadcare.public_key = '<ANY>';
  var result = UCPlus._getPublicKey();
  test.equal(result, '<ANY>');

  delete Meteor.settings.public.uploadcare.public_key;
  Meteor.settings.public.uploadcare.publickey = '<ANY>';
  result = UCPlus._getPublicKey();
  test.equal(result, '<ANY>');

  Meteor.settings = {}; // restore
});

Tinytest.add('setInitParams with some settings', function(test) {
  Meteor.settings = {};
  Meteor.settings.public = {};
  Meteor.settings.public.uploadcare = {};
  Meteor.settings.public.uploadcare.public_key = '<ANY>';
  Meteor.settings.public.uploadcare.publickey = '<ANY>';
  Meteor.settings.public.uploadcare.cdn_base = 'http://cdn.com';
  Meteor.settings.public.uploadcare.preview_step = false;

  UCPlus._setInitParams('public_key');
  test.equal(window.UPLOADCARE_PUBLIC_KEY, 'public_key');
  test.equal(window.UPLOADCARE_CDN_BASE, 'http://cdn.com');
  test.isFalse(window.UPLOADCARE_PREVIEW_STEP);

  // Restore
  Meteor.settings = {};
  delete window.UPLOADCARE_PUBLIC_KEY;
  delete window.UPLOADCARE_CDN_BASE;
  delete window.UPLOADCARE_PREVIEW_STEP;
});

Tinytest.add('loadUploadcare with invalid public key type', function(test) {
  test.throws(function() { UCPlus.loadUploadcare({}); });
});
