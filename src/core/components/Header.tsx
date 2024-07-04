import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic'
import { RiQuestionFill } from "react-icons/ri";
import { RiBarChartBoxFill } from "react-icons/ri";
import { WelcomeModal } from '@/welcome/components';
import { useDispatch, useSelector } from '@/store/hooks';
import { incrementGamesPlayed, selectPlano, setGameOver } from '@/store/apps/plano';
import StaticsModal from './StaticsModal';

const DynamicDarkModeSwitch = dynamic(() => import('./DarkModeSwitch'), {
  ssr: false,
})

const Header = () => {
  const [showWelcome, setShowWelcome] = useState(false)
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [countdown, setCountdown] = useState(300)

  const dispatch = useDispatch()
  const { gameOver } = useSelector(selectPlano)

  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisited')

    if (!hasVisited) {
      setShowWelcome(true)
      localStorage.setItem('hasVisited', 'true')
    }
  }, [])

  useEffect(() => {
    if (gameOver) {
      setShowStatsModal(true)
    } else {
      setCountdown(300)
    }
  }, [gameOver])

  useEffect(() => {
    const id = setInterval(() => {
      setCountdown(prevCountdown => prevCountdown - 1)
    }, 1000)

    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    if (countdown === 0) {
      dispatch(setGameOver(true))
      dispatch(incrementGamesPlayed())
      setCountdown(300)
    }
  }, [countdown])

  const handleOpenModal = () => {
    setShowWelcome(true)
  }

  const handleOpenStatics = () => {
    setShowStatsModal(true)
  }

  return (
    <div className="w-[90%] sm:w-[80%] md:w-[60%] lg:w-[50%] xl:w-[40%] 2xl:w-[30%] rounded-md bg-gray-100 p-4 dark:bg-opacity-15 mb-8">
      <div className="flex justify-between items-center">
        <div className="cursor-pointer dark:text-white" onClick={handleOpenModal}>
          <RiQuestionFill size={25} />
        </div>
        <h1 className="text-2xl font-bold dark:text-white">WORDLE</h1>
        <div className="flex flex-column">
          <div className="pr-2 cursor-pointer dark:text-white" onClick={handleOpenStatics}>
            <RiBarChartBoxFill size={25} />
          </div>
          <DynamicDarkModeSwitch />
        </div>
      </div>
      {showWelcome && <WelcomeModal onClose={() => setShowWelcome(false)} />}
      {showStatsModal && <StaticsModal onClose={() => setShowStatsModal(false)} countdown={countdown} />}
    </div>

  );
}

export default Header;
