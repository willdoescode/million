import { props } from './drivers/props';
import { flush } from './patch';
import { DOMNode, OLD_VNODE_FIELD, VNode } from './types/base';

const diffProps = props();

/**
 * Creates an Element from a VNode
 */
export const createElement = (vnode: VNode, attachField = true): DOMNode => {
  if (typeof vnode === 'string') return document.createTextNode(vnode);

  const el = vnode.props?.ns
    ? <SVGElement>document.createElementNS(<string>vnode.props?.ns, vnode.tag)
    : <HTMLElement>document.createElement(vnode.tag);

  flush(diffProps(el, vnode).workStack);

  if (vnode.children) {
    for (const childEl of vnode.children) {
      el.appendChild(createElement(childEl));
    }
  }

  if (attachField) el[OLD_VNODE_FIELD] = vnode;

  return el;
};
