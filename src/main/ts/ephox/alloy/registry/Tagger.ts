import { Fun, Id, Option } from '@ephox/katamari';
import { Attr, Node, Element } from '@ephox/sugar';

import * as AlloyTags from '../ephemera/AlloyTags';
import { AlloyLogger } from '../api/Main';

const prefix = AlloyTags.prefix();
const idAttr = AlloyTags.idAttr();

const write = (label: string, elem: Element): string => {
  const id: string = Id.generate(prefix + label);
  writeOnly(elem, id);
  return id;
};

const writeOnly = (elem: Element, uid: string) => {
  // FIX here.
  Object.defineProperty(elem.dom(), idAttr, {
    value: uid,
    writable: true
  });
};

const read = (elem: Element): Option<string> => {
  const id = Node.isElement(elem) ? elem.dom()[idAttr] : null;
  return Option.from(id);
};

const readOrDie = (elem: Element): string => {
  return read(elem).getOrDie('Could not find alloy uid in: ' + AlloyLogger.element(elem));
};

const generate = (prefix: string): string => {
  return Id.generate(prefix);
};

const revoke = (elem: Element): void => {
  // This looks like it is only used by ForeignGui, which is experimental.
  writeOnly(elem, null);
};

// TODO: Consider deprecating.
const attribute: () => string = Fun.constant(idAttr);

export {
  revoke,
  write,
  writeOnly,
  read,
  readOrDie,
  generate,
  attribute
};