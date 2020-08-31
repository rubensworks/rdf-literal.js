import { DataFactory } from "rdf-data-factory";
import * as RDF from "rdf-js";
import {
  TypeHandlerBoolean,
  TypeHandlerDate,
  TypeHandlerNumberDouble,
  TypeHandlerNumberInteger,
  TypeHandlerString,
} from "./lib/handler";
import {IToRdfOptions} from "./lib/ITypeHandler";
import {Translator} from "./lib/Translator";

export * from "./lib/handler";
export * from "./lib/ITypeHandler";
export * from "./lib/Translator";

const DF = new DataFactory();

// Construct translator with built-in handlers
const translator = new Translator();
translator.registerHandler(
  new TypeHandlerString(),
  TypeHandlerString.TYPES.map(t => DF.namedNode(t)),
  ['string']);
translator.registerHandler(
  new TypeHandlerBoolean(),
  [TypeHandlerBoolean.TYPE].map(t => DF.namedNode(t)),
  ['boolean']);
translator.registerHandler(
  new TypeHandlerNumberDouble(),
  TypeHandlerNumberDouble.TYPES.map(t => DF.namedNode(t)),
  ['number']);
translator.registerHandler(
  new TypeHandlerNumberInteger(),
  TypeHandlerNumberInteger.TYPES.map(t => DF.namedNode(t)),
  ['number']);
translator.registerHandler(
  new TypeHandlerDate(),
  TypeHandlerDate.TYPES.map(t => DF.namedNode(t)),
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
 * @param options Options for RDF conversion. May also be a data factory.
 * @return {Literal} An RDF literal value.
 */
export function toRdf(value: any, options?: IToRdfOptions | RDF.DataFactory): RDF.Literal {
  // Backwards-compatibility to accept data factory as option arg.
  if (options && 'namedNode' in options) {
    options = { dataFactory: options };
  }

  // Set default data factory
  options = <IToRdfOptions> options || {};
  if (options && !options.dataFactory) {
    options.dataFactory = DF;
  }

  return translator.toRdf(value, options);
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
