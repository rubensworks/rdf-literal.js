import * as RDF from "rdf-js";

/**
 * A type handler translates between an RDF literal and a JavaScript primitive.
 *
 * {@link fromRdf} should always be the reverse operation of {@link toRdf}.
 * I.e., `fromRdf(toRdf(val)) === val)`.
 * However, the other direction should not necessarily apply,
 * as there is a loss of information in {@link fromRdf},
 * so `toRdf(fromRdf(val)).equals(val)` will not always be true.
 */
export interface ITypeHandler {

  /**
   * Convert the given RDF literal to an JavaScript primitive.
   * @param {Literal} literal An RDF literal value.
   * @param {boolean} validate If the literal value should be validated against the datatype.
   * @return {any} A JavaScript primitive value.
   */
  fromRdf(literal: RDF.Literal, validate?: boolean): any;

  /**
   * Convert the given JavaScript primitive to an RDF literal.
   * @param value A JavaScript primitive value.
   * @param dataFactory The data factory to create terms with.
   * @return {Literal} An RDF literal value.
   */
  toRdf(value: any, dataFactory: RDF.DataFactory): RDF.Literal;

}
