import { HTMLElement as NHTMLElement } from 'node-html-parser';

const PARAMS_FLAG = 'data-mm-props';

export default function get_params(node: NHTMLElement) {
	const params_str = node.attributes[PARAMS_FLAG];
	return params_str ? JSON.parse(`${params_str}`) : {};
}
