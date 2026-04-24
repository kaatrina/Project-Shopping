import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Header() {
  const { cartItems } = useCart();

  return (
    <div className={styles.header}>
      <Link to="/store" className={styles.navLink}>
        <h3>Магазин</h3>
      </Link>
      <Link to="/" className={styles.navLink}>
        <h2>BASE STORE</h2>
      </Link>
      {cartItems.length === 0 ? (
        <Link to="/trash" className={styles.navLink}>
          <h3>Корзина</h3>
        </Link>
      ) : (
        <Link to="/trash" className={styles.navLink}>
          <h3>Корзина ({cartItems.length})</h3>
        </Link>
      )}
    </div>
  );
}

export { Header };
