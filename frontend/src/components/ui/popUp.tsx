import React from 'react';

function PopUp({ showPopUp, closePopUp, children }) {
  if (!showPopUp) {
    return null; // Don't render if showPopUp is false
  }

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button onClick={closePopUp} className="close-button">X</button>
        {children} {/* Render content passed as children */}
      </div>
    </div>
  );
}

export default PopUp;