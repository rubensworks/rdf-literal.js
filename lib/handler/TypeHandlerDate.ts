import * as RDF from "@rdfjs/types";
import {IToRdfOptions, ITypeHandler} from "../ITypeHandler";
import {Translator} from "../Translator";

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
  private static readonly VALIDATORS: {[type: string]: RegExp} = {
    date: /^[0-9]+-[0-9][0-9]-[0-9][0-9]Z?$/,
    dateTime: /^[0-9]+-[0-9][0-9]-[0-9][0-9]T[0-9][0-9]:[0-9][0-9]:[0-9][0-9](\.[0-9][0-9][0-9])?((Z?)|([\+-][0-9][0-9]:[0-9][0-9]))$/,
    gDay: /^[0-9]+$/,
    gMonthDay: /^[0-9]+-[0-9][0-9]$/,
    gYear: /^[0-9]+$/,
    gYearMonth: /^[0-9]+-[0-9][0-9]$/,
  };

  public fromRdf(literal: RDF.Literal, validate?: boolean): any {
    if (validate && !literal.value.match(TypeHandlerDate
      .VALIDATORS[literal.datatype.value.substr(33, literal.datatype.value.length)])) {
      Translator.incorrectRdfDataType(literal);
    }
    switch (literal.datatype.value) {
    case 'http://www.w3.org/2001/XMLSchema#gDay':
      return new Date(0, 0, parseInt(literal.value, 10));
    case 'http://www.w3.org/2001/XMLSchema#gMonthDay':
      const partsMonthDay = literal.value.split('-');
      return new Date(0, parseInt(partsMonthDay[0], 10) - 1, parseInt(partsMonthDay[1], 10));
    case 'http://www.w3.org/2001/XMLSchema#gYear':
      return new Date(literal.value + '-01-01');
    case 'http://www.w3.org/2001/XMLSchema#gYearMonth':
      return new Date(literal.value + '-01');
    default:
      return new Date(literal.value);
    }
  }

  public toRdf(value: any, { datatype, dataFactory }: IToRdfOptions): RDF.Literal {
    datatype = datatype || dataFactory!.namedNode(TypeHandlerDate.TYPES[0]);

    // Assume date values
    if (!(value instanceof Date)) {
      return null!; // TODO: throw error in next breaking change
    }
    const date: Date = <Date> value;

    let valueString;
    switch (datatype.value) {
    case 'http://www.w3.org/2001/XMLSchema#gDay':
      valueString = String(date.getUTCDate());
      break;
    case 'http://www.w3.org/2001/XMLSchema#gMonthDay':
      valueString = (date.getUTCMonth() + 1) + '-' + date.getUTCDate();
      break;
    case 'http://www.w3.org/2001/XMLSchema#gYear':
      valueString = String(date.getUTCFullYear());
      break;
    case 'http://www.w3.org/2001/XMLSchema#gYearMonth':
      valueString = date.getUTCFullYear() + '-' + (date.getUTCMonth() + 1);
      break;
    case 'http://www.w3.org/2001/XMLSchema#date':
      valueString = date.toISOString().replace(/T.*$/, '');
      break;
    default:
      valueString = date.toISOString();
    }
    return dataFactory!.literal(valueString, datatype);
  }

}
