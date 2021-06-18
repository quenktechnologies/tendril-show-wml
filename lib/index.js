"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.show = exports.render = exports.Render = void 0;
const headers = require("@quenk/tendril/lib/net/http/headers");
const future_1 = require("@quenk/noni/lib/control/monad/future");
const pointer_1 = require("@quenk/noni/lib/platform/node/module/pointer");
const api_1 = require("@quenk/tendril/lib/app/api");
const free_1 = require("@quenk/noni/lib/control/monad/free");
/**
 * @private
 */
class Render extends api_1.Api {
    constructor(view, status, next) {
        super(next);
        this.view = view;
        this.status = status;
        this.next = next;
    }
    map(f) {
        return new Render(this.view, this.status, f(this.next));
    }
    exec(ctx) {
        let { response } = ctx;
        let { view, status, next } = this;
        response.set(headers.CONTENT_TYPE, 'text/html');
        response.status(status);
        response.write(view.render().outerHTML);
        response.end();
        return future_1.pure(next);
    }
}
exports.Render = Render;
/**
 * render a WML view by sending the HTML to the client.
 */
const render = (view, status = 200) => free_1.liftF(new Render(view, status, undefined));
exports.render = render;
/**
 * show the result of parsing a template with optional context.
 */
const show = (path, ctx = {}) => future_1.doFuture(function* () {
    let eCons = pointer_1.interp(path, require);
    if (eCons.isLeft()) {
        return future_1.fromExcept(eCons);
    }
    let Cons = eCons.takeRight();
    let view = yield future_1.attempt(() => new Cons(ctx));
    return future_1.pure({
        type: 'text/html',
        content: view.render().outerHTML
    });
});
exports.show = show;
//# sourceMappingURL=index.js.map