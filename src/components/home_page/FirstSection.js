import styles from "./FirstSection.module.scss";

const FirstSection = () => {
  return (
    <div className="page homePage">
      <div className={styles.title}>
        <h1>{`You can create and view different types of data structures and algorithms here`}</h1>
      </div>

      <div className={styles.example}>
        <h2>{`Graph with BFS`}</h2>
        <img src="/assets/images/graph_example.png" />
      </div>
      <div className={styles.example}>
        <h2>{`Binary Search Tree`}</h2>
        <img src="/assets/images/BST_example.png" />
      </div>
      <div className={styles.example}>
        <h2>{`Sorting`}</h2>
        <img src="/assets/images/sort_example.png" />
      </div>
    </div>
  );
};

export default FirstSection;
