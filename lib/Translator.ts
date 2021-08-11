import * as RDF from "@rdfjs/types";
import {IToRdfOptions, ITypeHandler} from "./ITypeHandler";

/**
 * Translates between an RDF literal and a JavaScript primitive.
 */
export class Translator implements ITypeHandler {

  private readonly supportedRdfDatatypes: RDF.NamedNode[];
  private readonly fromRdfHandlers: {[rdfDatatype: string]: ITypeHandler};
  private readonly toRdfHandlers: {[javaScriptType: string]: ITypeHandler[]};

  constructor() {
    this.supportedRdfDatatypes = [];
    this.fromRdfHandlers = {};
    this.toRdfHandlers = {};
  }

  public static incorrectRdfDataType(literal: RDF.Literal) {
    throw new Error(`Invalid RDF ${literal.datatype.value} value: '${literal.value}'`);
  }

  public registerHandler(handler: ITypeHandler, rdfDatatypes: RDF.NamedNode[], javaScriptDataTypes: string[]) {
    for (const rdfDatatype of rdfDatatypes) {
      this.supportedRdfDatatypes.push(rdfDatatype);
      this.fromRdfHandlers[rdfDatatype.value] = handler;
    }
    for (const javaScriptDataType of javaScriptDataTypes) {
      let existingToRdfHandlers = this.toRdfHandlers[javaScriptDataType];
      if (!existingToRdfHandlers) {
        this.toRdfHandlers[javaScriptDataType] = existingToRdfHandlers = [];
      }
      existingToRdfHandlers.push(handler);
    }
  }

  public fromRdf(literal: RDF.Literal, validate?: boolean): any {
    const handler = this.fromRdfHandlers[literal.datatype.value];
    if (handler) {
      return handler.fromRdf(literal, validate);
    } else {
      return literal.value;
    }
  }

  public toRdf(value: any, options?: IToRdfOptions): RDF.Literal {
    const handlers = this.toRdfHandlers[typeof value];
    if (handlers) {
      for (const handler of handlers) {
        const ret = handler.toRdf(value, options);
        if (ret) {
          return ret;
        }
      }
    }
    throw new Error(`Invalid JavaScript value: '${value}'`);
  }

  /**
   * @return {NamedNode[]} An array of all supported RDF datatypes.
   */
  public getSupportedRdfDatatypes(): RDF.NamedNode[] {
    return this.supportedRdfDatatypes;
  }

  /**
   * @return {string[]} An array of all supported JavaScript types.
   */
  public getSupportedJavaScriptPrimitives(): string[] {
    return Object.keys(this.toRdfHandlers);
  }

}
