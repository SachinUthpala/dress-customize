import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Modal } from "flowbite-react";
import DisplayCustomizedDress from "../Components/DisplayCustomizedDress";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const [showModal, setShowModal] = useState(false);
  const [selectedDress, setSelectedDress] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      await axios
        .get(`/api/cart/getCartByUser/${currentUser._id}`)
        .then(({ data }) => {
          setCartItems(data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchCart();
  }, []);

  const handleItemClick = (customizations) => {
    setSelectedDress(customizations);
    setShowModal(true);
  };
  return (
    <div
      style={{
        margin: "2rem",
        marginLeft: "4rem",
        maxHeight: "83vh",
        minHeight: "83vh",
        overflowY: "auto",
      }}
    >
      <center>
        <h1 className="mb-10 text-4xl  ">Cart page</h1>
      </center>
      {cartItems.length !== 0 ? (
        cartItems.map((cartItem, index) => (
          <div
            key={index}
            style={{
              padding: "1rem",
              border: "1px solid",
              display: "flex",
              borderRadius: "10px",
              justifyContent: "space-between",
              width: "65%",
              marginBottom: "2rem",
            }}
          >
            <div style={{ display: "flex" }}>
              <div style={{ marginRight: "4rem" }}>
                <h1 className="mb-1 text-2xl font-bold ">
                  {cartItem.dress.dressName}
                </h1>
                <h1 className="mb-10 text-xl font-bold ">
                  {cartItem.dress.Discription}
                </h1>
              </div>
              <div style={{ marginRight: "4rem" }}>
                <h1 className="mb-3 text-xl font-bold ">Custom Items</h1>
                {[...cartItem.customItems].map((customItem, index) => (
                  <tr key={index}>
                    <td style={{ fontWeight: "bold", width: "8rem" }}>
                      {customItem.item}
                    </td>
                    <td>Rs . {customItem.price}.00</td>
                  </tr>
                ))}
              </div>
              <div style={{ marginRight: "4rem" }}>
                <h1 className="mb-1 text-2xl font-bold ">Total Price</h1>
                <h1 className="mb-10 text-xl font-bold ">
                  Rs.{cartItem.price}.00
                </h1>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginRight: "4rem",
              }}
            >
              <Button onClick={() => handleItemClick(cartItem.customizations)}>
                View Dress
              </Button>
            </div>
          </div>
        ))
      ) : (
        <div style={{marginTop:'10vh'}} >
          <h1 className="mb-10 text-xl text-center">No items in cart</h1>
        </div>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        size="4xl"
        style={{
          maxHeight: "120vh",
          minHeight: "85vh",
          minWidth: "88vh",
        }}
      >
        <Modal.Header>Customized Dress</Modal.Header>
        <Modal.Body>
          <DisplayCustomizedDress customizedDress={selectedDress} />
        </Modal.Body>
      </Modal>
    </div>
  );
}
