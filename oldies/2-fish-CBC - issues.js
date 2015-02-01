'use strict';

/* global describe:false,
    it: false,
    expect: false,
    beforeEach: false,

    twoFish: false
*/

describe('Twofish CBC - issues', function() {
  console.info(' - Start Twofish CBC issues - ');
  var twF
    , IV = [
      180, 106, 2, 96, //b4 6a 02 60
      176, 188, 73, 34, //b0 bc 49 22
      181, 235, 7, 133, //b5 eb 07 85
      164, 183, 204, 158
    ]; //a4 b7 cc 9e;

  beforeEach(function() {
    twF = twoFish(IV);
  });

  it('Issue #1', function() {
    var key = [1, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0]
      , ct = [20, 37, 228, 187, //14 25 e4 bb
        61, 89, 245, 87, //3d 59 f5 57
        52, 175, 38, 58, //34 af 26 3a
        96, 9, 121, 1] //60 09 79 01
      , cpt = twF.decryptCBCMode(key, ct, true)
      , probablePt = [94, 160, 128, 0, //5e a0 80 00
        0, 1, 6, 1, //00 01 06 01
        0, 0, 0, 0, //00 00 00 00
        0, 232, 28, 0]; //00 e8 1c 00

    console.info('Key:', key,
      '-\r\nProbable Plaint Text:', probablePt,
      '-\r\nChiper Text:', ct,
      '-\r\nChipered Plaint Text:', cpt);
    expect(probablePt).toEqual(cpt);
  });
});
