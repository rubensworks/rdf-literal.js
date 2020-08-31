import { DataFactory } from "rdf-data-factory";
import {fromRdf, getSupportedJavaScriptPrimitives, getSupportedRdfDatatypes, getTermRaw, toRdf} from "../index";

const DF = new DataFactory();

describe('fromRdf', () => {

  describe('for strings', () => {

    it('should handle strings', () => {
      return expect(fromRdf(DF.literal('abc')))
        .toEqual('abc');
    });

    it('should handle language tagged strings', () => {
      return expect(fromRdf(DF.literal('abc', 'en-us')))
        .toEqual('abc');
    });

    it('should handle normalized strings', () => {
      return expect(fromRdf(DF.literal('abc',
        DF.namedNode('http://www.w3.org/2001/XMLSchema#normalizedString'))))
        .toEqual('abc');
    });

    it('should handle anyURI strings', () => {
      return expect(fromRdf(DF.literal('abc',
        DF.namedNode('http://www.w3.org/2001/XMLSchema#anyURI'))))
        .toEqual('abc');
    });

    it('should handle base64Binary strings', () => {
      return expect(fromRdf(DF.literal('abc',
        DF.namedNode('http://www.w3.org/2001/XMLSchema#base64Binary'))))
        .toEqual('abc');
    });

    it('should handle language strings', () => {
      return expect(fromRdf(DF.literal('abc',
        DF.namedNode('http://www.w3.org/2001/XMLSchema#language'))))
        .toEqual('abc');
    });

    it('should handle Name strings', () => {
      return expect(fromRdf(DF.literal('abc',
        DF.namedNode('http://www.w3.org/2001/XMLSchema#Name'))))
        .toEqual('abc');
    });

    it('should handle NCName strings', () => {
      return expect(fromRdf(DF.literal('abc',
        DF.namedNode('http://www.w3.org/2001/XMLSchema#NCName'))))
        .toEqual('abc');
    });

    it('should handle NMTOKEN strings', () => {
      return expect(fromRdf(DF.literal('abc',
        DF.namedNode('http://www.w3.org/2001/XMLSchema#NMTOKEN'))))
        .toEqual('abc');
    });

    it('should handle token strings', () => {
      return expect(fromRdf(DF.literal('abc',
        DF.namedNode('http://www.w3.org/2001/XMLSchema#token'))))
        .toEqual('abc');
    });

    it('should handle unknown datatypes as strings', () => {
      return expect(fromRdf(DF.literal('abc',
        DF.namedNode('http:/example.org/unknown'))))
        .toEqual('abc');
    });

    it('should handle hexBinaries as strings', () => {
      return expect(fromRdf(DF.literal('0FB8',
        DF.namedNode('http://www.w3.org/2001/XMLSchema#hexBinary'))))
        .toEqual('0FB8');
    });

    it('should handle times as strings', () => {
      return expect(fromRdf(DF.literal('00:00:00',
        DF.namedNode('http://www.w3.org/2001/XMLSchema#time'))))
        .toEqual('00:00:00');
    });

    it('should handle durations as strings', () => {
      return expect(fromRdf(DF.literal('P2Y6M5DT12H35M30S',
        DF.namedNode('http://www.w3.org/2001/XMLSchema#duration'))))
        .toEqual('P2Y6M5DT12H35M30S');
    });

  });

  describe('for booleans', () => {

    it('should handle a true boolean', () => {
      return expect(fromRdf(DF.literal('true',
        DF.namedNode('http://www.w3.org/2001/XMLSchema#boolean'))))
        .toEqual(true);
    });

    it('should handle a false boolean', () => {
      return expect(fromRdf(DF.literal('false',
        DF.namedNode('http://www.w3.org/2001/XMLSchema#boolean'))))
        .toEqual(false);
    });

    it('should handle a 1 boolean', () => {
      return expect(fromRdf(DF.literal('1',
        DF.namedNode('http://www.w3.org/2001/XMLSchema#boolean'))))
        .toEqual(true);
    });

    it('should handle a 0 boolean', () => {
      return expect(fromRdf(DF.literal('0',
        DF.namedNode('http://www.w3.org/2001/XMLSchema#boolean'))))
        .toEqual(false);
    });

    it('should throw on an invalid boolean when validating', () => {
      return expect(() => fromRdf(DF.literal('invalid',
        DF.namedNode('http://www.w3.org/2001/XMLSchema#boolean')), true))
        .toThrow(new Error('Invalid RDF http://www.w3.org/2001/XMLSchema#boolean value: \'invalid\''));
    });

    it('should return false on an invalid boolean when not validating', () => {
      return expect(fromRdf(DF.literal('invalid',
        DF.namedNode('http://www.w3.org/2001/XMLSchema#boolean'))))
        .toEqual(false);
    });

  });

  describe('for integers', () => {

    it('should handle integers', () => {
      return expect(fromRdf(DF.literal('123',
        DF.namedNode('http://www.w3.org/2001/XMLSchema#integer'))))
        .toEqual(123);
    });

    it('should handle integers when validating', () => {
      return expect(fromRdf(DF.literal('123',
        DF.namedNode('http://www.w3.org/2001/XMLSchema#integer')), true))
        .toEqual(123);
    });

    it('should error on integers that have decimal points when validating', () => {
      return expect(() => fromRdf(DF.literal('123.3',
        DF.namedNode('http://www.w3.org/2001/XMLSchema#integer')), true))
        .toThrow(new Error('Invalid RDF http://www.w3.org/2001/XMLSchema#integer value: \'123.3\''));
    });

    it('should handle integers that are invalid when not validating', () => {
      return expect(fromRdf(DF.literal('invalid',
        DF.namedNode('http://www.w3.org/2001/XMLSchema#integer'))))
        .toEqual(NaN);
    });

    it('should handle integers that have decimal points when not validating', () => {
      return expect(fromRdf(DF.literal('123.3',
        DF.namedNode('http://www.w3.org/2001/XMLSchema#integer'))))
        .toEqual(123);
    });

    it('should error on integers that are invalid when validating', () => {
      return expect(() => fromRdf(DF.literal('invalid',
        DF.namedNode('http://www.w3.org/2001/XMLSchema#integer')), true))
        .toThrow(new Error('Invalid RDF http://www.w3.org/2001/XMLSchema#integer value: \'invalid\''));
    });

    it('should handle longs', () => {
      return expect(fromRdf(DF.literal('2147483648',
        DF.namedNode('http://www.w3.org/2001/XMLSchema#long'))))
        .toEqual(2147483648);
    });

    it('should handle negative integers', () => {
      return expect(fromRdf(DF.literal('-123',
        DF.namedNode('http://www.w3.org/2001/XMLSchema#integer'))))
        .toEqual(-123);
    });

    it('should handle negative longs', () => {
      return expect(fromRdf(DF.literal('-2147483648',
        DF.namedNode('http://www.w3.org/2001/XMLSchema#long'))))
        .toEqual(-2147483648);
    });

    it('should handle ints', () => {
      return expect(fromRdf(DF.literal('123',
        DF.namedNode('http://www.w3.org/2001/XMLSchema#int'))))
        .toEqual(123);
    });

    it('should handle bytes', () => {
      return expect(fromRdf(DF.literal('123',
        DF.namedNode('http://www.w3.org/2001/XMLSchema#byte'))))
        .toEqual(123);
    });

    it('should handle shorts', () => {
      return expect(fromRdf(DF.literal('123',
        DF.namedNode('http://www.w3.org/2001/XMLSchema#short'))))
        .toEqual(123);
    });

    it('should handle negativeIntegers', () => {
      return expect(fromRdf(DF.literal('-123',
        DF.namedNode('http://www.w3.org/2001/XMLSchema#negativeInteger'))))
        .toEqual(-123);
    });

    it('should handle nonNegativeIntegers', () => {
      return expect(fromRdf(DF.literal('123',
        DF.namedNode('http://www.w3.org/2001/XMLSchema#nonNegativeInteger'))))
        .toEqual(123);
    });

    it('should handle nonPositiveInteger', () => {
      return expect(fromRdf(DF.literal('-123',
        DF.namedNode('http://www.w3.org/2001/XMLSchema#nonPositiveInteger'))))
        .toEqual(-123);
    });

    it('should handle positiveIntegers', () => {
      return expect(fromRdf(DF.literal('123',
        DF.namedNode('http://www.w3.org/2001/XMLSchema#positiveInteger'))))
        .toEqual(123);
    });

    it('should handle unsignedBytes', () => {
      return expect(fromRdf(DF.literal('123',
        DF.namedNode('http://www.w3.org/2001/XMLSchema#unsignedByte'))))
        .toEqual(123);
    });

    it('should handle unsignedInts', () => {
      return expect(fromRdf(DF.literal('123',
        DF.namedNode('http://www.w3.org/2001/XMLSchema#unsignedInt'))))
        .toEqual(123);
    });

    it('should handle unsignedLongs', () => {
      return expect(fromRdf(DF.literal('123',
        DF.namedNode('http://www.w3.org/2001/XMLSchema#unsignedLong'))))
        .toEqual(123);
    });

    it('should handle unsignedShorts', () => {
      return expect(fromRdf(DF.literal('123',
        DF.namedNode('http://www.w3.org/2001/XMLSchema#unsignedShort'))))
        .toEqual(123);
    });

  });

  describe('for doubles', () => {

    it('should handle doubles', () => {
      return expect(fromRdf(DF.literal('1.05E1',
        DF.namedNode('http://www.w3.org/2001/XMLSchema#double'))))
        .toEqual(10.5);
    });

    it('should handle doubles when validating', () => {
      return expect(fromRdf(DF.literal('1.05E1',
        DF.namedNode('http://www.w3.org/2001/XMLSchema#double')), true))
        .toEqual(10.5);
    });

    it('should handle decimals', () => {
      return expect(fromRdf(DF.literal('10.5',
        DF.namedNode('http://www.w3.org/2001/XMLSchema#decimal'))))
        .toEqual(10.5);
    });

    it('should handle floats', () => {
      return expect(fromRdf(DF.literal('10.5',
        DF.namedNode('http://www.w3.org/2001/XMLSchema#float'))))
        .toEqual(10.5);
    });

    it('should error on invalid doubles when validating', () => {
      return expect(() => fromRdf(DF.literal('invalid',
        DF.namedNode('http://www.w3.org/2001/XMLSchema#double')), true))
        .toThrow(new Error('Invalid RDF http://www.w3.org/2001/XMLSchema#double value: \'invalid\''));
    });

    it('should handle invalid doubles when not validating', () => {
      return expect(fromRdf(DF.literal('invalid',
        DF.namedNode('http://www.w3.org/2001/XMLSchema#double'))))
        .toEqual(NaN);
    });

  });

  describe('for dates', () => {

    it('should handle a dateTime', () => {
      return expect(fromRdf(DF.literal('2012-03-17T23:00:00.000Z',
        DF.namedNode('http://www.w3.org/2001/XMLSchema#dateTime'))))
        .toEqual(new Date('2012-03-17T23:00:00.000Z'));
    });

    it('should handle a dateTime when validating', () => {
      return expect(fromRdf(DF.literal('2012-03-17T23:00:00.000Z',
        DF.namedNode('http://www.w3.org/2001/XMLSchema#dateTime')), true))
        .toEqual(new Date('2012-03-17T23:00:00.000Z'));
    });

    it('should handle a dateTime without ms when validating', () => {
      return expect(fromRdf(DF.literal('2012-03-17T23:00:00Z',
        DF.namedNode('http://www.w3.org/2001/XMLSchema#dateTime')), true))
        .toEqual(new Date('2012-03-17T23:00:00.000Z'));
    });

    it('should error on invalid dateTime', () => {
      return expect(() => fromRdf(DF.literal('2012-03a-17T23:00:00.000Z',
        DF.namedNode('http://www.w3.org/2001/XMLSchema#dateTime')), true)).toThrow(
          new Error('Invalid RDF http://www.w3.org/2001/XMLSchema#dateTime value: \'2012-03a-17T23:00:00.000Z\''));
    });

    it('should handle a date', () => {
      return expect(fromRdf(DF.literal('2012-03-17',
        DF.namedNode('http://www.w3.org/2001/XMLSchema#date'))))
        .toEqual(new Date('2012-03-17'));
    });

    it('should handle a date when validating', () => {
      return expect(fromRdf(DF.literal('2012-03-17',
        DF.namedNode('http://www.w3.org/2001/XMLSchema#date')), true))
        .toEqual(new Date('2012-03-17'));
    });

    it('should error on invalid dateTime', () => {
      return expect(() => fromRdf(DF.literal('2012-03a-17',
        DF.namedNode('http://www.w3.org/2001/XMLSchema#date')), true)).toThrow(
        new Error('Invalid RDF http://www.w3.org/2001/XMLSchema#date value: \'2012-03a-17\''));
    });

    it('should handle a day', () => {
      return expect(fromRdf(DF.literal('17',
        DF.namedNode('http://www.w3.org/2001/XMLSchema#gDay'))))
        .toEqual(new Date('1900-01-17'));
    });

    it('should handle a day when validating', () => {
      return expect(fromRdf(DF.literal('17',
        DF.namedNode('http://www.w3.org/2001/XMLSchema#gDay')), true))
        .toEqual(new Date('1900-01-17'));
    });

    it('should error on invalid day', () => {
      return expect(() => fromRdf(DF.literal('17.',
        DF.namedNode('http://www.w3.org/2001/XMLSchema#gDay')), true)).toThrow(
        new Error('Invalid RDF http://www.w3.org/2001/XMLSchema#gDay value: \'17.\''));
    });

    it('should handle a month day', () => {
      return expect(fromRdf(DF.literal('03-17',
        DF.namedNode('http://www.w3.org/2001/XMLSchema#gMonthDay'))))
        .toEqual(new Date('1900-03-17'));
    });

    it('should handle a month day when validating', () => {
      return expect(fromRdf(DF.literal('03-17',
        DF.namedNode('http://www.w3.org/2001/XMLSchema#gMonthDay')), true))
        .toEqual(new Date('1900-03-17'));
    });

    it('should error on invalid month day', () => {
      return expect(() => fromRdf(DF.literal('03-17.',
        DF.namedNode('http://www.w3.org/2001/XMLSchema#gMonthDay')), true)).toThrow(
        new Error('Invalid RDF http://www.w3.org/2001/XMLSchema#gMonthDay value: \'03-17.\''));
    });

    it('should handle a year', () => {
      return expect(fromRdf(DF.literal('2012',
        DF.namedNode('http://www.w3.org/2001/XMLSchema#gYear'))))
        .toEqual(new Date('2012-01-01'));
    });

    it('should handle a year when validating', () => {
      return expect(fromRdf(DF.literal('2012',
        DF.namedNode('http://www.w3.org/2001/XMLSchema#gYear')), true))
        .toEqual(new Date('2012-01-01'));
    });

    it('should error on invalid year', () => {
      return expect(() => fromRdf(DF.literal('17.',
        DF.namedNode('http://www.w3.org/2001/XMLSchema#gYear')), true)).toThrow(
        new Error('Invalid RDF http://www.w3.org/2001/XMLSchema#gYear value: \'17.\''));
    });

    it('should handle a year month', () => {
      return expect(fromRdf(DF.literal('2012-03',
        DF.namedNode('http://www.w3.org/2001/XMLSchema#gYearMonth'))))
        .toEqual(new Date('2012-03-01'));
    });

    it('should handle a year month when validating', () => {
      return expect(fromRdf(DF.literal('2012-03',
        DF.namedNode('http://www.w3.org/2001/XMLSchema#gYearMonth')), true))
        .toEqual(new Date('2012-03-01'));
    });

    it('should error on invalid year month', () => {
      return expect(() => fromRdf(DF.literal('2013-17.',
        DF.namedNode('http://www.w3.org/2001/XMLSchema#gYearMonth')), true)).toThrow(
        new Error('Invalid RDF http://www.w3.org/2001/XMLSchema#gYearMonth value: \'2013-17.\''));
    });

  });

});

describe('toRdf', () => {

  describe('for strings', () => {

    it('should handle strings with custom data factory', () => {
      return expect(toRdf('abc', { dataFactory: new DataFactory() }))
        .toEqual(DF.literal('abc'));
    });

    it('should handle strings with custom data factory in the old format', () => {
      return expect(toRdf('abc', new DataFactory()))
        .toEqual(DF.literal('abc'));
    });

    it('should handle strings', () => {
      return expect(toRdf('abc'))
        .toEqual(DF.literal('abc'));
    });

    it('should handle strings with a custom datatype', () => {
      return expect(toRdf('abc', { datatype: DF.namedNode('http://ex.org/d') }))
        .toEqual(DF.literal('abc', DF.namedNode('http://ex.org/d')));
    });

  });

  describe('for booleans', () => {

    it('should handle a true boolean', () => {
      return expect(toRdf(true))
        .toEqual(DF.literal('true', DF.namedNode('http://www.w3.org/2001/XMLSchema#boolean')));
    });

    it('should handle a false boolean', () => {
      return expect(toRdf(false))
        .toEqual(DF.literal('false', DF.namedNode('http://www.w3.org/2001/XMLSchema#boolean')));
    });

    it('should handle a true boolean with a custom datatype', () => {
      return expect(toRdf(true, { datatype: DF.namedNode('http://ex.org/d') }))
        .toEqual(DF.literal('true', DF.namedNode('http://ex.org/d')));
    });

  });

  describe('for integers', () => {

    it('should handle an integer', () => {
      return expect(toRdf(10))
        .toEqual(DF.literal('10', DF.namedNode('http://www.w3.org/2001/XMLSchema#integer')));
    });

    it('should handle an integer with a custom datatype', () => {
      return expect(toRdf(10, { datatype: DF.namedNode('http://ex.org/d') }))
        .toEqual(DF.literal('10', DF.namedNode('http://ex.org/d')));
    });

    it('should handle a large integer', () => {
      return expect(toRdf(2147483647))
        .toEqual(DF.literal('2147483647', DF.namedNode('http://www.w3.org/2001/XMLSchema#integer')));
    });

    it('should handle a large negative integer', () => {
      return expect(toRdf(-2147483648))
        .toEqual(DF.literal('-2147483648', DF.namedNode('http://www.w3.org/2001/XMLSchema#integer')));
    });

    it('should handle a long', () => {
      return expect(toRdf(2147483648))
        .toEqual(DF.literal('2147483648', DF.namedNode('http://www.w3.org/2001/XMLSchema#long')));
    });

    it('should handle a negative long', () => {
      return expect(toRdf(-2147483649))
        .toEqual(DF.literal('-2147483649', DF.namedNode('http://www.w3.org/2001/XMLSchema#long')));
    });

  });

  describe('for doubles', () => {

    it('should handle a double', () => {
      return expect(toRdf(10.5))
        .toEqual(DF.literal('1.05E1', DF.namedNode('http://www.w3.org/2001/XMLSchema#double')));
    });

    it('should handle a double with a custom datatype', () => {
      return expect(toRdf(10.5, { datatype: DF.namedNode('http://ex.org/d') }))
        .toEqual(DF.literal('1.05E1', DF.namedNode('http://ex.org/d')));
    });

    it('should handle a large double', () => {
      return expect(toRdf(12345678000.5))
        .toEqual(DF.literal('1.23456780005E10', DF.namedNode('http://www.w3.org/2001/XMLSchema#double')));
    });

    it('should handle Infinity', () => {
      return expect(toRdf(Infinity))
        .toEqual(DF.literal('INF', DF.namedNode('http://www.w3.org/2001/XMLSchema#double')));
    });

    it('should handle -Infinity', () => {
      return expect(toRdf(-Infinity))
        .toEqual(DF.literal('-INF', DF.namedNode('http://www.w3.org/2001/XMLSchema#double')));
    });

    it('should handle NaN', () => {
      return expect(toRdf(NaN))
        .toEqual(DF.literal('NaN', DF.namedNode('http://www.w3.org/2001/XMLSchema#double')));
    });

  });

  describe('for dates', () => {
    it('should handle a date object with dateTime', () => {
      return expect(toRdf(new Date('2012-03-17T23:00:00.000Z')))
        .toEqual(DF.literal('2012-03-17T23:00:00.000Z', DF.namedNode('http://www.w3.org/2001/XMLSchema#dateTime')));
    });

    it('should handle a date object with dateTime with a custom datatype', () => {
      return expect(toRdf(new Date('2012-03-17T23:00:00.000Z'), { datatype: DF.namedNode('http://ex.org/d') }))
        .toEqual(DF.literal('2012-03-17T23:00:00.000Z', DF.namedNode('http://ex.org/d')));
    });

    it('should handle a date object with date', () => {
      return expect(toRdf(new Date('2012-03-17')))
        .toEqual(DF.literal('2012-03-17T00:00:00.000Z', DF.namedNode('http://www.w3.org/2001/XMLSchema#dateTime')));
    });

    it('should handle a date object with forced date', () => {
      return expect(toRdf(new Date('2012-03-17'), { datatype: DF.namedNode('http://www.w3.org/2001/XMLSchema#date') }))
        .toEqual(DF.literal('2012-03-17', DF.namedNode('http://www.w3.org/2001/XMLSchema#date')));
    });

    it('should handle a date object with day', () => {
      return expect(toRdf(new Date(0, 0, 17)))
        .toEqual(DF.literal('1900-01-17T00:00:00.000Z', DF.namedNode('http://www.w3.org/2001/XMLSchema#dateTime')));
    });

    it('should handle a date object with forced day', () => {
      return expect(toRdf(new Date(0, 0, 17), { datatype: DF.namedNode('http://www.w3.org/2001/XMLSchema#gDay') }))
        .toEqual(DF.literal('17', DF.namedNode('http://www.w3.org/2001/XMLSchema#gDay')));
    });

    it('should handle a date number with forced day', () => {
      return expect(toRdf(17, { datatype: DF.namedNode('http://www.w3.org/2001/XMLSchema#gDay') }))
        .toEqual(DF.literal('17', DF.namedNode('http://www.w3.org/2001/XMLSchema#gDay')));
    });

    it('should handle a date object with month day', () => {
      return expect(toRdf(new Date(0, 2, 17)))
        .toEqual(DF.literal('1900-03-17T00:00:00.000Z', DF.namedNode('http://www.w3.org/2001/XMLSchema#dateTime')));
    });

    it('should handle a date object with forced month day', () => {
      return expect(toRdf(new Date(0, 2, 17), { datatype: DF.namedNode('http://www.w3.org/2001/XMLSchema#gMonthDay') }))
        .toEqual(DF.literal('3-17', DF.namedNode('http://www.w3.org/2001/XMLSchema#gMonthDay')));
    });

    it('should handle a date object with year', () => {
      return expect(toRdf(new Date('2012-01-01')))
        .toEqual(DF.literal('2012-01-01T00:00:00.000Z', DF.namedNode('http://www.w3.org/2001/XMLSchema#dateTime')));
    });

    it('should handle a date object with forced year', () => {
      return expect(toRdf(new Date('2012-01-01'), { datatype: DF.namedNode('http://www.w3.org/2001/XMLSchema#gYear') }))
        .toEqual(DF.literal('2012', DF.namedNode('http://www.w3.org/2001/XMLSchema#gYear')));
    });

    it('should handle a date number with forced year', () => {
      return expect(toRdf(2012, { datatype: DF.namedNode('http://www.w3.org/2001/XMLSchema#gYear') }))
        .toEqual(DF.literal('2012', DF.namedNode('http://www.w3.org/2001/XMLSchema#gYear')));
    });

    it('should handle a date object with year month', () => {
      return expect(toRdf(new Date('2012-03-01')))
        .toEqual(DF.literal('2012-03-01T00:00:00.000Z', DF.namedNode('http://www.w3.org/2001/XMLSchema#dateTime')));
    });

    it('should handle a date object with forced year month', () => {
      return expect(toRdf(new Date('2012-03-01'),
        { datatype: DF.namedNode('http://www.w3.org/2001/XMLSchema#gYearMonth') }))
        .toEqual(DF.literal('2012-3', DF.namedNode('http://www.w3.org/2001/XMLSchema#gYearMonth')));
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
    return expect(getTermRaw(DF.namedNode('abc')))
      .toEqual('abc');
  });

  it('should get literal values', () => {
    return expect(getTermRaw(DF.literal('123', DF.namedNode('http://www.w3.org/2001/XMLSchema#integer'))))
      .toEqual(123);
  });

  it('should get literal values and validate', () => {
    return expect(getTermRaw(DF.literal('123', DF.namedNode('http://www.w3.org/2001/XMLSchema#integer')), true))
      .toEqual(123);
  });
});

describe('getSupportedRdfDatatypes', () => {
  it('should return', () => {
    return expect(getSupportedRdfDatatypes()).toEqual([
      DF.namedNode('http://www.w3.org/2001/XMLSchema#string'),
      DF.namedNode('http://www.w3.org/2001/XMLSchema#normalizedString'),
      DF.namedNode('http://www.w3.org/2001/XMLSchema#anyURI'),
      DF.namedNode('http://www.w3.org/2001/XMLSchema#base64Binary'),
      DF.namedNode('http://www.w3.org/2001/XMLSchema#language'),
      DF.namedNode('http://www.w3.org/2001/XMLSchema#Name'),
      DF.namedNode('http://www.w3.org/2001/XMLSchema#NCName'),
      DF.namedNode('http://www.w3.org/2001/XMLSchema#NMTOKEN'),
      DF.namedNode('http://www.w3.org/2001/XMLSchema#token'),
      DF.namedNode('http://www.w3.org/2001/XMLSchema#hexBinary'),
      DF.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#langString'),

      DF.namedNode('http://www.w3.org/2001/XMLSchema#time'),
      DF.namedNode('http://www.w3.org/2001/XMLSchema#duration'),

      DF.namedNode('http://www.w3.org/2001/XMLSchema#boolean'),

      DF.namedNode('http://www.w3.org/2001/XMLSchema#double'),
      DF.namedNode('http://www.w3.org/2001/XMLSchema#decimal'),
      DF.namedNode('http://www.w3.org/2001/XMLSchema#float'),

      DF.namedNode('http://www.w3.org/2001/XMLSchema#integer'),
      DF.namedNode('http://www.w3.org/2001/XMLSchema#long'),
      DF.namedNode('http://www.w3.org/2001/XMLSchema#int'),
      DF.namedNode('http://www.w3.org/2001/XMLSchema#byte'),
      DF.namedNode('http://www.w3.org/2001/XMLSchema#short'),
      DF.namedNode('http://www.w3.org/2001/XMLSchema#negativeInteger'),
      DF.namedNode('http://www.w3.org/2001/XMLSchema#nonNegativeInteger'),
      DF.namedNode('http://www.w3.org/2001/XMLSchema#nonPositiveInteger'),
      DF.namedNode('http://www.w3.org/2001/XMLSchema#positiveInteger'),
      DF.namedNode('http://www.w3.org/2001/XMLSchema#unsignedByte'),
      DF.namedNode('http://www.w3.org/2001/XMLSchema#unsignedInt'),
      DF.namedNode('http://www.w3.org/2001/XMLSchema#unsignedLong'),
      DF.namedNode('http://www.w3.org/2001/XMLSchema#unsignedShort'),

      DF.namedNode('http://www.w3.org/2001/XMLSchema#dateTime'),
      DF.namedNode('http://www.w3.org/2001/XMLSchema#date'),
      DF.namedNode('http://www.w3.org/2001/XMLSchema#gDay'),
      DF.namedNode('http://www.w3.org/2001/XMLSchema#gMonthDay'),
      DF.namedNode('http://www.w3.org/2001/XMLSchema#gYear'),
      DF.namedNode('http://www.w3.org/2001/XMLSchema#gYearMonth'),
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
