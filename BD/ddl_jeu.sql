CREATE TABLE QUESTIONS
(
  IDQUESTION INT  NOT NULL,
  QUESTION   TEXT NOT NULL,
  CONSEIL    TEXT NOT NULL,
  LIEN       TEXT NOT NULL,
  CONSTRAINT PK_QUESTIONS PRIMARY KEY (IDQUESTION)
);

CREATE TABLE REPONSES
(
  IDREPONSE   INT  NOT NULL,
  REPONSE     TEXT NOT NULL,
  ESTBONNEREP INT  NOT NULL,
  IDQUESTION  INT  NO NULL,
  CONSTRAINT PK_REPONSES PRIMARY KEY (IDREPONSE)
);