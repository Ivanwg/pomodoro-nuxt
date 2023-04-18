import TasksBlock from "@/components/TasksBlock";
import AddTaskForm from "@/components/TasksBlock/AddTaskForm";
import TasksList from "@/components/TasksBlock/TasksList";
import Timer from "@/components/Timer";


function Home() {
  return ( 
    <div className='timer-page'>
      <TasksBlock />
      <Timer additionalClassName='time-column' />
      <AddTaskForm />
      <TasksList additionalClassName='list-column' />
    </div>
   );
}

export default Home;