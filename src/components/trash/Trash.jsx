import styles from "./Trash.module.css";
import { useCart } from "../context/CartContext";
import { useLocation, useNavigate, Link } from "react-router-dom";

function Trash() {
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  function calculateTotal(items) {
    let total = 0;
    for (let i = 0; i < items.length; i++) {
      const priceString = items[i].price.replace(/\s/g, "").slice(0, -1);
      const price = parseFloat(priceString);
      total += price * items[i].quantity;
    }
    return total;
  }

  function TotalItems(items) {
    let total = 0;
    for (let i = 0; i < items.length; i++) {
      total += items[i].quantity;
    }
    return total;
  }

  function TheEnd() {
    alert("Пока что всё, но я обязательно продолжу учиться и узнаю больше!");
  }

  function Ending(num) {
    if (num === 1 || (num % 10 === 1 && num !== 11)) {
      return "товар";
    } else if (num >= 12 && num <= 14) {
      return "товаров";
    } else if (
      num.toString().slice(-1) === "2" ||
      num.toString().slice(-1) === "3" ||
      num.toString().slice(-1) === "4"
    ) {
      return "товара";
    } else return "товаров";
  }

  const totalAmount = calculateTotal(cartItems);

  return (
    <div>
      <h1>Корзина </h1>{" "}
      <h4>
        {cartItems.length} {Ending(cartItems.length)}
      </h4>
      <div className={styles.main}>
        <div>
          {[...cartItems].reverse().map((item) => (
            <div key={item.id} className={styles.item}>
              <div className={styles.img}>
                <Link to={"/product/" + item.id} state={{ product: item }}>
                  <img src={item.img} alt="" />{" "}
                </Link>
              </div>

              <div className={styles.desc}>
                <div>
                  <h3>{item.title}</h3>
                  <h4>{item.brand}</h4>
                </div>
                <div className={styles.num}>
                  <p className={styles.price}>{item.price}</p>
                  <div className={styles.add}>
                    <button
                      className={styles.calc}
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      ➖
                    </button>{" "}
                    <p>{item.quantity}</p>{" "}
                    <button
                      className={styles.calc}
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      ➕
                    </button>
                  </div>
                  <button
                    className={styles.delete}
                    onClick={() => removeFromCart(item.id)}
                  >
                    Удалить
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.pay}>
          <h2>Сумма заказа</h2>
          <div className={styles.sum}>
            <p>
              {TotalItems(cartItems)} {Ending(TotalItems(cartItems))}
            </p>
            <p>{totalAmount} ₽</p>
          </div>

          <div className={styles.total}>
            <p>Итого</p>
            <p>{totalAmount} ₽</p>
          </div>
          <button
            className={styles.end}
            onClick={() => {
              TheEnd();
            }}
          >
            <p>К оформлению</p>
            <p className={styles.numTotal}>
              {TotalItems(cartItems)} {Ending(TotalItems(cartItems))}
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}

export { Trash };
