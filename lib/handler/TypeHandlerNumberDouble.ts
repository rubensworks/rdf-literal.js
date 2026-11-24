import type * as RDF from '@rdfjs/types';
import type { IToRdfOptions, ITypeHandler } from '../ITypeHandler';
import { Translator } from '../Translator';

const TYPE_DOUBLE = 'http://www.w3.org/2001/XMLSchema#double';
const TYPE_DECIMAL = 'http://www.w3.org/2001/XMLSchema#decimal';
const TYPE_FLOAT = 'http://www.w3.org/2001/XMLSchema#float';

/**
 * Translates double numbers.
 */
export class TypeHandlerNumberDouble implements ITypeHandler {
  public static readonly TYPES: string[] = [
    TYPE_DOUBLE,
    TYPE_DECIMAL,
    TYPE_FLOAT,
  ];

  public fromRdf(literal: RDF.Literal, validate?: boolean): any {
    const datatype = literal.datatype.value;
    if (datatype === TYPE_DOUBLE || datatype === TYPE_FLOAT) {
      switch (literal.value) {
        case 'INF':
          return Number.POSITIVE_INFINITY;
        case '-INF':
          return Number.NEGATIVE_INFINITY;
      }
    }
    const parsed = Number.parseFloat(literal.value);
    if (validate && Number.isNaN(parsed)) {
      Translator.incorrectRdfDataType(literal);
    }
    // TODO: validate more
    return parsed;
  }

  public toRdf(value: any, { datatype, dataFactory }: IToRdfOptions = {}): RDF.Literal {
    datatype = datatype ?? dataFactory!.namedNode(TypeHandlerNumberDouble.TYPES[0]);
    if (Number.isNaN(<number> value)) {
      return dataFactory!.literal('NaN', datatype);
    }
    if (!Number.isFinite(<number> value)) {
      return dataFactory!.literal(value > 0 ? 'INF' : '-INF', datatype);
    }
    if (value % 1 === 0) {
      // TODO: throw error in next breaking change
      return null!;
    }
    return dataFactory!.literal((<number> value).toExponential(15).replace(/(\d)0*e\+?/u, '$1E'), datatype);
  }
}
