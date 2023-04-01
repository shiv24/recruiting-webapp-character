import { useEffect, useState } from "react";
import "./App.css";
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from "./consts.js";
import ClassInfo from "./ClassInfo";

function App() {
  const [strength, setStrength] = useState(0);
  const [strengthMod, setStrengthMod] = useState(0);

  const [dexterity, setDexterity] = useState(0);
  const [dexterityMod, setDexterityMod] = useState(0);

  const [constitution, setConstitution] = useState(0);
  const [constitutionMod, setConstitutionMod] = useState(0);

  const [intelligence, setIntelligence] = useState(0);
  const [intelligenceMod, setIntelligenceMod] = useState(0);

  const [wisdom, setWisdom] = useState(0);
  const [wisdomMod, setWisdomMod] = useState(0);

  const [charisma, setCharisma] = useState(0);
  const [charismaMod, setCharismaMod] = useState(0);

  const [points, setPoints] = useState(0);

  useEffect(() => {
    setStrengthMod(getModifier(strength));
    setDexterityMod(getModifier(dexterity));
    setConstitutionMod(getModifier(constitution));
    setIntelligenceMod(getModifier(intelligence));
    setWisdomMod(getModifier(wisdom));
    setCharismaMod(getModifier(charisma));
    setPoints(getPoints(intelligenceMod));
  }, [
    strength,
    dexterity,
    constitution,
    intelligence,
    wisdom,
    charisma,
    intelligenceMod,
  ]);

  function getModifier(attribute) {
    if (attribute >= 10) {
      return Math.floor((attribute - 10) / 2);
    } else {
      return -1 * Math.ceil((10 - attribute) / 2);
    }
  }

  function getPoints(intelligence) {
    const points = 10 + 4 * intelligence;
    if (points <= 0) {
      return 0;
    } else {
      return points;
    }
  }

  function getClassList(
    strength,
    dexterity,
    constitution,
    intelligence,
    wisdom,
    charisma
  ) {
    const scores = {
      Strength: strength,
      Dexterity: dexterity,
      Constitution: constitution,
      Intelligence: intelligence,
      Wisdom: wisdom,
      Charisma: charisma,
    };

    const classList = [];
    for (const className in CLASS_LIST) {
      const classRequirements = CLASS_LIST[className];
      let meetsRequirements = true;
      for (const attribute in classRequirements) {
        const requiredScore = classRequirements[attribute];
        const userScore = scores[attribute] || 0;
        if (userScore < requiredScore) {
          meetsRequirements = false;
          break;
        }
      }
      if (meetsRequirements) {
        classList.push(className);
      }
    }
    return classList;
  }

  const classList = getClassList(
    strength,
    dexterity,
    constitution,
    intelligence,
    wisdom,
    charisma
  );

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise by Shiv</h1>
      </header>
      <section className="App-section">
        <h2>
          <u>Attributes</u>
        </h2>
        <div>
          Strength:
          {strength}
          &nbsp;
          <button onClick={() => setStrength(strength + 1)}>+</button>
          <button onClick={() => setStrength(strength - 1)}>-</button>
          &nbsp; Strength(Modifier): {strengthMod}
        </div>
        <div>
          Dexterity:
          {dexterity}
          &nbsp;
          <button onClick={() => setDexterity(dexterity + 1)}>+</button>
          <button onClick={() => setDexterity(dexterity - 1)}>-</button>
          &nbsp; Dexterity(Modifier): {dexterityMod}
        </div>
        <div>
          Constitution:
          {constitution}
          &nbsp;
          <button onClick={() => setConstitution(constitution + 1)}>+</button>
          <button onClick={() => setConstitution(constitution - 1)}>-</button>
          &nbsp; Constitution(Modifier): {constitutionMod}
        </div>
        <div>
          Intelligence:
          {intelligence}
          &nbsp;
          <button onClick={() => setIntelligence(intelligence + 1)}>+</button>
          <button onClick={() => setIntelligence(intelligence - 1)}>-</button>
          &nbsp; Intelligence(Modifier): {intelligenceMod}
        </div>
        <div>
          Wisdom:
          {wisdom}
          &nbsp;
          <button onClick={() => setWisdom(wisdom + 1)}>+</button>
          <button onClick={() => setWisdom(wisdom - 1)}>-</button>
          &nbsp; Wisdom(Modifier): {wisdomMod}
        </div>
        <div>
          Charisma:
          {charisma}
          &nbsp;
          <button onClick={() => setCharisma(charisma + 1)}>+</button>
          <button onClick={() => setCharisma(charisma - 1)}>-</button>
          &nbsp; Charisma(Modifier): {charismaMod}
        </div>
        <br />
        <h2>
          <u>Classes</u>
        </h2>
        <span style={{ display: "inline-block" }}>
          {Object.keys(CLASS_LIST).map((key) => {
            return (
              <div key={key}>
                <ClassInfo val={key} items={CLASS_LIST} classList={classList} />
              </div>
            );
          })}
        </span>

        <br />

        <h2>
          <u>Points and Skills</u>
        </h2>

        <div>Points Available: {points}</div>
      </section>
    </div>
  );
}

export default App;
