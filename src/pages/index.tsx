import { Header, Keyboard, Plano } from "@/core/components"

const Home = () => {
  return (
    <div className="relative flex flex-col items-center justify-center h-screen dark:bg-slate-800">
      <Header />
      <Plano />
      <Keyboard />
    </div>
  )
}

export default Home
