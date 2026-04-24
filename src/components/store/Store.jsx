import { useState, useEffect } from "react";
import styles from "./Store.module.css";
import { useNavigate } from "react-router-dom";

// хук для загрузки любой категории
function useProducts(category) {
  const [state, setState] = useState({
    products: [],
    womenCount: 0,
    menCount: 0,
    loading: true,
    error: null
  });

  useEffect(() => {
    setState(prev => ({ ...prev, loading: true }));
    
    fetch("/products.json")
      .then((response) => {
        if (!response.ok) throw new Error("Не удалось загрузить данные");
        return response.json();
      })
      .then((data) => {
        setState({
          products: category === "women" ? data.womenClothes : data.menClothes,
          womenCount: data.womenClothes?.length || 0,
          menCount: data.menClothes?.length || 0,
          loading: false,
          error: null
        });
      })
      .catch((error) => {
        setState(prev => ({ ...prev, error, loading: false }));
      });
  }, [category]);

  return state;
}


function ProductGrid({ products, onProductClick }) {
  return (
    <div className={styles.gridProducts}>
      {products.map((product) => (
        <div key={product.id} className={styles.card}>
          <div className={styles.imageContainer}>
            <img
              src={product.img}
              alt={product.title}
              onClick={() => onProductClick(product)}
              style={{ cursor: "pointer" }}
            />
          </div>
          <p className={styles.price}>{product.price}</p>
          <p className={styles.brand}>{product.brand}</p>
          <h3 className={styles.name}>{product.title}</h3>

          <p className={styles.rating}>
            ★ {product.rating} ({product.countRating})
          </p>
        </div>
      ))}
    </div>
  );
}

// переключение категорий
function ClothingStore() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("women");
  const [sortType, setSortType] = useState("popular");
  const { products, loading, error, womenCount, menCount } = useProducts(activeCategory);

  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`, { state: { product } });

    console.log("Выбран товар:", product);
  };

  if (loading)
    return (
      <p className={styles.loading}>
        Загрузка {activeCategory === "women" ? "женской" : "мужской"} одежды...
      </p>
    );
  if (error) return <p className={styles.loading}>Ошибка: {error.message}</p>;

  const cleanStringShort = (str) => str.replace(/\s/g, "").slice(0, -1);

  const getSortedProducts = () => {
    const productsCopy = [...products];

    switch (sortType) {
      case "popular":
        return productsCopy;
      case "asc":
        return productsCopy.sort(
          (a, b) => cleanStringShort(a.price) - cleanStringShort(b.price),
        );
      case "desc":
        return productsCopy.sort(
          (a, b) => cleanStringShort(b.price) - cleanStringShort(a.price),
        );
      case "rating":
        return productsCopy.sort((a, b) => b.rating - a.rating);
      default:
        return productsCopy;
    }
  };

  const sortedProducts = getSortedProducts();

  return (
    <>
    {activeCategory === 'women' ? (<p>Магазин / Женская одежда</p>) : (<p>Магазин / Мужская одежда</p>)}
      <div className={styles.content}>
        <div className={styles.sidebar}>
          <button
            className={`${styles.btn} ${activeCategory === "women" ? styles.btnDark : styles.btnLight}`}
            onClick={() => setActiveCategory("women")}
          >
            Женщинам {womenCount}
          </button>

          <button
            className={`${styles.btn} ${activeCategory === "men" ? styles.btnDark : styles.btnLight}`}
            onClick={() => setActiveCategory("men")}
          >
            Мужчинам {menCount}
          </button>
          <div className={styles.filter}>
            <p>Сортировать по:</p>

            <label>
              <input
                type="radio"
                name="sort"
                value="popular"
                checked={sortType === "popular"}
                onChange={(e) => setSortType(e.target.value)}
              />{" "}
              По популярности
            </label>
            <label>
              <input
                type="radio"
                name="sort"
                value="asc"
                checked={sortType === "asc"}
                onChange={(e) => setSortType(e.target.value)}
              />{" "}
              По возрастанию
            </label>
            <label>
              <input
                type="radio"
                name="sort"
                value="desc"
                checked={sortType === "desc"}
                onChange={(e) => setSortType(e.target.value)}
              />{" "}
              По убыванию
            </label>
            <label>
              <input
                type="radio"
                name="sort"
                value="rating"
                checked={sortType === "rating"}
                onChange={(e) => setSortType(e.target.value)}
              />{" "}
              По рейтингу
            </label>
          </div>
        </div>

        <div className={styles.products}>
          <ProductGrid
            products={sortedProducts}
            onProductClick={handleProductClick}
          />
        </div>
      </div>
    </>
  );
}

export { ClothingStore };
