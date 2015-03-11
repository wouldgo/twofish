/*global describe it expect beforeEach twofish*/
(function doTest(describe, it, expect, beforeEach, twofish){
  'use strict';

  describe('CBC - Initializing vector passed and less than 16 characters', function doTestSuite() {

    var twF = twofish([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
      , testCase = function doTestCase(aKey, aPt) {

          var key = twF.stringToByteArray(aKey)
            , pt = twF.stringToByteArray(aPt)
            , ct = twF.encrypt(key, pt)
            , cpt = twF.decrypt(key, ct);

          expect(pt).toEqual(cpt);
        };

    it('6 char length key - single simple character', testCase.bind(this, 'secret', 'A'));
    it('6 char length key - multiple simple characters', testCase.bind(this, 'secret', 'Super secret message!'));
    it('6 char length key - single "esotic" character', testCase.bind(this, 'secret', '☭'));
    it('6 char length key - multiple "esotic" characters', testCase.bind(this, 'secret', '☢€  ☂ ڴ!'));
    it('8 char length key - single simple character', testCase.bind(this, 'secret12', 'A'));
    it('8 char length key - multiple simple characters', testCase.bind(this, 'secret12', 'Sunday monday, happy days!'));
    it('8 char length key - single "esotic" character', testCase.bind(this, 'secret12', '☂'));
    it('8 char length key - multiple "esotic" characters', testCase.bind(this, 'secret12', '☭☢€  ☂ ڴ'));

    /*it('13 char length key - single simple character', function() {

      var key = twF.stringToByteArray('anothersecret')
        , pt = twF.stringToByteArray('A')
        , ct = twF.encrypt(key, pt)
        , cpt = twF.decrypt(key, ct);

      expect(pt).toEqual(cpt);
    });

    it('13 char length key - multiple simple characters', function() {

      var key = twF.stringToByteArray('anothersecret')
        , pt = twF.stringToByteArray('Super secret message!')
        , ct = twF.encrypt(key, pt)
        , cpt = twF.decrypt(key, ct);

      expect(pt).toEqual(cpt);
    });

    it('13 char length key - single "esotic" character', function() {

      var key = twF.stringToByteArray('anothersecret')
        , pt = twF.stringToByteArray('☭')
        , ct = twF.encrypt(key, pt)
        , cpt = twF.decrypt(key, ct);

      expect(pt).toEqual(cpt);
    });

    it('13 char length key - multiple "esotic" characters', function() {

      var key = twF.stringToByteArray('anothersecret')
        , pt = twF.stringToByteArray('☢€  ☂ ڴ!')
        , ct = twF.encrypt(key, pt)
        , cpt = twF.decrypt(key, ct);

      expect(pt).toEqual(cpt);
    });

    it('6 char length key - multiple simple characters', function() {

      var key = twF.stringToByteArray('secret')
        , pt = twF.stringToByteArray('Super secret message!')
        , ct = twF.encrypt(key, pt)
        , cpt = twF.decrypt(key, ct);

      expect(pt).toEqual(cpt);
    });

    it('6 char length key - single "esotic" character', function() {

      var key = twF.stringToByteArray('secret')
        , pt = twF.stringToByteArray('☭')
        , ct = twF.encrypt(key, pt)
        , cpt = twF.decrypt(key, ct);

      expect(pt).toEqual(cpt);
    });

    it('6 char length key - multiple "esotic" characters', function() {

      var key = twF.stringToByteArray('secret')
        , pt = twF.stringToByteArray('☢€  ☂ ڴ!')
        , ct = twF.encrypt(key, pt)
        , cpt = twF.decrypt(key, ct);

      expect(pt).toEqual(cpt);
    });

    it('8 char length key - single simple character', function() {

      var key = twF.stringToByteArray('secret12')
        , pt = twF.stringToByteArray('A')
        , ct = twF.encrypt(key, pt)
        , cpt = twF.decrypt(key, ct);

      expect(pt).toEqual(cpt);
    });

    it('8 char length key - multiple simple characters', function() {

      var key = twF.stringToByteArray('secret12')
        , pt = twF.stringToByteArray('Sunday monday, happy days!')
        , ct = twF.encrypt(key, pt)
        , cpt = twF.decrypt(key, ct);

      expect(pt).toEqual(cpt);
    });

    it('8 char length key - single "esotic" character', function() {

      var key = twF.stringToByteArray('secret12')
        , pt = twF.stringToByteArray('☂')
        , ct = twF.encrypt(key, pt)
        , cpt = twF.decrypt(key, ct);

      expect(pt).toEqual(cpt);
    });

    it('8 char length key - multiple "esotic" characters', function() {

      var key = twF.stringToByteArray('secret12')
        , pt = twF.stringToByteArray('☭☢€  ☂ ڴ')
        , ct = twF.encrypt(key, pt)
        , cpt = twF.decrypt(key, ct);

      expect(pt).toEqual(cpt);
    });

    it('13 char length key - single simple character', function() {

      var key = twF.stringToByteArray('anothersecret')
        , pt = twF.stringToByteArray('A')
        , ct = twF.encrypt(key, pt)
        , cpt = twF.decrypt(key, ct);

      expect(pt).toEqual(cpt);
    });

    it('13 char length key - multiple simple characters', function() {

      var key = twF.stringToByteArray('anothersecret')
        , pt = twF.stringToByteArray('Super secret message!')
        , ct = twF.encrypt(key, pt)
        , cpt = twF.decrypt(key, ct);

      expect(pt).toEqual(cpt);
    });

    it('13 char length key - single "esotic" character', function() {

      var key = twF.stringToByteArray('anothersecret')
        , pt = twF.stringToByteArray('☭')
        , ct = twF.encrypt(key, pt)
        , cpt = twF.decrypt(key, ct);

      expect(pt).toEqual(cpt);
    });

    it('13 char length key - multiple "esotic" characters', function() {

      var key = twF.stringToByteArray('anothersecret')
        , pt = twF.stringToByteArray('☢€  ☂ ڴ!')
        , ct = twF.encrypt(key, pt)
        , cpt = twF.decrypt(key, ct);

      expect(pt).toEqual(cpt);
    });

    it('37 char length key - single simple character', function() {

      var key = twF.stringToByteArray('A Super secret that can not be stolen')
        , pt = twF.stringToByteArray('A')
        , ct = twF.encrypt(key, pt)
        , cpt = twF.decrypt(key, ct);

      expect(pt).toEqual(cpt);
    });

    it('37 char length key - multiple simple characters', function() {

      var key = twF.stringToByteArray('A Super secret that can not be stolen')
        , pt = twF.stringToByteArray('Sunday monday, happy days!')
        , ct = twF.encrypt(key, pt)
        , cpt = twF.decrypt(key, ct);

      expect(pt).toEqual(cpt);
    });

    it('37 char length key - single "esotic" character', function() {

      var key = twF.stringToByteArray('A Super secret that can not be stolen')
        , pt = twF.stringToByteArray('☂')
        , ct = twF.encrypt(key, pt)
        , cpt = twF.decrypt(key, ct);

      expect(pt).toEqual(cpt);
    });

    it('37 char length key - multiple "esotic" characters', function() {

      var key = twF.stringToByteArray('A Super secret that can not be stolen')
        , pt = twF.stringToByteArray('☭☢€  ☂ ڴ')
        , ct = twF.encrypt(key, pt)
        , cpt = twF.decrypt(key, ct);

      expect(pt).toEqual(cpt);
    });

    it('24 char length key - 32 characters, first 16 equals to second 16', function() {

      var key = twF.stringToByteArray('supasecret11oneoneeleven')
        , pt = twF.stringToByteArray('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
        , ct = twF.encrypt(key, pt)
        , cpt = twF.decrypt(key, ct)
        , firstArr = ct.slice(0, 16)
        , secondArr = ct.slice(16, 32);

      expect(firstArr).not.toEqual(secondArr);
    });

    it('24 char length key - 32 characters, first 16 equals to second 16 (2)', function() {

      var key = twF.stringToByteArray('supasecret11oneoneeleven')
        , pt = twF.stringToByteArray('ABCDABCDABCDABCDABCDABCDABCDABCD')
        , ct = twF.encrypt(key, pt)
        , cpt = twF.decrypt(key, ct)
        , firstArr = ct.slice(0, 16)
        , secondArr = ct.slice(16, 32);

      expect(firstArr).not.toEqual(secondArr);
    });

    it('37 char length key - single simple character', function() {

      var key = twF.stringToByteArray('A Super secret that can not be stolen')
        , pt = twF.stringToByteArray('A')
        , ct = twF.encrypt(key, pt)
        , cpt = twF.decrypt(key, ct);

      expect(pt).toEqual(cpt);
    });

    it('37 char length key - multiple simple characters', function() {

      var key = twF.stringToByteArray('A Super secret that can not be stolen')
        , pt = twF.stringToByteArray('Sunday monday, happy days!')
        , ct = twF.encrypt(key, pt)
        , cpt = twF.decrypt(key, ct);

      expect(pt).toEqual(cpt);
    });

    it('37 char length key - single "esotic" character', function() {

      var key = twF.stringToByteArray('A Super secret that can not be stolen')
        , pt = twF.stringToByteArray('☂')
        , ct = twF.encrypt(key, pt)
        , cpt = twF.decrypt(key, ct);

      expect(pt).toEqual(cpt);
    });

    it('37 char length key - multiple "esotic" characters', function() {

      var key = twF.stringToByteArray('A Super secret that can not be stolen')
        , pt = twF.stringToByteArray('☭☢€  ☂ ڴ')
        , ct = twF.encrypt(key, pt)
        , cpt = twF.decrypt(key, ct);

      expect(pt).toEqual(cpt);
    });

    it('24 char length key - 32 characters, first 16 equals to second 16', function() {

      var key = twF.stringToByteArray('supasecret11oneoneeleven')
        , pt = twF.stringToByteArray('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
        , ct = twF.encrypt(key, pt)
        , cpt = twF.decrypt(key, ct)
        , firstArr = ct.slice(0, 16)
        , secondArr = ct.slice(16, 32);

      expect(firstArr).not.toEqual(secondArr);
    });

    it('24 char length key - 32 characters, first 16 equals to second 16 (2)', function() {

      var key = twF.stringToByteArray('supasecret11oneoneeleven')
        , pt = twF.stringToByteArray('ABCDABCDABCDABCDABCDABCDABCDABCD')
        , ct = twF.encrypt(key, pt)
        , cpt = twF.decrypt(key, ct)
        , firstArr = ct.slice(0, 16)
        , secondArr = ct.slice(16, 32);

      expect(firstArr).not.toEqual(secondArr);
    });*/
  });
}(describe, it, expect, beforeEach, twofish));
