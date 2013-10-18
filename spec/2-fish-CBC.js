'use strict';

/* global describe:false,
    it: false,
    beforeEach: false,
    expect: false,

    functionUtils: false,
    twoFish: false
*/

describe('Twofish CBC', function() {
  console.info(' - Start Twofish CBC - ');
  var twoF
    , utils = functionUtils();

  beforeEach(function() {
    twoF = twoFish();
  });

  it('6 char length key - single simple character', function() {
    var key = 'secret'
      , pt = 'A'
      , ct = twoF.encryptCBCMode(key, pt)
      , cpt = twoF.decryptCBCMode(key, ct)
      , ok = utils.areEqual(pt, cpt);

    console.info('Key: ', key, '-\r\nPlaint Text: ', pt, '-\r\nChiper Text: ', ct, '-\r\nChipered Plaint Text: ', cpt, '-');
    expect(ok).toEqual(true);
  });

  it('6 char length key - multiple simple characters', function() {
    var key = 'secret'
      , pt = 'Super secret message!'
      , ct = twoF.encryptCBCMode(key, pt)
      , cpt = twoF.decryptCBCMode(key, ct)
      , ok = utils.areEqual(pt, cpt);

    console.info('Key: ', key, '-\r\nPlaint Text: ', pt, '-\r\nChiper Text: ', ct, '-\r\nChipered Plaint Text: ', cpt, '-');
    expect(ok).toEqual(true);
  });

  it('6 char length key - single "esotic" character', function() {
    var key = 'secret'
      , pt = '☭'
      , ct = twoF.encryptCBCMode(key, pt)
      , cpt = twoF.decryptCBCMode(key, ct)
      , ok = utils.areEqual(pt, cpt);

    console.info('Key: ', key, '-\r\nPlaint Text: ', pt, '-\r\nChiper Text: ', ct, '-\r\nChipered Plaint Text: ', cpt, '-');
    expect(ok).toEqual(true);
  });

  it('6 char length key - multiple "esotic" characters', function() {
    var key = 'secret'
      , pt = '☢€  ☂ ڴ!'
      , ct = twoF.encryptCBCMode(key, pt)
      , cpt = twoF.decryptCBCMode(key, ct)
      , ok = utils.areEqual(pt, cpt);

    console.info('Key: ', key, '-\r\nPlaint Text: ', pt, '-\r\nChiper Text: ', ct, '-\r\nChipered Plaint Text: ', cpt, '-');
    expect(ok).toEqual(true);
  });

  it('8 char length key - single simple character', function() {
    var key = 'secret12'
      , pt = 'A'
      , ct = twoF.encryptCBCMode(key, pt)
      , cpt = twoF.decryptCBCMode(key, ct)
      , ok = utils.areEqual(pt, cpt);

    console.info('Key: ', key, '-\r\nPlaint Text: ', pt, '-\r\nChiper Text: ', ct, '-\r\nChipered Plaint Text: ', cpt, '-');
    expect(ok).toEqual(true);
  });

  it('8 char length key - multiple simple characters', function() {
    var key = 'secret12'
      , pt = 'Sunday monday, happy days!'
      , ct = twoF.encryptCBCMode(key, pt)
      , cpt = twoF.decryptCBCMode(key, ct)
      , ok = utils.areEqual(pt, cpt);

    console.info('Key: ', key, '-\r\nPlaint Text: ', pt, '-\r\nChiper Text: ', ct, '-\r\nChipered Plaint Text: ', cpt, '-');
    expect(ok).toEqual(true);
  });

  it('8 char length key - single "esotic" character', function() {
    var key = 'secret12'
      , pt = '☂'
      , ct = twoF.encryptCBCMode(key, pt)
      , cpt = twoF.decryptCBCMode(key, ct)
      , ok = utils.areEqual(pt, cpt);

    console.info('Key: ', key, '-\r\nPlaint Text: ', pt, '-\r\nChiper Text: ', ct, '-\r\nChipered Plaint Text: ', cpt, '-');
    expect(ok).toEqual(true);
  });

  it('8 char length key - multiple "esotic" characters', function() {
    var key = 'secret12'
      , pt = '☭☢€  ☂ ڴ'
      , ct = twoF.encryptCBCMode(key, pt)
      , cpt = twoF.decryptCBCMode(key, ct)
      , ok = utils.areEqual(pt, cpt);

    console.info('Key: ', key, '-\r\nPlaint Text: ', pt, '-\r\nChiper Text: ', ct, '-\r\nChipered Plaint Text: ', cpt, '-');
    expect(ok).toEqual(true);
  });

  it('13 char length key - single simple character', function() {
    var key = 'anothersecret'
      , pt = 'A'
      , ct = twoF.encryptCBCMode(key, pt)
      , cpt = twoF.decryptCBCMode(key, ct)
      , ok = utils.areEqual(pt, cpt);

    console.info('Key: ', key, '-\r\nPlaint Text: ', pt, '-\r\nChiper Text: ', ct, '-\r\nChipered Plaint Text: ', cpt, '-');
    expect(ok).toEqual(true);
  });

  it('13 char length key - multiple simple characters', function() {
    var key = 'anothersecret'
      , pt = 'Super secret message!'
      , ct = twoF.encryptCBCMode(key, pt)
      , cpt = twoF.decryptCBCMode(key, ct)
      , ok = utils.areEqual(pt, cpt);

    console.info('Key: ', key, '-\r\nPlaint Text: ', pt, '-\r\nChiper Text: ', ct, '-\r\nChipered Plaint Text: ', cpt, '-');
    expect(ok).toEqual(true);
  });

  it('13 char length key - single "esotic" character', function() {
    var key = 'anothersecret'
      , pt = '☭'
      , ct = twoF.encryptCBCMode(key, pt)
      , cpt = twoF.decryptCBCMode(key, ct)
      , ok = utils.areEqual(pt, cpt);

    console.info('Key: ', key, '-\r\nPlaint Text: ', pt, '-\r\nChiper Text: ', ct, '-\r\nChipered Plaint Text: ', cpt, '-');
    expect(ok).toEqual(true);
  });

  it('13 char length key - multiple "esotic" characters', function() {
    var key = 'anothersecret'
      , pt = '☢€  ☂ ڴ!'
      , ct = twoF.encryptCBCMode(key, pt)
      , cpt = twoF.decryptCBCMode(key, ct)
      , ok = utils.areEqual(pt, cpt);

    console.info('Key: ', key, '-\r\nPlaint Text: ', pt, '-\r\nChiper Text: ', ct, '-\r\nChipered Plaint Text: ', cpt, '-');
    expect(ok).toEqual(true);
  });

  it('6 char length key - multiple simple characters', function() {
    var key = 'secret'
      , pt = 'Super secret message!'
      , ct = twoF.encryptCBCMode(key, pt)
      , cpt = twoF.decryptCBCMode(key, ct)
      , ok = utils.areEqual(pt, cpt);

    console.info('Key: ', key, '-\r\nPlaint Text: ', pt, '-\r\nChiper Text: ', ct, '-\r\nChipered Plaint Text: ', cpt, '-');
    expect(ok).toEqual(true);
  });

  it('6 char length key - single "esotic" character', function() {
    var key = 'secret'
      , pt = '☭'
      , ct = twoF.encryptCBCMode(key, pt)
      , cpt = twoF.decryptCBCMode(key, ct)
      , ok = utils.areEqual(pt, cpt);

    console.info('Key: ', key, '-\r\nPlaint Text: ', pt, '-\r\nChiper Text: ', ct, '-\r\nChipered Plaint Text: ', cpt, '-');
    expect(ok).toEqual(true);
  });

  it('6 char length key - multiple "esotic" characters', function() {
    var key = 'secret'
      , pt = '☢€  ☂ ڴ!'
      , ct = twoF.encryptCBCMode(key, pt)
      , cpt = twoF.decryptCBCMode(key, ct)
      , ok = utils.areEqual(pt, cpt);

    console.info('Key: ', key, '-\r\nPlaint Text: ', pt, '-\r\nChiper Text: ', ct, '-\r\nChipered Plaint Text: ', cpt, '-');
    expect(ok).toEqual(true);
  });

  it('8 char length key - single simple character', function() {
    var key = 'secret12'
      , pt = 'A'
      , ct = twoF.encryptCBCMode(key, pt)
      , cpt = twoF.decryptCBCMode(key, ct)
      , ok = utils.areEqual(pt, cpt);

    console.info('Key: ', key, '-\r\nPlaint Text: ', pt, '-\r\nChiper Text: ', ct, '-\r\nChipered Plaint Text: ', cpt, '-');
    expect(ok).toEqual(true);
  });

  it('8 char length key - multiple simple characters', function() {
    var key = 'secret12'
      , pt = 'Sunday monday, happy days!'
      , ct = twoF.encryptCBCMode(key, pt)
      , cpt = twoF.decryptCBCMode(key, ct)
      , ok = utils.areEqual(pt, cpt);

    console.info('Key: ', key, '-\r\nPlaint Text: ', pt, '-\r\nChiper Text: ', ct, '-\r\nChipered Plaint Text: ', cpt, '-');
    expect(ok).toEqual(true);
  });

  it('8 char length key - single "esotic" character', function() {
    var key = 'secret12'
      , pt = '☂'
      , ct = twoF.encryptCBCMode(key, pt)
      , cpt = twoF.decryptCBCMode(key, ct)
      , ok = utils.areEqual(pt, cpt);

    console.info('Key: ', key, '-\r\nPlaint Text: ', pt, '-\r\nChiper Text: ', ct, '-\r\nChipered Plaint Text: ', cpt, '-');
    expect(ok).toEqual(true);
  });

  it('8 char length key - multiple "esotic" characters', function() {
    var key = 'secret12'
      , pt = '☭☢€  ☂ ڴ'
      , ct = twoF.encryptCBCMode(key, pt)
      , cpt = twoF.decryptCBCMode(key, ct)
      , ok = utils.areEqual(pt, cpt);

    console.info('Key: ', key, '-\r\nPlaint Text: ', pt, '-\r\nChiper Text: ', ct, '-\r\nChipered Plaint Text: ', cpt, '-');
    expect(ok).toEqual(true);
  });

  it('13 char length key - single simple character', function() {
    var key = 'anothersecret'
      , pt = 'A'
      , ct = twoF.encryptCBCMode(key, pt)
      , cpt = twoF.decryptCBCMode(key, ct)
      , ok = utils.areEqual(pt, cpt);

    console.info('Key: ', key, '-\r\nPlaint Text: ', pt, '-\r\nChiper Text: ', ct, '-\r\nChipered Plaint Text: ', cpt, '-');
    expect(ok).toEqual(true);
  });

  it('13 char length key - multiple simple characters', function() {
    var key = 'anothersecret'
      , pt = 'Super secret message!'
      , ct = twoF.encryptCBCMode(key, pt)
      , cpt = twoF.decryptCBCMode(key, ct)
      , ok = utils.areEqual(pt, cpt);

    console.info('Key: ', key, '-\r\nPlaint Text: ', pt, '-\r\nChiper Text: ', ct, '-\r\nChipered Plaint Text: ', cpt, '-');
    expect(ok).toEqual(true);
  });

  it('13 char length key - single "esotic" character', function() {
    var key = 'anothersecret'
      , pt = '☭'
      , ct = twoF.encryptCBCMode(key, pt)
      , cpt = twoF.decryptCBCMode(key, ct)
      , ok = utils.areEqual(pt, cpt);

    console.info('Key: ', key, '-\r\nPlaint Text: ', pt, '-\r\nChiper Text: ', ct, '-\r\nChipered Plaint Text: ', cpt, '-');
    expect(ok).toEqual(true);
  });

  it('13 char length key - multiple "esotic" characters', function() {
    var key = 'anothersecret'
      , pt = '☢€  ☂ ڴ!'
      , ct = twoF.encryptCBCMode(key, pt)
      , cpt = twoF.decryptCBCMode(key, ct)
      , ok = utils.areEqual(pt, cpt);

    console.info('Key: ', key, '-\r\nPlaint Text: ', pt, '-\r\nChiper Text: ', ct, '-\r\nChipered Plaint Text: ', cpt, '-');
    expect(ok).toEqual(true);
  });

  it('37 char length key - single simple character', function() {
    var key = 'A Super secret that can not be stolen'
      , pt = 'A'
      , ct = twoF.encryptCBCMode(key, pt)
      , cpt = twoF.decryptCBCMode(key, ct)
      , ok = utils.areEqual(pt, cpt);

    console.info('Key: ', key, '-\r\nPlaint Text: ', pt, '-\r\nChiper Text: ', ct, '-\r\nChipered Plaint Text: ', cpt, '-');
    expect(ok).toEqual(true);
  });

  it('37 char length key - multiple simple characters', function() {
    var key = 'A Super secret that can not be stolen'
      , pt = 'Sunday monday, happy days!'
      , ct = twoF.encryptCBCMode(key, pt)
      , cpt = twoF.decryptCBCMode(key, ct)
      , ok = utils.areEqual(pt, cpt);

    console.info('Key: ', key, '-\r\nPlaint Text: ', pt, '-\r\nChiper Text: ', ct, '-\r\nChipered Plaint Text: ', cpt, '-');
    expect(ok).toEqual(true);
  });

  it('37 char length key - single "esotic" character', function() {
    var key = 'A Super secret that can not be stolen'
      , pt = '☂'
      , ct = twoF.encryptCBCMode(key, pt)
      , cpt = twoF.decryptCBCMode(key, ct)
      , ok = utils.areEqual(pt, cpt);

    console.info('Key: ', key, '-\r\nPlaint Text: ', pt, '-\r\nChiper Text: ', ct, '-\r\nChipered Plaint Text: ', cpt, '-');
    expect(ok).toEqual(true);
  });

  it('37 char length key - multiple "esotic" characters', function() {
    var key = 'A Super secret that can not be stolen'
      , pt = '☭☢€  ☂ ڴ'
      , ct = twoF.encryptCBCMode(key, pt)
      , cpt = twoF.decryptCBCMode(key, ct)
      , ok = utils.areEqual(pt, cpt);

    console.info('Key: ', key, '-\r\nPlaint Text: ', pt, '-\r\nChiper Text: ', ct, '-\r\nChipered Plaint Text: ', cpt, '-');
    expect(ok).toEqual(true);
  });

  it('24 char length key - 32 characters, first 16 equals to second 16', function() {
    var key = 'supasecret11oneoneeleven'
      , pt = 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
      , ct = twoF.encryptCBCMode(key, pt)
      , cpt = twoF.decryptCBCMode(key, ct)
      , firstArr = ct.slice(0, 16)
      , secondArr = ct.slice(16, 32);

    console.info('Key: ', key, '-\r\nPlaint Text: ', pt, '-\r\nChiper Text: ', ct, '-\r\nChipered Plaint Text: ', cpt, '-\r\n (0..16) Array: ', firstArr, '-\r\n(16..32) Array: ', secondArr, '-');
    expect(firstArr).not.toEqual(secondArr);
  });

  it('24 char length key - 32 characters, first 16 equals to second 16 (2)', function() {
    var key = 'supasecret11oneoneeleven'
      , pt = 'ABCDABCDABCDABCDABCDABCDABCDABCD'
      , ct = twoF.encryptCBCMode(key, pt)
      , cpt = twoF.decryptCBCMode(key, ct)
      , firstArr = ct.slice(0, 16)
      , secondArr = ct.slice(16, 32);

    console.info('Key: ', key, '-\r\nPlaint Text: ', pt, '-\r\nChiper Text: ', ct, '-\r\nChipered Plaint Text: ', cpt, '-\r\n (0..16) Array: ', firstArr, '-\r\n(16..32) Array: ', secondArr, '-');
    expect(firstArr).not.toEqual(secondArr);
  });

  it('37 char length key - single simple character', function() {
    var key = 'A Super secret that can not be stolen'
      , pt = 'A'
      , ct = twoF.encryptCBCMode(key, pt)
      , cpt = twoF.decryptCBCMode(key, ct)
      , ok = utils.areEqual(pt, cpt);

    console.info('Key: ', key, '-\r\nPlaint Text: ', pt, '-\r\nChiper Text: ', ct, '-\r\nChipered Plaint Text: ', cpt, '-');
    expect(ok).toEqual(true);
  });

  it('37 char length key - multiple simple characters', function() {
    var key = 'A Super secret that can not be stolen'
      , pt = 'Sunday monday, happy days!'
      , ct = twoF.encryptCBCMode(key, pt)
      , cpt = twoF.decryptCBCMode(key, ct)
      , ok = utils.areEqual(pt, cpt);

    console.info('Key: ', key, '-\r\nPlaint Text: ', pt, '-\r\nChiper Text: ', ct, '-\r\nChipered Plaint Text: ', cpt, '-');
    expect(ok).toEqual(true);
  });

  it('37 char length key - single "esotic" character', function() {
    var key = 'A Super secret that can not be stolen'
      , pt = '☂'
      , ct = twoF.encryptCBCMode(key, pt)
      , cpt = twoF.decryptCBCMode(key, ct)
      , ok = utils.areEqual(pt, cpt);

    console.info('Key: ', key, '-\r\nPlaint Text: ', pt, '-\r\nChiper Text: ', ct, '-\r\nChipered Plaint Text: ', cpt, '-');
    expect(ok).toEqual(true);
  });

  it('37 char length key - multiple "esotic" characters', function() {
    var key = 'A Super secret that can not be stolen'
      , pt = '☭☢€  ☂ ڴ'
      , ct = twoF.encryptCBCMode(key, pt)
      , cpt = twoF.decryptCBCMode(key, ct)
      , ok = utils.areEqual(pt, cpt);

    console.info('Key: ', key, '-\r\nPlaint Text: ', pt, '-\r\nChiper Text: ', ct, '-\r\nChipered Plaint Text: ', cpt, '-');
    expect(ok).toEqual(true);
  });

  it('24 char length key - 32 characters, first 16 equals to second 16', function() {
    var key = 'supasecret11oneoneeleven'
      , pt = 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
      , ct = twoF.encryptCBCMode(key, pt)
      , cpt = twoF.decryptCBCMode(key, ct)
      , firstArr = ct.slice(0, 16)
      , secondArr = ct.slice(16, 32);

    console.info('Key: ', key, '-\r\nPlaint Text: ', pt, '-\r\nChiper Text: ', ct, '-\r\nChipered Plaint Text: ', cpt, '-\r\n (0..16) Array: ', firstArr, '-\r\n(16..32) Array: ', secondArr, '-');
    expect(firstArr).not.toEqual(secondArr);
  });

  it('24 char length key - 32 characters, first 16 equals to second 16 (2)', function() {
    var key = 'supasecret11oneoneeleven'
      , pt = 'ABCDABCDABCDABCDABCDABCDABCDABCD'
      , ct = twoF.encryptCBCMode(key, pt)
      , cpt = twoF.decryptCBCMode(key, ct)
      , firstArr = ct.slice(0, 16)
      , secondArr = ct.slice(16, 32);

    console.info('Key: ', key, '-\r\nPlaint Text: ', pt, '-\r\nChiper Text: ', ct, '-\r\nChipered Plaint Text: ', cpt, '-\r\n (0..16) Array: ', firstArr, '-\r\n(16..32) Array: ', secondArr, '-');
    expect(firstArr).not.toEqual(secondArr);
  });
});
