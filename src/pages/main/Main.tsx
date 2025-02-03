import { SEO } from "../../components/SEO";
import { ProfileCard } from "../../components/Profile";
import style from './Main.module.css'
import { ProjectsList } from "../../components/ProjectsList/";

export function Main() {
  return (
    <div className={style.root}>
      <ProfileCard />
      <ProjectsList />
      <SEO name="Artyom Todor's Site" title="Artyom Todor's Site" description="Artyom Todor's Site" type="site" themeColor="#000"></SEO>
    </div>
  )
}