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

    it('should handle dateTimes as strings', () => {
      return expect(fromRdf(literal('2012-03-18T00:00:00',
        namedNode('http://www.w3.org/2001/XMLSchema#dateTimes'))))
        .toEqual('2012-03-18T00:00:00');
    });

    it('should handle dates as strings', () => {
      return expect(fromRdf(literal('2012-03-18',
        namedNode('http://www.w3.org/2001/XMLSchema#date'))))
        .toEqual('2012-03-18');
    });

    it('should handle times as strings', () => {
      return expect(fromRdf(literal('T00:00:00',
        namedNode('http://www.w3.org/2001/XMLSchema#time'))))
        .toEqual('T00:00:00');
    });

    it('should handle gDays as strings', () => {
      return expect(fromRdf(literal('18',
        namedNode('http://www.w3.org/2001/XMLSchema#gDay'))))
        .toEqual('18');
    });

    it('should handle gMonthDays as strings', () => {
      return expect(fromRdf(literal('03-18',
        namedNode('http://www.w3.org/2001/XMLSchema#gMonthDays'))))
        .toEqual('03-18');
    });

    it('should handle gYears as strings', () => {
      return expect(fromRdf(literal('2018',
        namedNode('http://www.w3.org/2001/XMLSchema#gYear'))))
        .toEqual('2018');
    });

    it('should handle gYearMonths as strings', () => {
      return expect(fromRdf(literal('2018-03',
        namedNode('http://www.w3.org/2001/XMLSchema#gYearMonth'))))
        .toEqual('2018-03');
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

});

describe('toRdf', () => {

  describe('for strings', () => {

    it('should handle strings with custom data factory', () => {
      return expect(toRdf('abc', DataFactory))
        .toEqual(literal('abc'));
    });

    it('should handle strings', () => {
      return expect(toRdf('abc'))
        .toEqual(literal('abc'));
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

  });

  describe('for integers', () => {

    it('should handle an integer', () => {
      return expect(toRdf(10))
        .toEqual(literal('10', namedNode('http://www.w3.org/2001/XMLSchema#integer')));
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

  describe('for objects', () => {
    it('should error', () => {
      return expect(() => toRdf({}))
        .toThrow(new Error('Invalid JavaScript value: \'[object Object]\''));
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

      /*namedNode('http://www.w3.org/2001/XMLSchema#dateTime'),
      namedNode('http://www.w3.org/2001/XMLSchema#date'),
      namedNode('http://www.w3.org/2001/XMLSchema#time'),
      namedNode('http://www.w3.org/2001/XMLSchema#gDay'),
      namedNode('http://www.w3.org/2001/XMLSchema#gMonthDay'),
      namedNode('http://www.w3.org/2001/XMLSchema#gYear'),
      namedNode('http://www.w3.org/2001/XMLSchema#gYearMonth'),*/

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
    ]);
  });
});

describe('getSupportedJavaScriptPrimitives', () => {
  it('should return', () => {
    return expect(getSupportedJavaScriptPrimitives()).toEqual([
      'string',
      'boolean',
      'number',
    ]);
  });
});
