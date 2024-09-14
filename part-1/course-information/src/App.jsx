const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      { name: 'Fundamentals of React', exercises: 10 },
      { name: 'Using props to pass data', exercises: 7 },
      { name: 'State of a component', exercises: 14 },
    ],
  };

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  );
};


const Header = ({ course: { name } }) => <h1>{name}</h1>;


const Content = ({ course: { parts } }) => (
  <>
    <Part part={parts[0]} />
    <Part part={parts[1]} />
    <Part part={parts[2]} />
  </>
);


const Total = ({ course: { parts } }) => {
  const total = parts.reduce((sum, { exercises }) => sum + exercises, 0);
  return <p>Number of exercises {total}</p>;
};


// Styling: Since all properties of the path object are utilised, I decided 
// against destructuring it (i.e., part: { name, exercises }).
const Part = ({ part }) => <p>{part.name} {part.exercises}</p>;


export default App;
