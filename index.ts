import * as DataFactory from "@rdfjs/data-model";
import * as RDF from "rdf-js";
import {
  TypeHandlerBoolean,
  TypeHandlerDate,
  TypeHandlerNumberDouble,
  TypeHandlerNumberInteger,
  TypeHandlerString,
} from "./lib/handler";
import {Translator} from "./lib/Translator";

export * from "./lib/handler";
export * from "./lib/ITypeHandler";
export * from "./lib/Translator";

// Construct translator with built-in handlers
const translator = new Translator();
translator.registerHandler(
  new TypeHandlerString(),
  TypeHandlerString.TYPES.map(DataFactory.namedNode),
  ['string']);
translator.registerHandler(
  new TypeHandlerBoolean(),
  [TypeHandlerBoolean.TYPE].map(DataFactory.namedNode),
  ['boolean']);
translator.registerHandler(
  new TypeHandlerNumberDouble(),
  TypeHandlerNumberDouble.TYPES.map(DataFactory.namedNode),
  ['number']);
translator.registerHandler(
  new TypeHandlerNumberInteger(),
  TypeHandlerNumberInteger.TYPES.map(DataFactory.namedNode),
  ['number']);
translator.registerHandler(
  new TypeHandlerDate(),
  TypeHandlerDate.TYPES.map(DataFactory.namedNode),
  ['object']);

/**
 * Convert the given RDF literal to an JavaScript primitive.
 * @param {Literal} literal An RDF literal value.
 * @param {boolean} validate If the literal value should be validated against the datatype.
 * @return {any} A JavaScript primitive value.
 */
export function fromRdf(literal: RDF.Literal, validate?: boolean): any {
  return translator.fromRdf(literal, validate);
}

/**
 * Convert the given JavaScript primitive to an RDF literal.
 * @param value A JavaScript primitive value.
 * @param dataFactory An optional data factory to create terms with.
 * @return {Literal} An RDF literal value.
 */
export function toRdf(value: any, dataFactory?: RDF.DataFactory): RDF.Literal {
  return translator.toRdf(value, dataFactory || DataFactory);
}

/**
 * Get the raw value of the given term.
 * If it is a literal, {@link fromRdf} will be called.
 * Otherwise {@link .value} will be returned.
 * @param {Term} term Any RDF term.
 * @param {boolean} validate If the literal value should be validated against the datatype.
 * @return {any} A JavaScript primitive value.
 */
export function getTermRaw(term: RDF.Term, validate?: boolean): any {
  if (term.termType === 'Literal') {
    return fromRdf(term, validate);
  }
  return term.value;
}

/**
 * @return {NamedNode[]} An array of all supported RDF datatypes.
 */
export function getSupportedRdfDatatypes(): RDF.NamedNode[] {
  return translator.getSupportedRdfDatatypes();
}

/**
 * @return {string[]} An array of all supported JavaScript types.
 */
export function getSupportedJavaScriptPrimitives(): string[] {
  return translator.getSupportedJavaScriptPrimitives();
}
