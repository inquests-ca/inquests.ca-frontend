import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';

export default function CaspioEmbedding(props) {
  const [script, setScript] = useState(null);

  useEffect(() => {
    const script = document.createElement('script');

    script.src =
      'https://c1acn408.caspio.com/dp/9cae7000bf832e8e00db413a96ee/emb';
    script.async = true;

    setScript(script);
  }, []);

  return (
    <Helmet>
      <script
        type="text/javascript"
        src="https://c1acn408.caspio.com/dp/9cae7000bf832e8e00db413a96ee/emb"
      ></script>
    </Helmet>
  );
}
