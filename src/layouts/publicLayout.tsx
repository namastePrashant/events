import React from 'react';
import { Layout } from 'antd';

interface PublicLayoutInterface {
  children?: any;
}

const PublicLayout: React.FC<PublicLayoutInterface> = (props) => {
  const { children } = props;

  return (
    <Layout>
      {children}
    </Layout>
  )
}

export default PublicLayout;
