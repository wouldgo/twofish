function twoFish() {
  var isAnArray = function(someVar) {
    if( Object.prototype.toString.call( someVar ) === '[object Array]' ) {
      return true;
    } else {
      return false;
    };
  };

  // Fixed 8x8 permutation S-boxex
  var P = [
    [ // p0
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
    ],
    [ // p1
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
    ]
  ]
  , ALGORITHM = 'Twofish'
  , VERSION = 0.2
  , BLOCK_SIZE = 16 // bytes in a data-block
  , ROUNDS = 16
  , MAX_ROUNDS = 16 // max # rounds (for allocating subkeys)
  , SK_STEP = 0x02020202
  , SK_BUMP = 0x01010101
  , SK_ROTL = 9
  , INPUT_WHITEN = 0
  , OUTPUT_WHITEN = INPUT_WHITEN +  BLOCK_SIZE/4
  , ROUND_SUBKEYS = OUTPUT_WHITEN + BLOCK_SIZE/4 // 2*(# rounds)
  , TOTAL_SUBKEYS = ROUND_SUBKEYS + 2*MAX_ROUNDS;

  // Define the fixed p0/p1 permutations used in keyed S-box lookup.
  // By changing the following constant definitions, the S-boxes will automatically get changed in the Twofish engine.
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

  , GF256_FDBK = 0x169
  , GF256_FDBK_2 = 0x169 / 2
  , GF256_FDBK_4 = 0x169 / 4

  , LFSR1 = function(x) {
    return (x >> 1) ^ ((x & 0x01) != 0 ? GF256_FDBK_2 : 0);
  }
  , LFSR2 = function(x) {
    return (x >> 2) ^ ((x & 0x02) != 0 ? GF256_FDBK_2 : 0) ^ ((x & 0x01) != 0 ? GF256_FDBK_4 : 0);
  }
  , Mx_1 = function(x) {
    return x;
  }
  , Mx_X = function(x) {
    return x ^ LFSR2(x);
  }
  , Mx_Y = function(x) {
    return x ^ LFSR1(x) ^ LFSR2(x);
  }
  , computeMDSMatrix = function() {
    if (!MDS) {
      MDS =  [];
      var m1 = []
        , mX = []
        , mY = []
        , i
        , j;
      for (i = 0; i < 256; i++) {
        j = P[0][i] & 0xFF;
        m1[0] = j;
        mX[0] = Mx_X(j) & 0xFF;
        mY[0] = Mx_Y(j) & 0xFF;

        j = P[1][i] & 0xFF;
        m1[1] = j;
        mX[1] = Mx_X(j) & 0xFF;
        mY[1] = Mx_Y(j) & 0xFF;

        MDS[0][i] = m1[P_00] <<  0 | mX[P_00] <<  8 | mY[P_00] << 16 | mY[P_00] << 24;
        MDS[1][i] = mY[P_10] <<  0 | mY[P_10] <<  8 | mX[P_10] << 16 | m1[P_10] << 24;
        MDS[2][i] = mX[P_20] <<  0 | mY[P_20] <<  8 | m1[P_20] << 16 | mY[P_20] << 24;
        MDS[3][i] = mX[P_30] <<  0 | m1[P_30] <<  8 | mY[P_30] << 16 | mX[P_30] << 24;
      }
    }

    return MDS;
  }
  , MDS = computeMDSMatrix()
  , HEX_DIGITS = [
    '0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'
  ]
  , RS_GF_FDBK = 0x14D;

  var b0 = function(x) {
      return  x & 0xFF;
    }
    , b1 = function(x) {
      return (x >>> 8) & 0xFF;
    }
    , b2 = function(x) {
      return (x >>> 16) & 0xFF;
    }
    , b3 = function(x) {
      return (x >>> 24) & 0xFF;
    }
    , _b = function(x, N) {
      var result = 0;
      switch (N%4) {
        case 0: result = b0(x); break;
        case 1: result = b1(x); break;
        case 2: result = b2(x); break;
        case 3: result = b3(x); break;
      }
      return result;
    }
    , RS_rem = function(x) {
      var b  =  (x >>> 24) & 0xFF
        , g2 = ((b  <<  1) ^ ( (b & 0x80) != 0 ? RS_GF_FDBK : 0 )) & 0xFF
        , g3 =  (b >>>  1) ^ ( (b & 0x01) != 0 ? (RS_GF_FDBK >>> 1) : 0 ) ^ g2
        , result = (x << 8) ^ (g3 << 24) ^ (g2 << 16) ^ (g3 << 8) ^ b;
      return result;
    }
    , RS_MDS_Encode = function(k0, k1) {
      var r = k1;
      for (var i = 0; i < 4; i++) {
        r = RS_rem(r);
      }
      r ^= k0;
      for (var i = 0; i < 4; i++) {
       r = RS_rem(r);
      }
      return r;
    }
    , F32 = function(k64Cnt, x, k32 ) {
        var b0 = b0(x)
          , b1 = b1(x)
          , b2 = b2(x)
          , b3 = b3(x)
          , k0 = k32[0]
          , k1 = k32[1]
          , k2 = k32[2]
          , k3 = k32[3]
          , result = 0;

      switch (k64Cnt & 3) {
        case 1:
          result = MDS[0][(P[P_01][b0] & 0xFF) ^ b0(k0)] ^ MDS[1][(P[P_11][b1] & 0xFF) ^ b1(k0)] ^ MDS[2][(P[P_21][b2] & 0xFF) ^ b2(k0)] ^ MDS[3][(P[P_31][b3] & 0xFF) ^ b3(k0)];
          break;
        case 0:  // same as 4
          b0 = (P[P_04][b0] & 0xFF) ^ b0(k3);
          b1 = (P[P_14][b1] & 0xFF) ^ b1(k3);
          b2 = (P[P_24][b2] & 0xFF) ^ b2(k3);
          b3 = (P[P_34][b3] & 0xFF) ^ b3(k3);
        case 3:
          b0 = (P[P_03][b0] & 0xFF) ^ b0(k2);
          b1 = (P[P_13][b1] & 0xFF) ^ b1(k2);
          b2 = (P[P_23][b2] & 0xFF) ^ b2(k2);
          b3 = (P[P_33][b3] & 0xFF) ^ b3(k2);
        case 2:
          result = MDS[0][(P[P_01][(P[P_02][b0] & 0xFF) ^ b0(k1)] & 0xFF) ^ b0(k0)] ^ MDS[1][(P[P_11][(P[P_12][b1] & 0xFF) ^ b1(k1)] & 0xFF) ^ b1(k0)] ^ MDS[2][(P[P_21][(P[P_22][b2] & 0xFF) ^ b2(k1)] & 0xFF) ^ b2(k0)] ^ MDS[3][(P[P_31][(P[P_32][b3] & 0xFF) ^ b3(k1)] & 0xFF) ^ b3(k0)];
        break;
      }
      return result;
    }
    , Fe32 = function(sBox, x, R) {
      return sBox[2*_b(x, R)] ^ sBox[2*_b(x, R+1) + 1] ^ sBox[0x200 + 2*_b(x, R+2)] ^ sBox[0x200 + 2*_b(x, R+3) + 1];
    };


  var makeKey = function(aKey) {
    if (aKey && isAnArray(aKey)) {
      var keyLenght = aKey.length;
      if (!(keyLenght == 8 || keyLenght == 16 || keyLenght == 24 || keyLenght == 32)) {
        throw 'incorrect key length';
      }

      var k64Cnt = length / 8
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
        , b0
        , b1
        , b2
        , b3
        , sBox = [];

      for (i = 0, j = k64Cnt-1; i < 4 && offset < length; i++, j--) {
        k32e[i] = (aKey[offset++] & 0xFF) | (aKey[offset++] & 0xFF) <<  8 | (aKey[offset++] & 0xFF) << 16 | (aKey[offset++] & 0xFF) << 24;
        k32o[i] = (aKey[offset++] & 0xFF) | (aKey[offset++] & 0xFF) <<  8 | (aKey[offset++] & 0xFF) << 16 | (aKey[offset++] & 0xFF) << 24;
        sBoxKey[j] = RS_MDS_Encode(k32e[i], k32o[i]);
      }

      for (i = q = 0; i < subkeyCnt/2; i++, q += SK_STEP) {
        A = F32( k64Cnt, q, k32e );
        B = F32( k64Cnt, q+SK_BUMP, k32o );
        B = B << 8 | B >>> 24;
        A += B;
        subKeys[2*i] = A;
        A += B;
        subKeys[2*i + 1] = A << SK_ROTL | A >>> (32-SK_ROTL);
      }

      var k0 = sBoxKey[0]
        , k1 = sBoxKey[1]
        , k2 = sBoxKey[2]
        , k3 = sBoxKey[3];

      for (i = 0; i < 256; i++) {
        b0 = b1 = b2 = b3 = i;
        switch (k64Cnt & 3) {
          case 1:
            sBox[2*i] = MDS[0][(P[P_01][b0] & 0xFF) ^ b0(k0)];
            sBox[2*i+1] = MDS[1][(P[P_11][b1] & 0xFF) ^ b1(k0)];
            sBox[0x200+2*i] = MDS[2][(P[P_21][b2] & 0xFF) ^ b2(k0)];
            sBox[0x200+2*i+1] = MDS[3][(P[P_31][b3] & 0xFF) ^ b3(k0)];
            break;
          case 0: // same as 4
            b0 = (P[P_04][b0] & 0xFF) ^ b0(k3);
            b1 = (P[P_14][b1] & 0xFF) ^ b1(k3);
            b2 = (P[P_24][b2] & 0xFF) ^ b2(k3);
            b3 = (P[P_34][b3] & 0xFF) ^ b3(k3);
          case 3:
            b0 = (P[P_03][b0] & 0xFF) ^ b0(k2);
            b1 = (P[P_13][b1] & 0xFF) ^ b1(k2);
            b2 = (P[P_23][b2] & 0xFF) ^ b2(k2);
            b3 = (P[P_33][b3] & 0xFF) ^ b3(k2);
          case 2:
            sBox[2*i] = MDS[0][(P[P_01][(P[P_02][b0] & 0xFF) ^ b0(k1)] & 0xFF) ^ b0(k0)];
            sBox[2*i+1] = MDS[1][(P[P_11][(P[P_12][b1] & 0xFF) ^ b1(k1)] & 0xFF) ^ b1(k0)];
            sBox[0x200+2*i = MDS[2][(P[P_21][(P[P_22][b2] & 0xFF) ^ b2(k1)] & 0xFF) ^ b2(k0)];
            sBox[0x200+2*i+1] = MDS[3][(P[P_31][(P[P_32][b3] & 0xFF) ^ b3(k1)] & 0xFF) ^ b3(k0)];
        }
      }

      return [sBox, subKeys];
    } else {
      throw 'key passed is undefined or not an array';
    };
  };

  var blockEncrypt = function(input, inOffset, sessionKey) {
    if (input && sessionKey && isAnArray(sessionKey) && isAnArray(input)) {
      var sBox = sessionKey[0]
        , sKey = sessionKey[1];

      var x0 = (input[inOffset++] & 0xFF) | (input[inOffset++] & 0xFF) <<  8 | (input[inOffset++] & 0xFF) << 16 | (input[inOffset++] & 0xFF) << 24
        , x1 = (input[inOffset++] & 0xFF) | (input[inOffset++] & 0xFF) <<  8 | (input[inOffset++] & 0xFF) << 16 | (input[inOffset++] & 0xFF) << 24
        , x2 = (input[inOffset++] & 0xFF) | (input[inOffset++] & 0xFF) <<  8 | (input[inOffset++] & 0xFF) << 16 | (input[inOffset++] & 0xFF) << 24
        , x3 = (input[inOffset++] & 0xFF) | (input[inOffset++] & 0xFF) <<  8 | (input[inOffset++] & 0xFF) << 16 | (input[inOffset++] & 0xFF) << 24

      x0 ^= sKey[INPUT_WHITEN];
      x1 ^= sKey[INPUT_WHITEN + 1];
      x2 ^= sKey[INPUT_WHITEN + 2];
      x3 ^= sKey[INPUT_WHITEN + 3];

      var t0
        , t1
        , k = ROUND_SUBKEYS;

      for (var R = 0; R < ROUNDS; R += 2) {
       t0 = Fe32(sBox, x0, 0);
       t1 = Fe32(sBox, x1, 3);
       x2 ^= t0 + t1 + sKey[k++];
       x2 = x2 >>> 1 | x2 << 31;
       x3 = x3 << 1 | x3 >>> 31;
       x3 ^= t0 + 2*t1 + sKey[k++];

       t0 = Fe32(sBox, x2, 0);
       t1 = Fe32(sBox, x3, 3);
       x0 ^= t0 + t1 + sKey[k++];
       x0 = x0 >>> 1 | x0 << 31;
       x1 = x1 << 1 | x1 >>> 31;
       x1 ^= t0 + 2*t1 + sKey[k++];
     }

     x2 ^= sKey[OUTPUT_WHITEN];
     x3 ^= sKey[OUTPUT_WHITEN + 1];
     x0 ^= sKey[OUTPUT_WHITEN + 2];
     x1 ^= sKey[OUTPUT_WHITEN + 3];

    return [x2, (x2 >>> 8), (x2 >>> 16), (x2 >>> 24),
        x3, (x3 >>> 8), (x3 >>> 16), (x3 >>> 24),
        x0, (x0 >>> 8), (x0 >>> 16), (x0 >>> 24),
        x1, (x1 >>> 8), (x1 >>> 16), (x1 >>> 24)
      ];
    } else {
      throw 'input block is not an array or sessionKey is incorrect';
    };
  };

  var blockDecrypt = function(input, inOffset, sessionKey) {
    if (input && sessionKey && isAnArray(sessionKey) && isAnArray(input)) {
      var sBox = sessionKey[0]
        , sKey = sessionKey[1];

      var x2 = (input[inOffset++] & 0xFF) | (input[inOffset++] & 0xFF) <<  8 | (input[inOffset++] & 0xFF) << 16 | (input[inOffset++] & 0xFF) << 24
        , x3 = (input[inOffset++] & 0xFF) | (input[inOffset++] & 0xFF) <<  8 | (input[inOffset++] & 0xFF) << 16 | (input[inOffset++] & 0xFF) << 24
        , x0 = (input[inOffset++] & 0xFF) | (input[inOffset++] & 0xFF) <<  8 | (input[inOffset++] & 0xFF) << 16 | (input[inOffset++] & 0xFF) << 24
        , x1 = (input[inOffset++] & 0xFF) | (input[inOffset++] & 0xFF) <<  8 | (input[inOffset++] & 0xFF) << 16 | (input[inOffset++] & 0xFF) << 24;

      x2 ^= sKey[OUTPUT_WHITEN];
      x3 ^= sKey[OUTPUT_WHITEN + 1];
      x0 ^= sKey[OUTPUT_WHITEN + 2];
      x1 ^= sKey[OUTPUT_WHITEN + 3];

      var k = ROUND_SUBKEYS + 2*ROUNDS - 1
        , t0
        , t1;

      for (var R = 0; R < ROUNDS; R += 2) {
       t0 = Fe32(sBox, x2, 0);
       t1 = Fe32(sBox, x3, 3);
       x1 ^= t0 + 2*t1 + sKey[k--];
       x1 = x1 >>> 1 | x1 << 31;
       x0 = x0 << 1 | x0 >>> 31;
       x0 ^= t0 + t1 + sKey[k--];

       t0 = Fe32(sBox, x0, 0);
       t1 = Fe32(sBox, x1, 3);
       x3 ^= t0 + 2*t1 + sKey[k--];
       x3  = x3 >>> 1 | x3 << 31;
       x2  = x2 << 1 | x2 >>> 31;
       x2 ^= t0 + t1 + sKey[k--];
      }

      x0 ^= sKey[INPUT_WHITEN    ];
      x1 ^= sKey[INPUT_WHITEN + 1];
      x2 ^= sKey[INPUT_WHITEN + 2];
      x3 ^= sKey[INPUT_WHITEN + 3];

      return [ x0, (x0 >>> 8), (x0 >>> 16), (x0 >>> 24),
        x1, (x1 >>> 8), (x1 >>> 16), (x1 >>> 24),
        x2, (x2 >>> 8), (x2 >>> 16), (x2 >>> 24),
        x3, (x3 >>> 8), (x3 >>> 16), (x3 >>> 24)
      ];
    } else {
      throw 'input block is not an array or sessionKey is incorrect';
    };
  }

  var areEqual = function(a, b) {
      var aLength = a.length;
      if (aLength != b.length) {
        return false;
      }

      for (var i = 0; i < aLength; i++) {
        if (a[i] != b[i]) {
          return false;
        }
      }
      return true;
   }

  var self_test = function(keysize) {
    var ok = false
      , kb = []
      , pt = []
      , i;

    for (i = 0; i < keysize; i++) {
      kb[i] = i;
    }

    for (i = 0; i < BLOCK_SIZE; i++) {
      pt[i] = i;
    }

    var key = makeKey(kb);
    var ct = blockEncrypt(pt, 0, key);
    var cpt = blockDecrypt(ct, 0, key);

    ok = areEqual(pt, cpt);
    return ok;
  }

  return {
    test : self_test
  };
}
