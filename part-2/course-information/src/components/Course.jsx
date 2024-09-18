import Header from './Header';
import Content from './Content';

const Course = ({ course: { name, parts } }) => (
  <div>
    <Header name={name} />
    <Content parts={parts} />
  </div>
);

export default Course;
