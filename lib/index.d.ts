import { View } from '@quenk/wml';
import { Future } from '@quenk/noni/lib/control/monad/future';
import { Action, Api, Context } from '@quenk/tendril/lib/app/api';
import { Content } from '@quenk/tendril/lib/app/show';
/**
 * @private
 */
export declare class Render<A> extends Api<A> {
    view: View;
    status: number;
    next: A;
    constructor(view: View, status: number, next: A);
    map<B>(f: (a: A) => B): Render<B>;
    exec(ctx: Context<A>): Future<A>;
}
/**
 * render a WML view by sending the HTML to the client.
 */
export declare const render: (view: View, status?: number) => Action<void>;
/**
 * show the result of parsing a template with optional context.
 */
export declare const show: (path: string, ctx?: object) => Future<Content>;
