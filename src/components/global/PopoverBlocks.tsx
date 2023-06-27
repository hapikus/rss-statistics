import React from "react";
import styles from "./PopoverBlocks.module.css";

export const PopoverContentStatisticsMain = () => {
  return (
    <div className={styles.popoverContainer}>
      <p className={styles.popoverTitle}>Word Cloud with Mentors.</p>
      <p className={styles.popoverText}>
        The font size scales up proportionally with the number of students,
        resulting in larger text for mentors with more students.
      </p>
    </div>
  );
};

export const PopoverContentStudentsMain = () => {
  return (
    <div>
      <div className={styles.popoverContainer}>
        <p className={styles.popoverTitle}>% of Active students</p>
        <p className={styles.popoverText}>
          Percentage of students with an "Active" status.
        </p>
      </div>
      <div className={styles.popoverContainer}>
        <p className={styles.popoverTitle}>ChatGPT's gender prediction</p>
        <p className={styles.popoverText}>
          ChatGPT's gender prediction based on students' names
        </p>
      </div>
      <div className={styles.popoverContainer}>
        <p className={styles.popoverTitle}>
          Distribution of students by countries
        </p>
        <p className={styles.popoverText}>
          Pie chart showcasing the distribution of students by countries.
        </p>
      </div>
    </div>
  );
};

export const PopoverContentStudentsPlaceHistory = () => {
  return (
    <div className={styles.popoverContainer}>
      <p className={styles.popoverTitle}>
        Student Place History: Score Comparison
      </p>
      <p className={styles.popoverText}>
        Changes to student rankings are made based on tasks that have passed
        their deadlines. Tasks that are still open for submission do not impact
        the calculation of rankings.
      </p>
    </div>
  );
};

export const PopoverContentMentorsMain = () => {
  return (
    <div className={styles.popoverContainer}>
      <p className={styles.popoverTitle}>Student-to-Mentor Ratio</p>
      <p className={styles.popoverText}>
        Count of Mentors with Equal Student Count: The number of mentors who
        have an identical number of students assigned to them.
      </p>
    </div>
  );
};
