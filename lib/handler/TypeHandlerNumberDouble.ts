import * as RDF from "@rdfjs/types";
import {IToRdfOptions, ITypeHandler} from "../ITypeHandler";
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

  public toRdf(value: any, { datatype, dataFactory }: IToRdfOptions): RDF.Literal {
    datatype = datatype || dataFactory.namedNode(TypeHandlerNumberDouble.TYPES[0]);
    if (isNaN(value)) {
      return dataFactory.literal('NaN', datatype);
    }
    if (!isFinite(value)) {
      return dataFactory.literal(value > 0 ? 'INF' : '-INF', datatype);
    }
    if (value % 1 === 0) {
      return null;
    }
    return dataFactory.literal(value.toExponential(15).replace(/(\d)0*e\+?/, '$1E'), datatype);
  }

}
