import { HTMLElement } from 'node-html-parser';
import init_ai from './n-ai';
import { IActions, IEvents } from './interfaces';
import get_params from './get-params';

const EVENTS_INIT = 'mm-events-init';

export default function init(no: string, html: string, events: IEvents, actions: IActions, doc: HTMLElement, url: string, msg: unknown, headers: object, query: object, data = {}) {
	const node_list = doc.querySelectorAll(no);
	return Promise.all(node_list.map((node) => {
		if (html) {
			node.set_content(html);
		}
		const params = {
			...query,
			...get_params(node)
		};
		const ai = init_ai({ ...data, no, node, params, url, msg, ...headers, headers }, actions, events);
		if (EVENTS_INIT in events) {
			return ai.emit(EVENTS_INIT, params).catch((e: Error) => {
				const m = e.message || (e.toString && e.toString()) || 'Error';
				console.error(m);
				return m;
			});
		}
		return Promise.resolve();
	}));
}
