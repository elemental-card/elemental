import React from 'react';
import '../styles/PlacementIndicator.css';

const getClassName = (place) => {
  if (place === 1) {
    return 'PlacementIndicator PlacementIndicator--gold';
  } else if (place === 2) {
    return 'PlacementIndicator PlacementIndicator--silver';
  } else if (place === 3) {
    return 'PlacementIndicator PlacementIndicator--bronze';
  } else {
    return 'PlacementIndicator';
  }
};

export default ({ place }) => (
  <div className={getClassName(place)}>
    {place}
  </div>
);
