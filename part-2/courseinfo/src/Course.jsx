const Header = ({ text }) => (
  <h2>{text}</h2>
)

const Part = ({ part }) => (
  <li>{part.name}: {part.exercises}</li>
)

const Content = ({ parts }) => {
  const totalExercises = parts.reduce(
    (total, part) => total += part.exercises, 
    0
  );
  
  return (
    <>
      <b>Course parts:</b>
      <ul>
        {parts.map(part =>
          <Part key={part.id} part={part} />
        )}
      </ul>
      <b>Total of {totalExercises} exercises</b>
    </>
  )
}

const Course = ({ course }) => (
  <>
    <Header text={course.name} />
    <Content parts={course.parts} />
  </>
)

export default Course;
