import { useLocation, useNavigate, Link } from "react-router-dom";
import styles from "./Product.module.css";
import { useCart } from "../context/CartContext";

function Product() {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  console.log("location.state:", location.state);
  console.log("product:", product);
  console.log("category:", product?.category);

  const { cartItems, addToCart, updateQuantity } = useCart();

  const cartItem = cartItems.find((item) => item.id === product?.id);
  const quantity = cartItem?.quantity || 0;

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleUpdateQuantity = (newQuantity) => {
    updateQuantity(product.id, newQuantity);
  };

  return (
    <>
  <p>Магазин / {product.category} / {product.title}</p>
      <div className={styles.productDetails}>
        <div className={styles.productContainer}>
          <img src={product.img} alt={product.title} />
          <div className={styles.info}>
            <h1>{product.title}</h1>

            <p className={styles.brand}>{product.brand}</p>
            <p className={styles.price}>{product.price}</p>

            <p className={styles.description}>{product.description}</p>
            <p className={styles.rating}>
              ★ {product.rating} ({product.countRating})
            </p>
            {quantity === 0 ? (
              <button className={styles.btn} onClick={() => handleAddToCart()}>
                Добавить в корзину
              </button>
            ) : (
              <div className={styles.addProduct}>
                {" "}
                <div className={styles.add}>
                  <button
                    className={styles.calc}
                    onClick={() => handleUpdateQuantity(quantity - 1)}
                  >
                    ➖
                  </button>{" "}
                  <p>{quantity}</p>{" "}
                  <button
                    className={styles.calc}
                    onClick={() => handleUpdateQuantity(quantity + 1)}
                  >
                    ➕
                  </button>
                </div>
                <Link
                  to="/trash"
                  style={{
                    textDecoration: "none",
                    display: "block",
                    width: "100%",
                  }}
                >
                  {" "}
                  <button className={styles.btn}>Перейти к корзине</button>{" "}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export { Product };
