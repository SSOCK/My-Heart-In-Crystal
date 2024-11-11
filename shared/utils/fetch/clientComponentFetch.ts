'use client';

import errorIntercept from './errorIntercept';

const clientComponentFetch = async (url: string, init?: RequestInit) => {
  const defaultInit: RequestInit = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-cache',
  };

  const finalInit = init ? { ...defaultInit, ...init } : defaultInit;

  try {
    const res = await fetch(url, finalInit);
    await errorIntercept(res);
    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error('Fetching Error: ' + error);
  }
};

export default clientComponentFetch;
