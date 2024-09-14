const App = () => {
  const course = 'Half Stack application development';
  const part1 = { name: 'Fundamentals of React', exercises: 10 };
  const part2 = { name: 'Using props to pass data', exercises: 7 };
  const part3 = { name: 'State of a component', exercises: 14 };

  return (
    <div>
      <Header course={course} />
      <Content part1={part1} part2={part2} part3={part3} />
      <Total part1={part1} part2={part2} part3={part3} />
    </div>
  );
};


const Header = ({ course }) => <h1>{course}</h1>;


const Content = ({ part1, part2, part3 }) => (
  <>
    <Part part={part1} />
    <Part part={part2} />
    <Part part={part3} />
  </>
);


const Total = ({ part1, part2, part3 }) => {
  const total = part1.exercises + part2.exercises + part3.exercises;
  return <p>Number of exercises {total}</p>;
};


const Part = ({ part }) => <p>{part.name} {part.exercises}</p>;


export default App;
