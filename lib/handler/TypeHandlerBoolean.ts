import * as RDF from "rdf-js";
import {ITypeHandler} from "../ITypeHandler";
import {Translator} from "../Translator";

/**
 * Translates booleans.
 */
export class TypeHandlerBoolean implements ITypeHandler {

  public static readonly TYPE: string = 'http://www.w3.org/2001/XMLSchema#boolean';

  public fromRdf(literal: RDF.Literal, validate?: boolean): any {
    switch (literal.value) {
    case 'true':
      return true;
    case 'false':
      return false;
    case '1':
      return true;
    case '0':
      return false;
    }
    if (validate) {
      Translator.incorrectRdfDataType(literal);
    }
    return false;
  }

  public toRdf(value: any, dataFactory: RDF.DataFactory): RDF.Literal {
    return dataFactory.literal(value ? 'true' : 'false', dataFactory.namedNode(TypeHandlerBoolean.TYPE));
  }

}
