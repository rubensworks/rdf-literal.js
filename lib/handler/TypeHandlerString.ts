import * as RDF from "rdf-js";
import {IToRdfOptions, ITypeHandler} from "../ITypeHandler";

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

    'http://www.w3.org/2001/XMLSchema#time',
    'http://www.w3.org/2001/XMLSchema#duration',
  ];

  public fromRdf(literal: RDF.Literal): any {
    return literal.value;
  }

  public toRdf(value: any, { datatype, dataFactory }: IToRdfOptions): RDF.Literal {
    return dataFactory.literal(value, datatype);
  }

}
