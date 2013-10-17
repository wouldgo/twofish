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

  it('8 char length key - single simple character', function() {
    var pt = 'A'
      , ct = twoFish.encrypt('secret12', pt)
      , cpt = twoFish.decrypt('secret12', ct)
      , ok = utils.areEqual(pt, cpt);

    console.info('Plaint Text: ', pt, '\r\nChiper Text: ', ct, '\r\nChipered Plaint Text: ', cpt);
    expect(ok).toEqual(true);
  });

  it('6 char length key - single simple character', function() {
    var pt = 'A'
      , ct = twoFish.encrypt('secret', pt)
      , cpt = twoFish.decrypt('secret', ct)
      , ok = utils.areEqual(pt, cpt);

    console.info('Plaint Text: ', pt, '\r\nChiper Text: ', ct, '\r\nChipered Plaint Text: ', cpt);
    expect(ok).toEqual(true);
  });

  it('8 char length key - single "esotic" character', function() {
    var pt = '☂'
      , ct = twoFish.encrypt('secret12', pt)
      , cpt = twoFish.decrypt('secret12', ct)
      , ok = utils.areEqual(pt, cpt);

    console.info('Plaint Text: ', pt, '\r\nChiper Text: ', ct, '\r\nChipered Plaint Text: ', cpt);
    expect(ok).toEqual(true);
  });
});
