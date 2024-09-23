const Languages = ({ languagesObject }) => {
  if (!languagesObject) {
    return;
  }

  const languages = Object.values(languagesObject);

  return (
    <>
      <h3>languages:</h3>
      <ul>
        {languages.map((language) => <li key={language}>{language}</li>)}
      </ul>
    </>
  );
};

export default Languages;
