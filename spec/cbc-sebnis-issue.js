/*global describe it expect twofish*/
(function doTest(describe, it, expect, twofish){
  'use strict';

  describe('CBC SebNis', function doTestSuite() {
    var IV = [180, 106, 2, 96, 176, 188, 73, 34, 181, 235, 7, 133, 164, 183, 204, 158]
      , key = [73, 65, 63, 72, 65, 74]
      , twF = twofish(IV);

    it('cbc - issue use case #1', function doTestCase() {
      var pt = 'Paris'
        , ptArray = []
        , ct
        , cpt
        , aSingleChar
        , aSingleCharIndex = 0;

      for (; aSingleCharIndex < pt.length; aSingleCharIndex += 1) {

        aSingleChar = pt[aSingleCharIndex];
        if (aSingleChar &&
          aSingleChar.charCodeAt) {

          ptArray.push(aSingleChar.charCodeAt());
        }
      }

      if (ptArray.length === pt.length) {

        ct = twF.encryptCBC(key, ptArray);
        cpt = twF.decryptCBC(key, ct);
        cpt = cpt.splice(0, pt.length);

        expect(ptArray).toEqual(cpt);
      } else {

        expect(false).toEqual(true);
      }
    });

    it('cbc - issue use case #2', function doTestCase() {
      var pt = 'Berlin'
        , ptArray = []
        , ct
        , cpt
        , aSingleChar
        , aSingleCharIndex = 0;

      for (; aSingleCharIndex < pt.length; aSingleCharIndex += 1) {

        aSingleChar = pt[aSingleCharIndex];
        if (aSingleChar &&
          aSingleChar.charCodeAt) {

          ptArray.push(aSingleChar.charCodeAt());
        }
      }

      if (ptArray.length === pt.length) {

        ct = twF.encryptCBC(key, ptArray);
        cpt = twF.decryptCBC(key, ct);
        cpt = cpt.splice(0, pt.length);

        expect(ptArray).toEqual(cpt);
      } else {

        expect(false).toEqual(true);
      }
    });
  });
}(describe, it, expect, twofish));
