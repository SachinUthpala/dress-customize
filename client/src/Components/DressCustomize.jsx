import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Draggable from "react-draggable";
import { Button } from "flowbite-react";
import { useParams } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";

const DressCustomize = () => {
  const { id: clothId } = useParams();
  const { currentUser } = useSelector((state) => state.user);
  const [dress, setDress] = useState(null);
  const [upperText, setUpperText] = useState("Upper Text");
  const [upperTextFontSize, setUpperTextFontSize] = useState(30);
  const [upperTextFontWeight, setUpperTextFontWeight] = useState("bold");
  const [upperTextFontColor, setUpperTextFontColor] = useState("#F22C2C");
  const [bottomText, setBottomText] = useState("Bottom Text");
  const [bottomTextFontSize, setBottomTextFontSize] = useState(30);
  const [bottomTextFontWeight, setBottomTextFontWeight] = useState("bold");
  const [bottomTextFontColor, setBottomTextFontColor] = useState("#F22C2C");
  const [uploadedImage, setUploadedImage] = useState("/image-prop.jpg");
  const [imageWidth, setImageWidth] = useState(30);
  const [imageHeight, setImageHeight] = useState(30);
  const [aspectRatio, setAspectRatio] = useState(true);

  const [isUpperTextEnabled, setIsUpperTextEnabled] = useState(false);
  const [isImageEnabled, setIsImageEnabled] = useState(false);
  const [isBottomTextEnabled, setIsBottomTextEnabled] = useState(false);

  const [upperTextPosition, setUpperTextPosition] = useState({ x: 0, y: 0 });
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [bottomTextPosition, setBottomTextPosition] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);

  useEffect(() => {
    axios
      .get(`/api/cloth/getDress/${clothId}`)
      .then((response) => setDress(response.data))
      .catch((error) => console.error("Error fetching t-shirt data:", error));

    console.log(currentUser);
  }, [clothId, currentUser]);

  const handleImageUpload = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => setUploadedImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleAddToCart = async () => {
    const customizationData = {
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
      aspectRatio,
      isUpperTextEnabled,
      isImageEnabled,
      isBottomTextEnabled,
      upperTextPosition,
      imagePosition,
      bottomTextPosition,
    };

    const cart = {
      dressId: dress._id,
      userId: currentUser._id,
      price: dress.price,
      customItems: [],
      customizations: customizationData,
    };
    if (isUpperTextEnabled) {
      cart.customItems.push({ item: "Upper Text", price: 200 });
    }
    if (isImageEnabled) {
      cart.customItems.push({ item: "Image", price: 400 });
    }
    if (isBottomTextEnabled) {
      cart.customItems.push({ item: "Bottom Text", price: 200 });
    }

    await axios
      .post("/api/cart/addToCart", cart)
      .then(() => {
        window.location = "/cart";
      })
      .catch((err) => console.log(err));
  };

  if (!dress) {
    return <div>Loading...</div>;
  }

  return (
    <div
      style={{
        display: "flex",
        margin: "2rem",
        minHeight: "85vh",
      }}
    >
      <div
        style={{
          flex: 1.8,
          position: "relative",
          width: "100%",
          maxHeight: "75vh",
          border: "1px solid",
          marginRight: "4rem",
        }}
        ref={canvasRef}
        id="canvas-image"
      >
        <img
          src={dress.imageUrl}
          alt={dress.dressName}
          style={{ width: "100%", maxHeight: "100%" }}
        />
        {isUpperTextEnabled && (
          <Draggable
            bounds="parent"
            position={upperTextPosition}
            onStop={(e, data) => setUpperTextPosition({ x: data.x, y: data.y })}
          >
            <div
              style={{
                position: "absolute",
                top: "25%",
                left: "35%",
                transform: "translateX(-50%)",
                textAlign: "center",
                cursor: "move",
                fontSize: `${upperTextFontSize}px`,
                fontWeight: upperTextFontWeight,
                color: upperTextFontColor,
                pointerEvents: "auto",
              }}
            >
              {upperText}
            </div>
          </Draggable>
        )}
        {isImageEnabled && uploadedImage && (
          <Draggable
            bounds="parent"
            position={imagePosition}
            onStop={(e, data) => setImagePosition({ x: data.x, y: data.y })}
          >
            <img
              src={uploadedImage}
              alt="Uploaded"
              style={{
                position: "absolute",
                top: "35%",
                left: "32%",
                transform: "translate(-50%, -50%)",
                width: `${imageWidth}%`,
                height: `${imageHeight}%`,
                cursor: "move",
                pointerEvents: "auto",
              }}
            />
          </Draggable>
        )}
        {isBottomTextEnabled && (
          <Draggable
            bounds="parent"
            position={bottomTextPosition}
            onStop={(e, data) =>
              setBottomTextPosition({ x: data.x, y: data.y })
            }
          >
            <div
              style={{
                position: "absolute",
                top: "70%",
                left: "35%",
                transform: "translateX(-50%)",
                textAlign: "center",
                cursor: "move",
                fontSize: `${bottomTextFontSize}px`,
                fontWeight: bottomTextFontWeight,
                color: bottomTextFontColor,
                pointerEvents: "auto",
              }}
            >
              {bottomText}
            </div>
          </Draggable>
        )}
      </div>
      <div
        style={{
          flex: 1.5,
          gap: "10px",
          padding: "2rem",
          border: "1px solid",
        }}
      >
        <h1 className="mb-3 text-4xl font-bold ">{dress.dressName}</h1>
        <h1 className="mb-10 text-2xl font-bold ">{dress.Discription}</h1>
        <h1 className="mb-8 text-xl font-bold "> Rs . {dress.price} /=</h1>
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="mr-2"
              checked={isUpperTextEnabled}
              onChange={() => {
                setIsUpperTextEnabled(!isUpperTextEnabled);
                if (!isUpperTextEnabled) {
                  setDress({ ...dress, price: dress.price + 200 });
                } else {
                  setDress({ ...dress, price: dress.price - 200 });
                }
              }}
            />
            Add Upper Text (+Rs . 200.00)
          </label>
        </div>

        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="mr-2"
              checked={isImageEnabled}
              onChange={() => {
                setIsImageEnabled(!isImageEnabled);
                if (!isImageEnabled) {
                  setDress({ ...dress, price: dress.price + 400 });
                } else {
                  setDress({ ...dress, price: dress.price - 400 });
                }
              }}
            />
            Add Image (+Rs . 400.00)
          </label>
        </div>

        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="mr-2"
              checked={isBottomTextEnabled}
              onChange={() => {
                setIsBottomTextEnabled(!isBottomTextEnabled);
                if (!isBottomTextEnabled) {
                  setDress({ ...dress, price: dress.price + 200 });
                } else {
                  setDress({ ...dress, price: dress.price - 200 });
                }
              }}
            />
            Add Bottom Text (+Rs . 200.00)
          </label>
        </div>
        <div>
          <Button className="mt-10" onClick={handleAddToCart}>
            <FaShoppingCart size={20} className="mr-5" />
            <h2 className="text-l">Add to Cart</h2>
          </Button>
        </div>
        <div className="mb-4 mt-5">
          {isUpperTextEnabled && (
            <>
              <h1 className="mb-3 text-2xl font-bold ">
                Upper Text Customization
              </h1>
              <hr className="mb-5" />
              <input
                type="text"
                placeholder="Upper Text"
                value={upperText}
                style={{ width: "100%" }}
                onChange={(e) => setUpperText(e.target.value)}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "3.5rem",
                  marginTop: "1.5rem",
                }}
              >
                <div
                  className="UpperTextFontSize"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <label>Font Size</label>
                  <input
                    type="number"
                    min="10"
                    max="100"
                    style={{ marginLeft: "2rem" }}
                    value={upperTextFontSize}
                    onChange={(e) => setUpperTextFontSize(e.target.value)}
                  />
                </div>

                <div
                  className="UpperTextFontWeight"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <label>Font Weight</label>
                  <select
                    value={upperTextFontWeight}
                    style={{ marginLeft: "2rem" }}
                    onChange={(e) => setUpperTextFontWeight(e.target.value)}
                  >
                    <option value="normal">Normal</option>
                    <option value="bold">Bold</option>
                    <option value="bolder">Bolder</option>
                    <option value="lighter">Lighter</option>
                  </select>
                </div>

                <div
                  className="UpperTextFontColor"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <label>Font Color</label>
                  <input
                    type="color"
                    value={upperTextFontColor}
                    style={{
                      marginLeft: "2rem",
                      height: "35px",
                      width: "35px",
                    }}
                    onChange={(e) => setUpperTextFontColor(e.target.value)}
                  />
                </div>
              </div>
            </>
          )}
          {isImageEnabled && (
            <>
              <h1 className="mb-3 text-2xl font-bold ">Image Customization</h1>
              <hr className="mb-5" />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                {uploadedImage !== null && (
                  <Button color={"red"} onClick={() => setUploadedImage(null)}>
                    Remove
                  </Button>
                )}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "4rem",
                  marginTop: "1.5rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <label>Image Width ({imageWidth}%)</label>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={imageWidth}
                    onChange={(e) => {
                      if (aspectRatio) {
                        setImageWidth(e.target.value);
                        setImageHeight(e.target.value);
                      } else {
                        setImageWidth(e.target.value);
                      }
                    }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <label>Image Height ({imageHeight}%)</label>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={imageHeight}
                    onChange={(e) => {
                      if (aspectRatio) {
                        setImageWidth(e.target.value);
                        setImageHeight(e.target.value);
                      } else {
                        setImageHeight(e.target.value);
                      }
                    }}
                  />
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <input
                    type="checkbox"
                    style={{ marginRight: "1rem" }}
                    checked={aspectRatio}
                    onChange={() => {
                      setImageWidth(imageHeight);
                      setImageHeight(imageHeight);
                      setAspectRatio(!aspectRatio);
                    }}
                  />
                  <span>Lock Aspect Ratio</span>
                </div>
              </div>
            </>
          )}
          {isBottomTextEnabled && (
            <>
              <h1 className="mb-3 text-2xl font-bold ">
                Bottom Text Customization
              </h1>
              <hr className="mb-5" />
              <input
                type="text"
                placeholder="Bottom Text"
                value={bottomText}
                style={{ width: "100%" }}
                onChange={(e) => setBottomText(e.target.value)}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "1rem",
                  marginTop: "1.5rem",
                }}
              >
                <div
                  className="BottomTextFontSize"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <label>Font Size</label>
                  <input
                    type="number"
                    min="24"
                    max="200"
                    style={{ marginLeft: "2rem" }}
                    value={bottomTextFontSize}
                    onChange={(e) => setBottomTextFontSize(e.target.value)}
                  />
                </div>

                <div
                  className="BottomTextFontWeight"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <label>Font Weight</label>
                  <select
                    value={bottomTextFontWeight}
                    style={{ marginLeft: "2rem" }}
                    onChange={(e) => setBottomTextFontWeight(e.target.value)}
                  >
                    <option value="normal">Normal</option>
                    <option value="bold">Bold</option>
                    <option value="bolder">Bolder</option>
                    <option value="lighter">Lighter</option>
                  </select>
                </div>

                <div
                  className="BottomTextFontColor"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <label>Font Color</label>
                  <input
                    type="color"
                    value={bottomTextFontColor}
                    style={{
                      marginLeft: "2rem",
                      height: "35px",
                      width: "35px",
                    }}
                    onChange={(e) => setBottomTextFontColor(e.target.value)}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DressCustomize;
