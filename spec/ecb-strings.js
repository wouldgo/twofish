/*global describe it expect twofish*/
(function doTest(describe, it, expect, twofish){
  'use strict';

  describe('ECB - strings', function doTestSuite() {

    var twF = twofish()
      , testCase = function doTestCase(aKey, aPt) {

          var key = twF.stringToByteArray(aKey)
            , pt = twF.stringToByteArray(aPt)
            , ct = twF.encrypt(key, pt)
            , cpt = twF.decrypt(key, ct);

          expect(pt).toEqual(cpt);
        }
      , checkEquality = function checkEquality(aKey, aPt) {

          var key = twF.stringToByteArray(aKey)
            , pt = twF.stringToByteArray(aPt)
            , ct = twF.encrypt(key, pt)
            , firstArr = ct.slice(0, 16)
            , secondArr = ct.slice(16, 32);

          expect(firstArr).toEqual(secondArr);
        }
      , tests = [
          {'testName': '6 char length key - single simple character', 'key': 'secret', 'pt': 'A'},
          {'testName': '6 char length key - multiple simple characters', 'key': 'secret', 'pt': 'Super secret message!'},
          {'testName': '6 char length key - single "esotic" character', 'key': 'secret', 'pt': '☭'},
          {'testName': '6 char length key - multiple "esotic" characters', 'key': 'secret', 'pt': '☢€  ☂ ڴ!'},
          {'testName': '8 char length key - single simple character', 'key': 'secret12', 'pt': 'A'},
          {'testName': '8 char length key - multiple simple characters', 'key': 'secret12', 'pt': 'Sunday monday, happy days!'},
          {'testName': '8 char length key - single "esotic" character', 'key': 'secret12', 'pt': '☂'},
          {'testName': '8 char length key - multiple "esotic" characters', 'key': 'secret12', 'pt': '☭☢€  ☂ ڴ'},
          {'testName': '13 char length key - single simple character', 'key': 'anothersecret', 'pt': 'A'},
          {'testName': '13 char length key - multiple simple characters', 'key': 'anothersecret', 'pt': 'Super secret message!'},
          {'testName': '13 char length key - single "esotic" character', 'key': 'anothersecret', 'pt': '☭'},
          {'testName': '13 char length key - multiple "esotic" characters', 'key': 'anothersecret', 'pt': '☢€  ☂ ڴ!'},
          {'testName': '6 char length key - multiple simple characters', 'key': 'secret', 'pt': 'Super secret message!'},
          {'testName': '6 char length key - single "esotic" character', 'key': 'secret', 'pt': '☭'},
          {'testName': '6 char length key - multiple "esotic" characters', 'key': 'secret', 'pt': '☢€  ☂ ڴ!'},
          {'testName': '8 char length key - single simple character', 'key': 'secret12', 'pt': 'A'},
          {'testName': '8 char length key - multiple simple characters', 'key': 'secret12', 'pt': 'Sunday monday, happy days!'},
          {'testName': '8 char length key - single "esotic" character', 'key': 'secret12', 'pt': '☂'},
          {'testName': '8 char length key - multiple "esotic" characters', 'key': 'secret12', 'pt': '☭☢€  ☂ ڴ'},
          {'testName': '13 char length key - single simple character', 'key': 'anothersecret', 'pt': 'A'},
          {'testName': '13 char length key - multiple simple characters', 'key': 'anothersecret', 'pt': 'Super secret message!'},
          {'testName': '13 char length key - single "esotic" character', 'key': 'anothersecret', 'pt': '☭'},
          {'testName': '13 char length key - multiple "esotic" characters', 'key': 'anothersecret', 'pt': '☢€  ☂ ڴ!'},
          {'testName': '37 char length key - single simple character', 'key': 'A Super secret that can not be stolen', 'pt': 'A'},
          {'testName': '37 char length key - multiple simple characters', 'key': 'A Super secret that can not be stolen', 'pt': 'Sunday monday, happy days!'},
          {'testName': '37 char length key - single "esotic" character', 'key': 'A Super secret that can not be stolen', 'pt': '☂'},
          {'testName': '37 char length key - multiple "esotic" characters', 'key': 'A Super secret that can not be stolen', 'pt': '☭☢€  ☂ ڴ'},
          {'testName': '24 char length key - 32 characters', 'key': 'supasecret11oneoneeleven', 'pt': 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'},
          {'testName': '24 char length key - 32 characters (2)', 'key': 'supasecret11oneoneeleven', 'pt': 'ABCDABCDABCDABCDABCDABCDABCDABCD'},
          {'testName': '37 char length key - single simple character', 'key': 'A Super secret that can not be stolen', 'pt': 'A'},
          {'testName': '37 char length key - multiple simple characters', 'key': 'A Super secret that can not be stolen', 'pt': 'Sunday monday, happy days!'},
          {'testName': '37 char length key - single "esotic" character', 'key': 'A Super secret that can not be stolen', 'pt': '☂'},
          {'testName': '37 char length key - multiple "esotic" characters', 'key': 'A Super secret that can not be stolen', 'pt': '☭☢€  ☂ ڴ'},
          {'testName': '24 char length key - 32 characters', 'key': 'supasecret11oneoneeleven', 'pt': 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'},
          {'testName': '24 char length key - 32 characters (2)', 'key': 'supasecret11oneoneeleven', 'pt': 'ABCDABCDABCDABCDABCDABCDABCDABCD'}
        ]
      , testsLength = tests.length
      , testIndex = 0
      , aTest;

    for (; testIndex < testsLength; testIndex += 1) {

      aTest = tests[testIndex];
      if (aTest) {

        it(aTest.testName, testCase.bind(this, aTest.key, aTest.pt));
        if (aTest.testName.indexOf('32 characters') >= 0) {

          it('first 16 not equals to second 16', checkEquality.bind(this, aTest.key, aTest.pt));
        }
      }
    }
  });
}(describe, it, expect, twofish));
