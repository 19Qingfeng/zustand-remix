import {
  defer,
  type LoaderFunction,
  type V2_MetaFunction,
} from '@remix-run/node';
import { Await, useLoaderData } from '@remix-run/react';
import { Suspense } from 'react';
import useStore from '../store/secondStore';

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
  // I cannot initialize the warehouse here and then update it in Await. This will result in Many times re rendering
  const changeName = useStore((state) => state.changeName);

  // log Twice, The entire Index will be rendered again
  console.log(changeName, 'changeName');

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.8' }}>
      <Suspense fallback={<div>loading....</div>}>
        <Await<{ data: { name: 'wang.haoyu' } }> resolve={basePromise}>
          {(data) => {
            // Multiple calls
            changeName(data.data.name);
            return <div>Child</div>;
          }}
        </Await>
      </Suspense>
    </div>
  );
}
