'use strict';

/* global describe:false,
    it: false,
    beforeEach: false,
    expect: false,

    functionUtils: false,
    twoFishECB: false
*/

describe('Twofish ECB', function() {
  console.info(' - Start Twofish ECB - ');
  var twoFish
    , utils = functionUtils();

  beforeEach(function() {
    twoFish = twoFishECB();
  });

  it('6 char length key - single simple character', function() {
    var pt = 'A'
      , ct = twoFish.encrypt('secret', pt)
      , cpt = twoFish.decrypt('secret', ct)
      , ok = utils.areEqual(pt, cpt);

    //console.info('Plaint Text: ', pt, '\r\nChiper Text: ', ct, '\r\nChipered Plaint Text: ', cpt);
    expect(ok).toEqual(true);
  });

  it('6 char length key - multiple simple character', function() {
    var pt = 'Super secret message!'
      , ct = twoFish.encrypt('secret', pt)
      , cpt = twoFish.decrypt('secret', ct)
      , ok = utils.areEqual(pt, cpt);

    //console.info('Plaint Text: ', pt, '\r\nChiper Text: ', ct, '\r\nChipered Plaint Text: ', cpt);
    expect(ok).toEqual(true);
  });

  it('6 char length key - single "esotic" character', function() {
    var pt = '☭'
      , ct = twoFish.encrypt('secret', pt)
      , cpt = twoFish.decrypt('secret', ct)
      , ok = utils.areEqual(pt, cpt);

    //console.info('Plaint Text: ', pt, '\r\nChiper Text: ', ct, '\r\nChipered Plaint Text: ', cpt);
    expect(ok).toEqual(true);
  });

  it('6 char length key - multiple "esotic" character', function() {
    var pt = '☢€  ☂ ڴ!'
      , ct = twoFish.encrypt('secret', pt)
      , cpt = twoFish.decrypt('secret', ct)
      , ok = utils.areEqual(pt, cpt);

    //console.info('Plaint Text: ', pt, '\r\nChiper Text: ', ct, '\r\nChipered Plaint Text: ', cpt);
    expect(ok).toEqual(true);
  });

  it('8 char length key - single simple character', function() {
    var pt = 'A'
      , ct = twoFish.encrypt('secret12', pt)
      , cpt = twoFish.decrypt('secret12', ct)
      , ok = utils.areEqual(pt, cpt);

    //console.info('Plaint Text: ', pt, '\r\nChiper Text: ', ct, '\r\nChipered Plaint Text: ', cpt);
    expect(ok).toEqual(true);
  });

  it('8 char length key - multiple simple character', function() {
    var pt = 'Sunday monday, happy days!'
      , ct = twoFish.encrypt('secret12', pt)
      , cpt = twoFish.decrypt('secret12', ct)
      , ok = utils.areEqual(pt, cpt);

    //console.info('Plaint Text: ', pt, '\r\nChiper Text: ', ct, '\r\nChipered Plaint Text: ', cpt);
    expect(ok).toEqual(true);
  });

  it('8 char length key - single "esotic" character', function() {
    var pt = '☂'
      , ct = twoFish.encrypt('secret12', pt)
      , cpt = twoFish.decrypt('secret12', ct)
      , ok = utils.areEqual(pt, cpt);

    //console.info('Plaint Text: ', pt.charCodeAt(0), '\r\nChiper Text: ', ct, '\r\nChipered Plaint Text: ', cpt);
    expect(ok).toEqual(true);
  });

  it('8 char length key - multiple "esotic" character', function() {
    var pt = '☭☢€  ☂ ڴ'
      , ct = twoFish.encrypt('secret12', pt)
      , cpt = twoFish.decrypt('secret12', ct)
      , ok = utils.areEqual(pt, cpt);

    //console.info('Plaint Text: ', pt.charCodeAt(0), '\r\nChiper Text: ', ct, '\r\nChipered Plaint Text: ', cpt);
    expect(ok).toEqual(true);
  });

  it('37 char length key - single simple character', function() {
    var pt = 'A'
      , ct = twoFish.encrypt('A Super secret that can not be stolen', pt)
      , cpt = twoFish.decrypt('A Super secret that can not be stolen', ct)
      , ok = utils.areEqual(pt, cpt);

    //console.info('Plaint Text: ', pt, '\r\nChiper Text: ', ct, '\r\nChipered Plaint Text: ', cpt);
    expect(ok).toEqual(true);
  });

  it('37 char length key - multiple simple character', function() {
    var pt = 'Sunday monday, happy days!'
      , ct = twoFish.encrypt('A Super secret that can not be stolen', pt)
      , cpt = twoFish.decrypt('A Super secret that can not be stolen', ct)
      , ok = utils.areEqual(pt, cpt);

    //console.info('Plaint Text: ', pt, '\r\nChiper Text: ', ct, '\r\nChipered Plaint Text: ', cpt);
    expect(ok).toEqual(true);
  });

  it('37 char length key - single "esotic" character', function() {
    var pt = '☂'
      , ct = twoFish.encrypt('A Super secret that can not be stolen', pt)
      , cpt = twoFish.decrypt('A Super secret that can not be stolen', ct)
      , ok = utils.areEqual(pt, cpt);

    //console.info('Plaint Text: ', pt.charCodeAt(0), '\r\nChiper Text: ', ct, '\r\nChipered Plaint Text: ', cpt);
    expect(ok).toEqual(true);
  });

  it('37 char length key - multiple "esotic" character', function() {
    var pt = '☭☢€  ☂ ڴ'
      , ct = twoFish.encrypt('A Super secret that can not be stolen', pt)
      , cpt = twoFish.decrypt('A Super secret that can not be stolen', ct)
      , ok = utils.areEqual(pt, cpt);

    //console.info('Plaint Text: ', pt.charCodeAt(0), '\r\nChiper Text: ', ct, '\r\nChipered Plaint Text: ', cpt);
    expect(ok).toEqual(true);
  });
});
