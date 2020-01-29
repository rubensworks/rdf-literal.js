import {literal, namedNode} from "@rdfjs/data-model";
import * as DataFactory from "@rdfjs/data-model";
import {fromRdf, getSupportedJavaScriptPrimitives, getSupportedRdfDatatypes, getTermRaw, toRdf} from "../index";

describe('fromRdf', () => {

  describe('for strings', () => {

    it('should handle strings', () => {
      return expect(fromRdf(literal('abc')))
        .toEqual('abc');
    });

    it('should handle language tagged strings', () => {
      return expect(fromRdf(literal('abc', 'en-us')))
        .toEqual('abc');
    });

    it('should handle normalized strings', () => {
      return expect(fromRdf(literal('abc',
        namedNode('http://www.w3.org/2001/XMLSchema#normalizedString'))))
        .toEqual('abc');
    });

    it('should handle anyURI strings', () => {
      return expect(fromRdf(literal('abc',
        namedNode('http://www.w3.org/2001/XMLSchema#anyURI'))))
        .toEqual('abc');
    });

    it('should handle base64Binary strings', () => {
      return expect(fromRdf(literal('abc',
        namedNode('http://www.w3.org/2001/XMLSchema#base64Binary'))))
        .toEqual('abc');
    });

    it('should handle language strings', () => {
      return expect(fromRdf(literal('abc',
        namedNode('http://www.w3.org/2001/XMLSchema#language'))))
        .toEqual('abc');
    });

    it('should handle Name strings', () => {
      return expect(fromRdf(literal('abc',
        namedNode('http://www.w3.org/2001/XMLSchema#Name'))))
        .toEqual('abc');
    });

    it('should handle NCName strings', () => {
      return expect(fromRdf(literal('abc',
        namedNode('http://www.w3.org/2001/XMLSchema#NCName'))))
        .toEqual('abc');
    });

    it('should handle NMTOKEN strings', () => {
      return expect(fromRdf(literal('abc',
        namedNode('http://www.w3.org/2001/XMLSchema#NMTOKEN'))))
        .toEqual('abc');
    });

    it('should handle token strings', () => {
      return expect(fromRdf(literal('abc',
        namedNode('http://www.w3.org/2001/XMLSchema#token'))))
        .toEqual('abc');
    });

    it('should handle unknown datatypes as strings', () => {
      return expect(fromRdf(literal('abc',
        namedNode('http:/example.org/unknown'))))
        .toEqual('abc');
    });

    it('should handle hexBinaries as strings', () => {
      return expect(fromRdf(literal('0FB8',
        namedNode('http://www.w3.org/2001/XMLSchema#hexBinary'))))
        .toEqual('0FB8');
    });

    it('should handle times as strings', () => {
      return expect(fromRdf(literal('00:00:00',
        namedNode('http://www.w3.org/2001/XMLSchema#time'))))
        .toEqual('00:00:00');
    });

    it('should handle durations as strings', () => {
      return expect(fromRdf(literal('P2Y6M5DT12H35M30S',
        namedNode('http://www.w3.org/2001/XMLSchema#duration'))))
        .toEqual('P2Y6M5DT12H35M30S');
    });

  });

  describe('for booleans', () => {

    it('should handle a true boolean', () => {
      return expect(fromRdf(literal('true',
        namedNode('http://www.w3.org/2001/XMLSchema#boolean'))))
        .toEqual(true);
    });

    it('should handle a false boolean', () => {
      return expect(fromRdf(literal('false',
        namedNode('http://www.w3.org/2001/XMLSchema#boolean'))))
        .toEqual(false);
    });

    it('should handle a 1 boolean', () => {
      return expect(fromRdf(literal('1',
        namedNode('http://www.w3.org/2001/XMLSchema#boolean'))))
        .toEqual(true);
    });

    it('should handle a 0 boolean', () => {
      return expect(fromRdf(literal('0',
        namedNode('http://www.w3.org/2001/XMLSchema#boolean'))))
        .toEqual(false);
    });

    it('should throw on an invalid boolean when validating', () => {
      return expect(() => fromRdf(literal('invalid',
        namedNode('http://www.w3.org/2001/XMLSchema#boolean')), true))
        .toThrow(new Error('Invalid RDF http://www.w3.org/2001/XMLSchema#boolean value: \'invalid\''));
    });

    it('should return false on an invalid boolean when not validating', () => {
      return expect(fromRdf(literal('invalid',
        namedNode('http://www.w3.org/2001/XMLSchema#boolean'))))
        .toEqual(false);
    });

  });

  describe('for integers', () => {

    it('should handle integers', () => {
      return expect(fromRdf(literal('123',
        namedNode('http://www.w3.org/2001/XMLSchema#integer'))))
        .toEqual(123);
    });

    it('should handle integers when validating', () => {
      return expect(fromRdf(literal('123',
        namedNode('http://www.w3.org/2001/XMLSchema#integer')), true))
        .toEqual(123);
    });

    it('should error on integers that have decimal points when validating', () => {
      return expect(() => fromRdf(literal('123.3',
        namedNode('http://www.w3.org/2001/XMLSchema#integer')), true))
        .toThrow(new Error('Invalid RDF http://www.w3.org/2001/XMLSchema#integer value: \'123.3\''));
    });

    it('should handle integers that are invalid when not validating', () => {
      return expect(fromRdf(literal('invalid',
        namedNode('http://www.w3.org/2001/XMLSchema#integer'))))
        .toEqual(NaN);
    });

    it('should handle integers that have decimal points when not validating', () => {
      return expect(fromRdf(literal('123.3',
        namedNode('http://www.w3.org/2001/XMLSchema#integer'))))
        .toEqual(123);
    });

    it('should error on integers that are invalid when validating', () => {
      return expect(() => fromRdf(literal('invalid',
        namedNode('http://www.w3.org/2001/XMLSchema#integer')), true))
        .toThrow(new Error('Invalid RDF http://www.w3.org/2001/XMLSchema#integer value: \'invalid\''));
    });

    it('should handle longs', () => {
      return expect(fromRdf(literal('2147483648',
        namedNode('http://www.w3.org/2001/XMLSchema#long'))))
        .toEqual(2147483648);
    });

    it('should handle negative integers', () => {
      return expect(fromRdf(literal('-123',
        namedNode('http://www.w3.org/2001/XMLSchema#integer'))))
        .toEqual(-123);
    });

    it('should handle negative longs', () => {
      return expect(fromRdf(literal('-2147483648',
        namedNode('http://www.w3.org/2001/XMLSchema#long'))))
        .toEqual(-2147483648);
    });

    it('should handle ints', () => {
      return expect(fromRdf(literal('123',
        namedNode('http://www.w3.org/2001/XMLSchema#int'))))
        .toEqual(123);
    });

    it('should handle bytes', () => {
      return expect(fromRdf(literal('123',
        namedNode('http://www.w3.org/2001/XMLSchema#byte'))))
        .toEqual(123);
    });

    it('should handle shorts', () => {
      return expect(fromRdf(literal('123',
        namedNode('http://www.w3.org/2001/XMLSchema#short'))))
        .toEqual(123);
    });

    it('should handle negativeIntegers', () => {
      return expect(fromRdf(literal('-123',
        namedNode('http://www.w3.org/2001/XMLSchema#negativeInteger'))))
        .toEqual(-123);
    });

    it('should handle nonNegativeIntegers', () => {
      return expect(fromRdf(literal('123',
        namedNode('http://www.w3.org/2001/XMLSchema#nonNegativeInteger'))))
        .toEqual(123);
    });

    it('should handle nonPositiveInteger', () => {
      return expect(fromRdf(literal('-123',
        namedNode('http://www.w3.org/2001/XMLSchema#nonPositiveInteger'))))
        .toEqual(-123);
    });

    it('should handle positiveIntegers', () => {
      return expect(fromRdf(literal('123',
        namedNode('http://www.w3.org/2001/XMLSchema#positiveInteger'))))
        .toEqual(123);
    });

    it('should handle unsignedBytes', () => {
      return expect(fromRdf(literal('123',
        namedNode('http://www.w3.org/2001/XMLSchema#unsignedByte'))))
        .toEqual(123);
    });

    it('should handle unsignedInts', () => {
      return expect(fromRdf(literal('123',
        namedNode('http://www.w3.org/2001/XMLSchema#unsignedInt'))))
        .toEqual(123);
    });

    it('should handle unsignedLongs', () => {
      return expect(fromRdf(literal('123',
        namedNode('http://www.w3.org/2001/XMLSchema#unsignedLong'))))
        .toEqual(123);
    });

    it('should handle unsignedShorts', () => {
      return expect(fromRdf(literal('123',
        namedNode('http://www.w3.org/2001/XMLSchema#unsignedShort'))))
        .toEqual(123);
    });

  });

  describe('for doubles', () => {

    it('should handle doubles', () => {
      return expect(fromRdf(literal('1.05E1',
        namedNode('http://www.w3.org/2001/XMLSchema#double'))))
        .toEqual(10.5);
    });

    it('should handle doubles when validating', () => {
      return expect(fromRdf(literal('1.05E1',
        namedNode('http://www.w3.org/2001/XMLSchema#double')), true))
        .toEqual(10.5);
    });

    it('should handle decimals', () => {
      return expect(fromRdf(literal('10.5',
        namedNode('http://www.w3.org/2001/XMLSchema#decimal'))))
        .toEqual(10.5);
    });

    it('should handle floats', () => {
      return expect(fromRdf(literal('10.5',
        namedNode('http://www.w3.org/2001/XMLSchema#float'))))
        .toEqual(10.5);
    });

    it('should error on invalid doubles when validating', () => {
      return expect(() => fromRdf(literal('invalid',
        namedNode('http://www.w3.org/2001/XMLSchema#double')), true))
        .toThrow(new Error('Invalid RDF http://www.w3.org/2001/XMLSchema#double value: \'invalid\''));
    });

    it('should handle invalid doubles when not validating', () => {
      return expect(fromRdf(literal('invalid',
        namedNode('http://www.w3.org/2001/XMLSchema#double'))))
        .toEqual(NaN);
    });

  });

  describe('for dates', () => {

    it('should handle a dateTime', () => {
      return expect(fromRdf(literal('2012-03-17T23:00:00.000Z',
        namedNode('http://www.w3.org/2001/XMLSchema#dateTime'))))
        .toEqual(new Date('2012-03-17T23:00:00.000Z'));
    });

    it('should handle a dateTime when validating', () => {
      return expect(fromRdf(literal('2012-03-17T23:00:00.000Z',
        namedNode('http://www.w3.org/2001/XMLSchema#dateTime')), true))
        .toEqual(new Date('2012-03-17T23:00:00.000Z'));
    });

    it('should handle a dateTime without ms when validating', () => {
      return expect(fromRdf(literal('2012-03-17T23:00:00Z',
        namedNode('http://www.w3.org/2001/XMLSchema#dateTime')), true))
        .toEqual(new Date('2012-03-17T23:00:00.000Z'));
    });

    it('should error on invalid dateTime', () => {
      return expect(() => fromRdf(literal('2012-03a-17T23:00:00.000Z',
        namedNode('http://www.w3.org/2001/XMLSchema#dateTime')), true)).toThrow(
          new Error('Invalid RDF http://www.w3.org/2001/XMLSchema#dateTime value: \'2012-03a-17T23:00:00.000Z\''));
    });

    it('should handle a date', () => {
      return expect(fromRdf(literal('2012-03-17',
        namedNode('http://www.w3.org/2001/XMLSchema#date'))))
        .toEqual(new Date('2012-03-17'));
    });

    it('should handle a date when validating', () => {
      return expect(fromRdf(literal('2012-03-17',
        namedNode('http://www.w3.org/2001/XMLSchema#date')), true))
        .toEqual(new Date('2012-03-17'));
    });

    it('should error on invalid dateTime', () => {
      return expect(() => fromRdf(literal('2012-03a-17',
        namedNode('http://www.w3.org/2001/XMLSchema#date')), true)).toThrow(
        new Error('Invalid RDF http://www.w3.org/2001/XMLSchema#date value: \'2012-03a-17\''));
    });

    it('should handle a day', () => {
      return expect(fromRdf(literal('17',
        namedNode('http://www.w3.org/2001/XMLSchema#gDay'))))
        .toEqual(new Date('1900-01-17'));
    });

    it('should handle a day when validating', () => {
      return expect(fromRdf(literal('17',
        namedNode('http://www.w3.org/2001/XMLSchema#gDay')), true))
        .toEqual(new Date('1900-01-17'));
    });

    it('should error on invalid day', () => {
      return expect(() => fromRdf(literal('17.',
        namedNode('http://www.w3.org/2001/XMLSchema#gDay')), true)).toThrow(
        new Error('Invalid RDF http://www.w3.org/2001/XMLSchema#gDay value: \'17.\''));
    });

    it('should handle a month day', () => {
      return expect(fromRdf(literal('03-17',
        namedNode('http://www.w3.org/2001/XMLSchema#gMonthDay'))))
        .toEqual(new Date('1900-03-17'));
    });

    it('should handle a month day when validating', () => {
      return expect(fromRdf(literal('03-17',
        namedNode('http://www.w3.org/2001/XMLSchema#gMonthDay')), true))
        .toEqual(new Date('1900-03-17'));
    });

    it('should error on invalid month day', () => {
      return expect(() => fromRdf(literal('03-17.',
        namedNode('http://www.w3.org/2001/XMLSchema#gMonthDay')), true)).toThrow(
        new Error('Invalid RDF http://www.w3.org/2001/XMLSchema#gMonthDay value: \'03-17.\''));
    });

    it('should handle a year', () => {
      return expect(fromRdf(literal('2012',
        namedNode('http://www.w3.org/2001/XMLSchema#gYear'))))
        .toEqual(new Date('2012-01-01'));
    });

    it('should handle a year when validating', () => {
      return expect(fromRdf(literal('2012',
        namedNode('http://www.w3.org/2001/XMLSchema#gYear')), true))
        .toEqual(new Date('2012-01-01'));
    });

    it('should error on invalid year', () => {
      return expect(() => fromRdf(literal('17.',
        namedNode('http://www.w3.org/2001/XMLSchema#gYear')), true)).toThrow(
        new Error('Invalid RDF http://www.w3.org/2001/XMLSchema#gYear value: \'17.\''));
    });

    it('should handle a year month', () => {
      return expect(fromRdf(literal('2012-03',
        namedNode('http://www.w3.org/2001/XMLSchema#gYearMonth'))))
        .toEqual(new Date('2012-03-01'));
    });

    it('should handle a year month when validating', () => {
      return expect(fromRdf(literal('2012-03',
        namedNode('http://www.w3.org/2001/XMLSchema#gYearMonth')), true))
        .toEqual(new Date('2012-03-01'));
    });

    it('should error on invalid year month', () => {
      return expect(() => fromRdf(literal('2013-17.',
        namedNode('http://www.w3.org/2001/XMLSchema#gYearMonth')), true)).toThrow(
        new Error('Invalid RDF http://www.w3.org/2001/XMLSchema#gYearMonth value: \'2013-17.\''));
    });

  });

});

describe('toRdf', () => {

  describe('for strings', () => {

    it('should handle strings with custom data factory', () => {
      return expect(toRdf('abc', { dataFactory: DataFactory }))
        .toEqual(literal('abc'));
    });

    it('should handle strings with custom data factory in the old format', () => {
      return expect(toRdf('abc', DataFactory))
        .toEqual(literal('abc'));
    });

    it('should handle strings', () => {
      return expect(toRdf('abc'))
        .toEqual(literal('abc'));
    });

    it('should handle strings with a custom datatype', () => {
      return expect(toRdf('abc', { datatype: namedNode('http://ex.org/d') }))
        .toEqual(literal('abc', namedNode('http://ex.org/d')));
    });

  });

  describe('for booleans', () => {

    it('should handle a true boolean', () => {
      return expect(toRdf(true))
        .toEqual(literal('true', namedNode('http://www.w3.org/2001/XMLSchema#boolean')));
    });

    it('should handle a false boolean', () => {
      return expect(toRdf(false))
        .toEqual(literal('false', namedNode('http://www.w3.org/2001/XMLSchema#boolean')));
    });

    it('should handle a true boolean with a custom datatype', () => {
      return expect(toRdf(true, { datatype: namedNode('http://ex.org/d') }))
        .toEqual(literal('true', namedNode('http://ex.org/d')));
    });

  });

  describe('for integers', () => {

    it('should handle an integer', () => {
      return expect(toRdf(10))
        .toEqual(literal('10', namedNode('http://www.w3.org/2001/XMLSchema#integer')));
    });

    it('should handle an integer with a custom datatype', () => {
      return expect(toRdf(10, { datatype: namedNode('http://ex.org/d') }))
        .toEqual(literal('10', namedNode('http://ex.org/d')));
    });

    it('should handle a large integer', () => {
      return expect(toRdf(2147483647))
        .toEqual(literal('2147483647', namedNode('http://www.w3.org/2001/XMLSchema#integer')));
    });

    it('should handle a large negative integer', () => {
      return expect(toRdf(-2147483648))
        .toEqual(literal('-2147483648', namedNode('http://www.w3.org/2001/XMLSchema#integer')));
    });

    it('should handle a long', () => {
      return expect(toRdf(2147483648))
        .toEqual(literal('2147483648', namedNode('http://www.w3.org/2001/XMLSchema#long')));
    });

    it('should handle a negative long', () => {
      return expect(toRdf(-2147483649))
        .toEqual(literal('-2147483649', namedNode('http://www.w3.org/2001/XMLSchema#long')));
    });

  });

  describe('for doubles', () => {

    it('should handle a double', () => {
      return expect(toRdf(10.5))
        .toEqual(literal('1.05E1', namedNode('http://www.w3.org/2001/XMLSchema#double')));
    });

    it('should handle a double with a custom datatype', () => {
      return expect(toRdf(10.5, { datatype: namedNode('http://ex.org/d') }))
        .toEqual(literal('1.05E1', namedNode('http://ex.org/d')));
    });

    it('should handle a large double', () => {
      return expect(toRdf(12345678000.5))
        .toEqual(literal('1.23456780005E10', namedNode('http://www.w3.org/2001/XMLSchema#double')));
    });

    it('should handle Infinity', () => {
      return expect(toRdf(Infinity))
        .toEqual(literal('INF', namedNode('http://www.w3.org/2001/XMLSchema#double')));
    });

    it('should handle -Infinity', () => {
      return expect(toRdf(-Infinity))
        .toEqual(literal('-INF', namedNode('http://www.w3.org/2001/XMLSchema#double')));
    });

    it('should handle NaN', () => {
      return expect(toRdf(NaN))
        .toEqual(literal('NaN', namedNode('http://www.w3.org/2001/XMLSchema#double')));
    });

  });

  describe('for dates', () => {
    it('should handle a date object with dateTime', () => {
      return expect(toRdf(new Date('2012-03-17T23:00:00.000Z')))
        .toEqual(literal('2012-03-17T23:00:00.000Z', namedNode('http://www.w3.org/2001/XMLSchema#dateTime')));
    });

    it('should handle a date object with dateTime with a custom datatype', () => {
      return expect(toRdf(new Date('2012-03-17T23:00:00.000Z'), { datatype: namedNode('http://ex.org/d') }))
        .toEqual(literal('2012-03-17T23:00:00.000Z', namedNode('http://ex.org/d')));
    });

    it('should handle a date object with date', () => {
      return expect(toRdf(new Date('2012-03-17')))
        .toEqual(literal('2012-03-17T00:00:00.000Z', namedNode('http://www.w3.org/2001/XMLSchema#dateTime')));
    });

    it('should handle a date object with forced date', () => {
      return expect(toRdf(new Date('2012-03-17'), { datatype: namedNode('http://www.w3.org/2001/XMLSchema#date') }))
        .toEqual(literal('2012-03-17', namedNode('http://www.w3.org/2001/XMLSchema#date')));
    });

    it('should handle a date object with day', () => {
      return expect(toRdf(new Date(0, 0, 17)))
        .toEqual(literal('1900-01-17T00:00:00.000Z', namedNode('http://www.w3.org/2001/XMLSchema#dateTime')));
    });

    it('should handle a date object with forced day', () => {
      return expect(toRdf(new Date(0, 0, 17), { datatype: namedNode('http://www.w3.org/2001/XMLSchema#gDay') }))
        .toEqual(literal('17', namedNode('http://www.w3.org/2001/XMLSchema#gDay')));
    });

    it('should handle a date number with forced day', () => {
      return expect(toRdf(17, { datatype: namedNode('http://www.w3.org/2001/XMLSchema#gDay') }))
        .toEqual(literal('17', namedNode('http://www.w3.org/2001/XMLSchema#gDay')));
    });

    it('should handle a date object with month day', () => {
      return expect(toRdf(new Date(0, 2, 17)))
        .toEqual(literal('1900-03-17T00:00:00.000Z', namedNode('http://www.w3.org/2001/XMLSchema#dateTime')));
    });

    it('should handle a date object with forced month day', () => {
      return expect(toRdf(new Date(0, 2, 17), { datatype: namedNode('http://www.w3.org/2001/XMLSchema#gMonthDay') }))
        .toEqual(literal('3-17', namedNode('http://www.w3.org/2001/XMLSchema#gMonthDay')));
    });

    it('should handle a date object with year', () => {
      return expect(toRdf(new Date('2012-01-01')))
        .toEqual(literal('2012-01-01T00:00:00.000Z', namedNode('http://www.w3.org/2001/XMLSchema#dateTime')));
    });

    it('should handle a date object with forced year', () => {
      return expect(toRdf(new Date('2012-01-01'), { datatype: namedNode('http://www.w3.org/2001/XMLSchema#gYear') }))
        .toEqual(literal('2012', namedNode('http://www.w3.org/2001/XMLSchema#gYear')));
    });

    it('should handle a date number with forced year', () => {
      return expect(toRdf(2012, { datatype: namedNode('http://www.w3.org/2001/XMLSchema#gYear') }))
        .toEqual(literal('2012', namedNode('http://www.w3.org/2001/XMLSchema#gYear')));
    });

    it('should handle a date object with year month', () => {
      return expect(toRdf(new Date('2012-03-01')))
        .toEqual(literal('2012-03-01T00:00:00.000Z', namedNode('http://www.w3.org/2001/XMLSchema#dateTime')));
    });

    it('should handle a date object with forced year month', () => {
      return expect(toRdf(new Date('2012-03-01'),
        { datatype: namedNode('http://www.w3.org/2001/XMLSchema#gYearMonth') }))
        .toEqual(literal('2012-3', namedNode('http://www.w3.org/2001/XMLSchema#gYearMonth')));
    });
  });

  describe('for objects', () => {
    it('should error', () => {
      return expect(() => toRdf({}))
        .toThrow(new Error('Invalid JavaScript value: \'[object Object]\''));
    });
  });

  describe('for undefined', () => {
    it('should error', () => {
      return expect(() => toRdf(undefined))
        .toThrow(new Error('Invalid JavaScript value: \'undefined\''));
    });
  });

  describe('for null', () => {
    it('should error', () => {
      return expect(() => toRdf(null))
        .toThrow(new Error('Invalid JavaScript value: \'null\''));
    });
  });

});

describe('getTermRaw', () => {
  it('should get named node values', () => {
    return expect(getTermRaw(namedNode('abc')))
      .toEqual('abc');
  });

  it('should get literal values', () => {
    return expect(getTermRaw(literal('123', namedNode('http://www.w3.org/2001/XMLSchema#integer'))))
      .toEqual(123);
  });

  it('should get literal values and validate', () => {
    return expect(getTermRaw(literal('123', namedNode('http://www.w3.org/2001/XMLSchema#integer')), true))
      .toEqual(123);
  });
});

describe('getSupportedRdfDatatypes', () => {
  it('should return', () => {
    return expect(getSupportedRdfDatatypes()).toEqual([
      namedNode('http://www.w3.org/2001/XMLSchema#string'),
      namedNode('http://www.w3.org/2001/XMLSchema#normalizedString'),
      namedNode('http://www.w3.org/2001/XMLSchema#anyURI'),
      namedNode('http://www.w3.org/2001/XMLSchema#base64Binary'),
      namedNode('http://www.w3.org/2001/XMLSchema#language'),
      namedNode('http://www.w3.org/2001/XMLSchema#Name'),
      namedNode('http://www.w3.org/2001/XMLSchema#NCName'),
      namedNode('http://www.w3.org/2001/XMLSchema#NMTOKEN'),
      namedNode('http://www.w3.org/2001/XMLSchema#token'),
      namedNode('http://www.w3.org/2001/XMLSchema#hexBinary'),
      namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#langString'),

      namedNode('http://www.w3.org/2001/XMLSchema#time'),
      namedNode('http://www.w3.org/2001/XMLSchema#duration'),

      namedNode('http://www.w3.org/2001/XMLSchema#boolean'),

      namedNode('http://www.w3.org/2001/XMLSchema#double'),
      namedNode('http://www.w3.org/2001/XMLSchema#decimal'),
      namedNode('http://www.w3.org/2001/XMLSchema#float'),

      namedNode('http://www.w3.org/2001/XMLSchema#integer'),
      namedNode('http://www.w3.org/2001/XMLSchema#long'),
      namedNode('http://www.w3.org/2001/XMLSchema#int'),
      namedNode('http://www.w3.org/2001/XMLSchema#byte'),
      namedNode('http://www.w3.org/2001/XMLSchema#short'),
      namedNode('http://www.w3.org/2001/XMLSchema#negativeInteger'),
      namedNode('http://www.w3.org/2001/XMLSchema#nonNegativeInteger'),
      namedNode('http://www.w3.org/2001/XMLSchema#nonPositiveInteger'),
      namedNode('http://www.w3.org/2001/XMLSchema#positiveInteger'),
      namedNode('http://www.w3.org/2001/XMLSchema#unsignedByte'),
      namedNode('http://www.w3.org/2001/XMLSchema#unsignedInt'),
      namedNode('http://www.w3.org/2001/XMLSchema#unsignedLong'),
      namedNode('http://www.w3.org/2001/XMLSchema#unsignedShort'),

      namedNode('http://www.w3.org/2001/XMLSchema#dateTime'),
      namedNode('http://www.w3.org/2001/XMLSchema#date'),
      namedNode('http://www.w3.org/2001/XMLSchema#gDay'),
      namedNode('http://www.w3.org/2001/XMLSchema#gMonthDay'),
      namedNode('http://www.w3.org/2001/XMLSchema#gYear'),
      namedNode('http://www.w3.org/2001/XMLSchema#gYearMonth'),
    ]);
  });
});

describe('getSupportedJavaScriptPrimitives', () => {
  it('should return', () => {
    return expect(getSupportedJavaScriptPrimitives()).toEqual([
      'string',
      'boolean',
      'number',
      'object',
    ]);
  });
});
