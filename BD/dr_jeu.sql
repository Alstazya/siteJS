ALTER TABLE REPONSES
    ADD CONSTRAINT FK_QUESTIONS_TO_REPONSES
    FOREIGN KEY (IDQUESTION)
    REFERENCES QUESTIONS (IDQUESTION);
