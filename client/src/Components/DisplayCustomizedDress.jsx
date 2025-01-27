/* eslint-disable react/prop-types */
import { useState } from "react";
import Draggable from "react-draggable";

const DisplayCustomizedDress = ({ customizedDress }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  if (!customizedDress) {
    return <div>Loading...</div>;
  }

  const {
    dress,
    upperText,
    upperTextFontSize,
    upperTextFontWeight,
    upperTextFontColor,
    bottomText,
    bottomTextFontSize,
    bottomTextFontWeight,
    bottomTextFontColor,
    uploadedImage,
    imageWidth,
    imageHeight,
    isUpperTextEnabled,
    isImageEnabled,
    isBottomTextEnabled,
    upperTextPosition,
    imagePosition,
    bottomTextPosition,
  } = customizedDress;

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div
        style={{
          position: "relative",
          maxHeight: "75vh",
          minHeight: "75vh",
          minWidth: "88vh",
          border: "1px solid",
        }}
      >
        {!imageLoaded && (
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Loading your Dress...
          </div>
        )}
        <img
          src={dress.imageUrl}
          alt={dress.dressName}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageLoaded(true)}
          style={{
            width: "100%",
            maxHeight: "100%",
            display: imageLoaded ? "block" : "none",
          }}
        />
        {imageLoaded && (
          <>
            {isUpperTextEnabled && (
              <Draggable bounds="parent" position={upperTextPosition} disabled>
                <div
                  style={{
                    position: "absolute",
                    left: `${35}%`,
                    top: `${25}%`,
                    textAlign: "center",
                    fontSize: `${upperTextFontSize}px`,
                    fontWeight: upperTextFontWeight,
                    color: upperTextFontColor,
                  }}
                >
                  {upperText}
                </div>
              </Draggable>
            )}
            {isImageEnabled && uploadedImage && (
              <Draggable bounds="parent" position={imagePosition} disabled>
                <img
                  src={uploadedImage}
                  alt="Uploaded"
                  style={{
                    position: "absolute",
                    top: "35%",
                    left: "32%",
                    width: `${imageWidth}%`,
                    height: `${imageHeight}%`,
                  }}
                />
              </Draggable>
            )}
            {isBottomTextEnabled && (
              <Draggable bounds="parent" position={bottomTextPosition} disabled>
                <div
                  style={{
                    position: "absolute",
                    top: "70%",
                    left: "35%",
                    textAlign: "center",
                    fontSize: `${bottomTextFontSize}px`,
                    fontWeight: bottomTextFontWeight,
                    color: bottomTextFontColor,
                  }}
                >
                  {bottomText}
                </div>
              </Draggable>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DisplayCustomizedDress;
