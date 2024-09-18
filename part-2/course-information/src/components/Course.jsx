import Header from './Header';
import Content from './Content';
import Total from './Total';

const Course = ({ course: { name, parts } }) => (
  <div>
    <Header name={name} />
    <Content parts={parts} />
    <Total parts={parts} />
  </div>
);

export default Course;
