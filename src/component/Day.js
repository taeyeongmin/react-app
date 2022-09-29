import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Word from "./Word";

export default function Day() {
  const { day } = useParams();
  console.log(day);
  const words = useFetch(`http://localhost:3001/words?day=${day}`);

  return (
    <>
      <h2>Day {day}</h2>
      {words.length === 0 && <span>Loading...</span>}
      <table>
        <tbody>
          {words.map((word) => (
            <Word word={word} key={word.id} />
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={2}>
              <button style={{ opacity: day - 1 === 0 ? 0.3 : 1 }}>뒤로</button>
            </td>
            <td colSpan={2}>
              <button>앞으로</button>
            </td>
          </tr>
        </tfoot>
      </table>
    </>
  );
}
