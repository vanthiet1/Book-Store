import  { Suspense, lazy } from 'react';

const LazyLoader = ({ component: Component, ...rest }) => {
  const LazyComponent = lazy(Component);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent {...rest} />
    </Suspense>
  );
};

export default LazyLoader;
