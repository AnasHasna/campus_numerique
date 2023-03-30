import { useSelector } from "react-redux";
import BoardPage from "../board/BoardPage";
import HeroSectionHomePage from "./HeroSectionHomePage";

function HomePage() {
  const { isLogin } = useSelector((state) => state.auth);
  return (
    <div>{isLogin ? <BoardPage></BoardPage> : <HeroSectionHomePage />}</div>
  );
}

export default HomePage;
