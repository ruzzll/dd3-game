// modal layout with a close button with tailwindcss, disable when clicking outside the modal

import { useDispatch, useSelector } from "@/store/hooks";
import { resetGame, selectPlano } from "@/store/apps/plano";
import { useEffect, useState } from "react";

type StaticsModalProps = {
  onClose: () => void;
  countdown: number;
};

const StaticsModal = ({ onClose, countdown }: StaticsModalProps) => {
  const dispatch = useDispatch();

  const { gamesPlayed, gamesWon, secretWord, gameOver } = useSelector(selectPlano)

  const handleRestart = () => {
    if (gameOver) {
      dispatch(resetGame())
    }

    onClose()
  }

  return (
    <div
      className="block fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50"
    >
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-slate-800 dark:border dark:border-gray-400 p-4 rounded-lg w-[90%] sm:w-[55%] md:w-[45%] lg:w-[45%] xl:w-[40%] 2xl:w-[25%]">
        <div className="flex flex-col items-center p-4">
          <h2 className="text-2xl font-bold pb-4 dark:text-white">Estadísticas</h2>
          <div className="flex flex-row items-center p-4 justify-between w-full">
            <div className="text-gray-600 pb-3 dark:text-white text-center">
              <div className="font-bold text-xl">{gamesPlayed}</div>
              <div>Jugadas</div>
            </div>
            <div className="text-gray-600 pb-3 dark:text-white text-center">
              <div className="font-bold text-xl">{gamesWon}</div>
              <div>Victorias</div>
            </div>
          </div>
          {gameOver && <p className="p-4 dark:text-white">La palabra era: <strong className="uppercase">{secretWord}</strong></p>}
          <p className="uppercase p-2 dark:text-white">Siguiente palabra</p>
          <p className="font-bold pb-10 dark:text-white">{formatTime(countdown)}</p>

          <button
            className="btn-primary"
            onClick={handleRestart}
          >
            Aceptar
          </button>

        </div>
      </div>
    </div>
  );
}

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
};

export default StaticsModal