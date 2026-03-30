import type * as RDF from '@rdfjs/types';
import type { IToRdfOptions, ITypeHandler } from '../ITypeHandler';
import { Translator } from '../Translator';

/**
 * Translates dates.
 */
export class TypeHandlerDate implements ITypeHandler {
  public static readonly TYPES: string[] = [
    'http://www.w3.org/2001/XMLSchema#dateTime',
    'http://www.w3.org/2001/XMLSchema#date',
    'http://www.w3.org/2001/XMLSchema#gDay',
    'http://www.w3.org/2001/XMLSchema#gMonthDay',
    'http://www.w3.org/2001/XMLSchema#gYear',
    'http://www.w3.org/2001/XMLSchema#gYearMonth',
  ];

  private static readonly VALIDATORS: Record<string, RegExp> = {
    date: /^\d+-\d\d-\d\dZ?$/u,
    dateTime: /^\d+-\d\d-\d\dT\d\d:\d\d:\d\d(\.\d\d\d)?((Z?)|([+-]\d\d:\d\d))$/u,
    gDay: /^\d+$/u,
    gMonthDay: /^\d+-\d\d$/u,
    gYear: /^\d+$/u,
    gYearMonth: /^\d+-\d\d$/u,
  };

  public fromRdf(literal: RDF.Literal, validate?: boolean): any {
    if (validate && !TypeHandlerDate
      .VALIDATORS[literal.datatype.value.slice(33, 33 + literal.datatype.value.length)].test(literal.value)) {
      Translator.incorrectRdfDataType(literal);
    }
    switch (literal.datatype.value) {
      case 'http://www.w3.org/2001/XMLSchema#gDay':
        return new Date(0, 0, Number.parseInt(literal.value, 10));
      case 'http://www.w3.org/2001/XMLSchema#gMonthDay': {
        const partsMonthDay = literal.value.split('-');
        return new Date(0, Number.parseInt(partsMonthDay[0], 10) - 1, Number.parseInt(partsMonthDay[1], 10));
      }
      case 'http://www.w3.org/2001/XMLSchema#gYear':
        return new Date(`${literal.value}-01-01`);
      case 'http://www.w3.org/2001/XMLSchema#gYearMonth':
        return new Date(`${literal.value}-01`);
      default:
        return new Date(literal.value);
    }
  }

  public toRdf(value: any, { datatype, dataFactory }: IToRdfOptions = {}): RDF.Literal {
    datatype = datatype ?? dataFactory!.namedNode(TypeHandlerDate.TYPES[0]);

    // Assume date values
    if (!(value instanceof Date)) {
      return null!;
    }
    const date: Date = value;

    let valueString;
    switch (datatype.value) {
      case 'http://www.w3.org/2001/XMLSchema#gDay':
        valueString = String(date.getUTCDate());
        break;
      case 'http://www.w3.org/2001/XMLSchema#gMonthDay':
        valueString = `${date.getUTCMonth() + 1}-${date.getUTCDate()}`;
        break;
      case 'http://www.w3.org/2001/XMLSchema#gYear':
        valueString = String(date.getUTCFullYear());
        break;
      case 'http://www.w3.org/2001/XMLSchema#gYearMonth':
        valueString = `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}`;
        break;
      case 'http://www.w3.org/2001/XMLSchema#date':
        valueString = date.toISOString().replace(/T.*$/u, '');
        break;
      default:
        valueString = date.toISOString();
    }
    return dataFactory!.literal(valueString, datatype);
  }
}
