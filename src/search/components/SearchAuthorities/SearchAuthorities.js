import React, { useState, useEffect } from 'react';

import MultiSelect from '../../../common/components/MultiSelect';
import { buildAuthorityQuery, getAuthorityKeywords } from '../../../common/services/authorityApi';

export default function SearchAuthorities(props) {
  // TODO: add keyword fetching indicator.
  // TODO: every time this component is unmounted then mounted, keywords are fetched again.
  // TODO: (cont.) consider lifting state into parent component which would also prevent callbacks
  // TODO: (cont.) on an unmounted component.
  const [keywords, setKeywords] = useState(null);
  const [selectedKeywords, setSelectedKeywords] = useState([]);

  const { className, onQueryChange } = props;

  useEffect(() => {
    const fetchKeywords = async () => {
      const response = await getAuthorityKeywords();
      if (!response.error) setKeywords(response.data);
    };
    fetchKeywords();
  }, []);

  const handleKeywordsChange = newSelectedKeywords => {
    setSelectedKeywords(newSelectedKeywords);
    onQueryChange(buildAuthorityQuery(newSelectedKeywords));
  };

  const keywordItems =
    keywords &&
    keywords.map(keyword => ({
      label: keyword.name,
      value: keyword.authorityKeywordID
    }));

  return (
    <div className={className}>
      {keywords && (
        <MultiSelect
          inputLabel="keywords-label"
          inputId="keywords"
          items={keywordItems}
          selectedValues={selectedKeywords}
          onChange={handleKeywordsChange}
          renderLabel={selected =>
            selected.length === 0 ? 'Select Keywords' : `${selected.length} Keywords Selected`
          }
        />
      )}
    </div>
  );
}
