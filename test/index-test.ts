import { DataFactory } from 'rdf-data-factory';
import {
  fromRdf,
  getSupportedJavaScriptPrimitives,
  getSupportedRdfDatatypes,
  getTermRaw,
  toRdf,
  TypeHandlerBoolean,
  TypeHandlerDate,
  TypeHandlerNumberDouble,
  TypeHandlerNumberInteger,
  TypeHandlerString,
} from '../index';

const DF = new DataFactory();

describe('fromRdf', () => {
  describe('for strings', () => {
    it('should handle strings', () => {
      expect(fromRdf(DF.literal('abc')))
        .toBe('abc');
    });

    it('should handle language tagged strings', () => {
      expect(fromRdf(DF.literal('abc', 'en-us')))
        .toBe('abc');
    });

    it('should handle language tagged strings with direction', () => {
      expect(fromRdf(DF.literal('abc', { language: 'en-us', direction: 'ltr' })))
        .toBe('abc');
    });

    it('should handle normalized strings', () => {
      expect(fromRdf(DF.literal('abc', DF.namedNode('http://www.w3.org/2001/XMLSchema#normalizedString'))))
        .toBe('abc');
    });

    it('should handle anyURI strings', () => {
      expect(fromRdf(DF.literal('abc', DF.namedNode('http://www.w3.org/2001/XMLSchema#anyURI'))))
        .toBe('abc');
    });

    it('should handle base64Binary strings', () => {
      expect(fromRdf(DF.literal('abc', DF.namedNode('http://www.w3.org/2001/XMLSchema#base64Binary'))))
        .toBe('abc');
    });

    it('should handle language strings', () => {
      expect(fromRdf(DF.literal('abc', DF.namedNode('http://www.w3.org/2001/XMLSchema#language'))))
        .toBe('abc');
    });

    it('should handle Name strings', () => {
      expect(fromRdf(DF.literal('abc', DF.namedNode('http://www.w3.org/2001/XMLSchema#Name'))))
        .toBe('abc');
    });

    it('should handle NCName strings', () => {
      expect(fromRdf(DF.literal('abc', DF.namedNode('http://www.w3.org/2001/XMLSchema#NCName'))))
        .toBe('abc');
    });

    it('should handle NMTOKEN strings', () => {
      expect(fromRdf(DF.literal('abc', DF.namedNode('http://www.w3.org/2001/XMLSchema#NMTOKEN'))))
        .toBe('abc');
    });

    it('should handle token strings', () => {
      expect(fromRdf(DF.literal('abc', DF.namedNode('http://www.w3.org/2001/XMLSchema#token'))))
        .toBe('abc');
    });

    it('should handle unknown datatypes as strings', () => {
      expect(fromRdf(DF.literal('abc', DF.namedNode('http:/example.org/unknown'))))
        .toBe('abc');
    });

    it('should handle hexBinaries as strings', () => {
      expect(fromRdf(DF.literal('0FB8', DF.namedNode('http://www.w3.org/2001/XMLSchema#hexBinary'))))
        .toBe('0FB8');
    });

    it('should handle times as strings', () => {
      expect(fromRdf(DF.literal('00:00:00', DF.namedNode('http://www.w3.org/2001/XMLSchema#time'))))
        .toBe('00:00:00');
    });

    it('should handle durations as strings', () => {
      expect(fromRdf(DF.literal('P2Y6M5DT12H35M30S', DF.namedNode('http://www.w3.org/2001/XMLSchema#duration'))))
        .toBe('P2Y6M5DT12H35M30S');
    });
  });

  describe('for booleans', () => {
    it('should handle a true boolean', () => {
      expect(fromRdf(DF.literal('true', DF.namedNode('http://www.w3.org/2001/XMLSchema#boolean'))))
        .toBe(true);
    });

    it('should handle a false boolean', () => {
      expect(fromRdf(DF.literal('false', DF.namedNode('http://www.w3.org/2001/XMLSchema#boolean'))))
        .toBe(false);
    });

    it('should handle a 1 boolean', () => {
      expect(fromRdf(DF.literal('1', DF.namedNode('http://www.w3.org/2001/XMLSchema#boolean'))))
        .toBe(true);
    });

    it('should handle a 0 boolean', () => {
      expect(fromRdf(DF.literal('0', DF.namedNode('http://www.w3.org/2001/XMLSchema#boolean'))))
        .toBe(false);
    });

    it('should throw on an invalid boolean when validating', () => {
      expect(() => fromRdf(DF.literal('invalid', DF.namedNode('http://www.w3.org/2001/XMLSchema#boolean')), true))
        .toThrow(new Error('Invalid RDF http://www.w3.org/2001/XMLSchema#boolean value: \'invalid\''));
    });

    it('should return false on an invalid boolean when not validating', () => {
      expect(fromRdf(DF.literal('invalid', DF.namedNode('http://www.w3.org/2001/XMLSchema#boolean'))))
        .toBe(false);
    });
  });

  describe('for integers', () => {
    it('should handle integers', () => {
      expect(fromRdf(DF.literal('123', DF.namedNode('http://www.w3.org/2001/XMLSchema#integer'))))
        .toBe(123);
    });

    it('should handle integers when validating', () => {
      expect(fromRdf(DF.literal('123', DF.namedNode('http://www.w3.org/2001/XMLSchema#integer')), true))
        .toBe(123);
    });

    it('should error on integers that have decimal points when validating', () => {
      expect(() => fromRdf(DF.literal('123.3', DF.namedNode('http://www.w3.org/2001/XMLSchema#integer')), true))
        .toThrow(new Error('Invalid RDF http://www.w3.org/2001/XMLSchema#integer value: \'123.3\''));
    });

    it('should handle integers that are invalid when not validating', () => {
      expect(fromRdf(DF.literal('invalid', DF.namedNode('http://www.w3.org/2001/XMLSchema#integer'))))
        .toBeNaN();
    });

    it('should handle integers that have decimal points when not validating', () => {
      expect(fromRdf(DF.literal('123.3', DF.namedNode('http://www.w3.org/2001/XMLSchema#integer'))))
        .toBe(123);
    });

    it('should error on integers that are invalid when validating', () => {
      expect(() => fromRdf(DF.literal('invalid', DF.namedNode('http://www.w3.org/2001/XMLSchema#integer')), true))
        .toThrow(new Error('Invalid RDF http://www.w3.org/2001/XMLSchema#integer value: \'invalid\''));
    });

    it('should handle longs', () => {
      expect(fromRdf(DF.literal('2147483648', DF.namedNode('http://www.w3.org/2001/XMLSchema#long'))))
        .toBe(2147483648);
    });

    it('should handle negative integers', () => {
      expect(fromRdf(DF.literal('-123', DF.namedNode('http://www.w3.org/2001/XMLSchema#integer'))))
        .toBe(-123);
    });

    it('should handle negative longs', () => {
      expect(fromRdf(DF.literal('-2147483648', DF.namedNode('http://www.w3.org/2001/XMLSchema#long'))))
        .toBe(-2147483648);
    });

    it('should handle ints', () => {
      expect(fromRdf(DF.literal('123', DF.namedNode('http://www.w3.org/2001/XMLSchema#int'))))
        .toBe(123);
    });

    it('should handle bytes', () => {
      expect(fromRdf(DF.literal('123', DF.namedNode('http://www.w3.org/2001/XMLSchema#byte'))))
        .toBe(123);
    });

    it('should handle shorts', () => {
      expect(fromRdf(DF.literal('123', DF.namedNode('http://www.w3.org/2001/XMLSchema#short'))))
        .toBe(123);
    });

    it('should handle negativeIntegers', () => {
      expect(fromRdf(DF.literal('-123', DF.namedNode('http://www.w3.org/2001/XMLSchema#negativeInteger'))))
        .toBe(-123);
    });

    it('should handle nonNegativeIntegers', () => {
      expect(fromRdf(DF.literal('123', DF.namedNode('http://www.w3.org/2001/XMLSchema#nonNegativeInteger'))))
        .toBe(123);
    });

    it('should handle nonPositiveInteger', () => {
      expect(fromRdf(DF.literal('-123', DF.namedNode('http://www.w3.org/2001/XMLSchema#nonPositiveInteger'))))
        .toBe(-123);
    });

    it('should handle positiveIntegers', () => {
      expect(fromRdf(DF.literal('123', DF.namedNode('http://www.w3.org/2001/XMLSchema#positiveInteger'))))
        .toBe(123);
    });

    it('should handle unsignedBytes', () => {
      expect(fromRdf(DF.literal('123', DF.namedNode('http://www.w3.org/2001/XMLSchema#unsignedByte'))))
        .toBe(123);
    });

    it('should handle unsignedInts', () => {
      expect(fromRdf(DF.literal('123', DF.namedNode('http://www.w3.org/2001/XMLSchema#unsignedInt'))))
        .toBe(123);
    });

    it('should handle unsignedLongs', () => {
      expect(fromRdf(DF.literal('123', DF.namedNode('http://www.w3.org/2001/XMLSchema#unsignedLong'))))
        .toBe(123);
    });

    it('should handle unsignedShorts', () => {
      expect(fromRdf(DF.literal('123', DF.namedNode('http://www.w3.org/2001/XMLSchema#unsignedShort'))))
        .toBe(123);
    });
  });

  describe('for doubles', () => {
    it('should handle doubles', () => {
      expect(fromRdf(DF.literal('1.05E1', DF.namedNode('http://www.w3.org/2001/XMLSchema#double'))))
        .toBe(10.5);
    });

    it('should handle doubles when validating', () => {
      expect(fromRdf(DF.literal('1.05E1', DF.namedNode('http://www.w3.org/2001/XMLSchema#double')), true))
        .toBe(10.5);
    });

    it('should handle decimals', () => {
      expect(fromRdf(DF.literal('10.5', DF.namedNode('http://www.w3.org/2001/XMLSchema#decimal'))))
        .toBe(10.5);
    });

    it('should handle floats', () => {
      expect(fromRdf(DF.literal('10.5', DF.namedNode('http://www.w3.org/2001/XMLSchema#float'))))
        .toBe(10.5);
    });

    it('should error on invalid doubles when validating', () => {
      expect(() => fromRdf(DF.literal('invalid', DF.namedNode('http://www.w3.org/2001/XMLSchema#double')), true))
        .toThrow(new Error('Invalid RDF http://www.w3.org/2001/XMLSchema#double value: \'invalid\''));
    });

    it('should handle invalid doubles when not validating', () => {
      expect(fromRdf(DF.literal('invalid', DF.namedNode('http://www.w3.org/2001/XMLSchema#double'))))
        .toBeNaN();
    });
  });

  describe('for dates', () => {
    it('should handle a dateTime', () => {
      expect(fromRdf(DF.literal('2012-03-17T23:00:00.000Z', DF.namedNode('http://www.w3.org/2001/XMLSchema#dateTime'))))
        .toEqual(new Date('2012-03-17T23:00:00.000Z'));
    });

    it('should handle a dateTime when validating', () => {
      expect(fromRdf(DF.literal('2012-03-17T23:00:00.000Z', DF.namedNode('http://www.w3.org/2001/XMLSchema#dateTime')), true))
        .toEqual(new Date('2012-03-17T23:00:00.000Z'));
    });

    it('should handle a dateTime without ms when validating', () => {
      expect(fromRdf(DF.literal('2012-03-17T23:00:00Z', DF.namedNode('http://www.w3.org/2001/XMLSchema#dateTime')), true))
        .toEqual(new Date('2012-03-17T23:00:00.000Z'));
    });

    it('should error on invalid dateTime', () => {
      expect(() => fromRdf(DF.literal('2012-03a-17T23:00:00.000Z', DF.namedNode('http://www.w3.org/2001/XMLSchema#dateTime')), true)).toThrow(
        new Error('Invalid RDF http://www.w3.org/2001/XMLSchema#dateTime value: \'2012-03a-17T23:00:00.000Z\''),
      );
    });

    it('should handle a date', () => {
      expect(fromRdf(DF.literal('2012-03-17', DF.namedNode('http://www.w3.org/2001/XMLSchema#date'))))
        .toEqual(new Date('2012-03-17'));
    });

    it('should handle a date when validating', () => {
      expect(fromRdf(DF.literal('2012-03-17', DF.namedNode('http://www.w3.org/2001/XMLSchema#date')), true))
        .toEqual(new Date('2012-03-17'));
    });

    it('should error on invalid date', () => {
      expect(() => fromRdf(DF.literal('2012-03a-17', DF.namedNode('http://www.w3.org/2001/XMLSchema#date')), true)).toThrow(
        new Error('Invalid RDF http://www.w3.org/2001/XMLSchema#date value: \'2012-03a-17\''),
      );
    });

    it('should handle a day', () => {
      expect(fromRdf(DF.literal('17', DF.namedNode('http://www.w3.org/2001/XMLSchema#gDay'))))
        .toEqual(new Date('1900-01-17'));
    });

    it('should handle a day when validating', () => {
      expect(fromRdf(DF.literal('17', DF.namedNode('http://www.w3.org/2001/XMLSchema#gDay')), true))
        .toEqual(new Date('1900-01-17'));
    });

    it('should error on invalid day', () => {
      expect(() => fromRdf(DF.literal('17.', DF.namedNode('http://www.w3.org/2001/XMLSchema#gDay')), true)).toThrow(
        new Error('Invalid RDF http://www.w3.org/2001/XMLSchema#gDay value: \'17.\''),
      );
    });

    it('should handle a month day', () => {
      expect(fromRdf(DF.literal('03-17', DF.namedNode('http://www.w3.org/2001/XMLSchema#gMonthDay'))))
        .toEqual(new Date('1900-03-17'));
    });

    it('should handle a month day when validating', () => {
      expect(fromRdf(DF.literal('03-17', DF.namedNode('http://www.w3.org/2001/XMLSchema#gMonthDay')), true))
        .toEqual(new Date('1900-03-17'));
    });

    it('should error on invalid month day', () => {
      expect(() => fromRdf(DF.literal('03-17.', DF.namedNode('http://www.w3.org/2001/XMLSchema#gMonthDay')), true)).toThrow(
        new Error('Invalid RDF http://www.w3.org/2001/XMLSchema#gMonthDay value: \'03-17.\''),
      );
    });

    it('should handle a year', () => {
      expect(fromRdf(DF.literal('2012', DF.namedNode('http://www.w3.org/2001/XMLSchema#gYear'))))
        .toEqual(new Date('2012-01-01'));
    });

    it('should handle a year when validating', () => {
      expect(fromRdf(DF.literal('2012', DF.namedNode('http://www.w3.org/2001/XMLSchema#gYear')), true))
        .toEqual(new Date('2012-01-01'));
    });

    it('should error on invalid year', () => {
      expect(() => fromRdf(DF.literal('17.', DF.namedNode('http://www.w3.org/2001/XMLSchema#gYear')), true)).toThrow(
        new Error('Invalid RDF http://www.w3.org/2001/XMLSchema#gYear value: \'17.\''),
      );
    });

    it('should handle a year month', () => {
      expect(fromRdf(DF.literal('2012-03', DF.namedNode('http://www.w3.org/2001/XMLSchema#gYearMonth'))))
        .toEqual(new Date('2012-03-01'));
    });

    it('should handle a year month when validating', () => {
      expect(fromRdf(DF.literal('2012-03', DF.namedNode('http://www.w3.org/2001/XMLSchema#gYearMonth')), true))
        .toEqual(new Date('2012-03-01'));
    });

    it('should error on invalid year month', () => {
      expect(() => fromRdf(DF.literal('2013-17.', DF.namedNode('http://www.w3.org/2001/XMLSchema#gYearMonth')), true)).toThrow(
        new Error('Invalid RDF http://www.w3.org/2001/XMLSchema#gYearMonth value: \'2013-17.\''),
      );
    });
  });
});

describe('toRdf', () => {
  describe('for strings', () => {
    it('should handle strings with custom data factory', () => {
      expect(toRdf('abc', { dataFactory: new DataFactory() }))
        .toEqual(DF.literal('abc'));
    });

    it('should handle strings with custom data factory in the old format', () => {
      expect(toRdf('abc', new DataFactory()))
        .toEqual(DF.literal('abc'));
    });

    it('should handle strings', () => {
      expect(toRdf('abc'))
        .toEqual(DF.literal('abc'));
    });

    it('should handle strings with a custom datatype', () => {
      expect(toRdf('abc', { datatype: DF.namedNode('http://ex.org/d') }))
        .toEqual(DF.literal('abc', DF.namedNode('http://ex.org/d')));
    });
  });

  describe('for booleans', () => {
    it('should handle a true boolean', () => {
      expect(toRdf(true))
        .toEqual(DF.literal('true', DF.namedNode('http://www.w3.org/2001/XMLSchema#boolean')));
    });

    it('should handle a false boolean', () => {
      expect(toRdf(false))
        .toEqual(DF.literal('false', DF.namedNode('http://www.w3.org/2001/XMLSchema#boolean')));
    });

    it('should handle a true boolean with a custom datatype', () => {
      expect(toRdf(true, { datatype: DF.namedNode('http://ex.org/d') }))
        .toEqual(DF.literal('true', DF.namedNode('http://ex.org/d')));
    });
  });

  describe('for integers', () => {
    it('should handle an integer', () => {
      expect(toRdf(10))
        .toEqual(DF.literal('10', DF.namedNode('http://www.w3.org/2001/XMLSchema#integer')));
    });

    it('should handle an integer with a custom datatype', () => {
      expect(toRdf(10, { datatype: DF.namedNode('http://ex.org/d') }))
        .toEqual(DF.literal('10', DF.namedNode('http://ex.org/d')));
    });

    it('should handle a large integer', () => {
      expect(toRdf(2147483647))
        .toEqual(DF.literal('2147483647', DF.namedNode('http://www.w3.org/2001/XMLSchema#integer')));
    });

    it('should handle a large negative integer', () => {
      expect(toRdf(-2147483648))
        .toEqual(DF.literal('-2147483648', DF.namedNode('http://www.w3.org/2001/XMLSchema#integer')));
    });

    it('should handle a long', () => {
      expect(toRdf(2147483648))
        .toEqual(DF.literal('2147483648', DF.namedNode('http://www.w3.org/2001/XMLSchema#long')));
    });

    it('should handle a negative long', () => {
      expect(toRdf(-2147483649))
        .toEqual(DF.literal('-2147483649', DF.namedNode('http://www.w3.org/2001/XMLSchema#long')));
    });
  });

  describe('for doubles', () => {
    it('should handle a double', () => {
      expect(toRdf(10.5))
        .toEqual(DF.literal('1.05E1', DF.namedNode('http://www.w3.org/2001/XMLSchema#double')));
    });

    it('should handle a double with a custom datatype', () => {
      expect(toRdf(10.5, { datatype: DF.namedNode('http://ex.org/d') }))
        .toEqual(DF.literal('1.05E1', DF.namedNode('http://ex.org/d')));
    });

    it('should handle a large double', () => {
      expect(toRdf(12345678000.5))
        .toEqual(DF.literal('1.23456780005E10', DF.namedNode('http://www.w3.org/2001/XMLSchema#double')));
    });

    it('should handle Infinity', () => {
      expect(toRdf(Number.POSITIVE_INFINITY))
        .toEqual(DF.literal('INF', DF.namedNode('http://www.w3.org/2001/XMLSchema#double')));
    });

    it('should handle -Infinity', () => {
      expect(toRdf(Number.NEGATIVE_INFINITY))
        .toEqual(DF.literal('-INF', DF.namedNode('http://www.w3.org/2001/XMLSchema#double')));
    });

    it('should handle NaN', () => {
      expect(toRdf(Number.NaN))
        .toEqual(DF.literal('NaN', DF.namedNode('http://www.w3.org/2001/XMLSchema#double')));
    });
  });

  describe('for dates', () => {
    it('should handle a date object with dateTime', () => {
      expect(toRdf(new Date('2012-03-17T23:00:00.000Z')))
        .toEqual(DF.literal('2012-03-17T23:00:00.000Z', DF.namedNode('http://www.w3.org/2001/XMLSchema#dateTime')));
    });

    it('should handle a date object with dateTime with a custom datatype', () => {
      expect(toRdf(new Date('2012-03-17T23:00:00.000Z'), { datatype: DF.namedNode('http://ex.org/d') }))
        .toEqual(DF.literal('2012-03-17T23:00:00.000Z', DF.namedNode('http://ex.org/d')));
    });

    it('should handle a date object with date', () => {
      expect(toRdf(new Date('2012-03-17')))
        .toEqual(DF.literal('2012-03-17T00:00:00.000Z', DF.namedNode('http://www.w3.org/2001/XMLSchema#dateTime')));
    });

    it('should handle a date object with forced date', () => {
      expect(toRdf(new Date('2012-03-17'), { datatype: DF.namedNode('http://www.w3.org/2001/XMLSchema#date') }))
        .toEqual(DF.literal('2012-03-17', DF.namedNode('http://www.w3.org/2001/XMLSchema#date')));
    });

    it('should handle a date object with day', () => {
      expect(toRdf(new Date(0, 0, 17)))
        .toEqual(DF.literal('1900-01-17T00:00:00.000Z', DF.namedNode('http://www.w3.org/2001/XMLSchema#dateTime')));
    });

    it('should handle a date object with forced day', () => {
      expect(toRdf(new Date(0, 0, 17), { datatype: DF.namedNode('http://www.w3.org/2001/XMLSchema#gDay') }))
        .toEqual(DF.literal('17', DF.namedNode('http://www.w3.org/2001/XMLSchema#gDay')));
    });

    it('should handle a date number with forced day', () => {
      expect(toRdf(17, { datatype: DF.namedNode('http://www.w3.org/2001/XMLSchema#gDay') }))
        .toEqual(DF.literal('17', DF.namedNode('http://www.w3.org/2001/XMLSchema#gDay')));
    });

    it('should handle a date object with month day', () => {
      expect(toRdf(new Date(0, 2, 17)))
        .toEqual(DF.literal('1900-03-17T00:00:00.000Z', DF.namedNode('http://www.w3.org/2001/XMLSchema#dateTime')));
    });

    it('should handle a date object with forced month day', () => {
      expect(toRdf(new Date(0, 2, 17), { datatype: DF.namedNode('http://www.w3.org/2001/XMLSchema#gMonthDay') }))
        .toEqual(DF.literal('3-17', DF.namedNode('http://www.w3.org/2001/XMLSchema#gMonthDay')));
    });

    it('should handle a date object with year', () => {
      expect(toRdf(new Date('2012-01-01')))
        .toEqual(DF.literal('2012-01-01T00:00:00.000Z', DF.namedNode('http://www.w3.org/2001/XMLSchema#dateTime')));
    });

    it('should handle a date object with forced year', () => {
      expect(toRdf(new Date('2012-01-01'), { datatype: DF.namedNode('http://www.w3.org/2001/XMLSchema#gYear') }))
        .toEqual(DF.literal('2012', DF.namedNode('http://www.w3.org/2001/XMLSchema#gYear')));
    });

    it('should handle a date number with forced year', () => {
      expect(toRdf(2012, { datatype: DF.namedNode('http://www.w3.org/2001/XMLSchema#gYear') }))
        .toEqual(DF.literal('2012', DF.namedNode('http://www.w3.org/2001/XMLSchema#gYear')));
    });

    it('should handle a date object with year month', () => {
      expect(toRdf(new Date('2012-03-01')))
        .toEqual(DF.literal('2012-03-01T00:00:00.000Z', DF.namedNode('http://www.w3.org/2001/XMLSchema#dateTime')));
    });

    it('should handle a date object with forced year month', () => {
      expect(toRdf(new Date('2012-03-01'), { datatype: DF.namedNode('http://www.w3.org/2001/XMLSchema#gYearMonth') }))
        .toEqual(DF.literal('2012-3', DF.namedNode('http://www.w3.org/2001/XMLSchema#gYearMonth')));
    });
  });

  describe('for objects', () => {
    it('should error', () => {
      expect(() => toRdf({}))
        .toThrow(new Error('Invalid JavaScript value: \'[object Object]\''));
    });
  });

  describe('for undefined', () => {
    it('should error', () => {
      expect(() => toRdf(undefined))
        .toThrow(new Error('Invalid JavaScript value: \'undefined\''));
    });
  });

  describe('for null', () => {
    it('should error', () => {
      expect(() => toRdf(null))
        .toThrow(new Error('Invalid JavaScript value: \'null\''));
    });
  });
});

describe('getTermRaw', () => {
  it('should get named node values', () => {
    expect(getTermRaw(DF.namedNode('abc')))
      .toBe('abc');
  });

  it('should get literal values', () => {
    expect(getTermRaw(DF.literal('123', DF.namedNode('http://www.w3.org/2001/XMLSchema#integer'))))
      .toBe(123);
  });

  it('should get literal values and validate', () => {
    expect(getTermRaw(DF.literal('123', DF.namedNode('http://www.w3.org/2001/XMLSchema#integer')), true))
      .toBe(123);
  });
});

describe('getSupportedRdfDatatypes', () => {
  it('should return', () => {
    expect(getSupportedRdfDatatypes()).toEqual([
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
      DF.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#dirLangString'),

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
    expect(getSupportedJavaScriptPrimitives()).toEqual([
      'string',
      'boolean',
      'number',
      'object',
    ]);
  });
});

describe('TypeHandlerBoolean', () => {
  describe('toRdf', () => {
    it('should throw when called without options', () => {
      expect(() => new TypeHandlerBoolean().toRdf(true)).toThrow();
    });
  });
});

describe('TypeHandlerDate', () => {
  describe('toRdf', () => {
    it('should throw when called without options', () => {
      expect(() => new TypeHandlerDate().toRdf(new Date())).toThrow();
    });
  });
});

describe('TypeHandlerNumberDouble', () => {
  describe('toRdf', () => {
    it('should throw when called without options', () => {
      expect(() => new TypeHandlerNumberDouble().toRdf(10.5)).toThrow();
    });
  });
});

describe('TypeHandlerNumberInteger', () => {
  describe('toRdf', () => {
    it('should throw when called without options', () => {
      expect(() => new TypeHandlerNumberInteger().toRdf(10)).toThrow();
    });
  });
});

describe('TypeHandlerString', () => {
  describe('toRdf', () => {
    it('should throw when called without options', () => {
      expect(() => new TypeHandlerString().toRdf('abc')).toThrow();
    });
  });
});
