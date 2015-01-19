(function(exports){
  'use strict';

  function RNG(seed) {
    this.m = 0x80000000; // 2**31;
    this.a = 1103515245;
    this.c = 12345;

    this.state = seed ? seed : Math.floor(Math.random() * (this.m-1));
  }

  RNG.prototype.nextInt = function() {
    this.state = (this.a * this.state + this.c) % this.m;
    return this.state;
  };

  RNG.prototype.nextFloat = function() {
    // returns in range [0,1]
    return this.nextInt() / (this.m - 1);
  };

  RNG.prototype.nextRange = function(start, end) {
    // returns in range [start, end): including start, excluding end
    // can't modulo nextInt because of weak randomness in lower bits
    var rangeSize = end - start;
    var randomUnder1 = this.nextInt() / this.m;
    return start + Math.floor(randomUnder1 * rangeSize);
  };

  RNG.prototype.choice = function(array) {
    return array[this.nextRange(0, array.length)];
  };

  function functionUtils() {
    var isAnArray = function(someVar) {
      if( Object.prototype.toString.call( someVar ) === '[object Array]' ||
          Object.prototype.toString.call( someVar ) === '[object Uint8Array]') {
        return true;
      } else {
        return false;
      }
    }
    , areEqual = function(first, second) {
      var firstLength = first.length,
        secondLength = second.length;

      if (firstLength > secondLength) {
        var diffFirstToSecond = firstLength - secondLength;
        for (; diffFirstToSecond >= 0; diffFirstToSecond -= 1) {
          if (first[firstLength - diffFirstToSecond]) {
            return false;
          }
        }
      } else if (secondLength > firstLength) {
        var diffSecondToFirst = secondLength - firstLength;
        for (; diffSecondToFirst >= 0; diffSecondToFirst -= 1) {
          if (second[secondLength - diffSecondToFirst]) {
            return false;
          }
        }
      }

      for (var i = 0; i < firstLength; i += 1) {
        if (first[i] !== second[i]) {
          return false;
        }
      }
      return true;
    }
    /*\
    |*|
    |*|  Base64 / binary data / UTF-8 strings utilities
    |*|
    |*|  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Base64_encoding_and_decoding
    |*|
    \*/

    /* UTF-8 array to DOMString and vice versa */
    , UTF8ArrToStr = function(aBytes) {
      var sView = '';

      for (var nPart, nLen = aBytes.length, nIdx = 0; nIdx < nLen; nIdx += 1) {

        nPart = aBytes[nIdx];
        /*jshint -W016 */
        sView += String.fromCharCode(
          nPart > 251 && nPart < 254 && nIdx + 5 < nLen ? /* six bytes */
            /* (nPart - 252 << 32) is not possible in ECMAScript! So...: */
            (nPart - 252) * 1073741824 + (aBytes[++nIdx] - 128 << 24) + (aBytes[++nIdx] - 128 << 18) + (aBytes[++nIdx] - 128 << 12) + (aBytes[++nIdx] - 128 << 6) + aBytes[++nIdx] - 128
          : nPart > 247 && nPart < 252 && nIdx + 4 < nLen ? /* five bytes */
            (nPart - 248 << 24) + (aBytes[++nIdx] - 128 << 18) + (aBytes[++nIdx] - 128 << 12) + (aBytes[++nIdx] - 128 << 6) + aBytes[++nIdx] - 128
          : nPart > 239 && nPart < 248 && nIdx + 3 < nLen ? /* four bytes */
            (nPart - 240 << 18) + (aBytes[++nIdx] - 128 << 12) + (aBytes[++nIdx] - 128 << 6) + aBytes[++nIdx] - 128
          : nPart > 223 && nPart < 240 && nIdx + 2 < nLen ? /* three bytes */
            (nPart - 224 << 12) + (aBytes[++nIdx] - 128 << 6) + aBytes[++nIdx] - 128
          : nPart > 191 && nPart < 224 && nIdx + 1 < nLen ? /* two bytes */
            (nPart - 192 << 6) + aBytes[++nIdx] - 128
          : /* nPart < 127 ? */ /* one byte */
            nPart
        );
        /*jshint +W016 */
      }

      return sView;
    }
    , strToUTF8Arr = function(sDOMStr) {
      var aBytes
        , nChr
        , nStrLen = sDOMStr.length
        , nArrLen = 0;

      /* mapping... */

      for (var nMapIdx = 0; nMapIdx < nStrLen; nMapIdx += 1) {

        nChr = sDOMStr.charCodeAt(nMapIdx);
        nArrLen += nChr < 0x80 ? 1 : nChr < 0x800 ? 2 : nChr < 0x10000 ? 3 : nChr < 0x200000 ? 4 : nChr < 0x4000000 ? 5 : 6;
      }

      aBytes = new Uint8Array(nArrLen);

      /* transcription... */

      for (var nIdx = 0, nChrIdx = 0; nIdx < nArrLen; nChrIdx += 1) {

        nChr = sDOMStr.charCodeAt(nChrIdx);
        /*jshint -W016 */
        if (nChr < 128) {

          /* one byte */
          aBytes[nIdx++] = nChr;
        } else if (nChr < 0x800) {

          /* two bytes */
          aBytes[nIdx++] = 192 + (nChr >>> 6);
          aBytes[nIdx++] = 128 + (nChr & 63);
        } else if (nChr < 0x10000) {

          /* three bytes */
          aBytes[nIdx++] = 224 + (nChr >>> 12);
          aBytes[nIdx++] = 128 + (nChr >>> 6 & 63);
          aBytes[nIdx++] = 128 + (nChr & 63);
        } else if (nChr < 0x200000) {

          /* four bytes */
          aBytes[nIdx++] = 240 + (nChr >>> 18);
          aBytes[nIdx++] = 128 + (nChr >>> 12 & 63);
          aBytes[nIdx++] = 128 + (nChr >>> 6 & 63);
          aBytes[nIdx++] = 128 + (nChr & 63);
        } else if (nChr < 0x4000000) {

          /* five bytes */
          aBytes[nIdx++] = 248 + (nChr >>> 24);
          aBytes[nIdx++] = 128 + (nChr >>> 18 & 63);
          aBytes[nIdx++] = 128 + (nChr >>> 12 & 63);
          aBytes[nIdx++] = 128 + (nChr >>> 6 & 63);
          aBytes[nIdx++] = 128 + (nChr & 63);
        } else /* if (nChr <= 0x7fffffff) */ {

          /* six bytes */
          aBytes[nIdx++] = 252 + /* (nChr >>> 32) is not possible in ECMAScript! So...: */ (nChr / 1073741824);
          aBytes[nIdx++] = 128 + (nChr >>> 24 & 63);
          aBytes[nIdx++] = 128 + (nChr >>> 18 & 63);
          aBytes[nIdx++] = 128 + (nChr >>> 12 & 63);
          aBytes[nIdx++] = 128 + (nChr >>> 6 & 63);
          aBytes[nIdx++] = 128 + (nChr & 63);
        }
        /*jshint +W016 */
      }

      return aBytes;
    };

    return {
      isAnArray : isAnArray,
      areEqual : areEqual,
      stringToUTF8Array : strToUTF8Arr,
      utf8ArrayToString : UTF8ArrToStr
    };
  }

  exports.twoFish = function(IV) {
    var utils = functionUtils()
    , rng = new RNG()
    , initializingVector = []
    // S-boxes
    , P0 = new Uint8Array([
      0xA9, 0x67, 0xB3, 0xE8,
      0x04, 0xFD, 0xA3, 0x76,
      0x9A, 0x92, 0x80, 0x78,
      0xE4, 0xDD, 0xD1, 0x38,
      0x0D, 0xC6, 0x35, 0x98,
      0x18, 0xF7, 0xEC, 0x6C,
      0x43, 0x75, 0x37, 0x26,
      0xFA, 0x13, 0x94, 0x48,
      0xF2, 0xD0, 0x8B, 0x30,
      0x84, 0x54, 0xDF, 0x23,
      0x19, 0x5B, 0x3D, 0x59,
      0xF3, 0xAE, 0xA2, 0x82,
      0x63, 0x01, 0x83, 0x2E,
      0xD9, 0x51, 0x9B, 0x7C,
      0xA6, 0xEB, 0xA5, 0xBE,
      0x16, 0x0C, 0xE3, 0x61,
      0xC0, 0x8C, 0x3A, 0xF5,
      0x73, 0x2C, 0x25, 0x0B,
      0xBB, 0x4E, 0x89, 0x6B,
      0x53, 0x6A, 0xB4, 0xF1,
      0xE1, 0xE6, 0xBD, 0x45,
      0xE2, 0xF4, 0xB6, 0x66,
      0xCC, 0x95, 0x03, 0x56,
      0xD4, 0x1C, 0x1E, 0xD7,
      0xFB, 0xC3, 0x8E, 0xB5,
      0xE9, 0xCF, 0xBF, 0xBA,
      0xEA, 0x77, 0x39, 0xAF,
      0x33, 0xC9, 0x62, 0x71,
      0x81, 0x79, 0x09, 0xAD,
      0x24, 0xCD, 0xF9, 0xD8,
      0xE5, 0xC5, 0xB9, 0x4D,
      0x44, 0x08, 0x86, 0xE7,
      0xA1, 0x1D, 0xAA, 0xED,
      0x06, 0x70, 0xB2, 0xD2,
      0x41, 0x7B, 0xA0, 0x11,
      0x31, 0xC2, 0x27, 0x90,
      0x20, 0xF6, 0x60, 0xFF,
      0x96, 0x5C, 0xB1, 0xAB,
      0x9E, 0x9C, 0x52, 0x1B,
      0x5F, 0x93, 0x0A, 0xEF,
      0x91, 0x85, 0x49, 0xEE,
      0x2D, 0x4F, 0x8F, 0x3B,
      0x47, 0x87, 0x6D, 0x46,
      0xD6, 0x3E, 0x69, 0x64,
      0x2A, 0xCE, 0xCB, 0x2F,
      0xFC, 0x97, 0x05, 0x7A,
      0xAC, 0x7F, 0xD5, 0x1A,
      0x4B, 0x0E, 0xA7, 0x5A,
      0x28, 0x14, 0x3F, 0x29,
      0x88, 0x3C, 0x4C, 0x02,
      0xB8, 0xDA, 0xB0, 0x17,
      0x55, 0x1F, 0x8A, 0x7D,
      0x57, 0xC7, 0x8D, 0x74,
      0xB7, 0xC4, 0x9F, 0x72,
      0x7E, 0x15, 0x22, 0x12,
      0x58, 0x07, 0x99, 0x34,
      0x6E, 0x50, 0xDE, 0x68,
      0x65, 0xBC, 0xDB, 0xF8,
      0xC8, 0xA8, 0x2B, 0x40,
      0xDC, 0xFE, 0x32, 0xA4,
      0xCA, 0x10, 0x21, 0xF0,
      0xD3, 0x5D, 0x0F, 0x00,
      0x6F, 0x9D, 0x36, 0x42,
      0x4A, 0x5E, 0xC1, 0xE0
    ])
    , P1 = new Uint8Array([
      0x75, 0xF3, 0xC6, 0xF4,
      0xDB, 0x7B, 0xFB, 0xC8,
      0x4A, 0xD3, 0xE6, 0x6B,
      0x45, 0x7D, 0xE8, 0x4B,
      0xD6, 0x32, 0xD8, 0xFD,
      0x37, 0x71, 0xF1, 0xE1,
      0x30, 0x0F, 0xF8, 0x1B,
      0x87, 0xFA, 0x06, 0x3F,
      0x5E, 0xBA, 0xAE, 0x5B,
      0x8A, 0x00, 0xBC, 0x9D,
      0x6D, 0xC1, 0xB1, 0x0E,
      0x80, 0x5D, 0xD2, 0xD5,
      0xA0, 0x84, 0x07, 0x14,
      0xB5, 0x90, 0x2C, 0xA3,
      0xB2, 0x73, 0x4C, 0x54,
      0x92, 0x74, 0x36, 0x51,
      0x38, 0xB0, 0xBD, 0x5A,
      0xFC, 0x60, 0x62, 0x96,
      0x6C, 0x42, 0xF7, 0x10,
      0x7C, 0x28, 0x27, 0x8C,
      0x13, 0x95, 0x9C, 0xC7,
      0x24, 0x46, 0x3B, 0x70,
      0xCA, 0xE3, 0x85, 0xCB,
      0x11, 0xD0, 0x93, 0xB8,
      0xA6, 0x83, 0x20, 0xFF,
      0x9F, 0x77, 0xC3, 0xCC,
      0x03, 0x6F, 0x08, 0xBF,
      0x40, 0xE7, 0x2B, 0xE2,
      0x79, 0x0C, 0xAA, 0x82,
      0x41, 0x3A, 0xEA, 0xB9,
      0xE4, 0x9A, 0xA4, 0x97,
      0x7E, 0xDA, 0x7A, 0x17,
      0x66, 0x94, 0xA1, 0x1D,
      0x3D, 0xF0, 0xDE, 0xB3,
      0x0B, 0x72, 0xA7, 0x1C,
      0xEF, 0xD1, 0x53, 0x3E,
      0x8F, 0x33, 0x26, 0x5F,
      0xEC, 0x76, 0x2A, 0x49,
      0x81, 0x88, 0xEE, 0x21,
      0xC4, 0x1A, 0xEB, 0xD9,
      0xC5, 0x39, 0x99, 0xCD,
      0xAD, 0x31, 0x8B, 0x01,
      0x18, 0x23, 0xDD, 0x1F,
      0x4E, 0x2D, 0xF9, 0x48,
      0x4F, 0xF2, 0x65, 0x8E,
      0x78, 0x5C, 0x58, 0x19,
      0x8D, 0xE5, 0x98, 0x57,
      0x67, 0x7F, 0x05, 0x64,
      0xAF, 0x63, 0xB6, 0xFE,
      0xF5, 0xB7, 0x3C, 0xA5,
      0xCE, 0xE9, 0x68, 0x44,
      0xE0, 0x4D, 0x43, 0x69,
      0x29, 0x2E, 0xAC, 0x15,
      0x59, 0xA8, 0x0A, 0x9E,
      0x6E, 0x47, 0xDF, 0x34,
      0x35, 0x6A, 0xCF, 0xDC,
      0x22, 0xC9, 0xC0, 0x9B,
      0x89, 0xD4, 0xED, 0xAB,
      0x12, 0xA2, 0x0D, 0x52,
      0xBB, 0x02, 0x2F, 0xA9,
      0xD7, 0x61, 0x1E, 0xB4,
      0x50, 0x04, 0xF6, 0xC2,
      0x16, 0x25, 0x86, 0x56,
      0x55, 0x09, 0xBE, 0x91
    ])
    , P = [P0, P1]
    , BLOCK_SIZE = 16
    , ROUNDS = 16
    , SK_STEP = 0x02020202
    , SK_BUMP = 0x01010101
    , SK_ROTL = 9
    , INPUT_WHITEN = 0
    , OUTPUT_WHITEN = INPUT_WHITEN +  BLOCK_SIZE/4
    , ROUND_SUBKEYS = OUTPUT_WHITEN + BLOCK_SIZE/4; // 2*(# rounds)

    if (!IV) {

      for (var d = 0; d < BLOCK_SIZE; d += 1) {

        initializingVector.push(rng.nextRange(0, 256));
      }
    } else if (IV &&
      utils.isAnArray(IV) && IV.length === BLOCK_SIZE) {

      initializingVector = new Uint8Array(IV);
    } else if (IV &&
      utils.isAnArray(IV) &&
      IV.length < BLOCK_SIZE) {

      var initialLength = IV.length;
      for (var paddingIndex = 0; paddingIndex < BLOCK_SIZE - initialLength; paddingIndex += 1) {

        IV.push(rng.nextRange(0, 256));
      }
      initializingVector = new Uint8Array(IV);
    } else if (IV &&
      utils.isAnArray(IV) &&
      IV.length > BLOCK_SIZE) {

      initializingVector = new Uint8Array(IV.slice(0, BLOCK_SIZE));
    } else if (!IV ||
        !utils.isAnArray(IV) ||
        (IV.length < 16 || IV.length > 16)) {

      throw 'Initlializing vector incorrect';
    }
    initializingVector = new Uint8Array(initializingVector);


    // Fixed p0/p1 permutations used in S-box lookup.
    // Change the following constant definitions, then S-boxes will automatically get changed.
    var P_00 = 1
    , P_01 = 0
    , P_02 = 0
    , P_03 = P_01 ^ 1
    , P_04 = 1

    , P_10 = 0
    , P_11 = 0
    , P_12 = 1
    , P_13 = P_11 ^ 1
    , P_14 = 0

    , P_20 = 1
    , P_21 = 1
    , P_22 = 0
    , P_23 = P_21 ^ 1
    , P_24 = 0

    , P_30 = 0
    , P_31 = 1
    , P_32 = 1
    , P_33 = P_31 ^ 1
    , P_34 = 1

    , GF256_FDBK_2 = 0x169 / 2
    , GF256_FDBK_4 = 0x169 / 4
    , RS_GF_FDBK = 0x14D

    , LFSR1 = function(x) {
      return (x >> 1) ^
        ((x & 0x01) !== 0 ? GF256_FDBK_2 : 0);
    }
    , LFSR2 = function(x) {
      return (x >> 2) ^
        ((x & 0x02) !== 0 ? GF256_FDBK_2 : 0) ^
        ((x & 0x01) !== 0 ? GF256_FDBK_4 : 0);
    }
    , mxX = function(x) {
      return x ^
        LFSR2(x);
    }
    , mxY = function(x) {
      return x ^
        LFSR1(x) ^
        LFSR2(x);
    }
    , MDS = (function() {
      var localMDS = [[],[],[],[]]
        , m1 = []
        , mX = []
        , mY = []
        , i
        , j;
      for (i = 0; i < 256; i += 1) {
        j = P[0][i] & 0xFF;
        m1[0] = j;
        mX[0] = mxX(j) & 0xFF;
        mY[0] = mxY(j) & 0xFF;

        j = P[1][i] & 0xFF;
        m1[1] = j;
        mX[1] = mxX(j) & 0xFF;
        mY[1] = mxY(j) & 0xFF;

        localMDS[0][i] = m1[P_00] <<  0 | mX[P_00] <<  8 | mY[P_00] << 16 | mY[P_00] << 24;
        localMDS[1][i] = mY[P_10] <<  0 | mY[P_10] <<  8 | mX[P_10] << 16 | m1[P_10] << 24;
        localMDS[2][i] = mX[P_20] <<  0 | mY[P_20] <<  8 | m1[P_20] << 16 | mY[P_20] << 24;
        localMDS[3][i] = mX[P_30] <<  0 | m1[P_30] <<  8 | mY[P_30] << 16 | mX[P_30] << 24;
      }

      return localMDS;
    }())
    , b0 = function(x) {
      return  x &
        0xFF;
    }
    , b1 = function(x) {
      return (x >>> 8) &
        0xFF;
    }
    , b2 = function(x) {
      return (x >>> 16) &
        0xFF;
    }
    , b3 = function(x) {
      return (x >>> 24) &
        0xFF;
    }
    , _b = function(x, N) {
      var result = 0;
      switch (N%4) {
      case 0:
        result = b0(x);
        break;
      case 1:
        result = b1(x);
        break;
      case 2:
        result = b2(x);
        break;
      case 3:
        result = b3(x);
        break;
      }
      return result;
    }
    , rsRem = function(x) {
      var b  = (x >>> 24) &
                0xFF
        , g2 = ((b << 1) ^
                ((b & 0x80) !== 0 ? RS_GF_FDBK : 0)) &
                0xFF
        , g3 = (b >>> 1) ^
                ((b & 0x01) !== 0 ? (RS_GF_FDBK >>> 1) : 0 ) ^
                g2
        , result = (x << 8) ^
                    (g3 << 24) ^
                    (g2 << 16) ^
                    (g3 << 8) ^ b;
      return new Uint32Array([result])[0];
    }
    , rsMDSEncode = function(k0, k1) {
      var realK0 = k0[0]
        , realK1 = k1[0];

      for (var i = 0; i < 4; i += 1) {
        realK1 = rsRem(realK1);
      }
      realK1 ^= realK0;
      for (var d = 0; d < 4; d += 1) {
        realK1 = rsRem(realK1);
      }

      return new Uint32Array([realK1])[0];
    }
    , F32 = function(k64Cnt, x, k32 ) {
      var realK64Cnt = k64Cnt[0]
        , realX = x[0]
        , lB0 = b0(realX)
        , lB1 = b1(realX)
        , lB2 = b2(realX)
        , lB3 = b3(realX)
        , k0 = k32[0]
        , k1 = k32[1]
        , k2 = k32[2]
        , k3 = k32[3]
        , result = 0;

      switch (realK64Cnt & 3) {
      case 1:
        result = MDS[0][(P[P_01][lB0] & 0xFF) ^ b0(k0)] ^
                 MDS[1][(P[P_11][lB1] & 0xFF) ^ b1(k0)] ^
                 MDS[2][(P[P_21][lB2] & 0xFF) ^ b2(k0)] ^
                 MDS[3][(P[P_31][lB3] & 0xFF) ^ b3(k0)];
        break;
      case 0:  // same as 4
        lB0 = (P[P_04][lB0] & 0xFF) ^ b0(k3);
        lB1 = (P[P_14][lB1] & 0xFF) ^ b1(k3);
        lB2 = (P[P_24][lB2] & 0xFF) ^ b2(k3);
        lB3 = (P[P_34][lB3] & 0xFF) ^ b3(k3);
        /* falls through */
      case 3:
        lB0 = (P[P_03][lB0] & 0xFF) ^ b0(k2);
        lB1 = (P[P_13][lB1] & 0xFF) ^ b1(k2);
        lB2 = (P[P_23][lB2] & 0xFF) ^ b2(k2);
        lB3 = (P[P_33][lB3] & 0xFF) ^ b3(k2);
        /* falls through */
      case 2:
        result = MDS[0][(P[P_01][(P[P_02][lB0] & 0xFF) ^ b0(k1)] & 0xFF) ^ b0(k0)] ^
                 MDS[1][(P[P_11][(P[P_12][lB1] & 0xFF) ^ b1(k1)] & 0xFF) ^ b1(k0)] ^
                 MDS[2][(P[P_21][(P[P_22][lB2] & 0xFF) ^ b2(k1)] & 0xFF) ^ b2(k0)] ^
                 MDS[3][(P[P_31][(P[P_32][lB3] & 0xFF) ^ b3(k1)] & 0xFF) ^ b3(k0)];
        break;
      }

      return new Uint32Array([result])[0];
    }
    , fe32 = function(sBox, x, R) {
      var toReturn = sBox[2*_b(x, R)] ^
                     sBox[2*_b(x, R+1)+1] ^
                     sBox[0x200 + 2*_b(x, R+2)] ^
                     sBox[0x200 + 2*_b(x, R+3)+1];

      return new Uint32Array([toReturn])[0];
    }
    , xorBuffers = function(a, b) {
      var res = [];

      if (a && b &&
        utils.isAnArray(a) && utils.isAnArray(b) &&
        a.length !== b.length) {
        throw 'Buffer length must be equal';
      }
      a = new Uint8Array(a);
      b = new Uint8Array(b);

      for (var i = 0; i < a.length; i += 1) {
        res[i] = (a[i] ^ b[i]) & 0xFF;
      }

      return new Uint8Array(res);
    };

    var makeKey = function(aKey) {
      if (aKey && utils.isAnArray(aKey)) {

        var keyLenght = aKey.length;
        if (keyLenght < 8 ||
            (keyLenght > 8 && keyLenght < 16) ||
            (keyLenght > 16 && keyLenght < 24) ||
            (keyLenght > 24 && keyLenght < 32)) {

          var tmpKey = [];
          for (var d = 0; d < aKey.length + (8 - aKey.length); d += 1) {

            var nValue = aKey[d];
            if (nValue !== undefined) {

              tmpKey.push(nValue);
            } else {

              tmpKey.push(0x00);
            }
          }
          aKey = tmpKey;
        } else if (keyLenght > 32) {

          var limitedKey = [];
          for (var limitIndex = 0; limitIndex < 32; limitIndex += 1) {

            limitedKey.push(aKey[limitIndex]);
          }
          aKey = limitedKey;
        }
        aKey = new Uint8Array(aKey);
        keyLenght = aKey.length;

        var k64Cnt = keyLenght / 8
          , subkeyCnt = ROUND_SUBKEYS + 2*ROUNDS
          , k32e = []
          , k32o = []
          , sBoxKey = []
          , i
          , j
          , offset = 0
          , q
          , A
          , B
          , subKeys = []
          , lB0
          , lB1
          , lB2
          , lB3
          , sBox = [];

        for (i = 0, j = k64Cnt-1; i < 4 && offset < keyLenght; i += 1, j -= 1) {
          k32e[i] = (aKey[offset += 1] & 0xFF) | (aKey[offset += 1] & 0xFF) <<  8 | (aKey[offset += 1] & 0xFF) << 16 | (aKey[offset += 1] & 0xFF) << 24;
          k32o[i] = (aKey[offset += 1] & 0xFF) | (aKey[offset += 1] & 0xFF) <<  8 | (aKey[offset += 1] & 0xFF) << 16 | (aKey[offset += 1] & 0xFF) << 24;
          sBoxKey[j] = rsMDSEncode(new Uint32Array([k32e[i]]), new Uint32Array([k32o[i]]));
        }
        sBoxKey = new Uint32Array(sBoxKey);

        for (i = q = 0; i < subkeyCnt/2; i += 1, q += SK_STEP) {
          A = F32(new Uint32Array([k64Cnt]), new Uint32Array([q]), new Uint32Array([k32e]));
          B = F32(new Uint32Array([k64Cnt]), new Uint32Array([q+SK_BUMP]), new Uint32Array([k32o]));
          B = B << 8 | B >>> 24;
          A += B;
          subKeys[2*i] = A;
          A += B;
          subKeys[2*i + 1] = A << SK_ROTL | A >>> (32-SK_ROTL);
        }
        subKeys = new Uint32Array(subKeys);

        var k0 = sBoxKey[0]
          , k1 = sBoxKey[1]
          , k2 = sBoxKey[2]
          , k3 = sBoxKey[3];

        for (i = 0; i < 256; i += 1) {
          lB0 = lB1 = lB2 = lB3 = i;
          switch (k64Cnt & 3) {
          case 1:
            sBox[2*i]         = MDS[0][(P[P_01][lB0] & 0xFF) ^ b0(k0)];
            sBox[2*i+1]       = MDS[1][(P[P_11][lB1] & 0xFF) ^ b1(k0)];
            sBox[0x200+2*i]   = MDS[2][(P[P_21][lB2] & 0xFF) ^ b2(k0)];
            sBox[0x200+2*i+1] = MDS[3][(P[P_31][lB3] & 0xFF) ^ b3(k0)];
            break;
          case 0:
            lB0 = (P[P_04][lB0] & 0xFF) ^ b0(k3);
            lB1 = (P[P_14][lB1] & 0xFF) ^ b1(k3);
            lB2 = (P[P_24][lB2] & 0xFF) ^ b2(k3);
            lB3 = (P[P_34][lB3] & 0xFF) ^ b3(k3);
            /* falls through */
          case 3:
            lB0 = (P[P_03][lB0] & 0xFF) ^ b0(k2);
            lB1 = (P[P_13][lB1] & 0xFF) ^ b1(k2);
            lB2 = (P[P_23][lB2] & 0xFF) ^ b2(k2);
            lB3 = (P[P_33][lB3] & 0xFF) ^ b3(k2);
            /* falls through */
          case 2:
            sBox[2*i]         = MDS[0][(P[P_01][(P[P_02][lB0] & 0xFF) ^ b0(k1)] & 0xFF) ^ b0(k0)];
            sBox[2*i+1]       = MDS[1][(P[P_11][(P[P_12][lB1] & 0xFF) ^ b1(k1)] & 0xFF) ^ b1(k0)];
            sBox[0x200+2*i]   = MDS[2][(P[P_21][(P[P_22][lB2] & 0xFF) ^ b2(k1)] & 0xFF) ^ b2(k0)];
            sBox[0x200+2*i+1] = MDS[3][(P[P_31][(P[P_32][lB3] & 0xFF) ^ b3(k1)] & 0xFF) ^ b3(k0)];
          }
        }

        return [new Uint32Array(sBox), subKeys];
      } else {
        throw 'key passed is undefined or not an array';
      }
    };

    var blockEncrypt = function(input, inOffset, sessionKey) {
      if (input && sessionKey && utils.isAnArray(sessionKey) && utils.isAnArray(input)) {
        input = new Uint8Array(input);
        var sBox = sessionKey[0]
          , sKey = sessionKey[1];

        var x0 = (input[inOffset] & 0xFF) |
                 (input[inOffset += 1] & 0xFF) <<  8 |
                 (input[inOffset += 1] & 0xFF) << 16 |
                 (input[inOffset += 1] & 0xFF) << 24

          , x1 = (input[inOffset += 1] & 0xFF) |
                 (input[inOffset += 1] & 0xFF) <<  8 |
                 (input[inOffset += 1] & 0xFF) << 16 |
                 (input[inOffset += 1] & 0xFF) << 24

          , x2 = (input[inOffset += 1] & 0xFF) |
                 (input[inOffset += 1] & 0xFF) <<  8 |
                 (input[inOffset += 1] & 0xFF) << 16 |
                 (input[inOffset += 1] & 0xFF) << 24

          , x3 = (input[inOffset += 1] & 0xFF) |
                 (input[inOffset += 1] & 0xFF) <<  8 |
                 (input[inOffset += 1] & 0xFF) << 16 |
                 (input[inOffset += 1] & 0xFF) << 24;

        x0 ^= sKey[INPUT_WHITEN];
        x1 ^= sKey[INPUT_WHITEN + 1];
        x2 ^= sKey[INPUT_WHITEN + 2];
        x3 ^= sKey[INPUT_WHITEN + 3];

        var t0
          , t1
          , k = ROUND_SUBKEYS;

        for (var R = 0; R < ROUNDS; R += 2) {
          t0 = fe32(sBox, x0, 0);
          t1 = fe32(sBox, x1, 3);
          /*jshint -W016 */
          x2 ^= t0 + t1 + sKey[k++];
          /*jshint +W016 */
          x2 = x2 >>> 1 | x2 << 31;
          x3 = x3 << 1 | x3 >>> 31;
          /*jshint -W016 */
          x3 ^= t0 + 2*t1 + sKey[k++];
          /*jshint +W016 */

          t0 = fe32(sBox, x2, 0);
          t1 = fe32(sBox, x3, 3);
          /*jshint -W016 */
          x0 ^= t0 + t1 + sKey[k++];
          /*jshint +W016 */
          x0 = x0 >>> 1 | x0 << 31;
          x1 = x1 << 1 | x1 >>> 31;
          /*jshint -W016 */
          x1 ^= t0 + 2*t1 + sKey[k++];
          /*jshint +W016 */
        }

        x2 ^= sKey[OUTPUT_WHITEN];
        x3 ^= sKey[OUTPUT_WHITEN + 1];
        x0 ^= sKey[OUTPUT_WHITEN + 2];
        x1 ^= sKey[OUTPUT_WHITEN + 3];

        return new Uint8Array(
          [ x2, (x2 >>> 8), (x2 >>> 16), (x2 >>> 24),
            x3, (x3 >>> 8), (x3 >>> 16), (x3 >>> 24),
            x0, (x0 >>> 8), (x0 >>> 16), (x0 >>> 24),
            x1, (x1 >>> 8), (x1 >>> 16), (x1 >>> 24)
          ]);
      } else {
        throw 'input block is not an array or sessionKey is incorrect';
      }
    };

    var blockDecrypt = function(input, inOffset, sessionKey) {
      if (input && sessionKey && utils.isAnArray(sessionKey) && utils.isAnArray(input)) {
        var sBox = sessionKey[0]
          , sKey = sessionKey[1];

        var x2 = (input[inOffset] & 0xFF) |
                 (input[inOffset += 1] & 0xFF) <<  8 |
                 (input[inOffset += 1] & 0xFF) << 16 |
                 (input[inOffset += 1] & 0xFF) << 24

          , x3 = (input[inOffset += 1] & 0xFF) |
                 (input[inOffset += 1] & 0xFF) <<  8 |
                 (input[inOffset += 1] & 0xFF) << 16 |
                 (input[inOffset += 1] & 0xFF) << 24

          , x0 = (input[inOffset += 1] & 0xFF) |
                 (input[inOffset += 1] & 0xFF) <<  8 |
                 (input[inOffset += 1] & 0xFF) << 16 |
                 (input[inOffset += 1] & 0xFF) << 24

          , x1 = (input[inOffset += 1] & 0xFF) |
                 (input[inOffset += 1] & 0xFF) <<  8 |
                 (input[inOffset += 1] & 0xFF) << 16 |
                 (input[inOffset += 1] & 0xFF) << 24;

        x2 ^= sKey[OUTPUT_WHITEN];
        x3 ^= sKey[OUTPUT_WHITEN + 1];
        x0 ^= sKey[OUTPUT_WHITEN + 2];
        x1 ^= sKey[OUTPUT_WHITEN + 3];

        var k = ROUND_SUBKEYS + 2*ROUNDS - 1
          , t0
          , t1;

        for (var R = 0; R < ROUNDS; R += 2) {
          t0 = fe32(sBox, x2, 0);
          t1 = fe32(sBox, x3, 3);
          /*jshint -W016 */
          x1 ^= t0 + 2*t1 + sKey[k--];
          /*jshint +W016 */
          x1 = x1 >>> 1 | x1 << 31;
          x0 = x0 << 1 | x0 >>> 31;
          /*jshint -W016 */
          x0 ^= t0 + t1 + sKey[k--];
          /*jshint +W016 */

          t0 = fe32(sBox, x0, 0);
          t1 = fe32(sBox, x1, 3);
          /*jshint -W016 */
          x3 ^= t0 + 2*t1 + sKey[k--];
          /*jshint +W016 */
          x3  = x3 >>> 1 | x3 << 31;
          x2  = x2 << 1 | x2 >>> 31;
          /*jshint -W016 */
          x2 ^= t0 + t1 + sKey[k--];
          /*jshint +W016 */
        }

        x0 ^= sKey[INPUT_WHITEN];
        x1 ^= sKey[INPUT_WHITEN + 1];
        x2 ^= sKey[INPUT_WHITEN + 2];
        x3 ^= sKey[INPUT_WHITEN + 3];

        return new Uint8Array([
          x0, (x0 >>> 8), (x0 >>> 16), (x0 >>> 24),
          x1, (x1 >>> 8), (x1 >>> 16), (x1 >>> 24),
          x2, (x2 >>> 8), (x2 >>> 16), (x2 >>> 24),
          x3, (x3 >>> 8), (x3 >>> 16), (x3 >>> 24)
        ]);
      } else {
        throw 'input block is not an array or sessionKey is incorrect';
      }
    };

    var encrypt = function(userKey, plainText) {
      var i
        , offset
        , ct = [];

      if (utils.isAnArray(userKey)) {

        userKey = new Uint8Array(userKey);
      } else {

        userKey = utils.stringToUTF8Array(userKey);
      }

      if (utils.isAnArray(plainText)) {

        plainText = new Uint8Array(plainText);
      } else {

        plainText = utils.stringToUTF8Array(plainText);
      }
      userKey = makeKey(userKey);

      for (offset = 0; offset < plainText.length; offset += 16) {

        var tmpBlockEncrypt = blockEncrypt(plainText, offset, userKey);
        for (i = 0; i < tmpBlockEncrypt.length; i += 1) {

          ct.push(tmpBlockEncrypt[i]);
        }
      }

      return ct;
    }
    , decrypt = function(userKey, chiperText, inByte) {
      var i
        , offset
        , cpt = []
        , cptStr = '';

      if (utils.isAnArray(userKey)) {

        userKey = new Uint8Array(userKey);
      } else {

        userKey = utils.stringToUTF8Array(userKey);
      }
      userKey = makeKey(userKey);

      for (offset = 0; offset < chiperText.length; offset += 16) {

        var tmpBlockDecrypt = blockDecrypt(chiperText, offset, userKey);
        for (i = 0; i < tmpBlockDecrypt.length; i += 1) {

          var block = tmpBlockDecrypt[i];
          if (block !== 0x00) {

            cpt.push(block);
          }
        }
      }

      if (inByte) {

        return cpt;
      } else {

        cptStr = utils.utf8ArrayToString(cpt);
        return cptStr;
      }
    }
    , encryptCBC = function(userKey, plainText) {
      if (utils.isAnArray(userKey)) {

        userKey = new Uint8Array(userKey);
      } else {

        userKey = utils.stringToUTF8Array(userKey);
      }

      if (utils.isAnArray(plainText)) {

        plainText = new Uint8Array(plainText);
      } else {

        plainText = utils.stringToUTF8Array(plainText);
      }
      userKey = makeKey(userKey);

      var result = []
        , loops = plainText.length / BLOCK_SIZE
        , pos = 0
        , cBuffer = []
        , buffer1 = []
        , buffer2 = []
        , vector = initializingVector;

      for (var i = 0; i < loops; i += 1) {

        cBuffer = plainText.subarray(pos, pos + BLOCK_SIZE);
        if (cBuffer.length < BLOCK_SIZE) {

          var tmpCBuffer = [];
          for (var paddingIndex = 0; paddingIndex < BLOCK_SIZE; paddingIndex += 1) {

            var nVal = cBuffer[paddingIndex];
            if (nVal !== undefined) {

              tmpCBuffer.push(nVal);
            } else {

              tmpCBuffer.push(0x00);
            }
          }
          cBuffer = tmpCBuffer;
        }
        buffer1 = xorBuffers(cBuffer, vector);
        buffer2 = blockEncrypt(buffer1, 0, userKey);

        for (var d = pos; d < buffer2.length + pos; d += 1) {

          var position = d - pos;
          if (buffer2[position] !== undefined) {

            result.splice(d, 0, buffer2[position]);
          }
        }
        vector = buffer2;
        pos += BLOCK_SIZE;
      }
      return result;
    }
    , decryptCBC = function(userKey, chiperText, inByte) {
      if (utils.isAnArray(userKey)) {

        userKey = new Uint8Array(userKey);
      } else {

        userKey = utils.stringToUTF8Array(userKey);
      }
      userKey = makeKey(userKey);

      var result = []
        , loops = chiperText.length / BLOCK_SIZE
        , pos = 0
        , cBuffer = []
        , buffer1 = []
        , plain = []
        , vector = initializingVector
        , resultStr;

      for (var i = 0; i < loops; i += 1) {

        cBuffer = chiperText.slice(pos, pos + BLOCK_SIZE);
        if (cBuffer.length < BLOCK_SIZE) {

          var tmpCBuffer = [];
          for (var paddingIndex = 0; paddingIndex < BLOCK_SIZE; paddingIndex += 1) {

            var nVal = cBuffer[paddingIndex];
            if (nVal !== undefined) {

              tmpCBuffer.push(nVal);
            } else {

              tmpCBuffer.push(0x00);
            }
          }
          cBuffer = tmpCBuffer;
        }
        buffer1 = blockDecrypt(cBuffer, 0, userKey);
        plain = xorBuffers(buffer1, vector);

        for (var d = pos; d < plain.length + pos; d += 1) {

          var position = d - pos;
          if (plain[position]) {

            result.splice(d, 0, plain[position]);
          }
        }
        plain = [];
        vector = cBuffer;

        pos += BLOCK_SIZE;
      }

      if (inByte) {

        return result;
      } else {

        resultStr = utils.utf8ArrayToString(result);
        return resultStr;
      }
    };

    return {

      encrypt : encrypt,
      decrypt : decrypt,
      encryptCBCMode : encryptCBC,
      decryptCBCMode : decryptCBC
    };
  };

})(typeof exports === 'undefined' ? this : exports);
