'use strict';

/* global describe:false,
    it: false,
    expect: false,
    beforeEach: false,

    twoFish: false
*/

describe('Twofish ECB', function() {
  console.info(' - Start Twofish ECB - ');
  var twF;

  beforeEach(function() {
    twF = twoFish();
  });

  it('6 char length key - single simple character', function() {
    var key = 'secret'
      , pt = 'A'
      , ct = twF.encrypt(key, pt)
      , cpt = twF.decrypt(key, ct);

    console.info('Key:', key, '-\r\nPlaint Text:', pt, '-\r\nChiper Text:', ct, '-\r\nChipered Plaint Text:', cpt, '-');
    expect(pt).toEqual(cpt);
  });

  it('6 char length key - multiple simple characters', function() {
    var key = 'secret'
      , pt = 'Super secret message!'
      , ct = twF.encrypt(key, pt)
      , cpt = twF.decrypt(key, ct);

    console.info('Key:', key, '-\r\nPlaint Text:', pt, '-\r\nChiper Text:', ct, '-\r\nChipered Plaint Text:', cpt, '-');
    expect(pt).toEqual(cpt);
  });

  it('6 char length key - single "esotic" character', function() {
    var key = 'secret'
      , pt = '☭'
      , ct = twF.encrypt(key, pt)
      , cpt = twF.decrypt(key, ct);

    console.info('Key:', key, '-\r\nPlaint Text:', pt, '-\r\nChiper Text:', ct, '-\r\nChipered Plaint Text:', cpt, '-');
    expect(pt).toEqual(cpt);
  });

  it('6 char length key - multiple "esotic" characters', function() {
    var key = 'secret'
      , pt = '☢€  ☂ ڴ!'
      , ct = twF.encrypt(key, pt)
      , cpt = twF.decrypt(key, ct);

    console.info('Key:', key, '-\r\nPlaint Text:', pt, '-\r\nChiper Text:', ct, '-\r\nChipered Plaint Text:', cpt, '-');
    expect(pt).toEqual(cpt);
  });

  it('8 char length key - single simple character', function() {
    var key = 'secret12'
      , pt = 'A'
      , ct = twF.encrypt(key, pt)
      , cpt = twF.decrypt(key, ct);

    console.info('Key:', key, '-\r\nPlaint Text:', pt, '-\r\nChiper Text:', ct, '-\r\nChipered Plaint Text:', cpt, '-');
    expect(pt).toEqual(cpt);
  });

  it('8 char length key - multiple simple characters', function() {
    var key = 'secret12'
      , pt = 'Sunday monday, happy days!'
      , ct = twF.encrypt(key, pt)
      , cpt = twF.decrypt(key, ct);

    console.info('Key:', key, '-\r\nPlaint Text:', pt, '-\r\nChiper Text:', ct, '-\r\nChipered Plaint Text:', cpt, '-');
    expect(pt).toEqual(cpt);
  });

  it('8 char length key - single "esotic" character', function() {
    var key = 'secret12'
      , pt = '☂'
      , ct = twF.encrypt(key, pt)
      , cpt = twF.decrypt(key, ct);

    console.info('Key:', key, '-\r\nPlaint Text:', pt, '-\r\nChiper Text:', ct, '-\r\nChipered Plaint Text:', cpt, '-');
    expect(pt).toEqual(cpt);
  });

  it('8 char length key - multiple "esotic" characters', function() {
    var key = 'secret12'
      , pt = '☭☢€  ☂ ڴ'
      , ct = twF.encrypt(key, pt)
      , cpt = twF.decrypt(key, ct);

    console.info('Key:', key, '-\r\nPlaint Text:', pt, '-\r\nChiper Text:', ct, '-\r\nChipered Plaint Text:', cpt, '-');
    expect(pt).toEqual(cpt);
  });

  it('13 char length key - single simple character', function() {
    var key = 'anothersecret'
      , pt = 'A'
      , ct = twF.encrypt(key, pt)
      , cpt = twF.decrypt(key, ct);

    console.info('Key:', key, '-\r\nPlaint Text:', pt, '-\r\nChiper Text:', ct, '-\r\nChipered Plaint Text:', cpt, '-');
    expect(pt).toEqual(cpt);
  });

  it('13 char length key - multiple simple characters', function() {
    var key = 'anothersecret'
      , pt = 'Super secret message!'
      , ct = twF.encrypt(key, pt)
      , cpt = twF.decrypt(key, ct);

    console.info('Key:', key, '-\r\nPlaint Text:', pt, '-\r\nChiper Text:', ct, '-\r\nChipered Plaint Text:', cpt, '-');
    expect(pt).toEqual(cpt);
  });

  it('13 char length key - single "esotic" character', function() {
    var key = 'anothersecret'
      , pt = '☭'
      , ct = twF.encrypt(key, pt)
      , cpt = twF.decrypt(key, ct);

    console.info('Key:', key, '-\r\nPlaint Text:', pt, '-\r\nChiper Text:', ct, '-\r\nChipered Plaint Text:', cpt, '-');
    expect(pt).toEqual(cpt);
  });

  it('13 char length key - multiple "esotic" characters', function() {
    var key = 'anothersecret'
      , pt = '☢€  ☂ ڴ!'
      , ct = twF.encrypt(key, pt)
      , cpt = twF.decrypt(key, ct);

    console.info('Key:', key, '-\r\nPlaint Text:', pt, '-\r\nChiper Text:', ct, '-\r\nChipered Plaint Text:', cpt, '-');
    expect(pt).toEqual(cpt);
  });

  it('37 char length key - single simple character', function() {
    var key = 'A Super secret that can not be stolen'
      , pt = 'A'
      , ct = twF.encrypt(key, pt)
      , cpt = twF.decrypt(key, ct);

    console.info('Key:', key, '-\r\nPlaint Text:', pt, '-\r\nChiper Text:', ct, '-\r\nChipered Plaint Text:', cpt, '-');
    expect(pt).toEqual(cpt);
  });

  it('37 char length key - multiple simple characters', function() {
    var key = 'A Super secret that can not be stolen'
      , pt = 'Sunday monday, happy days!'
      , ct = twF.encrypt(key, pt)
      , cpt = twF.decrypt(key, ct);

    console.info('Key:', key, '-\r\nPlaint Text:', pt, '-\r\nChiper Text:', ct, '-\r\nChipered Plaint Text:', cpt, '-');
    expect(pt).toEqual(cpt);
  });

  it('37 char length key - single "esotic" character', function() {
    var key = 'A Super secret that can not be stolen'
      , pt = '☂'
      , ct = twF.encrypt(key, pt)
      , cpt = twF.decrypt(key, ct);

    console.info('Key:', key, '-\r\nPlaint Text:', pt, '-\r\nChiper Text:', ct, '-\r\nChipered Plaint Text:', cpt, '-');
    expect(pt).toEqual(cpt);
  });

  it('37 char length key - multiple "esotic" characters', function() {
    var key = 'A Super secret that can not be stolen'
      , pt = '☭☢€  ☂ ڴ'
      , ct = twF.encrypt(key, pt)
      , cpt = twF.decrypt(key, ct);

    console.info('Key:', key, '-\r\nPlaint Text:', pt, '-\r\nChiper Text:', ct, '-\r\nChipered Plaint Text:', cpt, '-');
    expect(pt).toEqual(cpt);
  });

  it('24 char length key - 32 characters, first 16 equals to second 16', function() {
    var key = 'supasecret11oneoneeleven'
      , pt = 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
      , ct = twF.encrypt(key, pt)
      , cpt = twF.decrypt(key, ct)
      , firstArr = ct.slice(0, 16)
      , secondArr = ct.slice(16, 32);

    console.info('Key:', key, '-\r\nPlaint Text:', pt, '-\r\nChiper Text:', ct, '-\r\nChipered Plaint Text:', cpt, '-\r\n (0..16) Array:', firstArr, '-\r\n(16..32) Array:', secondArr, '-');
    expect(firstArr).toEqual(secondArr);
  });

  it('24 char length key - 32 characters, first 16 equals to second 16 (2)', function() {
    var key = 'supasecret11oneoneeleven'
      , pt = 'ABCDABCDABCDABCDABCDABCDABCDABCD'
      , ct = twF.encrypt(key, pt)
      , cpt = twF.decrypt(key, ct)
      , firstArr = ct.slice(0, 16)
      , secondArr = ct.slice(16, 32);

    console.info('Key:', key, '-\r\nPlaint Text:', pt, '-\r\nChiper Text:', ct, '-\r\nChipered Plaint Text:', cpt, '-\r\n (0..16) Array:', firstArr, '-\r\n(16..32) Array:', secondArr, '-');
    expect(firstArr).toEqual(secondArr);
  });
});
