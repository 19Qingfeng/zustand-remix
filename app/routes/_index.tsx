import {
  defer,
  type LoaderFunction,
  type V2_MetaFunction,
} from '@remix-run/node';
import { Await, useLoaderData } from '@remix-run/react';
import { Suspense } from 'react';
import { ChildComponent } from '~/components/Child';
import { BaseStoreContext, createBearStore } from '~/store/baseStore';

export const meta: V2_MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};

export const loader: LoaderFunction = () => {
  const basePromise = new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: { name: 'wang.haoyu' },
      });
    }, 1000);
  });

  return defer({
    basePromise,
  });
};

export default function Index() {
  const { basePromise } = useLoaderData();

  // When I want to obtain some initialization data from the server stream
  // I cannot initialize the warehouse here and then update it in Await. This will result in infinite re rendering

  // eg: const reactStore = create(); Create a react reactive store
  // when i update reactStore in Suspense Child Component,the component will rerender Infinite

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.8' }}>
      <Suspense fallback={<div>loading....</div>}>
        <Await<{ data: { name: 'wang.haoyu' } }> resolve={basePromise}>
          {(data) => {
            // I can only create a warehouse here and pass it down through context
            const store = createBearStore(data.data);
            return (
              <BaseStoreContext.Provider value={store}>
                <ChildComponent />
              </BaseStoreContext.Provider>
            );
          }}
        </Await>
      </Suspense>
    </div>
  );
}
