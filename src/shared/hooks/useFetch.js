import { useReducer, useEffect } from 'react';

const defaultInitialState = { data: null, isLoading: false, error: null };

const init = initialState => initialState || defaultInitialState;

const reducer = (state, { type, data, error }) => {
  switch (type) {
    case 'pending':
      return {
        ...state,
        isLoading: true,
        data: defaultInitialState.data,
        error: defaultInitialState.error
      };
    case 'success':
      return {
        ...state,
        isLoading: defaultInitialState.isLoading,
        data,
        error: defaultInitialState.error
      };
    case 'error':
      return {
        ...state,
        data: defaultInitialState.data,
        isLoading: defaultInitialState.isLoading,
        error
      };
    default:
      throw new Error();
  }
};

const useFetch = ({ url, initialState, shouldFetch = true }) => {
  const [state, dispatch] = useReducer(reducer, initialState, init);

  const fetchUrl = async ({ signal }) => {
    dispatch({ type: 'pending' });

    try {
      const response = await fetch(url, {
        signal,
      });
      const json = await response.json();

      dispatch({ type: 'success', data: json });
    } catch (error) {
      dispatch({ type: 'error', error });
    }
  };

  useEffect(() => {
    const controller = new AbortController();

    shouldFetch && fetchUrl({ signal: controller.signal });

    return () => {
      controller.abort();
    };
  }, [shouldFetch, url]);

  return state;
};

export default useFetch;
