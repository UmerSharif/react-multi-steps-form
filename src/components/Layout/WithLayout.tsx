import React from 'react';

const withLayout = (Component, Layout, layoutProps = {}) => {
  const LayoutComponent = (props) => {
    const { layout } = props;
    return (
      <Layout {...layoutProps}>
        <Component {...props} />
      </Layout>
    );
  };
  const componentName = Component.displayName || Component.name || 'Unknown';
  LayoutComponent.displayName = `Layout(${componentName})`;

  // Need something to fetch initial props
  return LayoutComponent;
};

export default withLayout;
