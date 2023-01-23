import { Component, h, State } from '@stencil/core';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
  shadow: true,
})
export class AppRoot {
  @State() showRxJSTodos = true;
  @State() showStencilStoreTodos = true;
  render() {
    return (
      <div>
        <header>
          <h1>Stencil Redux Example</h1>
        </header>

        <main>
          <section style={{ "display": "flex" }}>
            <button onClick={() => this.showRxJSTodos = !this.showRxJSTodos}>Toggle RxJS Todos</button>
            <button onClick={() => this.showStencilStoreTodos = !this.showStencilStoreTodos}>Toggle Stencil/Store Todos</button>

          </section>

          <section style={{ "display": "flex", "gap": "32px" }}>
            {this.showRxJSTodos && <app-todos></app-todos>
            }
            {this.showStencilStoreTodos && <app-stencil-store-todos></app-stencil-store-todos>}

          </section>
        </main>
      </div>
    );
  }
}
