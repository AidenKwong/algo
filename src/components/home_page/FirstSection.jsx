import { useState, useEffect } from "react";
import styles from "./FirstSection.module.scss";
import graph_img from "../../assets/images/graph_example.png";
import BST_img from "../../assets/images/BST_example.png";
import sort_img from "../../assets/images/sort_example.png";
import linked_list_img from "../../assets/images/linked_list_example.png";
import { Link } from "react-router-dom";

const timer = (ms) => new Promise((res) => setTimeout(res, ms));
const languages = {
  "en-US":
    "Hey there! You can create and view different types of data structures and algorithms here!",
  "zh-TW": "你好！ 您可以在這裡創建和查看不同類型的數據結構和算法！",
  "ja-JP":
    "ちょっと、そこ！ ここでは、さまざまなタイプのデータ構造とアルゴリズムを作成して表示できます。",
  "es-ES":
    "¡Hola! ¡Puede crear y ver diferentes tipos de estructuras de datos y algoritmos aquí!",
  "fr-CH":
    "Salut! Vous pouvez créer et afficher différents types de structures de données et d'algorithmes ici !",
  "hi-IN":
    "सुनो! आप यहां विभिन्न प्रकार की डेटा संरचनाएं और एल्गोरिदम बना और देख सकते हैं!",
};

const FirstSection = () => {
  const [running, setRunning] = useState(false);
  const [sorted, setSorted] = useState(false);
  const [langIdx, setLangIdx] = useState(0);
  const [sentence, setSentence] = useState(languages["en-US"]);

  const Simple_Sorting_Algo = () => {
    const currLocale = Object.keys(languages)[langIdx];

    if (!sorted) {
      setRunning(true);
      var mutedArr;
      if ((currLocale === "zh-TW") | (currLocale === "ja-JP"))
        mutedArr = languages[currLocale].split("");
      else mutedArr = languages[currLocale].toLowerCase().split(" ");
      const send = async () => {
        var i = 0,
          j;
        while (i < mutedArr.length) {
          j = i + 1;
          while (j < mutedArr.length) {
            if (mutedArr[j].localeCompare(mutedArr[i], currLocale) === -1) {
              await timer(50);
              setSentence(mutedArr.join(" "));
              var temp = mutedArr[i];
              mutedArr[i] = mutedArr[j];
              mutedArr[j] = temp;
            }
            j++;
          }
          i++;
        }
        setSorted(true);
        setSentence(mutedArr.join(" "));
        return setRunning(false);
      };
      send();
    }

    if (sorted) {
      setSorted(false);
      setLangIdx((prev) =>
        prev === Object.keys(languages).length - 1 ? 0 : prev + 1
      );
    }
  };

  useEffect(() => {
    setSentence(languages[Object.keys(languages)[langIdx]]);
  }, [langIdx]);

  return (
    <div className={styles.section}>
      <div className={styles.title}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <p className={styles.heading}>
            Visualize Data Structure and algorithms!{" "}
          </p>
        </div>

        <div className={styles.title2ndPart}>
          <h4>{sentence}</h4>
          <button disabled={running} onClick={Simple_Sorting_Algo}>
            {running ? (
              <div className="SORTING" />
            ) : !sorted ? (
              "SORT"
            ) : (
              "RESTART"
            )}
          </button>
        </div>
      </div>

      <div className={styles.DSAtitle}>
        <h2>{`Current available DSA 💯`}</h2>
      </div>
      <div className={styles.gridOfExamples}>
        <div className={styles.example}>
          <h3>{`Graph with Linked List ✅`}</h3>
          <Link to="/linked-list" className={styles.imgContainer}>
            <img src={linked_list_img} alt="linked_list_example.png" />
          </Link>
        </div>
        <div className={styles.example}>
          <h3>{`Graph with BFS ✅`}</h3>
          <Link to="/graph" className={styles.imgContainer}>
            <img src={graph_img} alt="graph_example.png" />
          </Link>
        </div>
        <div className={styles.example}>
          <h3>{`Binary Search Tree ✅`}</h3>
          <Link to="/tree" className={styles.imgContainer}>
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
