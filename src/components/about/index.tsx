import React from "react";
import { observer } from "mobx-react-lite";
import { Typography } from "antd";

import styles from "./about.module.css";

const { Title } = Typography;

const About = () => {
  return (
    <>
      <div>
        <Title className={styles.title} level={2}>
          About
        </Title>
      </div>
      <div className={styles.aboutCont}>
        <div>
          <b>Project Name:</b> Rss statistics.
        </div>
        <div>
          <b>Project Description:</b> A website offering detailed analytics and
          data visualization for the JS FE 2023 Q1 course.
        </div>
        <div>
          <b>Target Audience:</b> Students and mentors of the course.
        </div>
        <div>
          <b>Features and Functionality:</b> Three groups of reports - students,
          tasks, and mentors. Tables, pie charts, bar, line graphs, funnels and
          mix of them are used.
        </div>
        <div>
          <b>Technology Stack:</b> TypeScript, React, Mobx, react-router, Ant
          Design, @ant-design/plots.
        </div>
        <div className={styles.contactInfoCont}>
          <b>Contact Information: </b>
          <a href="https://github.com/hapikus" rel="noreferrer" target="_blank">
            Github
          </a>
          <a href="https://t.me/hapikus" rel="noreferrer" target="_blank">
            Telegram
          </a>
          <a
            href="https://discordapp.com/users/483205872827498506/"
            rel="noreferrer"
            target="_blank"
          >
            Discord
          </a>
        </div>
        <div>
          If you have any feedback or suggestions, please don't hesitate to
          reach out to me.
        </div>
      </div>
    </>
  );
};

export default observer(About);
