type WelcomeModalProps = {
  onClose: () => void
}

const WelcomeModal = ({ onClose }: WelcomeModalProps) => {
  return (
    <div
      className="block fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50"
    >
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-slate-800 dark:border dark:border-gray-400 p-4 rounded-lg w-[90%] sm:w-[55%] md:w-[45%] lg:w-[45%] xl:w-[40%] 2xl:w-[27%]">
        {/* display flex center items */}
        <div className="flex flex-col items-center p-4">
          <h2 className="text-2xl font-bold pb-4 dark:text-white">Cómo jugar</h2>
          <div className="text-left">
            <p className="text-gray-600 pb-3  dark:text-white">
              Adivina la palabra oculta en cinco intentos.
            </p>
            <p className="text-gray-600 pb-3  dark:text-white">
              Cada intento debe ser una palabra válida de 5 letras.
            </p>
            <p className="text-gray-600 pb-3  dark:text-white">
              Después de cada intento el color de las letras cambia para mostrar que tan cerca estás de acertar la palabra.
            </p>
            <div className="text-black pb-3  dark:text-white font-bold">
              Ejemplos
            </div>

            <div className="box-1-container">
              <div className="box-1 box-1-success">G</div>
              <div className="box-1">A</div>
              <div className="box-1">T</div>
              <div className="box-1">O</div>
              <div className="box-1">S</div>
            </div>

            <p className="dark:text-white">La letra <strong>G</strong> está en la palabra y en la posicion correcta.</p>

            <div className="box-1-container">
              <div className="box-1">V</div>
              <div className="box-1">O</div>
              <div className="box-1 box-1-warning">C</div>
              <div className="box-1">A</div>
              <div className="box-1">L</div>
            </div>

            <p className="dark:text-white">La letra <strong>C</strong> está en la palabra pero en la posicion incorrecta.</p>

            <div className="box-1-container">
              <div className="box-1">C</div>
              <div className="box-1">A</div>
              <div className="box-1">N</div>
              <div className="box-1">T</div>
              <div className="box-1 box-1-error">O</div>
            </div>

            <p className="dark:text-white">La letra <strong>O</strong> no está en la palabra.</p>

            <p className="py-5 dark:text-white">Puede haber letras repetidas. Las pistas son independientes para cada letra.</p>
          </div>
          <p className="py-5 dark:text-white">¡Una palabra nueva cada 5 minutos!</p>
          <button
            className="btn-primary uppercase"
            onClick={onClose}
          >
            ¡Jugar!
          </button>

        </div>
      </div>
    </div>
  );
}

export default WelcomeModal