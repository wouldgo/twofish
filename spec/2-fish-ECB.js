'use strict';

/* global describe:false,
    it: false,
    beforeEach: false,
    expect: false,

    functionUtils: false,
    twoFishECB: false
*/

describe('Twofish ECB', function() {
  var twoFish
    , utils = functionUtils();

  beforeEach(function() {
    twoFish = twoFishECB();
  });

  it('should encrypt and then decrypt, receiving the same result as input (8 char length key)', function() {
    var ct = twoFish.encrypt('secret12', 'A')
      , cpt = twoFish.decrypt('secret12', ct)
      , ok = utils.areEqual('A', cpt);

    expect(ok).toEqual(true);
  });

  it('should encrypt and then decrypt, receiving the same result as input (6 char length key)', function() {
    var ct = twoFish.encrypt('secret', 'A')
      , cpt = twoFish.decrypt('secret', ct)
      , ok = utils.areEqual('A', cpt);

    expect(ok).toEqual(true);
  });
});
