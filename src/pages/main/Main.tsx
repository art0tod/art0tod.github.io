import { SEO } from '../../components/SEO';
import { ProfileCard } from '../../components/Profile';
import style from './Main.module.css';
import { ProjectsList } from '../../components/ProjectsList/';

export function Main() {
  return (
    <div className={style.root}>
      <ProfileCard />
      <ProjectsList />
      <SEO
        name='Artem Todor'
        title='Artem Todor - Frontend Developer Portfolio'
        description='Personal portfolio website of Artem Todor, featuring projects and professional experience in frontend development'
        type='website'
        themeColor='#000'
        url='https://art0tod.github.io'
        image='https://art0tod.github.io/preview.png'
      ></SEO>
    </div>
  );
}
