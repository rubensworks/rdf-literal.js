import * as RDF from "rdf-js";
import {ITypeHandler} from "../ITypeHandler";
import {Translator} from "../Translator";

/**
 * Translates double numbers.
 */
export class TypeHandlerNumberDouble implements ITypeHandler {

  public static readonly TYPES: string[] = [
    'http://www.w3.org/2001/XMLSchema#double',
    'http://www.w3.org/2001/XMLSchema#decimal',
    'http://www.w3.org/2001/XMLSchema#float',
  ];

  public fromRdf(literal: RDF.Literal, validate?: boolean): any {
    const parsed = parseFloat(literal.value);
    if (validate) {
      if (isNaN(parsed)) {
        Translator.incorrectRdfDataType(literal);
      }
      // TODO: validate more
    }
    return parsed;
  }

  public toRdf(value: any, dataFactory: RDF.DataFactory): RDF.Literal {
    if (isNaN(value)) {
      return dataFactory.literal('NaN', dataFactory.namedNode(TypeHandlerNumberDouble.TYPES[0]));
    }
    if (!isFinite(value)) {
      return dataFactory.literal(value > 0 ? 'INF' : '-INF', dataFactory.namedNode(TypeHandlerNumberDouble.TYPES[0]));
    }
    if (value % 1 === 0) {
      return null;
    }
    return dataFactory.literal(value.toExponential(15).replace(/(\d)0*e\+?/, '$1E'),
      dataFactory.namedNode(TypeHandlerNumberDouble.TYPES[0]));
  }

}
