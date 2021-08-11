import * as RDF from "@rdfjs/types";
import {IToRdfOptions, ITypeHandler} from "../ITypeHandler";
import {Translator} from "../Translator";

/**
 * Translates integer numbers.
 */
export class TypeHandlerNumberInteger implements ITypeHandler {

  public static readonly TYPES: string[] = [
    'http://www.w3.org/2001/XMLSchema#integer',
    'http://www.w3.org/2001/XMLSchema#long',
    'http://www.w3.org/2001/XMLSchema#int',
    'http://www.w3.org/2001/XMLSchema#byte',
    'http://www.w3.org/2001/XMLSchema#short',
    'http://www.w3.org/2001/XMLSchema#negativeInteger',
    'http://www.w3.org/2001/XMLSchema#nonNegativeInteger',
    'http://www.w3.org/2001/XMLSchema#nonPositiveInteger',
    'http://www.w3.org/2001/XMLSchema#positiveInteger',
    'http://www.w3.org/2001/XMLSchema#unsignedByte',
    'http://www.w3.org/2001/XMLSchema#unsignedInt',
    'http://www.w3.org/2001/XMLSchema#unsignedLong',
    'http://www.w3.org/2001/XMLSchema#unsignedShort',
  ];
  public static readonly MAX_INT: number = 2147483647;
  public static readonly MIN_INT: number = -2147483648;

  public fromRdf(literal: RDF.Literal, validate?: boolean): any {
    const parsed = parseInt(literal.value, 10);
    if (validate) {
      if (isNaN(parsed) || literal.value.indexOf('.') >= 0) {
        Translator.incorrectRdfDataType(literal);
      }
      // TODO: validate more
    }
    return parsed;
  }

  public toRdf(value: any, { datatype, dataFactory }: IToRdfOptions): RDF.Literal {
    return dataFactory.literal(String(value), datatype
      || (value <= TypeHandlerNumberInteger.MAX_INT && value >= TypeHandlerNumberInteger.MIN_INT
        ? dataFactory.namedNode(TypeHandlerNumberInteger.TYPES[0])
        : dataFactory.namedNode(TypeHandlerNumberInteger.TYPES[1])));
  }

}
