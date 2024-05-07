import { useState } from "react";
import InputComponent from "../components/InputComponent";
import styles from "./Home.module.css";
import validator from "validator";
import * as Icon from "react-bootstrap-icons";
const Home = () => {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [dayError, setDayError] = useState("");
  const [monthError, setMonthError] = useState("");
  const [yearError, setYearError] = useState("");
  const [dayDisplay, setDayDisplay] = useState("--");
  const [monthDisplay, setMonthDisplay] = useState("--");
  const [yearDisplay, setYearDisplay] = useState("--");

  function calcularIdade(day, month, year) {
    const dataNascimento = new Date(year, month - 1, day); // Os meses no JS são base 0 (0-11)
    const hoje = new Date();
    let idadeAnos = hoje.getFullYear() - dataNascimento.getFullYear();
    let idadeMeses = hoje.getMonth() - dataNascimento.getMonth();
    let idadeDias = hoje.getDate() - dataNascimento.getDate();

    if (idadeMeses < 0 || (idadeMeses === 0 && idadeDias < 0)) {
      idadeAnos--;
      idadeMeses += 12;
    }

    if (idadeDias < 0) {
      const diasNoMesPassado = new Date(
        hoje.getFullYear(),
        hoje.getMonth(),
        0
      ).getDate();
      idadeDias += diasNoMesPassado;
      idadeMeses--;

      if (idadeMeses < 0) {
        idadeMeses += 12;
        idadeAnos--;
      }
    }

    return {
      anos: idadeAnos,
      meses: idadeMeses,
      dias: idadeDias,
    };
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (day || month || year != "") {
      const results = calcularIdade(day, month, year);
      setYearDisplay(results.anos);
      setMonthDisplay(results.meses);
      setDayDisplay(results.dias);
    } else {
      setYearDisplay("--");
      setMonthDisplay("--");
      setDayDisplay("--");
      setDay("");
      setYear("");
      setMonth("");
    }
  };

  const validateDay = (event) => {
    const value = event.target.value.trim();
    console.log(value);
    if (!value) {
      setDayError("Day cannot be empty");
    } else if (!validator.isInt(value, { min: 1, max: 31 })) {
      setDayError("Must be a valid day");
    } else {
      setDayError("");
    }
    setDay(value);
  };

  const validateMonth = (event) => {
    const value = event.target.value.trim();
    if (!value) {
      setMonthError("Month cannot be empty");
    } else if (!validator.isInt(value, { min: 1, max: 12 })) {
      setMonthError("Must be a valid month");
    } else {
      setMonthError("");
    }
    setMonth(value);
  };

  const validateYear = (event) => {
    const value = event.target.value.trim();
    const currentYear = new Date().getFullYear();
    if (!value) {
      setYearError("Year cannot be empty");
    } else if (!validator.isInt(value, { min: 1000, max: currentYear })) {
      setYearError("Must be in the past");
    } else {
      setYearError("");
    }
    setYear(value);
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <div className={styles.inputs}>
        <InputComponent
          label="DAY"
          placeholder="DD"
          length="2"
          value={day}
          onChange={validateDay}
          error={dayError}
        />
        <InputComponent
          label="MONTH"
          placeholder="MM"
          value={month}
          length="2"
          onChange={validateMonth}
          error={monthError}
        />
        <InputComponent
          label="YEAR"
          placeholder="YYYY"
          length="4"
          value={year}
          onChange={validateYear}
          error={yearError}
        />
      </div>
      <div className={styles.lineIcon}>
        <div className={styles.line}></div>
        <button className={styles.submitButton}>
          <Icon.ArrowDownCircleFill size="3rem" />
        </button>
      </div>
      <div className={styles.texts}>
        <span className={styles.span}>
          <p className={styles.hiffen}>{yearDisplay}</p> <p>years</p>
        </span>
        <span className={styles.span}>
          <p className={styles.hiffen}>{monthDisplay}</p> <p>months</p>
        </span>
        <span className={styles.span}>
          <p className={styles.hiffen}>{dayDisplay}</p> <p>days</p>
        </span>
      </div>
    </form>
  );
};

export default Home;
