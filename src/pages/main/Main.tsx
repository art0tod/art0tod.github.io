import { SEO } from "../../components/SEO";
import { ProfileCard } from "../../components/Profile";
import style from './Main.module.css'
import { ProjectsList } from "../../components/ProjectsList/";

export function Main() {
  return (
    <div className={style.root}>
      <ProfileCard />
      <ProjectsList />
      <SEO name="Artem Todor's Site" title="Artem Todor's Site" description="Artem Todor's Site" type="site" themeColor="#000"></SEO>
    </div>
  )
}