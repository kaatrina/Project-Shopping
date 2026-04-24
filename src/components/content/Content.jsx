import styles from "./Content.module.css";
import { useNavigate } from 'react-router-dom';

function Content() {

  const navigate = useNavigate();
  return (
    <div className={styles.content}>
      <div className={styles.pic}>
        <h1>
          Пространство, в котором качество, стиль и безупречный сервис перестают
          быть компромиссом.
        </h1>
        <button
          onClick={() => navigate("/store")} className={styles.button}>
          Перейти к покупкам →
        </button>
        <p>
          Мы объединили под одной крышей самые яркие и значимые имена в мире
          моды — от признанной классики до авангарда.
        </p>
        <ul>
          <li>FURLA</li>
          <li>PINKO</li>
          <li>LIO JO</li>
          <li>DKNY</li>
        </ul>
      </div>
      <div className={styles.about}>
        <div className={styles.firstBlock}>
          <video autoPlay loop muted playsInline>
            <source src="/video.mp4" type="video/mp4" />
          </video>
          <h2>BASE STORE</h2>
        </div>
        <div className={styles.secondBlock}>
          <h2>Гарантия качества</h2>
          <p>
            Мы лично проверяем каждую поставку, чтобы вы получали только
            оригинальные вещи с безупречным качеством.
          </p>
        </div>
        <div className={styles.thirdBlock}>
          <h2>10 лет</h2>
          <p>На рынке модной индустрии.</p>
        </div>
      </div>
    </div>
  );
}

export { Content };
