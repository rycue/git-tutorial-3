// complicated-feature.ts

interface State {
  value: number;
  history: number[];
}

interface Action {
  type: string;
  payload: number;
}

type Reducer<S, A> = (state: S, action: A) => S;

type Middleware<S, A> = (store: Store<S, A>) => (next: Reducer<S, A>) => Reducer<S, A>;

interface Store<S, A> {
  getState: () => S;
  dispatch: (action: A) => void;
  subscribe: (listener: () => void) => () => void;
  applyMiddleware: (...middleware: Middleware<S, A>[]) => void;
}

class Store<S, A> {
  private state: S;
  private listeners: (() => void)[] = [];
  private middleware: Middleware<S, A>[] = [];

  constructor(private reducer: Reducer<S, A>, initialState: S) {
    this.state = initialState;
  }

  getState(): S {
    return this.state;
  }

  dispatch(action: A): void {
    this.state = this.reducer(this.state, action);
    this.listeners.forEach((listener) => listener());
  }

  subscribe(listener: () => void): () => void {
    this.listeners.push(listener);
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index !== -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  applyMiddleware(...middleware: Middleware<S, A>[]): void {
    this.middleware = middleware;
  }

  private composeMiddleware(): Middleware<S, A> {
    return this.middleware.reduce((a, b) => (store) => b(store)(a(store)), (store) => store.dispatch);
  }

  private enhancer(): Reducer<S, A> {
    return (state, action) => {
      const middleware = this.composeMiddleware();
      return middleware(this)(state, action);
    };
  }
}

const initialState: State = { value: 0, history: [] };

const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { value: state.value + action.payload, history: [...state.history, state.value] };
    case 'DECREMENT':
      return { value: state.value - action.payload, history: [...state.history, state.value] };
    default:
      return state;
  }
};

const store = new Store(reducer, initialState);

const incrementAction: Action = { type: 'INCREMENT', payload: 1 };
const decrementAction: Action = { type: 'DECREMENT', payload: 1 };

store.dispatch(incrementAction);
store.dispatch(decrementAction);

console.log(store.getState());

const unsubscribe = store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(incrementAction);
unsubscribe();