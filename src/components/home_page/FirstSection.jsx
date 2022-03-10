import styles from "./FirstSection.module.scss";
import graph_img from "../../assets/images/graph_example.png";
import BST_img from "../../assets/images/BST_example.png";
import sort_img from "../../assets/images/sort_example.png";
import { Link } from "react-router-dom";

const FirstSection = () => {
  return (
    <div className={styles.section}>
      <div className={styles.title}>
        <h2>{`You can create and view different types of data structures and algorithms here`}</h2>
      </div>

      <div className={styles.DSAtitle}>
        <h2>{`Current available DSA 💯`}</h2>
      </div>
      <div className={styles.gridOfExamples}>
        <div className={styles.example}>
          <h3>{`Graph with BFS ✅`}</h3>
          <Link to="/graph" className={styles.imgContainer}>
            <img src={graph_img} alt="graph_example.png" />
          </Link>
        </div>
        <div className={styles.example}>
          <h3>{`Binary Search Tree ✅`}</h3>
          <Link to="/BST" className={styles.imgContainer}>
            <img src={BST_img} alt="BST_example.png" />
          </Link>
        </div>
        <div className={styles.example}>
          <h3>{`Sorting ✅`}</h3>
          <Link to="/sort" className={styles.imgContainer}>
            <img src={sort_img} alt="sort_example.png" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FirstSection;
