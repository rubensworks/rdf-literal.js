import * as RDF from "rdf-js";
import {ITypeHandler} from "../ITypeHandler";

/**
 * Translates strings.
 */
export class TypeHandlerString implements ITypeHandler {

  public static readonly TYPES: string[] = [
    'http://www.w3.org/2001/XMLSchema#string',
    'http://www.w3.org/2001/XMLSchema#normalizedString',
    'http://www.w3.org/2001/XMLSchema#anyURI',
    'http://www.w3.org/2001/XMLSchema#base64Binary',
    'http://www.w3.org/2001/XMLSchema#language',
    'http://www.w3.org/2001/XMLSchema#Name',
    'http://www.w3.org/2001/XMLSchema#NCName',
    'http://www.w3.org/2001/XMLSchema#NMTOKEN',
    'http://www.w3.org/2001/XMLSchema#token',
    'http://www.w3.org/2001/XMLSchema#hexBinary',
    'http://www.w3.org/1999/02/22-rdf-syntax-ns#langString',

    // Dates are not explicitly supported, as JS's Date object is quite crappy.
    /*'http://www.w3.org/2001/XMLSchema#dateTime',
    'http://www.w3.org/2001/XMLSchema#date',
    'http://www.w3.org/2001/XMLSchema#time',
    'http://www.w3.org/2001/XMLSchema#gDay',
    'http://www.w3.org/2001/XMLSchema#gMonthDay',
    'http://www.w3.org/2001/XMLSchema#gYear',
    'http://www.w3.org/2001/XMLSchema#gYearMonth',*/
  ];

  public fromRdf(literal: RDF.Literal): any {
    return literal.value;
  }

  public toRdf(value: any, dataFactory: RDF.DataFactory): RDF.Literal {
    return dataFactory.literal(value);
  }

}
