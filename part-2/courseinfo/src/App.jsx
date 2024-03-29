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

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <>
      <h1>Web development curriculum</h1>
      <ul>
        {courses.map(course => 
          <Course key={course.id} course={course} />
        )}
      </ul>
    </>
  )
}

export default App
