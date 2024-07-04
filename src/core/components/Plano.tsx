import { useEffect } from "react";
import { useDispatch, useSelector } from "@/store/hooks";
import { fetchWords, selectPlano } from "@/store/apps/plano";

const Plano = () => {
  const dispatch = useDispatch();

  const { loading, error, board } = useSelector(selectPlano)

  useEffect(() => {
    const promise = dispatch(fetchWords())

    return () => {
      promise.abort()
    }
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="plano">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="plano-row">
          {row.map((item, colIndex) => (
            <div key={colIndex} className={`plano-cell ${item.status}`}>
              {item.letter}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default Plano
